import React from 'react';
import { Modal, validateEmail} from '../../common';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import '../ratings-and-reviews.scss';

const AddReview = ({hide}) => {
  return (
    <Modal hide={hide}>
      <h1>Write Your Review</h1>
      <h2>About the 'Product Name Here'</h2>
      <Formik
        initialValues={{rating: '', recommend: '', characteristics: '', body: '', nickname: '', email: ''}}
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
          }
          if (!values.email) {
            errors.email = 'Required';
          }
          return errors;
        }}
        onSubmit={(values, {setSubmitting}) => {}}
      >
        {({values, isSubmitting}) => (
          <Form>
            <label>Your Rating:</label>
            <div>
              <label>
                <Field type="radio" name="rating" value="One" />
              </label>
              <label>
                <Field type="radio" name="rating" value="Two" />
              </label>
              <label>
                <Field type="radio" name="rating" value="Three" />
              </label>
              <label>
                <Field type="radio" name="rating" value="Four" />
              </label>
              <label>
                <Field type="radio" name="rating" value="Five" />
              </label>
            </div>

            <label>Do you recommend this product?</label>
            <div>
              <label>Yes:</label>
              <Field type="radio" name="recommend" value="Yes"/>

              <label>No:</label>
              <Field type="radio" name="recommend" value="No"/>
            </div>
            <label>Tell us more about this product</label>
            <div className="">
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