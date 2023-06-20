import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../store/store";

export const useGetUrlProfile = () => {
  const { pathname } = useLocation();
  const [trimmedStr, setTrimmedStr] = useState("");
  const user = useAppSelector((state) => state.auth.userData);
  const isMyProfile = user?.username === trimmedStr;
  useEffect(() => {
    let startIndex = pathname.indexOf("/@");
    let endIndex = pathname.indexOf("/", startIndex + 2);
    if (startIndex !== -1 && endIndex !== -1) {
      setTrimmedStr(pathname.substring(startIndex + 2, endIndex));
    }
  }, [pathname]);

  return { trimmedStr, pathname, isMyProfile };
};
