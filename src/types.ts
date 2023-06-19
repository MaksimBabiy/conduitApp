export interface GetGlobalFeedResponce {
  articles: ArticleType[];
  articlesCount: number;
}
export interface GetArticleResponce {
  article: ArticleType;
}

export interface ArticleType {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  id: number;
  author: Author;
}

export interface Author {
  username: string;
  bio: any;
  image: string;
  following: boolean;
}

export interface GlobalFeedParams {
  page: number;
  tag: string;
  author: string;
  isPersonal: boolean;
  token?: string;
}
export interface MyArticlesParams {
  page: number;
  isFavorited: boolean;
  author: string;
}
export interface GetGlobalTags {
  tags: string[];
}

export interface ProfileParams {
  username: string;
}

export interface GetGlobalProfile {
  profile: GetProfile;
}

export interface GetProfile {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}
export interface GetCommentResponce {
  comments: Comment[];
}

export interface Comment {
  id: number;
  createdAt: string;
  updatedAt: string;
  body: string;
  author: Author;
}

export interface SignUpResponce {
  user: User;
}
export interface SignUpResponceOut {
  user: RegisterUserParams;
}

export interface User {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
}
export interface RegisterUserParams {
  username: string;
  email: string;
  password: string;
}
export interface LoginUserParams {
  email: string;
  password: string;
}
