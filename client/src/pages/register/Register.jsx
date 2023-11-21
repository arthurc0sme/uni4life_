import { useState } from 'react';
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./register.scss";
import axios from "axios";
import Logo from "../../assets/logo.png";

const Register = () => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    username: '',
    password: '',
    email: '',
    nummatricula: '',
    name: '',
    cpf: '',
    instituicao: '',
    curso: '',
    semestre: '',
    cidade: '',
    datanasc:''
  })

  const [err, setErr] = useState(null);

  const handleChange = (e) =>{
    const { name, value } = e.target;
    if ((name === 'nummatricula' || name === 'cpf' || name === 'datanascAno' || name === 'datanascMes' || name === 'datanascDia') && !/^\d+$/.test(value)) {
      return; // Retorna se não for um número
    }
    setInputs((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleClick = async (e) =>{
    e.preventDefault();

    try {
      const dataNascimento = `${inputs.datanascAno}-${inputs.datanascMes}-${inputs.datanascDia} 00:00:00`;
      const defaultProfilePictureUrl = "user.avif";
      const defaultCoverPhotoUrl = "cover.jpg";

      const updatedInputs = {
        ...inputs,
        profilePictureUrl: defaultProfilePictureUrl,
        coverPhotoUrl: defaultCoverPhotoUrl,
        datanasc: dataNascimento
      };

      await axios.post("http://localhost:8800/api/auth/register", updatedInputs)
      // Após o registro bem-sucedido, redirecionar para a página de login
      navigate('/login');
    } catch (err) {
      setErr(err.response.data);
    }
  };

  return (
    <div className="register">
      <div className="card">
        <div className="right">
          <h1 className='center'>Registre-se:</h1>
          <form>
          <input
        type="text"
        placeholder="Nome de usuario"
        name="username"
        onChange={handleChange}
        
      />
      <input
        type="password"
        placeholder="Senha"
        name="password"
        onChange={handleChange}
        
      />
      <input
        type="text"
        placeholder="CPF"
        name="cpf"
        onChange={handleChange}
        maxLength="11"
      />
       <div className="data">
       <input
                type="text"
                placeholder="Dia de Nascimento"
                name="datanascDia"
                onChange={handleChange}
                
                maxLength="2"
              />
              <input
                type="text"
                placeholder="Mês de Nascimento"
                name="datanascMes"
                onChange={handleChange}
                
                maxLength="2"
              />
             <input
                type="text"
                placeholder="Ano de Nascimento"
                name="datanascAno"
                onChange={handleChange}
                
                maxLength="4"
              />
            </div>
      <input
        type="email"
        placeholder="Email da instituição"
        name="email"
        onChange={handleChange}
        
      />
      <input
        type="text"
        placeholder="Instituição"
        name="instituicao"
        onChange={handleChange}
        
      />
      <input
        type="text"
        placeholder="Curso"
        name="curso"
        onChange={handleChange}
        
      />
      <input
        type="text"
        placeholder="Semestre"
        name="semestre"
        onChange={handleChange}
        
      />
      <input
        type="text"
        placeholder="Numero de Matricula"
        name="nummatricula"
        onChange={handleChange}
        maxLength={7}
        
      />
      <input
        type="text"
        placeholder="Nome de exibição"
        name="name"
        onChange={handleChange}
        
      />
       <input
        type="text"
        placeholder="Cidade"
        name="cidade"
        onChange={handleChange}
       
      />
      
            
            
      {err && <p className="error-message">{err.message}</p>}

            </form>
            <button className='center' onClick={handleClick}>Registrar</button>
            <p className='toLogin'>
               <Link to="/login" style={{color: '#666'}}>Já tem uma conta?</Link>
            </p>
        </div>
      </div>
    </div>
  );
};
export default Register;