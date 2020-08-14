import React, { useState, useEffect } from "react";
import "./App.css";
import Post from "./Post";
import { db } from "./firebase";
function App() {
  const [posts, setPosts] = useState([]);

  // useEffect -> run a piece of code base on a specific condition

  useEffect(() => {
    db.collection("posts").onSnapshot(snapshop => {
      setPosts(
        snapshop.docs.map(doc => ({
          id: doc.id,
          post: doc.data()
        }))
      );
    });
  }, []);

  return (
    <div className="app">
      {/** Header */}
      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
        />
      </div>
      <h1>welcome instragram clone nowgram</h1>

      {posts.map(id, post => (
        <Post
          key={id}
          username={post.username}
          caption={post.caption}
          imageUrl={post.imageUrl}
        />
      ))}
    </div>
  );
}

export default App;
