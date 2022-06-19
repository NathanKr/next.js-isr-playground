<h2>Motivation</h2>
experiment with next.js Incremental Static Generation

<h2>Implementation options</h2>
<ul>
<li>use periodic revalidate in getStaticProps</li>
<li>force re-validatation : call unstable_revalidate(). </li>
</ul>

<h2>revalidate - Posts component</h2>

```ts
export const getStaticProps: GetStaticProps = async (context) => {
  const url = "http://localhost:8001/posts";
  const res = await fetch(url);
  const posts: IPost[] = await res.json();

  return {
    props: { posts }, // will be passed to the page component as props
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
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


<h2>json server</h2>
invoke from root the following

```
json-server --watch .\public\data\db.json --port 8001
```