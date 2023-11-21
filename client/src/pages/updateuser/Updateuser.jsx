import { useContext, useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./updateuser.scss";
import axios from "axios";
import { makeRequest } from '../../axios';
import { AuthContext } from '../../context/authContext';
import { useQuery } from '@tanstack/react-query'

const UpdateUser = () => {
  const { currentUser} = useContext(AuthContext);
  const userId= parseInt(useLocation().pathname.split("/")[2])
  const navigate = useNavigate();
  const [texts, setTexts] = useState({
    name:"",
    password:""
  })

  const { data: userData, isLoading, error2 } = useQuery({
    queryKey: ['user', currentUser.id],
    queryFn: () =>
      makeRequest.get(`/users/find/${currentUser.id}`).then((res) => res.data),
  });  



  const[cover,setCover] = useState(null)
 
  const[profile,setProfile] = useState(null)

  const upload = async (file) => {
    try{
      const formData = new FormData();
      formData.append("file", file)
      const res = await makeRequest.post("/upload", formData);
      return res.data
    } catch(err){
      console.log(err)
    }

  }

  const [err, setErr] = useState(null);

  const handleChange = (e) =>{
    setTexts(prev=>({...prev, [e.target.name]: e.target.value }))
  };
  
  const handleCoverChange = (e) => {
    setCover(e.target.files[0]);
  };

  const handleProfileChange = (e) => {
    setProfile(e.target.files[0]);
  };


  const handleClick = async (e) =>{
    e.preventDefault();
    let coverUrl = userData.coverPic;
    let profileUrl = userData.profilePic;

    if (cover) {
        coverUrl = await upload(cover);
    }

    if (profile) {
        profileUrl = await upload(profile);
    }

    console.log("Cover URL:", coverUrl);
    console.log("Profile URL:", profileUrl);
    
    try{
        await axios.put("http://localhost:8800/api/users/updateuser",{
            ...texts,
            coverPic: coverUrl || null,
            profilePic: profileUrl || null,
            userId: userId,
        
        });

      navigate(`/profile/${userId}`);
    } catch(err){
      setErr(err.response.data);
    }
  }

  const handleNavigateToProfile = () => {
    navigate(`/profile/${userId}`);
  };

  return (
    <div className="register">
      <div className="card">
        <div className="right">
          <h1>O que deseja atualizar?</h1>
          <p>Deixe o campo em branco para manter o valor atual</p>
          <form>
            <input type="text" placeholder="Novo nome de exibição" name="name" onChange={handleChange}  />
            <input type="password" placeholder="Nova senha" name="password" onChange={handleChange}  />
            <p>Escolha uma nova imagem de capa:</p>
            <input type="file" accept="image/*" name="coverPic" onChange={handleCoverChange} />
            <p>Escolha uma nova imagem de perfil:</p>
            <input type="file" accept="image/*" name="profilePic" onChange={handleProfileChange} />
            {err && (
                      <div>
                        <p>Ocorreu um erro:</p>
                        <pre>{JSON.stringify(err, null, 2)}</pre>
                      </div>
                    )}
            <button onClick={handleClick}>Atualizar Informações</button>
          </form>
          
          <button onClick={handleNavigateToProfile}>Voltar</button>
          
        </div>
      </div>
    </div>
  );
};
export default UpdateUser;
