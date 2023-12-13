import React, { useState ,useEffect,useContext} from "react";
import Edit from "../assets/images/edit.png"
import Delete from "../assets/images/delete.png"
import { Link, useParams, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import axios from "../config/axios";
import moment from "moment";
import { AuthContext } from "../context/AuthContext";
import DOMPurify from "dompurify";
import {ISinglePost} from "../types/userTypes"
const Single = () => {
  const [post, setPost] = useState<ISinglePost>({})
  const navigate = useNavigate();

  const {id} = useParams()
  const {currentUser} = useContext(AuthContext)
  
  const getPost = async () =>{
    try{
      const {data} = await axios.get(`/post/${id}`)
      
      console.log(data)
      setPost(data.data)
    }catch(err:any){
      console.log(err)
    }
  }
  
  useEffect(()=>{
    getPost()
  },[id])
  
  const handleDelete = async () =>{
    try{
     const res = await axios.delete(`/post?id=${post.postId}&&img=${post.postImg}`)
     if(res.status === 200){
       navigate(-1)
     }
    }catch(err:any){
      console.log(err)
    }
  }
  return (
    <div className="single">
      <div className="content">
        <img src={`../../public/uploads/${post?.postImg}`} alt="" />
        <div className="user">
          {post?.userImg && <img
            src={post.userImg}
            alt=""
          />}
          <div className="info">
            <span>{post?.username}</span>
            <p>Posted {moment(post?.date).fromNow()}</p>
          </div>
          {currentUser?.username === post?.username && (
            <div className="edit">
              <Link to={`/write?edit=2`} state={post}>
                <img src={Edit} alt="" />
              </Link>
              <img onClick={handleDelete} src={Delete} alt="" />
            </div>
          )}
        </div>
        <h1>{post?.title}</h1>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post?.desc),
          }}
        ></p></div>
      <Menu cat={post?.cat} currentPostId={post?.postId}/>
    </div>
  );
};

export default Single;