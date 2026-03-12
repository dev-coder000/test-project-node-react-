import React ,{Fragment} from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';

//redux//
import { Provider } from 'react-redux';
import store from './store';

const App=()=> (
  <Provider store={store}>
    <BrowserRouter>
      <Navbar/>
      <div className="alert-wrapper">
       <Alert />
     </div>
      
    <Routes>
      <Route path="/" element={<Landing/>}/>
      <Route path="register" element={<Register/>}/>
      <Route path="login" element={<Login/>}/>
    </Routes>
    </BrowserRouter> 
    </Provider>
)
export default App;
