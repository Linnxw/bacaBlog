import React, { useState ,useContext} from "react";
import Edit from "../assets/images/edit.png"
import Delete from "../assets/images/delete.png"
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
// import axios from "axios";
import moment from "moment";
import { AuthContext } from "../context/AuthContext";
import DOMPurify from "dompurify";

const Single = () => {
  const [post, setPost] = useState([])
  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2];



  return (
    <div className="single">
      <div className="content">
        <img src={`../upload/${post?.img}`} alt="" />
        <div className="user">
          {post.userImg && <img
            src={post.userImg}
            alt=""
          />}
          <div className="info">
            <span>{post.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser.username === post.username && (
            <div className="edit">
              <Link to={`/write?edit=2`} state={post}>
                <img src={Edit} alt="" />
              </Link>
              <img onClick={handleDelete} src={Delete} alt="" />
            </div>
          )}
        </div>
        <h1>{post.title}</h1>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.desc),
          }}
        ></p>      </div>
      <Menu cat={post.cat}/>
    </div>
  );
};

export default Single;