import {FC,useState,useContext,ChangeEvent} from "react"
import {Link,useNavigate} from "react-router-dom"
import {AuthContext} from "../context/AuthContext"
type LoginInput = {
  username: string 
  password: string
}
const Login: FC = () =>{
  const [err,setErr] = useState(null)
  const [input,setInput] = useState<LoginInput>({
    username:"",
    password:""
  })
  
  const navigate = useNavigate()
  const {login}: any = useContext(AuthContext)
  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>{
    setInput((prev)=>{
      return {
        ...prev,
        [e.target.name] : e.target.value
      }
    })
  }
  
  const handleSubmit = async (e) =>{
    e.preventDefault()
    try{
    await login(input)
      setInput({
         username:"",
         password:""
      })
     // navigate("/")
    }catch(err:any){
      if(err.response){
        setErr(err.response.data.msg)
      }
    }
  }
    return (
    <div className="auth">
      <h1>Login</h1>
      <form onSubmit = {handleSubmit}>
        <input
          required
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        <button>Login</button>
        {err && <p>{err}</p>}
        <span>
          Don't you have an account? <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  );
}

export default Login