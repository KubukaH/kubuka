import { Outlet } from 'react-router-dom';

export default function AccountIndex() {
  return (
    <div className="hero min-h-screen md:px-16 md:py-10">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <Outlet />
      </div>
    </div>
  );
};
