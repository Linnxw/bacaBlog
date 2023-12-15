import {ChangeEvent} from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../config/axios"

type RegisterInput = {
  username: string 
  email: string 
  password: string
}
const Register = () => {
  const [inputs, setInputs] = useState<RegisterInput>({
    username: "",
    email: "",
    password: "",
  });
  const [err, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    setInputs((prev:RegisterInput) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    try {
      await axios.post("/auth/register", inputs);
      navigate("/login");
    } catch (err:any) {
      setError(err.response.data.msg);
    }
  };

  return (
    <div className="auth">
      <h1>Register</h1>
      <form>
        <input
          required
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
        />
        <input
          required
          type="email"
          placeholder="email"
          name="email"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Register</button>
        {err && <p>{err}</p>}
        <span>
          Do you have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;