import { useEffect } from "react";
import useAuth from "./useAuth";

const useEagerConnect = () => {
  const { login } = useAuth();

  useEffect(() => {
    login();
  }, [login]);
};

export default useEagerConnect;
