import React from 'react';
import { Modal, validateEmail} from '../../common';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import '../ratings-and-reviews.scss';
import api from '../../api';

const ratingConverter = (rating) => {
  if (rating === 'Great') {
    return 5;
  }
  if (rating === 'Good') {
    return 4;
  }
  if (rating === 'Average') {
    return 3;
  }
  if (rating === 'Fair') {
    return 2;
  }
  if (rating === 'Poor') {
    return 1;
  }
  if (rating === 'Yes') {
    return true;
  }
  if (rating === 'No') {
    return false;
  }
};

const AddReview = ({hide, product, characteristics}) => {

  let [textCount, setTextCount] = React.useState(0);

  const characteristicNames = Object.keys(characteristics);
  const initialValues = {rating: '', recommend: '', summary: '', body: '', nickname: '', photos: [], email: ''};
  for (const characteristic of characteristicNames) {
    initialValues[characteristic] = '';
  }
  return (
    <Modal hide={hide}>
      <h1>Write Your Review</h1>
      <h2>About the {product.name}</h2>
      <Formik
        initialValues={initialValues}
        validate={values => {
          const errors = {};
          if (!values.rating) {
            errors.rating = 'Required';
          }
          if (!values.recommend) {
            errors.recommend = 'Required';
          }
          if (!values.body) {
            errors.body = 'Required';
          }
          if (!values.nickname) {
            errors.body = 'Required';
          }
          if (!values.email) {
            errors.email = 'Required';
          } else if (!validateEmail(values.email)) {
            errors.email = 'Invalid email address';
          }
          return errors;
        }}
        onSubmit={(values, {resetForm, setSubmitting}) => {
          const postConstructor = {
            rating: ratingConverter(values.rating),
            summary: values.summary || '',
            body: values.body,
            recommend: ratingConverter(values.recommend),
            photos: values.photos,
            name: values.nickname,
            email: values.email,
            characteristics: {}
          };

          for (const characteristic of characteristicNames) {
            postConstructor.characteristics[characteristics[characteristic].id] = Number.parseInt(values[characteristic]);
          }
          console.log(postConstructor);
          api.createReview(product.id, postConstructor)
            .then(() => {
              setSubmitting(false);
              resetForm();
              hide();
            })
            .catch(console.error);
        }
        }
      >
        {({values, isSubmitting, isValidating, handleChange, errors}) => (
          <Form>
            <label>Your Rating:</label>
            <div className="star-rating-buttons">
              <div className="rating-indicator"> {values.rating}</div>
              <Field type="radio" name="rating" id="star-5"value="Great"/>
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
            {characteristics.Size &&
            <div>
              <label>Size: </label>
              <Field type="radio" name="Size" value="1"/>
              <label>A size too small</label>
              <Field type="radio" name="Size" value="2"/>
              <label>1/2 a size too small</label>
              <Field type="radio" name="Size" value="3"/>
              <label>Perfect</label>
              <Field type="radio" name="Size" value="4"/>
              <label>1/2 a size too big</label>
              <Field type="radio" name="Size" value="5"/>
              <label>A size too big</label>
            </div>
            }
            {characteristics.Width &&
            <div>
              <label>Width: </label>
              <Field type="radio" name="Width" value="1"/>
              <label>Too narrow</label>
              <Field type="radio" name="Width" value="2"/>
              <label>Slightly narrow</label>
              <Field type="radio" name="Width" value="3"/>
              <label>Perfect</label>
              <Field type="radio" name="Width" value="4"/>
              <label>Slightly wide</label>
              <Field type="radio" name="Width" value="5"/>
              <label>Too wide</label>
            </div>
            }
            {characteristics.Comfort &&
            <div>
              <label>Comfort: </label>
              <Field type="radio" name="Comfort" value="1"/>
              <label>Uncomfortable</label>
              <Field type="radio" name="Comfort" value="2"/>
              <label>Slightly uncomfortable</label>
              <Field type="radio" name="Comfort" value="3"/>
              <label>Ok</label>
              <Field type="radio" name="Comfort" value="4"/>
              <label>Comfortable</label>
              <Field type="radio" name="Comfort" value="5"/>
              <label>Perfect</label>
            </div>
            }
            {characteristics.Quality &&
            <div>
              <label>Quality: </label>
              <Field type="radio" name="Quality" value="1"/>
              <label>Poor</label>
              <Field type="radio" name="Quality" value="2"/>
              <label>Below average</label>
              <Field type="radio" name="Quality" value="3"/>
              <label>What I expected</label>
              <Field type="radio" name="Quality" value="4"/>
              <label>Pretty great</label>
              <Field type="radio" name="Quality" value="5"/>
              <label>Perfect</label>
            </div>
            }
            {characteristics.Length &&
            <div>
              <label>Length: </label>
              <Field type="radio" name="Length" value="1"/>
              <label>Runs Short</label>
              <Field type="radio" name="Length" value="2"/>
              <label>Runs slightly short</label>
              <Field type="radio" name="Length" value="3"/>
              <label>Perfect</label>
              <Field type="radio" name="Length" value="4"/>
              <label>Runs slightly long</label>
              <Field type="radio" name="Length" value="5"/>
              <label>Runs long</label>
            </div>
            }
            {characteristics.Fit &&
            <div>
              <label>Fit: </label>
              <Field type="radio" name="Fit" value="1"/>
              <label>Runs tight</label>
              <Field type="radio" name="Fit" value="2"/>
              <label>Runs slightly tight</label>
              <Field type="radio" name="Fit" value="3"/>
              <label>Perfect</label>
              <Field type="radio" name="Fit" value="4"/>
              <label>Runs slightly long</label>
              <Field type="radio" name="Fit" value="5"/>
              <label>Runs long</label>
            </div>
            }
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
              <input
                onChange={event => {
                  setTextCount(event.target.value.length);
                  handleChange(event);
                }}
                className="interact"
                type="text"
                as="textarea"
                name="body"
                id="body"
                placeholder="Why did you like the product or not?"
                minLength= "50"
                maxLength="1000"
                required
              />
              {textCount < 50 ? <div>Minimum required characters left: {50 - textCount}</div> : <div>Minimum Reached</div>}
            </div>
            <div>
              <label>Upload your photos: </label>
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
                  {values.photos.map(photo => (<img key={photo} src={photo} height="100" width="100"/>))}
                </div>
              )}/>
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