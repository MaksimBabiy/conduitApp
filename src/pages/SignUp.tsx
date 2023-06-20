import { FC } from "react";
import Container from "../components/Container";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Btn from "../components/Btn";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAuthUser } from "../hooks/useAuthUser";

type Props = {};

export type SignUpFormValues = {
  username: string;
  email: string;
  password: string;
};

const validationSchema = yup.object({
  username: yup.string().required().min(3),
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
});

const SignUp: FC<Props> = () => {
  const { register, handleSubmit, formState } = useForm<SignUpFormValues>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    resolver: yupResolver(validationSchema),
  });
  const navigate = useNavigate();
  const { signUp } = useAuthUser();
  const onSubmit = async (values: SignUpFormValues) => {
    signUp(values)
      .then(() => navigate("/sign-in"))
      .catch((error) => toast.error(error.data.errors.email[0]));
  };

  return (
    <div className="mt-10">
      <Container>
        <div>
          <h1 className="text-4xl mb-2 text-center">Sign up</h1>
          <p className="text-center mb-5">
            {" "}
            <Link to={"/sign-in"}>Have an account?</Link>
          </p>

          <form className="max-w-xl mx-auto" onSubmit={handleSubmit(onSubmit)}>
            <ul className="p-5">
              {(
                Object.keys(
                  formState.errors
                ) as (keyof typeof formState.errors)[]
              ).map((field, index: number) => (
                <li className="text-red-500 list-disc" key={index}>
                  {formState.errors[field]?.message}
                </li>
              ))}
            </ul>
            <Input
              placeholder="User name"
              type="text"
              {...register("username")}
            />
            <Input placeholder="Email" type="email" {...register("email")} />
            <Input
              placeholder="Password"
              type="password"
              {...register("password")}
            />
            <div className="flex justify-end">
              <Btn type="submit" disabled={formState.isSubmitting}>
                Sign up
              </Btn>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default SignUp;
