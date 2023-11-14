import { useState } from 'react';
import { Link } from "react-router-dom";
import "./register.scss";
import axios from "axios";


const Register = () => {

  const [inputs, setInputs] = useState({
    username:"",
    email:"",
    password:"",
    name:"",
  })

  const [err, setErr] = useState(null);

  const handleChange = (e) =>{
    setInputs(prev=>({...prev, [e.target.name]: e.target.value }))
  };

  const handleClick = async (e) =>{
    e.preventDefault()

    try{
        await axios.post("http://localhost:8800/api/auth/register", inputs);
    } catch(err){
      setErr(err.response.data);
    }

  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Uni4Life</h1>
          <p>
            Faça login para ser direcionado a rede social de sua universidade!
          </p>
          <span>Você já possui conta?</span>
          <Link to="/login">
          <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Registre-se:</h1>
          <form>
            <input type="text" placeholder="Nome de usuario" name="username" onChange={handleChange} />
            <input type="email" placeholder="Email da instituição" name="email" onChange={handleChange}  />
            <input type="password" placeholder="Senha" name="password" onChange={handleChange}  />
            <input type="text" placeholder="Nome de exibição" name="name" onChange={handleChange}  />
            {err && err}
            <button onClick={handleClick}>Registrar</button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Register;
