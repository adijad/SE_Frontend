import { BrowserRouter,Routes,Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
 
import Home from "./components/Home";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

function App() {
  const {catId} = useParams();
  useEffect(()=>{
    console.log(catId)},[catId]);
  return (
    <div>

      <BrowserRouter>
            <Routes>
              <Route path="/home" element= { <Home/>} />
              <Route path="/register" element= { <Register/>} />
              <Route path="/login" element= { <Login/>} />
            </Routes>
        </BrowserRouter>
      
    </div>
  );
}

export default App;