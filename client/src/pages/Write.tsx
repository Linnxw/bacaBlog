import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {useNavigate,useLocation} from "react-router-dom";
import moment from "moment";
import axios from "../config/axios"
const Write = () => {
  const state = useLocation().state
  const [value, setValue] = useState<string>(state?.desc || "");
  const [title, setTitle] = useState<string>(state?.title || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState<string>(state?.cat.toLowerCase() || "");
 
  const navigate = useNavigate()
  const uploadImage = async () =>{
    try{
   const formData = new FormData()
    formData.append("file",file)
    const res = await axios.post("/upload",formData,{
      headers:{
        "content-type":"multipart/form-data"
      }
    })
    return res.data.fileName
    }catch(err: any){
      console.log(err)
      return null
    }
  }
  
  const handlePublish = async () =>{
    try{
    const image = file ? await uploadImage() : state.postImg
    const res = state ? (
     await axios.patch(`/post/${state.postId}`,{
      title,
      desc:value,
      cat,
      lastImg:state.postImg,
      img:image,
      date:moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
    }))
     :  
     (await axios.post("/post",{
      title,
      desc:value,
      cat,
      img:image,
      date:moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
    }))
    console.log(res)
     if(res.status === 200){
       navigate("/")
     }
    }catch(err:any){
     console.log(err)
    }
  }

  return (
    <div className="add">
      <div className="content">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
        />
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            name=""
            onChange={(e:React.ChangeEvent<HTMLInputElement>) => setFile(e.target.files[0])}
          />
          <label className="file" htmlFor="file">
            Upload Image
          </label>
          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={handlePublish}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "art"}
              name="cat"
              value="art"
              id="art"
              onChange={(e:React.ChangeEvent<HTMLInputElement>) => setCat(e.target.value)}
            />
            <label htmlFor="art">Art</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "science"}
              name="cat"
              value="science"
              id="science"
              onChange={(e:React.ChangeEvent<HTMLInputElement>) => setCat(e.target.value)}
            />
            <label htmlFor="science">Science</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "technology"}
              name="cat"
              value="technology"
              id="technology"
              onChange={(e:React.ChangeEvent<HTMLInputElement>) => setCat(e.target.value)}
            />
            <label htmlFor="technology">Technology</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "cinema"}
              name="cat"
              value="cinema"
              id="cinema"
              onChange={(e:React.ChangeEvent<HTMLInputElement>) => setCat(e.target.value)}
            />
            <label htmlFor="cinema">Cinema</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "design"}
              name="cat"
              value="design"
              id="design"
              onChange={(e:React.ChangeEvent<HTMLInputElement>) => setCat(e.target.value)}
            />
            <label htmlFor="design">Design</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "food"}
              name="cat"
              value="food"
              id="food"
              onChange={(e:React.ChangeEvent<HTMLInputElement>) => setCat(e.target.value)}
            />
            <label htmlFor="food">Food</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;