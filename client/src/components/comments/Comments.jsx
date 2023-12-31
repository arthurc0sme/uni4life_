import { useContext, useState } from "react";
import "./comments.scss";
import { AuthContext } from "../../context/authContext";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from "../../axios";
import moment from "moment";
import DeleteIcon from "@mui/icons-material/Delete";

const Comments = ({postId}) => {

  const [ desc, setDesc ] = useState("")
  const { currentUser } = useContext(AuthContext);
  const { isPending, error, data } = useQuery({
    queryKey: ['comments'],
    queryFn: () =>
      makeRequest.get("/comments?postId=" + postId).then((res) => {
        return res.data
      })
  })

  const { data: userData, isLoading, error2 } = useQuery({
    queryKey: ['user', currentUser.id],
    queryFn: () =>
      makeRequest.get(`/users/find/${currentUser.id}`).then((res) => res.data),
  });  

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (newComment) => {
      return makeRequest.post("/comments", newComment)
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["comments"] })
    },
  })

  const handleClick = async (e) =>{
    e.preventDefault();
    mutation.mutate({desc, postId })
    setDesc("")
  }

  const deleteMutation = useMutation({
    mutationFn: (commentId) => {
        return makeRequest.delete(`/comments/${commentId}`);
    },
    onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
});

  const handleDeleteComment = (commentId) => {
      deleteMutation.mutate(commentId);
  };

  return (
    <div className="comments">
      <div className="write">
      <img src={userData.profilePic ? `http://localhost:8800/upload/${userData.profilePic}` : "http://localhost:8800/upload/user.avif"} alt="" /> 
        <input type="text" placeholder="Escreva um comentário" value = {desc} onChange={(e) => setDesc(e.target.value)} />
        <button onClick={handleClick}>Enviar</button>
      </div>
      {isPending 
      ? "Carregando..." 
      : data.map((comment) => (
        <div className="comment" key={comment.id}>
          <img src={comment.profilePic ? `http://localhost:8800/upload/${comment.profilePic}` : "http://localhost:8800/upload/user.avif"} alt="" /> 
          <div className="info">
            <span>{comment.name}</span>
            <p>{comment.desc}</p>
          </div>
          <span className="date">{moment(comment.createdAt).fromNow()}</span>
          {comment.userId === currentUser.id && (<DeleteIcon onClick={() => handleDeleteComment(comment.id)} />)}
        </div>
      ))}
    </div>
  );
};

export default Comments;
