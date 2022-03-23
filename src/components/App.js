import { getPosts } from "../api";
import { useState, useEffect } from "react";
import { loader } from "./Loader";
import {Home} from "../pages/Home";
function App() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts();
      console.log("response", response);
      if (response.success) {
        setPosts(response.data.posts);
      }
    };

    fetchPosts();
  }, []);
  return (
    <div className="App">
      <Home posts={posts}></Home>
    </div>
  );
}

export default App;
