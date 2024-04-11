export const constants = {
  CURRENT_TOKEN: "CURRENT_TOKEN",
};

const apiurl = "http://localhost:3000/users";

export const apiEndpoint = {
  AuthEndpoint: {
    login: `${apiurl}/login`,
    logout: `${apiurl}/logout`,
    register: `${apiurl}/register`,
    loggedUser: `${apiurl}/current`,
  },
};
