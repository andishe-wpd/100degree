export type RandomUserApi = {
  results: Array<{
    login: { uuid: string };
    name: { first: string; last: string };
    email: string;
    picture: { thumbnail: string };
  }>;
};
