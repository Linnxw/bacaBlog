import {createContext,useState,useEffect} from "react"
import axios from "axios"
import React,{PropsWithChildren} from "react"
export const AuthContext = createContext()
interface ILogin {
  username: string 
  password: string
}
export const AuthContextProvider: React.FC<PropsWithChildren> = ({children}) => {
  const initialState: any = JSON.parse(localStorage.getItem("user")) || null
  const [currentUser,setCurrentUser] = useState<any>(initialState)
  
  const login = async (input: ILogin) => {
    try{
    const postData ={
     field:input.username,
     password:input.password
    }
    const config ={
      withCredentials:true
    }
    const response = await axios.post("http://localhost:9090/api/auth/login",postData,config)
    console.log(response)
   setCurrentUser(response.data.data)
    }catch(err:any){
      console.log(err)
    }
  }
  const logout = () => {
  axios.delete("http://localhost:9090/api/auth/logout",{withCredentials:true})
  localStorage.removeItem("user")
  setCurrentUser(null)
}
useEffect(()=>{
  if(currentUser){
  localStorage.setItem("user",JSON.stringify(currentUser))
  }
},[currentUser])
  return <AuthContext.Provider value={{currentUser,login,logout}}>{children}</AuthContext.Provider>
}