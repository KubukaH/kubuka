import {
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { useState } from "react";

import useAuth from '../function/db';

export const CatchNetlifyRecoveryNullComponent = () => {
  const { replace } = useNavigate();
  const { pathname } = useLocation();

  // important to check for the current pathname here because else you land
  // in a infinite loop
  if (token && type === 'recovery' && pathname === '/') {
    replace(`/recovery`, { token });
  }

  return null;
};

export const RecoveryPage = () => {
  const {
    location: { state },
  } = useNavigate();
  // this state _might_ not be needed, it was needed in my specific implementation
  const [token] = useState(state?.token);

  return null; // set new password in a form and call updateUser
};
