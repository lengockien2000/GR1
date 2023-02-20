import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import moment from "moment";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const cat = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }
  return (
    <div className="home">
      <div className="posts">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            {post.img !== "" && 
              <div className="img">
                <img src={`../upload/${post.img}`} alt="" />
              </div>
            }
            <div className="content">
              {currentUser ? (
                <>
                  <Link className="link" to={`/post/${post.id}`}>
                    <h1>{post.title}</h1>
                  </Link>
                  <span>Posted {moment(post.date).fromNow()} </span>
                  <p className="desc">{getText(post.desc)}</p>
                  <a href={`/post/${post.id}`}>
                    <button>Read More</button> 
                  </a>
                </>
              ) : (
                <>
                  <div className="link" to={`/post/${post.id}`}>
                    <h1>{post.title}</h1>
                  </div>
                  <p className="desc">{getText(post.desc)}</p>
                  <a href={`/login`} className="note">Please login to view full blog!!!</a>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;