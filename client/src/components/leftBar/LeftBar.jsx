import "./leftBar.scss";
import Friends from "../../assets/1.png";
import Groups from "../../assets/2.png";
import Events from "../../assets/6.png";
import Gallery from "../../assets/8.png";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { makeRequest } from '../../axios';
import { useQuery } from '@tanstack/react-query';

const LeftBar = () => {
  
  const { currentUser } = useContext(AuthContext);

  const { data: userData, isLoading, error } = useQuery({
    queryKey: ['user', currentUser.id],
    queryFn: () =>
      makeRequest.get(`/users/find/${currentUser.id}`).then((res) => res.data),
  });

  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
        <Link to={`/profile/${currentUser.id}`} style={{ textDecoration: "none", color: "inherit" }}>
            <div className="user">
              {/* Use userData em vez de currentUser para as informações do usuário */}
              {isLoading ? (
                'Carregando...'
              ) : error ? (
                'Erro ao carregar os dados do usuário'
              ) : (
                <>
                 {userData && userData.profilePic ? (
                  <img src={`http://localhost:8800/upload/${userData.profilePic}`} alt="" />
                ) : (
                  <img src="http://localhost:8800/upload/user.avif" alt="" />
                )}
                  <span>{userData.name}</span>
                </>
              )}
          </div>
        </Link>
          <div className="item">
            <img src={Friends} alt="" />
            <span>Amizades</span>
          </div>
          <div className="item">
            <img src={Groups} alt="" />
            <span>Grupos / Cursos </span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Seus atalhos</span>
          <div className="item">
            <img src={Events} alt="" />
            <span>Eventos</span>
          </div>
          <div className="item">
            <img src={Gallery} alt="" />
            <span>Mídias</span>
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
};

export default LeftBar;
