import { useSearchParams } from "react-router-dom";
import { seroalizeSearchParams } from "../components/utils/router";

const usePageParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 0;

  const setPage = (page: number) => {
    setSearchParams(seroalizeSearchParams({ page: String(page) }));
  };
  return { page, setPage };
};
