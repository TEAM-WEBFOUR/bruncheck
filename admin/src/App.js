import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./Components/navbar.component";
import QuestionsList from "./Components/questions-list.component";

function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <Route path="/" exact component={QuestionsList} />
    </Router>
  );
}

export default App;
