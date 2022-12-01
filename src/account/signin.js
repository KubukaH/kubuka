import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LockClosedIcon } from '@heroicons/react/solid';

import useLoading from '../components/load';
import { alertService } from '../alert/service';
import { useInput } from '../components/hooks/useInput';
import userAuth from '../function/db';
import RefreshingIcon from '../components/refresh';

const SignIn = () => {
  const [isLoading, load] = useLoading();

  const navigate = useNavigate();
  const location = useLocation();
  const email = useInput('');
  const password = useInput('');

  let from = location.state || "/";

  const onSubmit = (e) => {
    e.preventDefault();
    alertService.clear();

    if (!email.value || !password.value) {
      alertService.error("Blank Fields Detected!");
      return;
    }

    load(userAuth.login(email.value, password.value, false)).then(
      () => {
        alertService.success("Logged IN!");
        navigate(from, { replace: true });
      }
    ).catch((error) => {
      alertService.error(error);
    });
  }

  return (
    <>
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Login now!</h1>
      <p className="py-6">Provide your login credentials. Keep them safe away from prying eyes.</p>
    </div>
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <div className="card-body">
        <form onSubmit={onSubmit}>
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
              <Link to="/account/forgot-password" className="label-text-alt link link-hover">Forgot password?</Link>
            </label>
          </div>
          <div className="form-control mt-6">
            <button 
              className="btn btn-primary group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              type='submit'
              disabled={isLoading}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
              </span>
              Login
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

export default SignIn;
