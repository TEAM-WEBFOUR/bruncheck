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
    // theIndex === testQuestions.length - 1
    //   ? setIndex(0)
    //   : setIndex(theIndex + 1);
    // axios.get("https://www.bruncheck.com/api/questions/")
    // .then((response) => response.json())
    // .then((data) => setData(data));
    console.log(data);
  });

  const renderBody = () => {
    return (
      data &&
      data.map(
        ({
          question,
          answer,
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
              <td>
                {answer ? (
                  <button className="btn btn-sm btn-success me-2">True</button>
                ) : (
                  <button className="btn btn-sm btn-warning me-2">False</button>
                )}
              </td>
              <td>{breakfast}</td>
              <td>{brunch}</td>
              <td>{lunch}</td>
              <td>{snack}</td>
              <td>{dinner}</td>
              <td>{dessert}</td>
              <td className="opration">
                <button className="btn btn-sm btn-outline-danger me-2">
                  Edit
                </button>
                <button className="btn btn-sm btn-outline-danger ms-1">
                  Delete
                </button>
              </td>
            </tr>
          );
        }
      )
    );
  };

  // const theQuestionsList = () => {
  //   return data.map((currentpackage) => {
  //     return <Question package={currentpackage} key={currentpackage._id} />;
  // };

  return (
    <>
      <Navbar />
      <div className="ms-5 me-5 mt-5">
        <h3 className="fs-1 mb-3">Logged Questions</h3>
        <table className="table table-striped table-borderless">
          <thead className="thead-light">
            <tr>
              <th>Question</th>
              <th>Answer</th>
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

// export default class PackagesList extends Component {
//   constructor(props) {
//     super(props);

//     this.deletePackage = this.deletePackage.bind(this);

//     this.state = { packages: [] };
//   }

//   componentDidMount() {
//     axios
//       .get("http://3.16.123.62:5000/packages/")
//       .then((response) => {
//         this.setState({ packages: response.data });
//       })
//       .catch((error) => {
//         console.log(error);
//       });

//       fetch("https://www.bruncheck.com/api/questions/")
//       .then((response) => response.json())
//       .then((data) => setData(data));
//   }

//   deletePackage(id) {
//     axios.delete("http://3.16.123.62:5000/packages/" + id).then((response) => {
//       console.log(response.data);
//     });

//     this.setState({
//       package: this.state.packages.filter((el) => el._id !== id),
//     });
//     window.location.reload();
//   }

//   packageList() {
//     return this.state.packages.map((currentpackage) => {
//       return (
//         <Question
//           package={currentpackage}
//           deletePackage={this.deletePackage}
//           key={currentpackage._id}
//         />
//       );
//     });
//   }

//   render() {
//     return (
//       <div className="ms-5 me-5">
//         <h3 className="fs-1 mb-3">Logged Packages</h3>
//         <table className="table table-striped table-borderless">
//           <thead className="thead-light">
//             <tr>
//               <th>DepartureDate</th>
//               <th>Exporter</th>
//               <th>Total</th>
//               <th>Value</th>
//               <th>Quantity</th>
//               <th>Weight</th>
//               <th>Destination</th>
//               <th>User</th>
//               <th></th>
//             </tr>
//           </thead>
//           <tbody>{this.packageList()}</tbody>
//         </table>
//       </div>
//     );
//   }
// }
