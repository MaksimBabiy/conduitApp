import React from "react";
import { Link, NavLink } from "react-router-dom";
import Container from "./Container";
import { useAppDispatch, useAppSelector } from "../store/store";
import { selectTag } from "../store/slices/feed.slice";
import { useAuthUser } from "../hooks/useAuthUser";
import { IoCreateOutline } from "react-icons/io5";
import { LuSettings } from "react-icons/lu";

type Props = {};

const Header: React.FC = (props: Props) => {
  const isActiveHandler = (isActive: boolean) => {
    return isActive
      ? `mr-2 cursor-pointer hover:text-black/60 text-black hover:no-underline`
      : `mr-2 cursor-pointer hover:text-black/60  hover:no-underline`;
  };
  const { isLogged, logOut } = useAuthUser();
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.auth.userData);
  return (
    <header className="w-full bg-white shadow-md">
      <Container>
        <nav
          className="h-auto flex justify-between items-center 
      "
        >
          <Link
            to={"/"}
            className="my-4 text-theme-green text-2xl cursor-pointer font-titillium"
            onClick={() => {
              dispatch(selectTag("Global Feed"));
            }}
          >
            conduit
          </Link>
          <ul className="flex font-medium text-gray-500">
            <li className="flex justify-center items-center">
              <NavLink
                to="/"
                onClick={() => {
                  dispatch(selectTag("Global Feed"));
                }}
                className={({ isActive }) => isActiveHandler(isActive)}
              >
                Home
              </NavLink>{" "}
            </li>
            {!isLogged ? (
              <>
                {" "}
                <li>
                  <NavLink
                    to="/sign-in"
                    className={({ isActive }) => isActiveHandler(isActive)}
                  >
                    Sign in
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/sign-up"
                    className={({ isActive }) => isActiveHandler(isActive)}
                  >
                    Sign up
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="flex justify-center items-center">
                  <NavLink
                    to="/editor"
                    className={({ isActive }) => isActiveHandler(isActive)}
                  >
                    <p className="flex justify-center items-center">
                      {" "}
                      <IoCreateOutline /> New Article
                    </p>
                  </NavLink>
                </li>
                <li className="flex justify-center items-center">
                  <NavLink
                    to="/settings"
                    className={({ isActive }) => isActiveHandler(isActive)}
                  >
                    <p className="flex justify-center items-center">
                      {" "}
                      <LuSettings /> Settings
                    </p>
                  </NavLink>
                </li>
                <li className="flex justify-center items-center">
                  <NavLink
                    to={`/@${userData?.username}/`}
                    onClick={() => dispatch(selectTag("My Articles"))}
                    className={({ isActive }) => isActiveHandler(isActive)}
                  >
                    <div className="flex justify-center items-center">
                      {" "}
                      <p className="mr-1"> {userData?.username}</p>
                      <img
                        className="w-[30px] h-[30px] mr-1 rounded-full "
                        src={userData?.image}
                        alt=""
                      />
                    </div>
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
