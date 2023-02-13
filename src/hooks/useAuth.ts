import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import { injectedConnector } from "../utils/connectors";

const useAuth = () => {
  const { activate } = useWeb3React();

  const login = useCallback(() => {
    activate(injectedConnector, async (error: Error) => {
      console.log({ error });
      // alert(error.message);
      alert('Please switch to Mumbai testnet to connect')
    });
  }, [activate]);

  return { login };
};

export default useAuth;
