import ArticlePage from "./pages/ArticlePage";
import Home from "./pages/Home";
import NewArticlePage from "./pages/NewArticlePage";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import UpdateArticlePage from "./pages/UpdateArticlePage";

type Routes = Record<string, { path: string; Element: React.FC<any> }>;

export const routes: Routes = {
  home: {
    path: "/",
    Element: Home,
  },
  home2: {
    path: "/personalFeed",
    Element: Home,
  },
  signIn: {
    path: "/sign-in",
    Element: SignIn,
  },
  signUp: {
    path: "/sign-up",
    Element: SignUp,
  },
  profile: {
    path: "/:author",
    Element: Profile,
  },
  profileAnotherPath: {
    path: "/:author/favorited",
    Element: Profile,
  },
  articlePage: {
    path: "/articles/:id",
    Element: ArticlePage,
  },
  settings: {
    path: "/settings",
    Element: Settings,
  },
  newArticle: {
    path: "/editor",
    Element: NewArticlePage,
  },
  updateArticle: {
    path: "/editor/:slug",
    Element: UpdateArticlePage,
  },
};
