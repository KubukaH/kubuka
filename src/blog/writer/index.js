import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Formik, useField } from 'formik';
import * as yup from 'yup';

import AlertPopup from "../../alert/alert";
import { alertService } from "../../alert/service";
import useLoading from "../../components/load";
import { category, nameTitles } from "../../constants";
import { newItem } from "../../function/operations";
import EditorPage from "./editor";
import { useCTX } from "../../components/context";
import RefreshingIcon from "../../components/refresh";

const MyTextInput = ({label, ...props}) => {
  const [field, meta] = useField(props);
  return (
    <div className={`block col-span-6 ${props.name === "blog_title" || props.name === "description" ? undefined : "sm:col-span-3"}`}>
      <label htmlFor={props.name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={`${props.name === "email" ? "email" : "text"}`}
        id={props.name}
        className={`${meta.touched && meta.error && "invalid:border-pink-500 invalid:text-pink-600"} peer mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md`}
        {...field}
        {...props}
      />
    </div>
  );
};

const MySelectInput = ({label, ...props}) => {
  const [field, meta] = useField(props);
  return (
    <div className="col-span-6 sm:col-span-1">
      <label htmlFor={props.name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        id="title"
        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        {...field}
        {...props}
      />
    </div>
  );
};

export default function WriterIndex() {
  const [isLoading, load] = useLoading();

  const bodyValue = useMemo(() => [
    { type: 'paragraph', children: [{text: ''}] }
  ],[]);

  const navigate = useNavigate();
  const { bValue } = useCTX();

  return (
    <div className="shadow overflow-hidden sm:rounded-md mb-32">
      <Formik
        initialValues={{
          title: "", 
          first_name: "", 
          last_name: "", 
          email_address: "", 
          category: "", 
          blog_title: "", 
          blog_content: bodyValue,
          code: "",
          description: ""
        }}
        validationSchema={yup.object().shape({
          description: yup.string().min(5, "More than 5 characters").max(160, "Don't exceed 160 characters")
        })}
        onSubmit={(fields) => {
          if (
            !bValue === ""
          ) {
            alertService.error("One or more fields are blank.");
            return;
          };

          const btitle = {...fields.blog_title};
      
          load(newItem("Blog", { ...fields, blog_content: bValue, code: btitle, posted_on: Date.now() })).then(() => {
            alertService.success("Blog created!");
            navigate("/blog/posts", { replace: true });
          }).catch((error) => {
            alertService.error(error);
          })
        }}
      >
        <Form>
        <AlertPopup />
        <div className="px-4 py-5 bg-white sm:p-6">
          <div className="grid grid-cols-6 gap-6">
            <MySelectInput name="title" label={"Title"}>
              {nameTitles.map((ti) => (
                <option key={ti.code}>
                  {ti.label}
                </option>
              ))}
            </MySelectInput>
            <MyTextInput
              name="first_name"
              label={"First Name and Initials"}
            />
            <MyTextInput
              name="last_name"
              label={"Last Name"}
            />
            <MyTextInput
              name="email"
              label={"Email Address"}
            />
            <MySelectInput name="category">
              {category.map((cat) => (
                <option key={cat.code} value={cat.label}>{cat.label}</option>
              ))}
            </MySelectInput>
            <MyTextInput
              name="blog_title"
              label={"Title of the blog"}
            />
            <MyTextInput
              name="description"
              label={"A short description"}
            />

            <div className="col-span-6">
              <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                Content
              </label>
              <EditorPage />
            </div>
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={isLoading}
          >
            {!isLoading 
            ? "Save" 
            : (
              <RefreshingIcon />
              )
            }
          </button>
        </div>
        </Form>
      </Formik>
    </div>
  );
};
