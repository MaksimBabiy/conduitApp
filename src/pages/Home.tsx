import { useEffect } from "react";
import Banner from "../components/Banner";
import Container from "../components/Container";
import Feed from "../components/Feed";
import { useAppDispatch } from "../store/store";
import { selectTag } from "../store/slices/feed.slice";
import { useAuthUser } from "../hooks/useAuthUser";

type Props = {};

const Home = (props: Props) => {
  const dispatch = useAppDispatch();
  const { isLogged } = useAuthUser();
  useEffect(() => {
    dispatch(selectTag("Global Feed"));
  }, []);

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
