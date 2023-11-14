import { db } from "../connect.js"
import bcrypt from "bcryptjs";
import  jwt  from "jsonwebtoken";


export const register = (req, res) => {
    //checando se existe o usuário
    const q = "SELECT * FROM users WHERE username = ?"

    db.query(q,[req.body.username], (err,data) => {
        if (err) return res.status(500).json(err)
        if (data.length) return res.status(409).json("Nome de usuário existente!")
         //criando um usuario
        // criptografando com hash a senha
    	const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);
 
        const q = "INSERT INTO users (`username`,`email`,`password`,`name`) VALUE (?)";

    const valores =[req.body.username,
         req.body.email,
         hashedPassword, 
         req.body.name,
        ];

        db.query(q,[valores], (err,data) =>{
            if (err) return res.status(500).json(err);
            return res.status(200).json("Usuario cadastrado!");
        } );
    });
};

   


export const login = (req, res) => {

    const q = "SELECT * from users WHERE username = ?"

    db.query(q,[req.body.username], (err,data) => {
        if (err) return res.status(500).json(err);
        if(data.length === 0) return res.status(404).json("Usuário não encontrado!");

        const checarSenha = bcrypt.compareSync(req.body.password, data[0].password);

        if(!checarSenha) return res.status(400).json("Senha ou email inválidos!");

        const token = jwt.sign({id:data[0].id}, "secretkey");

        const {password, ...others} = data[0]

        res.cookie("acessToken", token, {
            httpOnly: true,
        }).status(200).json(others);

    })


};

export const logout = (req, res) => {
    res.clearCookie("acessToken",{
        secure: true,
        sameSite: "none"

    }) .status(200).json("Logoff feito com sucesso")

};

