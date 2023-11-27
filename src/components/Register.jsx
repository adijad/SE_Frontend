import {  useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
import './EventCategories.css';
import {Link} from "react-router-dom";
function Register() {
  
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();



    async function save(event) {
        event.preventDefault();
        try {
          if(username==="" || email===""||password==="")
          {
            alert("All fields are required");
          }
          else{
          await axios.post("http://localhost:8080/api/v1/user/save", {
          username: username,
          email: email,
          password: password,
          });
          
          alert("User Registation Successfully");
          navigate('/home');
          }
        } catch (err) {
          alert(err);
        }
      }
  
    return (
      // <div className="eventCategoriesContainer">
      // <header>
      //                 <nav className="navbar navbar-expand-lg">
      //                     <div className="container-fluid">
      //                         <a className="navbar-brand" href="#">EventEase</a>
      //
      //                             <span className="d-flex">
      //                             <Link to="/login"> <button type="button" className="btn btn-outline-primary">Login</button></Link>
      //                             </span>
      //                     </div>
      //                 </nav>
      //       </header>
      <main>
<div className="container loginDiv">
    <div className="container mt-4" >
            <h1>User Registation</h1>
    
    <form>
        <div className="form-group">
          <label>User name</label>
          <input type="text"  className="form-control" id="username" placeholder="Enter Name" required
          
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          />

        </div>

        <div className="form-group">
          <label>email</label>
          <input type="email"  className="form-control" id="email" placeholder="Enter Email" required
          
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          
          />
 
        </div>

        <div className="form-group">
            <label>password</label>
            <input type="password"  className="form-control" id="password" placeholder="Enter password" required
            
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            
            />
          </div>

        <button type="submit" className="btn btn-primary mt-4" onClick={save} >Save</button>
       
      </form>
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
  
  export default Register;