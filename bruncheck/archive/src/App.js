import "./App.css";
// import Navbar from "./components/navbar";
import React, {useState} from "react";
import ReactDOM from "react-dom";
import Cards from "./components/cards";
import Advanced from "./Advanced";
import MainPage from "./MainPage";
import QRCode from "./QRCode";
import Auth from "./components/admin/auth.component";

import { BrowserRouter as Router, Route } from "react-router-dom";
// import Navbar from "./components/admin/navbar.component";÷
import QuestionsList from "./components/admin/questions-list.component";
import AddQuestion from "./components/admin/add-question.component";
import EditQuestion from "./components/admin/edit-question.component";
import Settings from "./components/admin/settings.component";

import useToken from "./components/admin/useToken";

import { BrowserView, MobileView, isBrowser, isMobile, } from 'react-device-detect';

// import { isLoggedIn } from "./components/admin/login.handler";

function App() {

  const {token, setToken} = useToken();


//   const handleSubmit = async e => {
//     e.preventDefault();
//             try {
//             fetch("https://www.bruncheck.com/api/users/login", {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json",
//               },
//               body: JSON.stringify(data),
//             })
//               .then((response) => {
//                 response.json();
//                 console.log(response);
//               })
//               .then((data) => {
//                 console.log(data);
//                 // props.history.push("/admin");
//                 window.open("/admin", "_self");
//                 alert(data);
//               });
//             } catch (error) {
//                 console.log(error);
//             }

//     setUser(response.data)
//     // store the user in localStorage
//     localStorage.setItem('user', response.data)
//     console.log(response.data)
// };

// const theAuth = () => {
//   return(
//     <section className="pt-5" style={{height: '100vh'}}>
//         <div className="row text-center justify-content-center align-items-center">
//             <div className="col-5 bg-danger p-5" style={{'borderRadius': '11px'}}>
//                 <h1 className="text-light mb-5" style={{'fontWeight': 700}}>Login</h1>
//                 <form>
//                     <div className="mb-3">
//                         <label className="form-label text-white">Email address</label>
//                         <input type="email" className="form-control" 
//                         onChange={e => {
//                           setData( {...data, email: e.target.value });
//                           console.log(data);
//                         }}
//                         defaultValue={data.email}
//                         // value={data.email}
//                         />
//                     </div>
//                     <div className="mb-3 text-white">
//                         <label className="form-label">Password</label>
//                         <input type="password" className="form-control" onChange={e => setData({ ...data, password: e.target.value })} />
//                     </div>
//                     <button type="submit" className="btn btn-primary">Submit</button>
//                 </form>
//             </div>
//         </div>
        
//     </section>
//  );
// };



  return (
    <Router>
      {/* <Navbar /> */}
      <Route path="/" exact component={isMobile? MainPage : QRCode} />
      <Route path="/admin" exact component={!token? Auth: QuestionsList} />
      {/* <Route path="/admin" exact component={QuestionsList} /> */}
      <Route path="/admin/questions/add" exact component={AddQuestion} />
      <Route path="/admin/questions/edit/:id" exact component={EditQuestion} />
      <Route path="/admin/settings" exact component={Settings} />
    </Router>
  );
}

export default App;
