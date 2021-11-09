import React from 'react';
import { Modal, validateEmail} from '../../common';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import '../ratings-and-reviews.scss';
import api from '../../api';

const AddReview = ({hide, /*product*/}) => {
  return (
    <Modal hide={hide}>
      <h1>Write Your Review</h1>
      <h2>About the Product</h2>
      <Formik
        initialValues={{rating: '', recommend: '', size: '', width: '', comfort: '', quality: '', length: '', fit: '', summary: '', body: '', nickname: '', email: ''}}
        validate={values => {
          const errors = {};
          if (!values.rating) {
            errors.rating = 'Required';
          }
          if (!values.recommend) {
            errors.recommend = 'Required';
          }
          if (!values.characteristics) {
            errors.characteristics = 'Required';
          }
          if (!values.body) {
            errors.body = 'Required';
          }
          if (!values.nickname) {
            errors.body = 'Required';
          } else if (!validateEmail(values.email)) {
            errors.email = 'Invalid email address';
          }
          if (!values.email) {
            errors.email = 'Required';
          }
          return errors;
        }}
        onSubmit={(values, {resetForm, setSubmitting}) => {
          api.createReview(values)
            .then(() => {
              setSubmitting(false);
              resetForm();
              hide();
            })
            .catch(console.error);
        }}
      >
        {({values, isSubmitting}) => (
          <Form>
            <label>Your Rating:</label>
            <div className="star-rating-buttons">
              <div className="rating-indicator"> {values.rating}</div>
              <Field type="radio" name="rating" id="star-5"value="Great" />
              <label htmlFor="star-5"></label>
              <Field type="radio" name="rating" id="star-4" value="Good" />
              <label htmlFor="star-4"></label>
              <Field type="radio" name="rating" id="star-3" value="Average" />
              <label htmlFor="star-3"></label>
              <Field type="radio" name="rating" id="star-2" value="Fair" />
              <label htmlFor="star-2"></label>
              <Field type="radio" name="rating" id="star-1"value="Poor" />
              <label htmlFor="star-1"></label>
            </div>

            <label>Do you recommend this product?</label>
            <div className="recommend-buttons">
              <label htmlFor="recommend-yes">Yes:</label>
              <Field type="radio" name="recommend" id="recommend-yes" value="Yes"/>

              <label htmlFor="recommend-no">No:</label>
              <Field type="radio" name="recommend" id="recommend-no" value="No"/>
            </div>
            <label>Tell us more about this product</label>
            <div className="characterisitcs-buttons">
              <label>Size: </label>
              <Field type="radio" name="size" value="A size too small"/>
              <label>A size too small</label>
              <Field type="radio" name="size" value="1/2 a size too small"/>
              <label>1/2 a size too small</label>
              <Field type="radio" name="size" value="Perfect"/>
              <label>Perfect</label>
              <Field type="radio" name="size" value="1/2 a size too big"/>
              <label>1/2 a size too big</label>
              <Field type="radio" name="size" value="A size too big"/>
              <label>A size too big</label>
            </div>
            <div>
              <label>Width: </label>
              <Field type="radio" name="width" value="Too Narrow"/>
              <label>Too narrow</label>
              <Field type="radio" name="width" value="Slighty narrow"/>
              <label>Slightly narrow</label>
              <Field type="radio" name="width" value="Perfect"/>
              <label>Perfect</label>
              <Field type="radio" name="width" value="Slightly wide"/>
              <label>Slightly wide</label>
              <Field type="radio" name="width" value="A size too big"/>
              <label>Too wide</label>
            </div>
            <div>
              <label>Comfort: </label>
              <Field type="radio" name="comfort" value="Uncomfortable"/>
              <label>Uncomfortable</label>
              <Field type="radio" name="comfort" value="Slighty uncomfortable"/>
              <label>Slightly uncomfortable</label>
              <Field type="radio" name="comfort" value="Ok"/>
              <label>Ok</label>
              <Field type="radio" name="comfort" value="Comfortable"/>
              <label>Comfortable</label>
              <Field type="radio" name="comfort" value="Perfect"/>
              <label>Perfect</label>
            </div>
            <div>
              <label>Quality: </label>
              <Field type="radio" name="quality" value="Poor"/>
              <label>Poor</label>
              <Field type="radio" name="quality" value="Below average"/>
              <label>Below average</label>
              <Field type="radio" name="quality" value="What I expected"/>
              <label>What I expected</label>
              <Field type="radio" name="quality" value="Pretty great"/>
              <label>Pretty great</label>
              <Field type="radio" name="quality" value="Perfect"/>
              <label>Perfect</label>
            </div>
            <div>
              <label>Length: </label>
              <Field type="radio" name="length" value="Runs Short"/>
              <label>Runs Short</label>
              <Field type="radio" name="length" value="Runs slightly short"/>
              <label>Runs slightly short</label>
              <Field type="radio" name="length" value="Perfect"/>
              <label>Perfect</label>
              <Field type="radio" name="length" value="Runs slightly long"/>
              <label>Runs slightly long</label>
              <Field type="radio" name="length" value="Runs long"/>
              <label>Runs long</label>
            </div>
            <div>
              <label>Fit: </label>
              <Field type="radio" name="fit" value="Runs tight"/>
              <label>Runs tight</label>
              <Field type="radio" name="fit" value="Runs slightly tight"/>
              <label>Runs slightly tight</label>
              <Field type="radio" name="fit" value="Perfect"/>
              <label>Perfect</label>
              <Field type="radio" name="fit" value="Runs slightly long"/>
              <label>Runs slightly long</label>
              <Field type="radio" name="fit" value="Runs long"/>
              <label>Runs long</label>
            </div>
            <div>
              <label>Review Summary: </label>
              <Field
                type="text"
                name="summary"
                id="summary"
                placeholder="Example: Best purchase ever!"
                maxLength="60"
              />
            </div>
            <div>
              <label>Review Body: </label>
              <Field
                className="interact"
                type="text"
                as="textarea"
                name="body"
                id="body"
                placeholder="Why did you like the product or not?"
                minLength="50"
                maxLength="1000"
                required
              />
            </div>
            <div>
              <label>Nickname: </label>
              <Field
                className="interact"
                type="text"
                name="nickname"
                id="nickname"
                placeholder="Example: jackson11!"
                maxLength="60"
                required
              />
              <span>For privacy reasons, do not use your full name or email address</span>
            </div>
            <div>
              <label>Email: </label>
              <Field
                className="interact"
                type="text"
                name="email"
                id="email"
                placeholder="Example: jackson11@email.com"
                maxLength="60"
                required
              />
              <span>For authentication reasons, you will not be emailed</span>
            </div>
            <button type="submit" className="interact" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};


export default AddReview;