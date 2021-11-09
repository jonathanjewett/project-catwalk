import React from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import { Modal, validateEmail } from '../common';
import api from '../api';

/**
 * @param {Object} props
 * @param {Product} props.product
 * @param {Question} props.question
 * @param {React.MouseEventHandler} props.hide
 */
const AnswerModal = ({ hide, product, question }) => (
  <Modal hide={hide}>
    <h1>Submit your Answer</h1>
    <h2>{product.name}: {question.question_body}</h2>
    <Formik
      initialValues={{body: '', name: '', email: '', photos: []}}
      validate={values => {
        const errors = {};
        if (!values.body) {
          errors.body = 'Required';
        }
        if (!values.name) {
          errors.name = 'Required';
        }
        if (!values.email) {
          errors.email = 'Required';
        } else if (!validateEmail(values.email)) {
          errors.email = 'Invalid email address';
        }
        return errors;
      }}
      onSubmit={(values, { resetForm, setSubmitting }) =>
        api.createAnswer(question.question_id, values)
          .then(() => {
            setSubmitting(false);
            resetForm();
            hide();
          })
          .catch(console.error)
      }
    >
      {({ isSubmitting, isValidating, errors, values }) => (
        <Form>
          <label htmlFor="body">
            Your Answer*
          </label>
          <Field
            className="interact"
            type="text"
            as="textarea"
            name="body"
            id="body"
            maxLength="1000"
            required
          />
          <ErrorMessage name="body" component="span"/>
          <label htmlFor="name">What is your nickname*</label>
          <Field
            className="interact"
            type="text"
            name="name"
            id="name"
            placeholder="Example: jack543!"
            maxLength="60"
            required
          />
          <div>
            <ErrorMessage name="name" component="span"/>
            For privacy reasons, do not use your full name or email address
          </div>
          <label htmlFor="email">Your email*</label>
          <Field
            className="interact"
            type="email"
            name="email"
            id="email"
            placeholder="Example: jack@email.com"
            maxLength="60"
            required
          />
          <div>
            <ErrorMessage name="email" component="span"/>
            For authentication reasons, you will not be emailed
          </div>
          <label htmlFor="photo">Attach Photos</label>
          <FieldArray name="photos" render={arrayHelpers => (
            <div>
              {values.photos.length < 5 ? (
                <input
                  type="file"
                  name="photo"
                  id="photo"
                  accept="image/*"
                  onChange={event => arrayHelpers.push(URL.createObjectURL(event.currentTarget.files[0]))}
                />
              ) : null}
              {values.photos.map(photo => (
                <img src={photo}/>
              ))}
            </div>
          )}/>
          <button type="submit" className="interact" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  </Modal>
);

export default AnswerModal;
