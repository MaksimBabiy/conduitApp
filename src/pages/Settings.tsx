import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import Input from "../components/Input";
import { useAppDispatch, useAppSelector } from "../store/store";
import Btn from "../components/Btn";
import { useUpdateUserDataMutation } from "../store/api/api.auth";
import { setUserData } from "../store/slices/auth.slice";
import { useUploadImageMutation } from "../store/api/api.upload";

type IInput = {
  image: string;
  username: string;
  bio: string;
  password: string;
  email: string;
};
type IFormError = {
  image: string;
  username: string;
  email: string;
};

const Settings = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [isDirtyForm, setDirtyForm] = useState(false);
  const [useUpdateUserData] = useUpdateUserDataMutation();
  const userData = useAppSelector((state) => state.auth.userData);
  const dispatch = useAppDispatch();
  const [inputChange, setInputChange] = useState<IInput>({
    image: userData?.image as string,
    username: userData?.username as string,
    bio: userData?.bio === null ? "" : (userData?.bio as string),
    password: "",
    email: userData?.email as string,
  });
  const [formError, setFormError] = useState<IFormError>({
    image: "",
    username: "",
    email: "",
  });
  useEffect(() => {
    setIsDisabled(!Object.values(formError).every((x) => x === ""));
  }, []);

  const HandleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputChange({ ...inputChange, [e.target.name]: e.target.value });

    if (e.target.value.length <= 3 && e.target.value.length !== 0)
      setFormError({
        ...formError,
        [e.target.name]: `${e.target.name} should be more 3`,
      });
    else if (e.target.value.length > 3)
      setFormError({ ...formError, [e.target.name]: "" });
    else
      setFormError({
        ...formError,
        [e.target.name]: `${e.target.name} is required`,
      });
    setIsDisabled(!Object.values(formError).every((x) => x === ""));
  };

  const BlurHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDirtyForm(true);
  };
  console.log(formError);
  const HandleUpdate = async () => {
    await useUpdateUserData({
      ...inputChange,
      token: userData?.token as string,
    })
      .unwrap()
      .then((data) => dispatch(setUserData(data.user)));
  };

  return (
    <Container>
      <div className="mt-10 w-[600px] mx-auto">
        <h1 className="text-center text-5xl mb-5">Your Settings</h1>
        {isDirtyForm &&
          Object.keys(formError).map((item, index) => (
            <li className="text-red-500 list-none" key={index}>
              {formError[item as keyof IFormError]}
            </li>
          ))}
        <form>
          <Input
            onBlur={BlurHandler}
            name="image"
            value={inputChange.image}
            placeholder="Image"
            onChange={HandleChange}
          />

          <Input
            onBlur={BlurHandler}
            name="username"
            value={inputChange.username}
            onChange={HandleChange}
            placeholder="Username"
          />
          <textarea
            className="w-full h-[150px] p-5 border mb-3 min-h-[75px]"
            onChange={HandleChange}
            name="bio"
            placeholder="Short bio about you"
            value={inputChange.bio}
          />
          <Input
            onChange={HandleChange}
            name="email"
            value={inputChange.email}
            placeholder="Email"
            onBlur={BlurHandler}
          />
          <Input
            onChange={HandleChange}
            name="password"
            value={inputChange.password}
            placeholder="Password"
          />
          <div className="flex justify-end">
            <Btn type="button" disabled={isDisabled} onClick={HandleUpdate}>
              Update Settings
            </Btn>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default Settings;
