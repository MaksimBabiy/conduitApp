import { useEffect } from "react";
import Banner from "../components/Banner";
import Container from "../components/Container";
import Feed from "../components/Feed";
import { useAppDispatch } from "../store/store";
import { selectTag } from "../store/slices/feed.slice";
import { useAuthUser } from "../hooks/useAuthUser";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {};

const Home = (props: Props) => {
  const { isLogged } = useAuthUser();
  const dispatch = useAppDispatch();

  useEffect(() => {
    window.onpopstate = () => {
      dispatch(selectTag("Global Feed"));
    };
  }, []);

  console.log("home render");
  return (
    <div className="pb-8">
      {!isLogged && <Banner />}
      <Container>
        <Feed />
      </Container>
    </div>
  );
};

export default Home;
