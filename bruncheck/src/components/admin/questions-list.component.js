import React, { Component, useState, useMemo, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./navbar.component";

export default function QuestionsList() {
  
  var [data, setData] = useState(() => {
    fetch("https://www.bruncheck.com/api/questions/")
      .then((response) => response.json())
      .then((data) => setData(data));
  });

  useEffect(() => {
    console.log(data);
  });

  const renderBody = () => {
    return (
      data &&
      data.map(
        ({
          question,
          // answer,
          breakfast,
          brunch,
          lunch,
          snack,
          dinner,
          dessert,
          _id,
        }) => {
          return (
            <tr key={_id}>
              <td>{question}</td>
              {/* <td>
                {answer ? (
                  <button className="btn btn-sm btn-success me-2">True</button>
                ) : (
                  <button className="btn btn-sm btn-warning me-2">False</button>
                )}
              </td> */}
              <td>{breakfast}</td>
              <td>{brunch}</td>
              <td>{lunch}</td>
              <td>{snack}</td>
              <td>{dinner}</td>
              <td>{dessert}</td>
              <td className="opration">
                <button className="btn btn-sm btn-outline-dark me-2" onClick={()=>{
                  window.open("/admin/questions/edit/"+ _id, "_self");
                }}>
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-outline-danger ms-1"
                  onClick={() => {
                    fetch(`https://www.bruncheck.com/api/questions/${_id}`, {
                      method: "DELETE",
                    })
                      .then((response) => response.json())
                      .then((data) => {
                        console.log(data);
                        window.open("/admin", "_self");
                      });
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        }
      )
    );
  };

  return (
    <>
      <Navbar />
      <div id="admin" className="ms-5 me-5 mt-5">
        <h3 className="fs-1 mb-3">Logged Questions</h3>
        <table className="table table-striped table-borderless">
          <thead className="thead-light">
            <tr>
              <th>Question</th>
              {/* <th>Answer</th> */}
              <th>Breakfast</th>
              <th>Brunch</th>
              <th>Lunch</th>
              <th>Snack</th>
              <th>Dinner</th>
              <th>Dessert</th>
              <th>Operation</th>
            </tr>
          </thead>
          <tbody>{renderBody()}</tbody>
        </table>
      </div>
    </>
  );
}
