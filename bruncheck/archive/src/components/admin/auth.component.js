import React, {useState} from "react";
import Navbar from "./navbar.component";
import PropTypes from 'prop-types';

import useToken from './useToken';
// async function loginUser(credentials) {
//     return fetch('https://bruncheck.com/api/users/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(credentials)
//     })
//       .then(data => data.json())
//    }

async function loginUser(credentials) {
    
    return await fetch("https://www.bruncheck.com/api/users/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(credentials),
            })
              .then((response) => {
                  console.log(response) + "again0";
                response.json();
                // if (response.status === 200) {
                //   console.log("haha" + response);
                // //   alert(response);
                // } else {
                // }
              })
              .then((data) => {
                console.log(data +"again");
                // props.history.push("/admin");
                // window.open("/admin", "_self");
                alert(data);
              });
   }


export default function Auth(){

    const {token, setToken} = useToken();

    var [data, setData] = useState({
        email: null,
        password: null,
      });

      const handleSubmit = async e => {
        let timeLimit = 10000; // 1 sec time limit
        let failureValue = null;

        e.preventDefault();
        var theToken = await loginUser(data);
        //;
        alert(theToken);
        // if (theToken !== undefined) {
        //   setToken(theToken);
        // }
        console.log("sss" + theToken);
        // window.open("/admin", "_self");
      }
    
    return(
        <section className="pt-5" style={{height: '100vh'}}>
            <div className="row text-center justify-content-center align-items-center">
                <div className="col-5 p-5" style={{'borderRadius': '11px', backgroundColor: "#35B3C9"}}>
                    <h1 className="text-light mb-5" style={{'fontWeight': 700}}>Login</h1>
                    <form onSubmit={async (e)=>{
                        e.preventDefault();

                        try{
                            Promise.race([
                                fetch("https://www.bruncheck.com/api/users/login", {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify(data),
                          })
                            .then((response) => {
                                console.log(response) + "again0";
                              response.json();
                              if (response.status === 200) {
                                console.log("hahaHAHA" + response);
                                setToken(response.data);
                                window.open("/admin", "_self");
                              } else {
                                //   console.log("hehe" + response);
                                  alert("email or password is wrong");
                                  window.open("/admin", "_self");
                              }
                            }),  new Promise((_, reject) =>
                                setTimeout(() => reject(alert("email or password is wrong")), 1000)
                        )
                            ])
                            
                        } catch(err){
                            console.log(err);
                            alert("email or password is wrong");
                        }

                        
                    }}>
                        <div className="mb-3">
                            <label className="form-label text-white">Email address</label>
                            <input type="email" className="form-control" onChange={e => setData( {...data, email: e.target.value })}/>
                        </div>
                        <div className="mb-3 text-white">
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" onChange={e => setData({ ...data, password: e.target.value })} />
                        </div>
                        <button type="submit" className="btn btn-light">Submit</button>
                    </form>
                </div>
            </div>
            
        </section>
    )
}