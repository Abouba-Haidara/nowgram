import React, { useState, useEffect } from "react";
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";
import { db } from "./firebase";
import firebase from "firebase";

function Post({ postId, user, username, caption, imageUrl }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("commments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }

    return () => {
      unsubscribe();
    };
  }, [postId]);

  const postComment = event => {
    event.preventDefault();

    db.collection("posts").doc(postId).collection("commments").add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    setComment("");
  };

  return (
    <div className="post">
      <div className="post__header">
        <Avatar className="post__avatar" alt="YeminiCoder" src="" />
        <h3>{username}</h3>
      </div>
      <img className="post__image" src={imageUrl} alt="" />
      <h4 className="post_text">
        <strong>{username}</strong> {caption}
      </h4>

      <div className="app_comments">
        {comments.map((comment, index)=> (
          <p key={index}>
            <strong>{comment.username}</strong> {comment.text}
          </p>
        ))}
      </div>
      {user && (
             <form className="app__commentBox">
                <input
                  className="post__text"
                  type="text"
                  value={comment}
                  placeholder="Commenter ce post...."
                  onChange={e => setComment(e.target.value)}
                />
                <button
                  disabled={!comment}
                  onClick={postComment}
                  type="submit"
                  className="app__btn"
                >
                  Envoyer
                </button>
              </form>
      )}
    </div>
  );
}

export default Post;
