import {  useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import {Link} from "react-router-dom";

import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
import './EventCategories.css';
function Login() {
   
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    async function login(event) {
        event.preventDefault();
        try {
          await axios.post("http://localhost:8080/api/v1/user/login", {
            email: email,
            password: password,
            }).then((res) => 
            {
             console.log(res.data);
             
             if (res.data.message === "Email not exits") 
             {
               alert("User does not exist");
             } 
             else if(res.data.message === "Login Success")
             { 
                
                navigate('/home');
             } 
              else 
             { 
                alert("Incorrect! Email and Password does not match");
             }
          }, fail => {
           console.error(fail); // Error!
  });
        }

 
         catch (err) {
          alert(err);
        }
      
      }

    return (
      
// <div className="eventCategoriesContainer">
// <header>
//                 <nav className="navbar navbar-expand-lg">
//                     <div className="container-fluid">
//                         <a className="navbar-brand" href="#">EventEase</a>
//                             <span className="d-flex">
//                             <Link to="/register">  <button type="button" className="btn btn-outline-primary">SignUp</button></Link>
//                             </span>
//                     </div>
//                 </nav>
//       </header>
<main>
<div className="container loginDiv">
<div className="row">
    <div className="col-sm-8  text-center">
        <div class="px-3">
            <h1>Welcome to EventEase!</h1>
            <p class="lead">Offering predefined event types and structured forms to streamline event planning.</p>
            <p class="lead">Enhancing communication between hosts and invitees, providing a centralized view of responses, simplifying the entire process.</p></div>
    </div>
    <div className="col-sm-4">
    <form>
        <div className="form-group">
          <label>Email</label>
          <input type="email"  className="form-control" id="email" placeholder="Enter Name"
          
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          
          />

        </div>

        <div className="form-group">
            <label>password</label>
            <input type="password"  className="form-control" id="password" placeholder="Enter Fee"
            
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            
            />
          </div>
                  <button type="submit" className="btn btn-primary" onClick={login} >Login</button>
              </form>
    </div>
</div>
        </div></main>
// <footer className="bd-footer py-3">
//                 <ul className="nav justify-content-center border-bottom pb-3 mb-3">
//                     <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">About Us</a></li>
//                     <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Help</a></li>
//                 </ul>
//                 <p className="text-center text-muted">Copyright &copy; EventEase</p>
//             </footer>
// </div>
    );
  }
  
  export default Login;