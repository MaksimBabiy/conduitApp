import { ComponentProps, forwardRef } from "react";

type Props = {
  placeholder: ComponentProps<"input">["placeholder"];
  name: ComponentProps<"input">["name"];
  onChange: ComponentProps<"input">["onChange"];
  onBlur: ComponentProps<"input">["onBlur"];
  type?: ComponentProps<"input">["type"];
};

const Input = forwardRef<HTMLInputElement, Props>(({ ...inputProps }, ref) => {
  return (
    <input
      ref={ref}
      {...inputProps}
      className="border py-1 px-4 rounded-md w-full h-[51px] text-lg mb-5"
    />
  );
});

export default Input;
