import express from "express";
import {
  addPost,
  deletePost,
  getPost,
  getPosts,
  getMyPosts,
  updatePost,
} from "../controller/posts.js";

const router = express.Router();

router.get("/", getPosts);
// router.get("/my/:id", getMyPosts);
router.get("/:id", getPost);
router.post("/", addPost);
router.delete("/:id", deletePost);
router.put("/:id", updatePost);
export default router;