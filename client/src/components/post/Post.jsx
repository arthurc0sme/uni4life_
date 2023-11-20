import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useContext, useState, useEffect } from "react";
import moment from "moment";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { makeRequest  } from "../../axios";
import { AuthContext } from "../../context/authContext";
import DeleteIcon from "@mui/icons-material/Delete";

const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [menuOpen, setmenuOpen] = useState(false);
  const {currentUser} = useContext(AuthContext)

  const { isPending, error, data } = useQuery({
    queryKey: ['likes', post.id],
    queryFn: () =>
      makeRequest.get("/likes?postId="+post.id).then((res) => {
        return res.data
      })
  })

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (liked) => {
      if (liked) return makeRequest.delete("/likes?postId="+ post.id)
      return makeRequest.post("/likes",{postId: post.id})
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["likes"] })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (postId) => {
      return makeRequest.delete("/posts/" + postId)
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    },
  })

  
  const handleLike = () => {
    mutation.mutate(data && data.includes(currentUser.id) )

  }

  const handleDelete= () =>{
    deleteMutation.mutate(post.id)
  }
  
  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
          <img src={post.profilePic ? `http://localhost:8800/upload/${post.profilePic}` : "http://localhost:8800/upload/user.avif"} alt="" /> 
            <div className="details">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.name}</span>
              </Link>
              <span className="date">{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
          <MoreHorizIcon onClick={() => setmenuOpen(!menuOpen)} />
          {menuOpen && post.userId === currentUser.id && (
          <DeleteIcon onClick={handleDelete}> Deletar </DeleteIcon>
          )}
        </div>
        <div className="content">
        <p>{post.desc}</p>
          {post.img && (
            <img
              src={"../upload/" + post.img}
              alt=""
              style={{ objectFit: "contain", width: "100%", height: "300px" }}
            />
          )}
        </div>
        <div className="info">
          <div className="item">
            {isPending ? "Carregando" : data && data.includes(currentUser.id) ?(
            <FavoriteOutlinedIcon style={{color:"green"}} onClick = {handleLike} />) : (
            <FavoriteBorderOutlinedIcon onClick = {handleLike} />)
            }
            {data && `${data.length} Likes`}
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            Comentários
          </div>
        </div>
        {commentOpen && <Comments postId={post.id} />}
      </div>
    </div>
  );
};

export default Post;
