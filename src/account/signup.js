import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import useLoading from "../components/load";
import { COUNTRIES } from "../constants";
import { alertService } from "../alert/service";
import userAuth from "../function/db";
import { useInput } from "../components/hooks/useInput";
import RefreshingIcon from "../components/refresh";

const SignUp = () => {
  const [isLoading, load] = useLoading();

  const navigate = useNavigate();
  const names = useInput('');
  const address = useInput('');
  const email = useInput('');
  const password = useInput('');

  const onSubmit = (e) => {
    e.preventDefault();

    alertService.clear();

    if (!email.value || !names.value || !password.value) {
      alertService.warn("Blank fields detected! Please Fix!");
      return;
    };

    const user_metadata = {
      full_name: names.value,
      address: address.value
    };

    load(userAuth.signup(email.value, password.value, user_metadata)).then(
      () => {
        alertService.success("Signup Successfully. Please check your email for further instructions.");
        navigate('/account/signin');
      }
    ).catch((error) => {
      alertService.error(error);
    });
  }

  return (
    <>
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Sign UP!</h1>
      <p className="py-6">Provide your email address and a password. Make the password strong.</p>
    </div>
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <div className="card-body">
        <form onSubmit={onSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">First and Last Name</span>
            </label>
            <input 
              type="text" 
              placeholder="First and Last Name" 
              className="input input-bordered"
              {...names.bind}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Address</span>
            </label>
            <input 
              type="text" 
              placeholder="Address" 
              className="input input-bordered"
              {...address.bind}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input 
              type="email" 
              placeholder="email" 
              className="input input-bordered"
              {...email.bind}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input 
              type="password" 
              placeholder="password" 
              className="input input-bordered"
              {...password.bind}
            />
            <label className="label">
              <Link to="/account/signin" className="label-text-alt link link-hover">Have an account?</Link>
            </label>
          </div>
          <div className="form-control mt-6">
            <button 
              className="btn btn-primary group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              type='submit'
              disabled={isLoading}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-indigo-500 group-hover:text-indigo-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                </svg>
              </span>
              Sign UP
              {isLoading && (
              <span className="absolute right-0 inset-y-0 flex items-center pr-3">
                <RefreshingIcon />
              </span>)}
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default SignUp;