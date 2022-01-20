import { useState, useEffect } from "react";
import { Nav } from "react-bootstrap";
import axios from "axios";
import { CSSTransition } from "react-transition-group";
import CommentForm from "./components/CommentForm";
import Comment from "./components/Comment";
import {
  getComments as getCommentsApi,
  createComment as createCommentApi,
  updateComment as updateCommentApi,
  deleteComment as deleteCommentApi,
  getCategories as getCategoriesApi,
} from "../../API/api";

import SpinnerLoading from "../../Common/SpinnerLoading";

const TopicsNav = ({ setCategoryId }) => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    //get categoris
    getCategoriesApi().then((resp) => {
      setCategories(resp.data);
    });
  }, []);

  const setId = (id) => {
    setCategoryId(id);
  };

  return (
    <Nav className="mt-3" justify variant="tabs" defaultActiveKey="/home">
      {categories.map((item, index) => (
        <Nav.Item onClick={() => setId(item.id)}>
          <Nav.Link eventKey={index === 0 ? "/home" : `${item.id}`}>
            {item.name}
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  );
};
const Comments = ({ commentsUrl, currentUserId }) => {
  // category id
  const [categoryId, setCategoryId] = useState(1);
  // for laoading spinner
  const [loading, setLoading] = useState(true);
  const [backendComments, setBackendComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  const rootComments = backendComments.filter(
    (backendComment) => backendComment.parentId === null
  );
  const getReplies = (commentId) =>
    backendComments
      .filter((backendComment) => backendComment.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

  useEffect(() => {
    axios
      .get(`api/comments/${categoryId}`)
      .then((resp) => {
        setBackendComments(resp.data);
        setLoading(false);
      })
      .catch((err) => setLoading(false));

    // getCommentsApi().then((data) => {
    //   setBackendComments(data);
    // });

    //get data after each 5 seconds
    const interval = setInterval(() => {
      axios
        .get(`api/comments/${categoryId}`)
        .then((resp) => setBackendComments(resp.data));
    }, 5000);
    return () => clearInterval(interval);
  }, [categoryId]);

  // useEffect used when we change the category index
  useEffect(() => {
    axios
      .get(`api/comments/${categoryId}`)
      .then((resp) => {
        setBackendComments(resp.data);
        setLoading(false);
      })
      .catch((err) => setLoading(false));
  }, [categoryId]);

  // add comment to database
  const addComment = (text, parentId) => {
    const data = {
      body: text,
      userId: localStorage.getItem("id"),
      parentId: parentId === undefined ? null : parentId,
      createdAt: new Date().toISOString(),
    };

    //send data
    axios
      .post(`/api/comment/${categoryId}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      })
      .then((resp) => {
        if (resp.status == 200) {
          setBackendComments([
            { ...data, id: resp.data.commentId },
            ...backendComments,
          ]);
          setActiveComment(null);
        }
      });
  };

  const updateComment = (body, commentId) => {
    const data = {
      body,
    };
    //update comment request
    axios
      .put(`/api/comment/${commentId}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      })
      .then((resp) => {
        if (resp.status === 200) {
          const updatedBackendComments = backendComments.map(
            (backendComment) => {
              if (backendComment.id === commentId) {
                return { ...backendComment, body };
              }
              return backendComment;
            }
          );
          setBackendComments(updatedBackendComments);
          setActiveComment(null);
        }
      });
  };
  const deleteComment = (commentId) => {
    if (window.confirm("Are you sure you want to remove comment?")) {
      axios
        .delete(`/api/comment/${commentId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        })
        .then((resp) => {
          if (resp.status === 200) {
            const updatedBackendComments = backendComments.filter(
              (backendComment) => backendComment.id !== commentId
            );
            setBackendComments(updatedBackendComments);
          }
        });
    }
  };

  return (
    <>
      <TopicsNav setCategoryId={setCategoryId} />
      {loading ? (
        <SpinnerLoading />
      ) : (
        <CSSTransition transitionName="example" timeout={800} in={600}>
          <div className="comments col-md-8 col-lg-12 col-xl-9 mx-auto">
            <h3 className="comments-title">Comments</h3>
            <div className="comment-form-title">Write comment</div>
            <CommentForm submitLabel="Write" handleSubmit={addComment} />
            <div className="comments-container">
              {rootComments.map((rootComment) => (
                <Comment
                  key={rootComment.id}
                  comment={rootComment}
                  replies={getReplies(rootComment.id)}
                  activeComment={activeComment}
                  setActiveComment={setActiveComment}
                  addComment={addComment}
                  deleteComment={deleteComment}
                  updateComment={updateComment}
                  currentUserId={currentUserId}
                />
              ))}
            </div>
          </div>
        </CSSTransition>
      )}
    </>
  );
};

export default Comments;
