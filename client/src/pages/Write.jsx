import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

const Write = () => {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.desc || "");
  const [title, setTitle] = useState(state?.title || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");

  const [selectedImage, setSelectedImage] = useState();

  const navigate = useNavigate()

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();

    try {
      state
        ? await axios.put(`/posts/${state.id}`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "",
          })
        : await axios.post(`/posts/`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "",
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          });
          navigate("/")
    } catch (err) {
      console.log(err);
    }
  };

  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };
  const removeSelectedImage = () => {
    setSelectedImage();
  };
  const onChanger = (e) => {
    imageChange(e);
    setFile(e.target.files[0]);
  };

  return (
    <div className="add">
      <div className="content">
        <div className="title">
          <b>Title:</b>
          <input
            type="text"
            placeholder="Choose your title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="desc">
          <b>Description:</b>
          <div className="editorContainer">
            <ReactQuill
              className="editor"
              theme="snow"
              value={value}
              onChange={setValue}
            />
          </div>
        </div>
      </div>

      <div className="menu">
        <div className="item item2">
          <h1>Category:</h1>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "art"}
              name="cat"
              value="art"
              id="art"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="art">Art</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "science"}
              name="cat"
              value="science"
              id="science"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="science">Science</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "technology"}
              name="cat"
              value="technology"
              id="technology"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="technology">Technology</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "cinema"}
              name="cat"
              value="cinema"
              id="cinema"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="cinema">Cinema</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "design"}
              name="cat"
              value="design"
              id="design"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="design">Design</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "food"}
              name="cat"
              value="food"
              id="food"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="food">Food</label>
          </div>
        </div>
        <div className="item item1">
          <h1>Publish</h1>
          <div className="stat">
            <div>
              <b>Status: </b> Draft
            </div>
            <div>
              <b>Visibility: </b> Public
            </div>
          </div>
          <div>

          </div>
          <div className="upImg">
            <input
              style={{ display: "none" }}
              type="file"
              id="file"
              name=""
              // onChange={(e) => setFile(e.target.files[0])}
              onChange={(e) => onChanger(e)}
            />
            <label className="file" htmlFor="file">
              Update Image
            </label>
          </div>
          <div className="buttons">
            {/* <button>Save as a draft</button> */}
            {/* {selectedImage && <button onClick={removeSelectedImage}>
              Stop preview
            </button>} */}
            <button onClick={handleClick}>Publish</button>
          </div>
        </div>
        {selectedImage && (
          <div className="preview">
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Thumb"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Write;