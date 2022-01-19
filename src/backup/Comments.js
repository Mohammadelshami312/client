import { useState, useEffect } from "react";
import axios from "axios";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import {
  getComments as getCommentsApi,
  createComment as createCommentApi,
  updateComment as updateCommentApi,
  deleteComment as deleteCommentApi,
} from "./api";

const TopicsNav = () => {
  
  return <div>topics nav</div>;
};
const Comments = ({ commentsUrl, currentUserId }) => {
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
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
  const addComment = (text, parentId) => {
    /*
    createCommentApi(text, parentId).then((comment) => {
      setBackendComments([comment, ...backendComments]);
      setActiveComment(null);
    });
    */

    const data = {
      body: text,
      userId: localStorage.getItem("id"),
      parentId: parentId === undefined ? null : parentId,
      createdAt: new Date().toISOString(),
    };
    axios.post("/api/comment", data).then((resp) => {
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
    axios.put(`/api/comment/${commentId}`, data).then((resp) => {
      if (resp.status === 200) {
        const updatedBackendComments = backendComments.map((backendComment) => {
          if (backendComment.id === commentId) {
            return { ...backendComment, body };
          }
          return backendComment;
        });
        setBackendComments(updatedBackendComments);
        setActiveComment(null);
      }
    });
  };
  const deleteComment = (commentId) => {
    if (window.confirm("Are you sure you want to remove comment?")) {
      axios.delete(`/api/comment/${commentId}`).then((resp) => {
        if (resp.status === 200) {
          const updatedBackendComments = backendComments.filter(
            (backendComment) => backendComment.id !== commentId
          );
          setBackendComments(updatedBackendComments);
        }
      });
    }
  };

  useEffect(() => {
    axios.get("api/comments").then((resp) => setBackendComments(resp.data));

    // getCommentsApi().then((data) => {
    //   setBackendComments(data);
    // });

    //get data after each 5 seconds
    // const interval = setInterval(() => {
    //   axios.get("api/comments").then((resp) => setBackendComments(resp.data));
    // }, 5000);
    // return () => clearInterval(interval);
  }, []);

  return (
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
  );
};

export default Comments;
