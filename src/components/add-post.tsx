import axios from "axios";
import React from "react";

const AddPost = () => {
  function addPost() {
    try {
      const url = "/api/posts";
      axios.post(url, {}); // post is added by server
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <button onClick={addPost}>Add post</button>
    </div>
  );
};

export default AddPost;
