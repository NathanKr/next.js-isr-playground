import { GetStaticProps } from "next";
import React from "react";
import AddPost from "../../src/components/add-post";
import { getPostsFromGoogleSheet } from "../../src/logic/google-spreadsheet-utils";

interface IPost {
  id: number;
  title: string;
  author: string;
}

export const getStaticProps: GetStaticProps = async () => {
  const revalidateSec = 10;
  // --- this will show when it is invoked, it should run at the most every 10sec
  console.log(
    `next.js is running getStaticProps for Posts1... , revalidate : ${revalidateSec} [sec]`
  );

  // const url = "http://localhost:8001/posts";
  // const res = await fetch(url);
  // const posts: IPost[] = await res.json();
  const posts: IPost[] = await getPostsFromGoogleSheet();

  return {
    props: { posts }, // will be passed to the page component as props
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: revalidateSec, // In seconds
  };
};

const Posts1 = (props: { posts: IPost[] }) => {
  const elemsPosts = props.posts.map((it, i) => <p key={i}>{it.title}</p>);
  return (
    <div>
      <AddPost />
      <h2>Posts titles . fetch using getStaticProps</h2>
      {elemsPosts}
    </div>
  );
};

export default Posts1;
