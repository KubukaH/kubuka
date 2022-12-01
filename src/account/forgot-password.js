import { Link, useNavigate } from 'react-router-dom';
import { MailOpenIcon } from '@heroicons/react/outline';
import userAuth from '../function/db';

import useLoading from '../components/load';
import { alertService } from '../alert/service';
import { useInput } from '../components/hooks/useInput';
import RefreshingIcon from '../components/refresh';

const ForgotPassword = () => {
  const [isLoading, load] = useLoading();

  const navigate = useNavigate();
  const email = useInput('');

  const onSubmit = (e) => {
    e.preventDefault();
    alertService.clear();
    if (!email.value) {
      alertService.error("Email field is blank!");
      return;
    }

    load(userAuth.requestPasswordRecovery(email.value)).then(
      () => {
        alertService.info("Check your email for password recovery instructions");
        navigate('/account/signin', { replace: true });
      }
    ).catch((error) => {
      alertService.error(error);
    });
  }

  return (
    <>
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Forgot Password!</h1>
      <p className="py-6">Provide the email you used to create the account. If you can't remember please consider signing up.</p>
    </div>
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <div className="card-body">
        <form onSubmit={onSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input 
              type="text" 
              placeholder="email" 
              className="input input-bordered"
              {...email.bind}
            />
            <label className="label">
              <Link to={'/account/signin'} className="label-text-alt link link-hover">Have an account?</Link>
            </label>
          </div>
          <div className="form-control mt-6">
            <button 
              className="btn btn-primary group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              type='submit'
              disabled={isLoading}
            >
              Recover
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

export default ForgotPassword;
