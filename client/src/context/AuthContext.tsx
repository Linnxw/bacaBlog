import {createContext,useState,useEffect} from "react"
import axios from "axios"
import React,{PropsWithChildren} from "react"
import {ICurrentUser} from "../types/userTypes"
interface ILogin {
  username: string 
  password: string
}
interface IContext {
  currentUser:ICurrentUser | null
  login:(input:ILogin)=>void
  logout:()=>void
}

export const AuthContext = createContext<IContext | null>(null)

export const AuthContextProvider: React.FC<PropsWithChildren> = ({children}) => {
  const storage = localStorage.getItem("user")
  const initialState= JSON.parse(storage!) || null
  const [currentUser,setCurrentUser] = useState<ICurrentUser | null>(initialState)
  
  const login = async (input: ILogin):Promise<void> => {
    try{
    const postData ={
     field:input.username,
     password:input.password
    }
    const config ={
      withCredentials:true
    }
    const response = await axios.post("http://localhost:9090/api/auth/login",postData,config)

    setCurrentUser(response.data.data)
    }catch(err:any){
      console.log(err)
    }
  }
  const logout = ():void => {
  axios.delete("http://localhost:9090/api/auth/logout",{withCredentials:true})
  localStorage.removeItem("user")
  setCurrentUser(initialState)
}
useEffect(()=>{
  if(currentUser){
  localStorage.setItem("user",JSON.stringify(currentUser))
  }
},[currentUser])
  return <AuthContext.Provider value={{currentUser,login,logout}}>{children}</AuthContext.Provider>
}