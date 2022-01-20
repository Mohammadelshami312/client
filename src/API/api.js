import axios from "axios";

export const updateComment = async (text) => {
  return { text };
};

export const deleteComment = async () => {
  return {};
};

//get categoris
export async function getCategories() {
  //get
  const response = axios.get("/api/categories");
  return response;
}
//login
export function login(data) {
  //in component
}

// logout
export async function logout() {
  //get
  //const response = axios.get("/api/logout").then((resp) => {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("auth_name");
  localStorage.removeItem("id");
  //});
  //return response;
}
