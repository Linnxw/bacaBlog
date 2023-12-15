import React,{useState,useEffect} from "react";
import {useNavigate} from "react-router-dom"
import axios from "../config/axios"
import {IPost} from "../types/userTypes"
interface MenuProps {
  cat: string
  currentPostId: number
}
const Menu:React.FC<MenuProps> = ({cat,currentPostId}) => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const navigate = useNavigate()
  useEffect(()=>{
    const fetch = async () =>{
      const {data:{data}} = await axios.get(`/posts?cat=${cat}`)
      const filterPost = data.filter((m:any)=>m.id !== currentPostId)
      setPosts(filterPost)
    }
    fetch()
  },[cat])
  return (
    <div className="menu">
      <h1>Other posts you may like</h1>
      {posts.map((post) => (
        <div className="post" key={post.id}>
          <img src={`../../public/uploads/${post?.img}`} alt="" />
          <h2>{post.title}</h2>
          <button onClick={()=>navigate(`/single/${post.id}`)}>Read More</button>
        </div>
      ))}
    </div>
  );
};

export default Menu;