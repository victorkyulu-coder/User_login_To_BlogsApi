import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import { User } from "../App";
import { toast } from "react-toastify";

interface Blog {
  id: number;
  title: string;
  body: string;
  authorId: number;
}

const Blog: React.FC<{ user: User }> = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<Blog | null>(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/blogs/${id}`).then((res) => {
      setBlog(res.data);
    });
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Delete this post?")) return;

    await axios.delete(`http://localhost:5000/blogs/${id}`);
    toast.success("Blog deleted");
    navigate("/");
  };

  if (!blog) return <h3>Loading...</h3>;

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>{blog.body}</p>

      {blog.authorId === user.id && (
        <>
          <Link to={`/edit/${blog.id}`} className="btn">
            ✏ Edit
          </Link>
          <button className="btn" style={{ marginLeft: 12 }} onClick={handleDelete}>
            🗑 Delete
          </button>
        </>
      )}
    </div>
  );
};

export default Blog;
