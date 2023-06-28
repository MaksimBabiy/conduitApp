import { useState } from "react";
import { Interface } from "readline";

export const useGetErrorForm = (stateInterface: object) => {
  const [formError, setFormError] = useState<typeof stateInterface>({
    title: "title is required",
    description: "description is required",
    body: "body is required",
    tagList: "tagList is required",
  });

  return {};
};
