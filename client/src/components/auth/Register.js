import React,{useState,useEffect}from 'react'
import { Link } from 'react-router-dom'


const Register = () => {
    const[message,setmessage]=useState('')
    const[formData,setformData]=useState({
    name:"",
    email:"",
    password:"",
    password2:""
   })
useEffect(()=>{
  setTimeout(()=>{
    setmessage('')
  },2000)
},[message])
const{name,email,password,password2}=formData
const onchange=e=>setformData({...formData,[e.target.name]:e.target.value})
const Onsubmit=(e)=>{
    e.preventDefault()
    if(password!==password2){
        setmessage("Password do not match")
    }else{    
          FormSubmit()
    }      
}
const FormSubmit=()=>{
    fetch("http://localhost:5000/api/client/prof",{
    method:"post",
    headers:{
      'Content-Type':"application/json"
    },
    body:JSON.stringify(formData)
    })
    .then((res)=>res.json())
    .then((data)=>setmessage(data.message))
    
}
  return (
    <section className="container">
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" onSubmit={e=>Onsubmit(e)}>
        <div className="form-group">
          <input type="text" placeholder="Name" name="name" value={name} onChange={e=>onchange(e)}required />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" value={email} onChange={e=>onchange(e)} />
        
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={e=>onchange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            value={password2}
            onChange={e=>onchange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
      {message!==""?(
      <div className="alert alert-danger" style={{display:"block"}}>
        {message}
      </div>
      ):
      ""}
    </section>
    
  )
  
}

export default Register
