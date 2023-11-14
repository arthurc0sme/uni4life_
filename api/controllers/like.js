import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getLikes = (req,res) => {
        const q = "SELECT userId FROM likes WHERE postId = ?";

        db.query(q, [req.query.postId], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data.map(like=>like.userId))
            });
        }

export const addLikes = (req,res) => {
        const token = req.cookies.acessToken;
            if(!token) return res.status(401).json("Você não está logado!")
        
            jwt.verify(token, "secretkey", (err, userInfo) =>{
                if (err) return res.status(403).json("A token não é válida!")
               
                const q = "INSERT INTO likes (`userId`, `postId`) VALUES (?)";
                const values = [
                    userInfo.id,
                    req.body.postId
                ]
    
                db.query(q, [values], (err, data) => {
                    if (err) return res.status(500).json(err);
                    return res.status(200).json("Postagem curtida!")
                });
            })
        };


export const deleteLike = (req,res) => {
    const token = req.cookies.acessToken;
        if(!token) return res.status(401).json("Você não está logado!")
            
                jwt.verify(token, "secretkey", (err, userInfo) =>{
                    if (err) return res.status(403).json("A token não é válida!")
                   
                    const q = "DELETE FROM likes WHERE `userId` = ? AND `postId`= ?";
        
                    db.query(q, [userInfo.id, req.query.postId], (err, data) => {
                        if (err) return res.status(500).json(err);
                        return res.status(200).json("Postagem descurtida.")
                    });
                })
            };