import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getUser = (req, res) => {
    const q = "SELECT `id`, `username`, `email`, `img` FROM users";

    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(data[0]);
    });
};

export const deleteUser = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        // const userId = req.params.id;
        const q = "DELETE FROM users WHERE `id` = ?";

        db.query(q, [userInfo], (err, data) => {
            if (err) return res.status(403).json("You can delete only your own account!");
            return res.json("User has been deleted!");
        });
    });
};

export const updateUser = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        // const userId = req.params.id;
        const q = "UPDATE users SET `username`=?,`email`=?,`img`=? WHERE `id` = ? AND `uid` = ?";
        const values = [req.body.username, req.body.email, req.body.img];

        db.query(q, [...values,  userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.json("User has been updated.");
        });
    });
};

