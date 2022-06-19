import { GetStaticProps } from "next";
import React from "react";

interface IPost {
  id: number;
  title: string;
  author: string;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const revalidateSec = 10
  // --- this will show when it is invoked, it should run at the most every 10sec
  console.log(`next.js is running getStaticProps ... , revalidate : ${revalidateSec} [sec]`);
  

  const url = "http://localhost:8001/posts";
  const res = await fetch(url);
  const posts: IPost[] = await res.json();

  return {
    props: { posts }, // will be passed to the page component as props
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: revalidateSec, // In seconds
  };
};

const Posts = (props: { posts: IPost[] }) => {
  const elemsPosts = props.posts.map((it, i) => <p key={i}>{it.title}</p>);
  return (
    <div>
      <h2>Posts titles . fetch using getStaticProps</h2>
      {elemsPosts}
    </div>
  );
};

export default Posts;
