import { Authentication, AuthenticationState, save, setLoading } from "@/redux/features/authentication/authenticationSlice";
import { RootState } from "@/redux/store";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

type Props = {
    code: string | undefined | null;
    redirectUri: string | undefined;
};

const useAuthentication = ({ code, redirectUri }: Props) => {
    const auth = useSelector((state: RootState) => state.authentication);
    const dispatch = useDispatch();
    const [authorization, setAuthorization] = useState<AuthenticationState>(auth);

    useEffect(() => {
        if (code && (!auth || !auth.authentication.accessToken)) {
            dispatch(setLoading(true));
            axios
            .post("http://localhost:3000/api/authorization", {
              code: code,
              redirect_uri: redirectUri,
            })
            .then((res) => {
                const body = {
                    accessToken: res.data.access_token,
                    tokenType: res.data.token_type,
                    expiresIn: res.data.expires_in,
                    refreshToken: res.data.refresh_token,
                    scope: res.data.scope,
                };
                dispatch(save(body));
                setAuthorization({
                    authentication: body,
                    isLoading: false
                });
            })
            .catch((err) => console.log(err))
            .finally(() => {
                dispatch(setLoading(false));
                setAuthorization(prev => ({
                    ...prev,
                    isLoading: false
                }))
            });
        }
    }, [auth, dispatch, code, redirectUri]);
    return auth;
};

export default useAuthentication;