import axios from "axios";
import { useState } from "react";

const Login = () => {
  const [image, setImage]=useState();
  const [message, setMessage]=useState();
  const handleImage=(e)=>setImage(e.target.files[0])
  const registerForm=async(e)=>{
    e.preventDefault()
    const formData= new FormData(e.target);
    const formprops= Object.fromEntries(formData);
    console.log(formprops);
    formData.append("image", image);
    try {
      // const res=await axios.post(`http://192.168.1.130:4000/register `, formData)
      const res=await axios.post(`http://localhost:4000/register `, formData)

      console.log(res);
     
      setMessage(`Registered Successfully, please login`)
   
    } catch (error) {
      console.log(error);
      setMessage(error?.response.data.message)
    }
  }
  const signIn=async(e)=>{
    e.preventDefault()
    try {
      const formData= new FormData(e.target);
      const formprops= Object.fromEntries(formData);
      console.log(formprops);
      const res=await axios.post(`http://localhost:4000/login `, formprops)
      console.log(res);
      sessionStorage.setItem("user", JSON.stringify(res.data.User))
      window.location.reload()
    } catch (error) {
     
      console.log(error);
    }
  }
  return (
    <div>
     
        <div className="sbody">
  <div className="main">
    <input type="checkbox" id="chk" aria-hidden="true" />
    <div className="signup">
      <form onSubmit={registerForm}>
        <label htmlFor="chk" aria-hidden="true" >
          Sign up
        </label>
      <p>{message}</p>
        <input type="text" name="full_name" placeholder="Full name" required="" />
        <input type="email" name="email" placeholder="Email" required="" />
        <input type="file"  placeholder="photo" onChange={handleImage} required="" />
        <input type="password" name="password" placeholder="Password" required="" />
        <button type="submit" >Sign up</button>
      </form>
    </div>
    <div className="login">
      <form onSubmit={signIn}>
      
        <label htmlFor="chk" style={{padding:"10px"}} aria-hidden="true">
          Login
        </label><p>{message}</p>
        <input type="email" name="email" placeholder="Email" required="" />
        <input type="password" name="password" placeholder="Password" required="" />
        <button type="submit">Login</button>
      </form>
    </div>
  </div>
</div>
<style>{`
body {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    font-family: "Jost", sans-serif;
    background: linear-gradient(to bottom, #0f0c29, #302b63, #24243e);
  }
  .main {
    width: 350px;
    height: 500px;
    background: red;
    overflow: hidden;
    background: url("https://doc-08-2c-docs.googleusercontent.com/docs/securesc/68c90smiglihng9534mvqmq1946dmis5/fo0picsp1nhiucmc0l25s29respgpr4j/1631524275000/03522360960922298374/03522360960922298374/1Sx0jhdpEpnNIydS4rnN4kHSJtU1EyWka?e=view&authuser=0&nonce=gcrocepgbb17m&user=03522360960922298374&hash=tfhgbs86ka6divo3llbvp93mg4csvb38")
      no-repeat center/ cover;
    border-radius: 10px;
    box-shadow: 5px 20px 50px #000;
  }
  #chk {
    display: none;
  }
  .signup {
    position: relative;
    width: 100%;
    height: 100%;
  }
  label {
    color: #fff;
    font-size: 1.3em;
    justify-content: center;
    display: flex;
    margin: 41px;
    font-weight: bold;
    cursor: pointer;
    transition: 0.5s ease-in-out;
  }
  input {
    width: 60%;
    height: 40px;
    background: #e0dede;
    justify-content: center;
    display: flex;
    margin: 20px auto;
    padding: 10px;
    border: none;
    outline: none;
    border-radius: 5px;
  }
  button {
    width: 60%;
    height: 40px;
    margin: 10px auto;
    justify-content: center;
    display: block;
    color: #fff;
    background: #573b8a;
    font-size: 1em;
    font-weight: bold;
    margin-top: 20px;
    outline: none;
    border: none;
    border-radius: 5px;
    transition: 0.2s ease-in;
    cursor: pointer;
  }
  button:hover {
    background: #6d44b8;
  }
  .login {
    height: 460px;
    background: #eee;
    border-radius: 60% / 10%;
    transform: translateY(-180px);
    transition: 0.8s ease-in-out;
  }
  .login label {
    color: #573b8a;
    transform: scale(0.6);
  }
  
  #chk:checked ~ .login {
    transform: translateY(-500px);
  }
  #chk:checked ~ .login label {
    transform: scale(1);
  }
  #chk:checked ~ .signup label {
    transform: scale(0.6);
  }
  
`}</style>
    </div>
  )
}

export default Login