import axios from "axios";
import * as React from "react";
import Layout from "./Layout";

const App = () => {
  const [posts, setPosts] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get("https://api.dailysmarty.com/posts")
      .then((response) => {
        console.log("Res", response.data);
        setPosts(response.data.posts);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        alert("Something went wrong");
      });
  };

  const list = isLoading ? (
    <div>Loading...</div>
  ) : (
    posts.map((post) => (
      <div key={post.id} className="post-container">
        <a href={post.url_for_post} target="_blank" className="title">
          {post.title}
        </a>

        <div className="topics">
          {post.associated_topics?.length > 0 &&
            post.associated_topics.map((topic: string) => (
              <div key={topic} className="label">
                {topic}
              </div>
            ))}
        </div>

        <div>{post.content && post.content.replace(/(<([^>]+)>)/gi, "")}</div>
      </div>
    ))
  );
  return <Layout>{list}</Layout>;
};

export default App;
