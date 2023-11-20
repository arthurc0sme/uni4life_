import {db} from "../connect.js"
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const getUser = (req,res) => {
    const userId = req.params.userId;
    const q = "SELECT * FROM users WHERE id=?"

    db.query(q, [userId], (err,data) => {
        if(err) return res.status(500).json(err)
        const {password, ...info} = data[0];
        return res.json(info);

})
}

export const updateuser = (req, res) => {
   
    const userId = parseInt(req.body.userId);

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const q = "UPDATE users SET `name` = ?, `password` =?,`coverPic` = ?, `profilePic` = ? WHERE id=? "

    console.log("Dados recebidos no backend:", req.body);
    db.query(q,
            [
            req.body.name,
            hashedPassword,
            req.body.coverPic || userId.coverPic, // Usar a URL existente se coverPic for undefined
            req.body.profilePic || userId.profilePic, // Usar a URL existente se profilePic for undefined
            userId
        ],
        (err,data) => {
            console.log("Erro:", err);
            if (err) res.status(500).json(err);
            if (data.affectedRows > 0) return res.json("Informações atualizadas!");
            return res.status(403).json("Você só pode atualizar o seu próprio perfil!");
        }
        )
    
    
};