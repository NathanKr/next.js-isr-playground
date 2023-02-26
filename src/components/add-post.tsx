import axios from "axios";
import React, { FC } from "react";
import { IOnDemand } from "../types/i-on-demand";

const AddPost : FC<IOnDemand> = ({onDemand}) => {
  function addPost() {
    try {
      const url = "/api/posts";
      axios.post(url, {onDemand}); // post is added by server
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
