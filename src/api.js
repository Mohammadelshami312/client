import axios from "axios";
import Swal from "sweetalert2";

export const getComments = async () => {
  // var comments;
  // axios
  //   .get("http://localhost:8000/api/comments")
  //   .then((resp) => (comments = resp.data));
  // return comments;

  return [
    {
      id: "1",
      body: "First comment",
      userName: "Jack",
      userId: "1",
      parentId: null,
      createdAt: "2021-08-16T23:00:33.010+02:00",
    },
    {
      id: "2",
      body: "Second comment",
      userName: "John",
      userId: "2",
      parentId: null,
      createdAt: "2021-08-16T23:00:33.010+02:00",
    },
    {
      id: "3",
      body: "First comment first child",
      userName: "Sender3",
      userId: "2",
      parentId: "1",
      createdAt: "2021-08-16T23:00:33.010+02:00",
    },
    {
      id: "4",
      body: "Second comment second child",
      userName: "Sender4",
      userId: "5",
      parentId: null,
      createdAt: "2021-08-16T23:00:33.010+02:00",
    },
  ];
};

export const createComment = async (text, parentId = null) => {
  return {
    id: Math.random().toString(36).substr(2, 9),
    body: text,
    parentId,
    userId: "1",
    userName: "John",
    createdAt: new Date().toISOString(),
  };
};

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
