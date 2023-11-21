import "./profile.scss";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import SchoolIcon from "@mui/icons-material/School";
import BookIcon from "@mui/icons-material/Book";
import ScheduleIcon from "@mui/icons-material/Schedule";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { makeRequest  } from "../../axios";
import { useLocation, } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import Posts from "../../components/posts/Posts";
import Update from "../../components/update/Update"
import { Link } from "react-router-dom";
import Book from "@mui/icons-material/Book";

const Profile = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const userId = parseInt(useLocation().pathname.split("/")[2]);

  

  const { isPending, error, data } = useQuery({
    queryKey: ['user'],
    queryFn: () =>
      makeRequest.get("/users/find/" + userId).then((res) => {
        return res.data;
      })
  });

  const { data: relationshipData } = useQuery({
    queryKey: ['relationship'],
    queryFn: () =>
      makeRequest.get("relationships?followedUserId=" + userId).then((res) => {
        return res.data;
      })
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (following) => {
      if (following) return makeRequest.delete("/relationships?userId=" + userId);
      return makeRequest.post("/relationships", { userId });
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["relationship"] });
    },
  });

  const handleFollow = () => {
    mutation.mutate(relationshipData && relationshipData.includes(currentUser.id));
  };

  return (
    <div className="profile">
      {data && (
        <div className="images">
          <img
            src={`http://localhost:8800/upload/${data.coverPic}`}
            alt=""
            className="cover"
          />
          <img
            src={`http://localhost:8800/upload/${data.profilePic}`}
            alt=""
            className="profilePic"
          />
        </div>
      )}
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">       
              <div className="item">
                <PlaceIcon />
                <span>{data && data.cidade}</span>
              </div>
              <div className="item">
                <SchoolIcon />
                <span>{data && data.instituicao}</span>
            </div>
          </div>
          <div className="center">
            <span>{data && data.name}</span>
            {userId === currentUser.id ? (
              <Link to={`/updateuser/${userId}`} style={{ textDecoration: 'none' }}>
                <button className="update-link">Atualizar Dados</button>
              </Link>
            ) : (
              <button onClick={handleFollow}>{relationshipData && relationshipData.includes(currentUser.id) ? "Seguindo" : "Seguir"}</button>
            )}
          </div>
          <div className="right">
          <div className="item">
                <ScheduleIcon/>
                <span>{data && data.semestre}</span>
              </div>
          <div className="item">
                <BookIcon />
                <span>{data && data.curso}</span>
              </div>
              
          </div>
        </div>
        <Posts userId={userId} />
      </div>
      {openUpdate && <Update setOpenUpdate={setOpenUpdate}></Update>}
    </div>
  );
};

export default Profile;
