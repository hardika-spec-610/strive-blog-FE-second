import React, { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import BlogList from "../../components/blog/blog-list/BlogList";
import "./styles.css";
import { useNavigate, useSearchParams } from "react-router-dom";

const Home = (props) => {
  const [blogs, setBlogs] = useState([]);
  const [query, setQuery] = useState("");
  const token = localStorage.getItem("accessToken");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  // console.log("token", token);
  const apiUrl = process.env.REACT_APP_BE_URL;

  const getBlogs = async () => {
    try {
      // const response = await fetch(
      //   `${process.env.REACT_APP_BE_URL}/blogPosts/`
      // );
      const response = await fetch(`${apiUrl}/blogPosts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log("data", data);
        setBlogs(data.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBlogs();
    if (!localStorage.getItem("accessToken")) navigate("/login");
    if (searchParams.get("accessToken")) {
      localStorage.setItem("accessToken", searchParams.get("accessToken"));

      // navigate(`${apiUrl}/blogPosts`);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);
  const handleChange = (e) => {
    setQuery(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (e > 2) {
    //   filteredData = blogs.filter((item) =>
    //     item.title.toLowerCase().includes(query.toLowerCase())
    //   );
    // }
  };
  return (
    <Container fluid="sm">
      <h1 className="blog-main-title">Welcome to the Epicode Blog!</h1>
      <Form.Group className="mb-5">
        <Form onSubmit={handleSubmit}>
          <Form.Control
            type="search for book title"
            value={query}
            onChange={handleChange}
            placeholder="type and press Enter"
          />
        </Form>
      </Form.Group>
      {/* {filteredData.map((currentBook) => {
        return <BlogList key={currentBook._id} blogs={blogs} />;
      })} */}

      <BlogList blogs={blogs} />
    </Container>
  );
};

export default Home;
