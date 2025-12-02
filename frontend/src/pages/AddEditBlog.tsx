import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { User } from "../App";
import { toast } from "react-toastify";

const AddEditBlog: React.FC<{ user: User }> = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    body: ""
  });

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/blogs/${id}`).then((res) => {
        setForm(res.data);
      });
    }
  }, [id]);

  const handleChange = (e: any) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!form.title || !form.body) {
      toast.error("Fill all fields");
      return;
    }

    const blogData = {
      ...form,
      authorId: user.id
    };

    if (id) {
      await axios.put(`http://localhost:5000/blogs/${id}`, blogData);
      toast.success("Blog updated");
    } else {
      await axios.post("http://localhost:5000/blogs", blogData);
      toast.success("Blog added");
    }

    navigate("/");
  };

  return (
    <div>
      <h2>{id ? "Edit Blog" : "Add Blog"}</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="input"
        />
        <textarea
          name="body"
          placeholder="Body"
          value={form.body}
          onChange={handleChange}
          className="input"
        />

        <button className="btn" type="submit">
          {id ? "Update" : "Add"} Blog
        </button>
      </form>
    </div>
  );
};

export default AddEditBlog;
