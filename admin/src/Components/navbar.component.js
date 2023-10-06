import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      // <nav className="navbar navbar-dark bg-danger navbar-expand-lg ps-4">
      //   <Link to="/" className="navbar-brand">
      //     <strong>Bruncheck</strong>
      //   </Link>
      //   <div className="collpase navbar-collapse">
      //     <ul className="navbar-nav mr-auto">
      //       <li className="navbar-item">
      //         <Link to="/" className="nav-link">
      //           Questions List
      //         </Link>
      //       </li>
      //       <li className="navbar-item">
      //         <Link to="/create" className="nav-link">
      //           Create Questions
      //         </Link>
      //       </li>

      //     </ul>
      //   </div>
      // </nav>
      <nav class="navbar navbar-expand-lg navbar-dark bg-danger shadow fixed-top">
        <div class="container">
          <a class="navbar-brand" href="#">
            Bruncheck
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">
                  Questions List
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Add Question
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
