import React, { Component, useState, useMemo, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./navbar.component";

export default function AddQuestion(props) {
  var [data, setData] = useState({
    question: null,
    breakfast: null,
    brunch: null,
    lunch: null,
    snack: null,
    dinner: null,
    dessert: null,
  });

  return (
    <>
      <Navbar />
      <div id="admin" className="ms-5 mb-5 mt-5">
        <form
          onSubmit={(e) => {
            console.log(data);
            e.preventDefault();
            fetch("https://www.bruncheck.com/api/questions/add", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            })
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
                // props.history.push("/admin");
                window.open("/admin", "_self");
                alert(data);
              });
          }}
        >
          <h3 className="fs-1 mb-5">Add New Question</h3>
          <div className="form-group row mb-4">
            <div className="col-2">
              <label className="col-4">Question: </label>
            </div>
            <div className="col-6">
              <input
                type="text"
                required
                className="form-control col-6"
                // value={data.question}
                onChange={(e) => {
                  setData({ ...data, question: e.target.value });
                }}
              />
            </div>
          </div>

          <div className="form-group row mb-4">
            <div className="col-2">
              <label className="col-4">Breakfast: </label>
            </div>
            <div className="col-6">
              <input
                type="Number"
                min="0.0"
                step="0.001"
                max="1.0"
                presicion={3}
                className="form-control col-6"
                // value={this.state.name}
                onChange={(e) => {
                  setData({ ...data, breakfast: e.target.value });
                }}
              />
            </div>
          </div>

          <div className="form-group row mb-4">
            <div className="col-2">
              <label className="col-4">Brunch: </label>
            </div>
            <div className="col-6">
              <input
                type="Number"
                min="0.0"
                step="0.001"
                max="1.0"
                presicion={3}
                // required
                className="form-control col-6"
                // value={this.state.name}
                onChange={(e) => {
                  setData({ ...data, Brunch: e.target.value });
                }}
              />
            </div>
          </div>

          <div className="form-group row mb-4">
            <div className="col-2">
              <label className="col-4">Lunch: </label>
            </div>
            <div className="col-6">
              <input
                type="Number"
                min="0.0"
                step="0.001"
                max="1.0"
                presicion={3}
                // required
                className="form-control col-6"
                // value={this.state.name}
                onChange={(e) => {
                  setData({ ...data, lunch: e.target.value });
                }}
              />
            </div>
          </div>

          <div className="form-group row mb-4">
            <div className="col-2">
              <label className="col-4">Snack: </label>
            </div>
            <div className="col-6">
              <input
                type="Number"
                min="0.0"
                step="0.001"
                max="1.0"
                presicion={3}
                // required
                className="form-control col-6"
                // value={this.state.name}
                onChange={(e) => {
                  setData({ ...data, snack: e.target.value });
                }}
              />
            </div>
          </div>

          <div className="form-group row mb-4">
            <div className="col-2">
              <label className="col-4">Dinner: </label>
            </div>
            <div className="col-6">
              <input
                type="Number"
                min="0.0"
                step="0.001"
                max="1.0"
                presicion={3}
                // required
                className="form-control col-6"
                // value={this.state.name}
                onChange={(e) => {
                  setData({ ...data, dinner: e.target.value });
                }}
              />
            </div>
          </div>

          <div className="form-group row mb-4">
            <div className="col-2">
              <label className="col-4">Dessert: </label>
            </div>
            <div className="col-6">
              <input
                type="Number"
                min="0.0"
                step="0.001"
                max="1.0"
                presicion={3}
                // required
                className="form-control col-6"
                // value={this.state.name}
                onChange={(e) => {
                  setData({ ...data, dessert: e.target.value });
                }}
              />
            </div>
          </div>

          <div className="form-group">
            <input
              type="submit"
              className="btn btn-danger mt-5"
              value="Add Question"
              // onClick={() => {
              //   console.log(data);
              //   fetch("https://www.bruncheck.com/api/questions/add", {
              //     method: "POST",
              //     headers: {
              //       "Content-Type": "application/json",
              //     },
              //     body: JSON.stringify(data),
              //   })
              //     .then((response) => response.json())
              //     .then((data) => {
              //       console.log(data);
              //       // props.history.push("/admin");
              //       // alert(data);
              //     });
              // }}
            />
          </div>
        </form>
      </div>
    </>
  );
}
