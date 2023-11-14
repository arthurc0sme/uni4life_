import "./leftBar.scss";
import Friends from "../../assets/1.png";
import Groups from "../../assets/2.png";
import Events from "../../assets/6.png";
import Gallery from "../../assets/8.png";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";

const LeftBar = () => {

  const { currentUser } = useContext(AuthContext);

  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          <div className="user">
            <img
              src={currentUser.profilePic}
              alt=""
            />
            <span>{currentUser.name}</span>
          </div>
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
