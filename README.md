<h2>Motivation</h2>
experiment with next.js Incremental Static Generation

<h2>Implementation options</h2>
<ul>
<li>use periodic revalidate (rebuild) in getStaticProps</li>
<li>force re-validatation : call req.revalidate(). </li>
</ul>

<h2>periodic revalidate (rebuild) - Posts1 page</h2>

```ts
export const getStaticProps: GetStaticProps = async () => {
  const posts: IPost[] = await getPostsFromGoogleSheet();

  return {
    props: { posts }, // will be passed to the page component as props
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  };
};
```

<h2>on demand revalidate (rebuild) - Posts2 page</h2>
call /api/revalidate from the client

```ts
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("server handle on demand revalidation");

  // Check for secret to confirm this is a valid request

  // --- todo nath not working !!!! check and bring back
  // if (req.query.secret !== process.env.REVALIDATE_SECRET_TOKEN) {
  //   return res.status(401).json({ message: "Invalid token" });
  // }

  try {
    // this should be the actual path not a rewritten path
    // e.g. for "/blog/[slug]" this should be "/blog/post-1"
    const urlPathToRevalidate = "/posts-ondemand-validation";
    await res.revalidate(urlPathToRevalidate);
    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send("Error revalidating");
  }
}
```

Posts2 page

```ts
export const getStaticProps: GetStaticProps = async () => {
  // --- this will show when it is invoked, it should run at the most every 10sec
  console.log(`next.js is running getStaticProps ... `);

  const url = "http://localhost:8001/posts";
  const res = await fetch(url);
  const posts: IPost[] = await res.json();

  return {
    props: { posts }, // will be passed to the page component as props
    // --- not required because we use on demand ISR
    // revalidate: revalidateSec, // In seconds
  };
};
```

<h2>Caution : development vs production</h2>
getStaticProps will run on development for every request

```
npm run dev
```

To get the correct behavior of getStaticProps you need to run it on production mode :

```
npm run build
npm run start
```


<h2>Open issues</h2>
<ul>
<li>i tried to call revalidate from the server. it worked on development but not on production. so i am calling it from the client but then using REVALIDATE_SECRET_TOKEN is problematic</li>
</ul>
