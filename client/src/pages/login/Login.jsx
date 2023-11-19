import { useState } from 'react';
import { Link } from "react-router-dom";
import "./login.scss";
import axios from "axios";


const Login = () => {

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
        await axios.post("http://localhost:8800/api/auth/login/", inputs);
    } catch(err){
      setErr(err.response.data);
    }

  };

  return (
    <div className="login">
      <div className="card">
        <div className="right">
          <h1 className='center'>Uni4Life</h1>
          <form>
            <input type="email" placeholder="Email" name="email" onChange={handleChange}  />
            <input type="password" placeholder="Senha" name="password" onChange={handleChange}  />
            
            {err && err}

            <button id='center' onClick={handleClick}>Login</button>
            <p className='toRegister'>
               <Link to="/register" style={{color: '#666'}}>Não tem uma conta?</Link>
            </p>
            </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
