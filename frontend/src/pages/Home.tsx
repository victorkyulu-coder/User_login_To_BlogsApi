import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { User } from "../App";

interface Blog {
  id: number;
  title: string;
  body: string;
  authorId: number;
}

const Home: React.FC<{ user: User }> = ({ user }) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const loadBlogs = async () => {
    const res = await axios.get("http://localhost:5000/blogs");
    setBlogs(res.data);
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  return (
    <>
      <h2>All Blogs</h2>
      <Link to="/add" className="btn" style={{ marginBottom: 16 }}>
        ➕ Add Blog
      </Link>

      {blogs.map((b) => (
        <div key={b.id} className="blog-card">
          <h3>{b.title}</h3>
          <p>{b.body.slice(0, 100)}...</p>
          <Link to={`/blog/${b.id}`}>Read more</Link>
        </div>
      ))}
    </>
  );
};

export default Home;
