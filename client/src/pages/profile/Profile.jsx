import "./profile.scss";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { makeRequest  } from "../../axios";
import { useLocation, } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import Posts from "../../components/posts/Posts";
import Update from "../../components/update/Update"
import { Link } from "react-router-dom";

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
          <div className="left"></div>
          <div className="center">
            <span>{data && data.name}</span>
            <div className="info">
              <div className="item">
                <PlaceIcon />
                <span>USA</span>
              </div>
              <div className="item">
                <LanguageIcon />
                <span>lama.dev</span>
              </div>
            </div>
            {userId === currentUser.id ? (
              <Link to={`/updateuser/${userId}`} style={{ textDecoration: 'none' }}>
                <span className="update-link">Atualizar Dados</span>
              </Link>
            ) : (
              <button onClick={handleFollow}>{relationshipData && relationshipData.includes(currentUser.id) ? "Seguindo" : "Seguir"}</button>
            )}
          </div>
          <div className="right"></div>
        </div>
        <Posts userId={userId} />
      </div>
      {openUpdate && <Update setOpenUpdate={setOpenUpdate}></Update>}
    </div>
  );
};

export default Profile;
