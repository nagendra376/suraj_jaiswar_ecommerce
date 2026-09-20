import { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loader from "./loader";

interface Props {
  children?: ReactElement;
  isAuthenticated: boolean;
  adminOnly?: boolean;
  admin?: boolean;
  redirect?: string;
}

const ProtectedRoute = ({
  isAuthenticated,
  children,
  adminOnly,
  admin,
  redirect = "/",
}: Props) => {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;

    if (!isAuthenticated) {
      router.replace(redirect);
    } else if (adminOnly && !admin) {
      router.replace(redirect);
    } else {
      setAuthorized(true);
    }
  }, [isAuthenticated, adminOnly, admin, redirect, router]);

  if (!authorized) {
    return <Loader />;
  }

  return children ? children : null;
};

export default ProtectedRoute;
