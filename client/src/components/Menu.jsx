import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Menu = ({cat}) => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const cat2 = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/?cat=${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  useEffect(() => {
    const fetchData2 = async () => {
      try {
        const res2 = await axios.get(`/posts${cat2}`)
        setAllPosts(res2.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData2();
  }, [cat2]);

  // function CatContent() {
  //   return (
  //     <>
  //       <h1>Other posts you may like</h1>
  //       {posts.slice(0, 3).map((post) => (
  //         <div className="post" key={post.id}>
  //           <img src={`../upload/${post?.img}`} alt="" />
  //           <h2>{post.title}</h2>
  //           <a href={`/post/${post.id}`}>
  //             <button>Read More</button> 
  //           </a>
  //         </div>
  //       ))}
  //     </>
  //   );
  // }
  // function AllContent() {
  //   return (
  //     <>
  //       <h1>Some other content</h1>
  //       {allPosts.slice(0, 3).map((post) => (
  //       <div className="post" key={post.id}>
  //         <img src={`../upload/${post?.img}`} alt="" />
  //         <h2>{post.title}</h2>
  //         <a href={`/post/${post.id}`}>
  //           <button>Read More</button> 
  //         </a>
  //       </div>
  //     ))}
  //     </>
  //   );
  // }
  // function Goal() {
  //   if (posts > 2) {
  //     return <AllContent/>;
  //   } else {
  //     return <CatContent/>;
  //   }
  // }
  return (
    <div className="menu">
      {/* <Goal /> */}
      <h1>Other posts you may like</h1>
      {posts.slice(0, 3).map((post) => (
        <div className="post" key={post.id}>
          {post.img == 0 || <img src={`../upload/${post?.img}`} alt="" />}
          <h2>{post.title}</h2>
          <a href={`/post/${post.id}`}>
            <button>Read More</button> 
          </a>
        </div>
      ))}
      <h1>Some other content</h1>
      {allPosts.slice(0, 3).map((post) => (
        <div className="post" key={post.id}>
          {post.img == 0 || <img src={`../upload/${post?.img}`} alt="" />}
          <h2>{post.title}</h2>
          <a href={`/post/${post.id}`}>
            <button>Read More</button> 
          </a>
        </div>
      ))}
    </div>
  );
};

export default Menu;