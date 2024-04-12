import { environment } from "src/environments/environment";

export const constants = {
  CURRENT_TOKEN: "CURRENT_TOKEN",
};

const URL = environment.API_KEY;

export const apiEndpoint = {
  AuthEndpoint: {
    login: `${URL}/users/login`,
    logout: `${URL}/users/logout`,
    register: `${URL}/users/register`,
    loggedUser: `${URL}/users/current`,
  },
  TodoEndpoint: {
    getAll: `${URL}/tasks`,
    create: `${URL}/tasks`,
    update: `${URL}/tasks`,
    delete: `${URL}/tasks`,
  },
};
