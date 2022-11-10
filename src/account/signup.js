import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Formik, useField } from 'formik';
import { RefreshIcon } from '@heroicons/react/solid';
import * as Yup from 'yup';

import useLoading from "../components/load";
import { COUNTRIES } from "../constants";
import AlertPopup from "../alert/alert";
import { alertService } from "../alert/service";
import userAuth from "../function/db";

const MyNameText = ({label, ...props}) => {
  const [field, meta] = useField(props);
  return (
    <div className={`block col-span-6 ${props.name !== "street_address" ? "sm:col-span-3": ""}`}>
      <label htmlFor={props.name} className="block after:content-['*'] after:ml-0.5 after:text-red-500 text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type="text"
        id={props.name}
        className={`mt-1 peer focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${meta.touched && meta.error && "invalid:border-pink-500 invalid:text-pink-600"} focus:invalid:border-pink-500 focus:invalid:ring-pink-500`}
        {...field}
        {...props}
      />
      <p className="invisible peer-invalid:visible text-pink-600 text-sm peer-invalid:mt-2">
        {meta.error}
      </p>
    </div>
  );
};

const MyAddressInput = ({label, ...props}) => {
  const [field, meta] = useField(props);
  return (
    <div className="block col-span-6 sm:col-span-6 lg:col-span-2">
      <label htmlFor={props.name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type="text"
        id={props.name}
        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        {...field}
        {...props}
      />
    </div>
  );
};

const MySelectInput = ({label, ...props}) => {
  const [field, meta] = useField(props);
  return (
    <div className="col-span-6 sm:col-span-5">
      <label htmlFor={props.name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        id={props.name}
        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        {...field}
        {...props}
      />
    </div>
  );
};

const MyEmailInput = ({label, ...props}) => {
  const [field, meta] = useField(props);
  return (
    <label className="block col-span-6 sm:col-span-3 lg:col-span-2">
      <span className="block after:content-['*'] after:ml-0.5 after:text-red-500 text-sm font-medium text-slate-700">
        {label}
      </span>
      <input 
        type={props.type}
        id={props.name}
        className={`peer mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${meta.touched && meta.error && "invalid:border-pink-500 invalid:text-pink-600"} focus:invalid:border-pink-500 focus:invalid:ring-pink-500`}
        {...field}
        {...props}
      />
      {meta.error && <p className="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">
        {meta.error}
      </p>}
    </label>
  );
};

const MyCheckbox = ({ children, ...props }) => {
  // React treats radios and checkbox inputs differently other input types, select, and textarea.
  // Formik does this too! When you specify `type` to useField(), it will
  // return the correct bag of props for you -- a `checked` prop will be included
  // in `field` alongside `name`, `value`, `onChange`, and `onBlur`
  const [field, meta] = useField({ ...props, type: 'checkbox' });
  return (
    <label className="inline-flex col-span-6 items-center cursor-pointer">
      <input
        id="custom check signup"
        type="checkbox"
        className="form-checkbox border-0 rounded text-gray-800 ml-1 w-5 h-5"
        style={{ transition: "all .15s ease" }}
        {...field} {...props}
      />
      {children}
    </label>
  );
};

const SignUp = () => {
  const [isLoading, load] = useLoading();

  const navigate = useNavigate();

  return (
    <div className="mt-5 md:mt-0 md:col-span-2">
      <Formik
        initialValues={{
          email:"", password:"", first_name: "", last_name: "", street_address: "", profile_img: null, city: "", state: "", province: "", accept_terms: false 
        }}
        validationSchema={Yup.object().shape({
          first_name: Yup.string().required("* fill in"),
          last_name: Yup.string().required("* required"),
          email: Yup.string().email("Invalid Email").required("* required"),
          password: Yup.string().required("* required"),
          street_address: Yup.string().required("* required"),
          country: Yup.string().required("* required"),
          /*confirmPassword: Yup.string()
            .when('password', (password, schema) => {
              if (password) return schema.required('* required');
            })
            .oneOf([Yup.ref('password')], 'Not match'),
          accept_terms: Yup.bool()
            .oneOf([true], '* required')*/
        })}
        onSubmit={(fields) => {
          alertService.clear();
          if (fields.email === "" || fields.password === "") {return alertService.error("Blank fields!")};
          const role = "User";
          const user_metadata = {
            full_name: `${fields.first_name} ${fields.last_name}`,
            accept_terms: fields.accept_terms,
            bio: fields.bio,
            home_address: `${fields.street_address} ${fields.city} ${fields.province} ${fields.country}`
          };

          load(userAuth.signup(fields.email, fields.password, user_metadata)).then(() => {
            navigate("/account/signin");
          }).catch((error) => {
            alertService.error(error);
          });
        }}
      >
        {() => (
          <Form>
            <AlertPopup />
            <div className="shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 bg-white sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                  <MyNameText
                    name="first_name"
                    label={"First Name"}
                  />
                  <MyNameText
                    name="last_name"
                    label={"Last Name"}
                  />
                  <MyNameText
                    name="street_address"
                    label={"Street Address"}
                  />
                  <MyAddressInput
                    name="city"
                    label="City"
                  />
                  <MyAddressInput
                    name="state"
                    label="State"
                  />
                  <MyAddressInput
                    name="province"
                    label="Province/ZIP"
                  />
                  <MySelectInput
                    name="country"
                    label="Country"
                  >
                    <option value={""}>Select Country</option>
                    {COUNTRIES.map((c) => (
                      <option key={c.code} value={c.label}>
                        {c.label}
                      </option>
                    ))}
                  </MySelectInput>
                  <MyEmailInput
                    name="email"
                    type="email"
                    label="Email Address"
                  />
                  <MyEmailInput
                    name="password"
                    type="password"
                    label="Password"
                  />
                  <MyCheckbox name="accept_terms">
                    <span className="ml-2 text-sm font-semibold text-gray-700">
                      Accept the terms and Conditions
                    </span>
                  </MyCheckbox>
                </div>
              </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={isLoading}
              >
                Save
                {isLoading && (
                    <RefreshIcon className="h-5 w-5 animate-spin text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />)}
              </button>
            </div>
          </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;