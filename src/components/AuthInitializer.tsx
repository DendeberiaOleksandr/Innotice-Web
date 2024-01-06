import { save } from "@/redux/features/authentication/authenticationSlice";
import React, { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";

type Props = {
    children: ReactNode;
};

function AuthInitializer({ children }: Props) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== 'undefined') {
        const user = localStorage.getItem('user');

        if (user) {
            dispatch(save(JSON.parse(user)));
        }

    }
  }, [dispatch]);

  return children;
}

export default AuthInitializer;
