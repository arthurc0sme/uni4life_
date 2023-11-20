import "./share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { makeRequest } from "../../axios";


const Share = () => {
  const {currentUser} = useContext(AuthContext)

  const { data: userData, isLoading, error } = useQuery({
    queryKey: ['user', currentUser.id],
    queryFn: () =>
      makeRequest.get(`/users/find/${currentUser.id}`).then((res) => res.data),
  });


  const [file, setFile] = useState(null)
  const [desc, setDesc] = useState("")

  const upload = async () => {
    try{
      const formData = new FormData();
      formData.append("file", file)
      const res = await makeRequest.post("/upload/", formData);
      return res.data
    } catch(err){
      console.log(err)
    }

  }

  
  
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (newPost) => {
      return makeRequest.post("/posts", newPost)
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    },
  })

  const handleClick = async (e) =>{
    e.preventDefault();
    let imgUrl="";
    if(file) imgUrl = await upload()
    mutation.mutate({desc, img: imgUrl })
    setDesc("")
    setFile(null)
  }

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
          {isLoading ? (
              'Carregando...'
            ) : error ? (
              'Erro ao carregar os dados do usuário'
            ) : (
              <>
                <img src={userData.profilePic ? `http://localhost:8800/upload/${userData.profilePic}` : "http://localhost:8800/upload/user.avif"} alt="" /> 
                <input
                  type="text"
                  placeholder={`Compartilhe o que você está pensando ${userData.name}`}
                  onChange={(e) => setDesc(e.target.value)}
                  value={desc}
                />
              </>
            )}
          </div>
          <div className="right">
            {file && <img className="file" alt = "" src={URL.createObjectURL(file)}/>}
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input type="file" id="file" style={{display:"none"}} onChange={e=>setFile(e.target.files[0])}  />
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Adicionar Imagem</span>
              </div>
            </label>
          </div>
          <div className="right">
            <button onClick= {handleClick} >Compartilhar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
