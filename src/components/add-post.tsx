import axios from "axios";
import React, { FC } from "react";
import { IOnDemand } from "../types/i-on-demand";

const AddPost: FC<IOnDemand> = ({ onDemand }) => {
  async function addPost() {
    try {
      const url = "/api/posts";
      await axios.post(url); // post is added by server
      if (onDemand) {
        await axios.get("/api/revalidate");
      }
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
