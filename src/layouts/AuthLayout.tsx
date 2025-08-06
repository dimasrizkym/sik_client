import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
