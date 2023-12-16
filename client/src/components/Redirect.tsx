
const Redirect  = ({children}:any) => {
  if(!localStorage.getItem("user")){
    window.location.href = "./login"
  }else{
    return children
  }
}

export default Redirect