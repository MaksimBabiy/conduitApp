import Container from "../components/Container";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Btn from "../components/Btn";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAuthUser } from "../hooks/useAuthUser";

type Props = {};
export type SignInFormValues = {
  email: string;
  password: string;
};
const SignIn = (props: Props) => {
  const validationSchema = yup.object({
    email: yup.string().required().email(),
    password: yup.string().required().min(6),
  });

  const { register, handleSubmit } = useForm<SignInFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const navigate = useNavigate();
  const { signIn } = useAuthUser();
  const onSubmit = async (values: SignInFormValues) => {
    signIn(values)
      .then(() => navigate("/"))
      .catch((error) =>
        toast.error(
          `Email or password ${error.data.errors["email or password"][0]}`
        )
      );
  };

  return (
    <div className="mt-10">
      <Container>
        <div>
          <h1 className="text-4xl mb-2 text-center">Sign in</h1>
          <p className="text-center mb-5">
            {" "}
            <Link to={"/sign-up"}>Need an account?</Link>
          </p>

          <form className="max-w-xl mx-auto" onSubmit={handleSubmit(onSubmit)}>
            <Input placeholder="Email" {...register("email")} />
            <Input placeholder="Password" {...register("password")} />
            <div className="flex justify-end">
              <Btn type="submit">Sign in</Btn>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default SignIn;
