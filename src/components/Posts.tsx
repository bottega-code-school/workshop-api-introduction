import * as React from "react";
import api from "./api";

const Posts = () => {
  const [posts, setPosts] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    getData();
  }, []);

  const handleApiResponse = (response: any) => {
    console.log("Res", response.data);
    setPosts(response.data.posts);
    setIsLoading(false);
  };

  const handleError = (error: any) => {
    setIsLoading(false);
    alert("Something went wrong");
  };

  const getData = () =>
    api.get("posts").then(handleApiResponse).catch(handleError);

  const content = isLoading ? (
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

  return <div>{content}</div>;
};

export default Posts;
