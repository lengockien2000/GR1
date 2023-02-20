import express from "express";
import {
  deleteUser,
  getUser,
  updateUser,
} from "../controller/users.js";

const router = express.Router();

router.get("/:id", getUser);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);

export default router;