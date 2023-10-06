import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {

    var [setting, setData] = useState(async () => {
        await fetch(`https://www.bruncheck.com/api/setting/6212e4b8669c2894855d121c`)
          .then((response) => response.json())
          .then((data) => setData(data));
    });

    return (
      <nav className="navbar navbar-expand-lg navbar-dark shadow fixed-top" style={{backgroundColor: `${setting.color}`}}>
        <div class="container">
          <a class="navbar-brand" href="/admin">
            <strong>Bruncheck</strong>
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
                <Link to="/admin" className="nav-link active">
                  Question List
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/admin/questions/add" className="nav-link active">
                  Add Question
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/admin/settings" className="nav-link active">
                  Settings
                </Link>
              </li>
              <li class="nav-item">
                <Link onClick={()=> {
                  sessionStorage.removeItem("token");
                  window.open("/admin", "_self");
                }} className="nav-link active">
                  Sign out
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
}
