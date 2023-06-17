import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "./routes";

type Props = {};

const App = (props: Props) => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {Object.values(routes).map((item, index: number) => (
          <Route key={index} path={item.path} element={<item.Element />} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
