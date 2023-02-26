import axios from "axios";
import { GetStaticProps } from "next";
import React from "react";
import AddPost from "../../src/components/add-post";
import { getPostsFromGoogleSheet } from "../../src/logic/google-spreadsheet-utils";
import { getOnDemandRevalidationUrl } from "../../src/logic/utils";
import { IPost } from "../../src/types/i-post";

  

export const getStaticProps: GetStaticProps = async () => {
  // --- this will show when it is invoked, it should run at the most every 10sec
  console.log(`next.js is running getStaticProps for Posts2 ... `);

  // const url = "http://localhost:8001/posts";
  // const res = await fetch(url);
  // const posts: IPost[] = await res.json();
  const posts: IPost[] = await getPostsFromGoogleSheet();  

  return {
    props: { posts }, // will be passed to the page component as props
    // --- not required because we use on demand ISR
    // revalidate: revalidateSec, // In seconds 
  };
};

const Posts2 = (props: { posts: IPost[] }) => {
  const elemsPosts = props.posts.map((it, i) => <p key={i}>{it.title}</p>);
  return (
    <div>
      <div style={{ color: "red" }}>
        <h2>
          This is just a POC : on production call /api/revalidate?secret=...
          ONLY from the server
        </h2>
        <p>
          process.env.REVALIDATE_SECRET_TOKEN is null on the client, may
          be because next.js does not want you to expose it on the client side
        </p>
      </div>
      <AddPost/>
      <button
        onClick={async () => {
          try {
            const url = getOnDemandRevalidationUrl();
            const res = axios.get(url);
            console.log(`status : ${(await res).status}`);
          } catch (error) {
            console.error(error);
          }
        }}
      >
        issue on demand re-validation.
      </button>
      <p>check server console.log for on demand re-validation result --&gt; re build the page</p>
      <h2>Posts titles . fetch using getStaticProps</h2>
      {elemsPosts}
    </div>
  );
};

export default Posts2;
