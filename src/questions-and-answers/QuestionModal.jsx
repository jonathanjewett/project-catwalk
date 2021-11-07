import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Modal, validateEmail } from '../common';
import api from '../api';

/**
 * @param {Object} props
 * @param {Product} props.product
 * @param {React.MouseEventHandler} props.hide
 */
const QuestionModal = ({ hide, product }) => (
  <Modal hide={hide}>
    <h1>Ask Your Question</h1>
    <h2>About the {product.name}</h2>
    <Formik
      initialValues={{body: '', name: '', email: ''}}
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
      onSubmit={(values, { setSubmitting }) =>
        api.createQuestion(product.id, values)
          .then(() => setSubmitting(false))
          .catch(console.error)
      }
    >
      {({ isSubmitting, isValidating, errors }) => (
        <Form>
          <label htmlFor="body">
            Your Question*
            {Object.values(errors).length === 0 ? null : (
              <span>You must enter the following:</span>
            )}
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
            placeholder="Example: jackson11!"
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
            placeholder="Why did you like the product or not?"
            maxLength="60"
            required
          />
          <div>
            <ErrorMessage name="email" component="span"/>
            For authentication reasons, you will not be emailed
          </div>
          <button type="submit" className="interact" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  </Modal>
);

export default QuestionModal;
