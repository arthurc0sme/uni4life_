import {db} from "../connect.js"
import jwt from "jsonwebtoken";
import moment from "moment";

export const getPosts = (req,res) => {
    const token = req.cookies.acessToken;
    if(!token) return res.status(401).json("Você não está logado!")

    jwt.verify(token, "secretkey", (err, userInfo) =>{
        if (err) return res.status(403).json("A token não é válida!")
        const q = `SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId)
        LEFT JOIN relationships AS r ON (p.userId = r.followedUserId) WHERE r.followerUserId = ? OR p.userId =?
        ORDER BY p.createdAt DESC
        `;

        db.query(q, [userInfo.id, userInfo.id], (err, data) => {
            if (err) {
            console.error("Erro na consulta ao banco de dados:", err);
            return res.status(500).json({ error: "Erro interno do servidor" });
            }
            return res.status(200).json(data);
        });
    })
};

export const addPost = (req,res) => {
    const token = req.cookies.acessToken;
    if(!token) return res.status(401).json("Você não está logado!")

    jwt.verify(token, "secretkey", (err, userInfo) =>{
        if (err) return res.status(403).json("A token não é válida!")
        const q = "INSERT INTO posts (`desc`, `img`,`createdAt`,`userId`) VALUES (?)";
        
        const values = [
            req.body.desc,
            req.body.img,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            userInfo.id
        ]

        

        db.query(q, [values], (err, data) => {
            if (err) {
            console.error("Erro na consulta ao banco de dados:", err);
            return res.status(500).json({ error: "Erro interno do servidor" });
            }
            return res.status(200).json("Postagem publicada!");
        });
    })
};