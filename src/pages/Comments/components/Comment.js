import CommentForm from "./CommentForm";
import { useState } from "react";
const Comment = ({
  comment,
  replies,
  setActiveComment,
  activeComment,
  updateComment,
  deleteComment,
  addComment,
  parentId = null,
  currentUserId,
}) => {
  const isEditing =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "editing";
  const isReplying =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "replying";
  // const fiveMinutes = 100000;
  // const timePassed = false; //new Date() - new Date(comment.createdAt) > fiveMinutes;

  const [viewComments, setViewComments] = useState(false);
  const canDelete = currentUserId == comment.userId; //&& replies.length === 0;
  const canReply = Boolean(currentUserId);
  const canEdit = currentUserId == comment.userId;
  const replyId = parentId ? parentId : comment.id;
  const createdAt = new Date(comment.createdAt).toLocaleDateString();
  return (
    <div key={comment.id} className="comment mb-3">
      <div className="comment-image-container">
        {/* <img
          src="https://www.w3schools.com/howto/img_avatar.png"
          className="avatar"
          width="50"
          height="50"
        /> */}
        <div className="author-first-name">
          {comment.userName && comment.userName.charAt(0)}
        </div>
      </div>
      <div className="comment-right-part">
        <div className="comment-content">
          <div className="comment-author">{comment.userName}</div>
          <div>{createdAt}</div>
        </div>
        {!isEditing && <div className="comment-text">{comment.body}</div>}
        {isEditing && (
          <CommentForm
            submitLabel="Update"
            hasCancelButton
            initialText={comment.body}
            handleSubmit={(text) => updateComment(text, comment.id)}
            handleCancel={() => {
              setActiveComment(null);
            }}
          />
        )}
        <div className="comment-actions">
          {canReply && (
            <div
              className="comment-action"
              onClick={() =>
                setActiveComment({ id: comment.id, type: "replying" })
              }
            >
              Reply
            </div>
          )}
          {canEdit && (
            <div
              className="comment-action"
              onClick={() =>
                setActiveComment({ id: comment.id, type: "editing" })
              }
            >
              Edit
            </div>
          )}
          {canDelete && (
            <div
              className="comment-action"
              onClick={() => deleteComment(comment.id)}
            >
              Delete
            </div>
          )}
        </div>
        {isReplying && (
          <CommentForm
            submitLabel="Reply"
            handleSubmit={(text) => {
              addComment(text, replyId);
              setViewComments(true);
            }}
          />
        )}
        {viewComments && replies.length > 0 && (
          <div className="replies">
            {replies.map((reply) => (
              <Comment
                comment={reply}
                key={reply.id}
                setActiveComment={setActiveComment}
                activeComment={activeComment}
                updateComment={updateComment}
                deleteComment={deleteComment}
                addComment={addComment}
                parentId={comment.id}
                replies={[]}
                currentUserId={currentUserId}
              />
            ))}
          </div>
        )}
        {!viewComments > 0 && replies.length > 0 && (
          <div onClick={() => setViewComments(true)}>view comments</div>
        )}
      </div>
    </div>
  );
};

export default Comment;
