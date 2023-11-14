import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./login.scss";

const Login = () => {
  
  const [inputs, setInputs] = useState({
    username:"",
    password:"",
  })

  const [err, setErr] = useState(null);

  const navigate = useNavigate()

  const handleChange = (e) =>{
    setInputs(prev=>({...prev, [e.target.name]: e.target.value }))
  };

  const { login } = useContext(AuthContext);

  const handleLogin =  async(e) => {
    e.preventDefault()
    try {
      await login(inputs);
      navigate("/")
    } catch (err){
      setErr(err.response.data)
    }
    
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Bem Vindo!</h1>
          <p>
            Faça login para estar por dentro de tudo que acontece na sua universidade!
            E Fique por dentro das novidades do seu mundo acadêmico!
          </p>
          <span>Você ainda não possui uma conta?</span>
          <Link to="/register">
            <button>Registre-se</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input type="text" placeholder="Nome de Usuário" name="username" onChange={handleChange} />
            <input type="password" placeholder="Senha" name="password" onChange={handleChange} />
            {err && err}
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;