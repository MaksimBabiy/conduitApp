import { SignInFormValues } from "../pages/SignIn";
import { SignUpFormValues } from "../pages/SignUp";
import { useSignInMutation, useSignUpMutation } from "../store/api/api.auth";
import { setUserData } from "../store/slices/auth.slice";
import { useAppDispatch, useAppSelector } from "../store/store";

export const useAuthUser = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.userData);
  const isLogged = Boolean(user);
  const [singin] = useSignInMutation();
  const [signup] = useSignUpMutation();
  const signIn = async (values: SignInFormValues) => {
    await singin(values)
      .unwrap()
      .then((result) => dispatch(setUserData(result.user)));
  };

  const signUp = async (values: SignUpFormValues) => {
    await signup(values).unwrap();
  };
  const logOut = () => {
    dispatch(setUserData(null));
  };
  return { isLogged, signIn, signUp, logOut };
};
