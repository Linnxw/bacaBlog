import React,{useState,useEffect} from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "../config/axios";

const Home: React.FC = () => {
  const [posts, setPosts] = useState([]);

  const cat = useLocation().search

    useEffect(() => {
      console.log(cat)
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts${cat.length ? cat :"" }`);
         console.log(res)
        setPosts(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  const getText = (html:any) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }


  return (
    <div className="home">
      <div className="posts">
        {posts?.map((post) => (
          <div className="post" key={post.id}>
            <div className="img">
              <img src={`../../public/uploads/${post.img}`} alt="" />
            </div>
            <div className="content">
              <Link className="link" to={`/post/${post.id}`}>
                <h1>{post.title}</h1>
              </Link>
              <p>{getText(post.desc)}</p>
              <button>Read More</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;