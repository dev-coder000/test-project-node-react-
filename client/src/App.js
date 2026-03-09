import React ,{Fragment} from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './components/auth/Register';
import Login from './components/auth/Login';
const App=()=> (
    <BrowserRouter>
    <Fragment>
      <Navbar/>
    <Routes>
      <Route path="/" element={<Landing/>}/>
      <Route path="register" element={<Register/>}/>
      <Route path="login" element={<Login/>}/>
    </Routes>
     </Fragment> 
    </BrowserRouter> 
)
export default App;
