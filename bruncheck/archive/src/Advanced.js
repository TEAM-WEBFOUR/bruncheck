import React, { useState, useMemo, useRef, useEffect } from "react";
// import TinderCard from '../react-tinder-card/index'
import TinderCard from "react-tinder-card";
import logo from "./img/logo.png";
import {useMediaQuery} from 'react-responsive';
import qrCode from './img/qr-code.svg'

import { BrowserView, MobileView, isBrowser, isMobile, } from 'react-device-detect';

function Advanced() {
  const isTabletOrMobile = useMediaQuery({maxWidth: 900});

  var db = [
    {
      question: "<Yes No>",
    },
  ];

  var [theData, setData] = useState([]);
  var [theIndex, setIndex] = useState(0);

  const [scorePoint, setScorePoint] = useState("Score");
  var [score, setScore] = useState(null);

  var theScore = 0;

  var [totalEachData, setTotalEachData] = useState({
    breakfast: null,
    brunch: null,
    lunch: null,
    snack: null,
    dinner: null,
    dessert: null,
    total: null,
  });

  useEffect(() => {
    // theIndex === testQuestions.length - 1
    //   ? setIndex(0)
    //   : setIndex(theIndex + 1);
    // axios.get("https://www.bruncheck.com/api/questions/")
    // .then((response) => response.json())
    // .then((data) => setData(data));

    var headers = {};

    fetch("https://www.bruncheck.com/api/questions/")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch(function (error) {
        console.log(`the error is ${error}`);
      });
  });

  const [currentIndex, setCurrentIndex] = useState(db.length - 1);
  const [lastDirection, setLastDirection] = useState();
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < db.length - 1;

  const canSwipe = currentIndex >= 0;

  // set last direction and decrease current index
  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (question, idx) => {
    console.log(
      `${question} (${idx}) left the screen!`,
      currentIndexRef.current
    );
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  };

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < db.length) {
      await childRefs[currentIndex].current.swipe(dir);
      console.log("Swipped yeah "); // Swipe the card!
    }
  };

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
  };

  return (
    <div className="app" id="root">
      
      {isMobile? 
      
      <>
      <div
        id="title"
        style={{
          color: "#E78200",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
        className="mb-4"
      >
        {/* <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-bell" viewBox="0 0 16 16">
  <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>
</svg> */}
        <img src={logo} style={{ height: "90px", width: "90px" }} alt="Logo" />

        <p>Bruncheck</p>
      </div>
      <div className="card mb-5" style={{ backgroundColor: "#E78200" }}>
        {/* {score === null ? <h3>{scorePoint}</h3> : score.includes("NaN") ? <h3>{scorePoint}</h3> : <h3>{score + " " + scorePoint}</h3>} */}
        {theIndex < theData.length ? (
          <h3>Score</h3>
        ) : (
          <h3>{score + " " + scorePoint}</h3>
        )}
      </div>
      <div className="card mb-5" style={{ backgroundColor: "#36B3C9" }}>
        {theIndex < theData.length ? (
          <h3>{theData[theIndex].question}</h3>
        ) : (
          <h3>DONE</h3>
        )}
      </div>
      <div className="mt-5">
        {theData.reverse().map((value, index) => (
          <TinderCard
            ref={childRefs[index]}
            className="swipe"
            key={value.question}
            onSwipe={(dir) => {
              // console.log(dir);
              setIndex((theIndex) => theIndex + 1);
              swiped(dir, value.question, index);
              // console.log(value);
              if (dir === "right") {
                totalEachData.breakfast =
                  value.breakfast + totalEachData.breakfast;
                totalEachData.brunch = value.brunch + totalEachData.brunch;
                totalEachData.lunch = value.lunch + totalEachData.lunch;
                totalEachData.snack = value.snack + totalEachData.snack;
                totalEachData.dinner = value.dinner + totalEachData.dinner;
                totalEachData.dessert = value.dessert + totalEachData.dessert;
                totalEachData.total =
                  totalEachData.breakfast +
                  totalEachData.brunch +
                  totalEachData.lunch +
                  totalEachData.snack +
                  totalEachData.dinner +
                  totalEachData.dessert;
              }

              console.log(totalEachData);

              const arrayTotal = [
                totalEachData.breakfast,
                totalEachData.brunch,
                totalEachData.lunch,
                totalEachData.snack,
                totalEachData.dinner,
                totalEachData.dessert,
              ];
              const maxPoint = Math.max(...arrayTotal);

              // setScore((maxPoint/totalEachData.total)*1);

              theScore = (maxPoint / totalEachData.total) * 1;

              theScore * 4 < 1
                ? (theScore = theScore * 4)
                : (theScore = theScore);

              var option = {
                style: "percent",
              };

              // setScore((Math.round(theScore * 100) / 100).toFixed(2))

              var formatter = new Intl.NumberFormat("en-US", option);
              setScore(formatter.format(theScore));
              // var percentFormat = formatter.format(num / 100);
              console.log(score);
              console.log(theScore);

              switch (maxPoint) {
                case totalEachData.breakfast:
                  setScorePoint("Breakfast");
                  break;

                case totalEachData.brunch:
                  setScorePoint("Brunch");
                  break;

                case totalEachData.lunch:
                  setScorePoint("Lunch");
                  break;

                case totalEachData.snack:
                  setScorePoint("Snack");
                  break;

                case totalEachData.dinner:
                  setScorePoint("Dinner");
                  break;

                case totalEachData.dessert:
                  setScorePoint("Dessert");
                  break;

                default:
                  break;
              }

              // console.log(scorePoint);
            }}
            onCardLeftScreen={() => outOfFrame(value.question, index)}
          >
            {/* <h1>{character.url}</h1> */}
            {/* <h3 className="text-center">{character.answer.toString()}</h3> */}
            <div
              id="swipper"
              style={{
                color: "#E78200",
                width: "30rem",
                justifyContent: "center",
                alignItems: "center",
              }}
              className="container row text-center"
            >
              <div className="col">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  fill="currentColor"
                  class="bi bi-arrow-left-circle-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
                </svg>
              </div>
              <div className="col">
                <h3 className="text-center">Swipe</h3>
              </div>
              <div className="col">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  fill="currentColor"
                  class="bi bi-arrow-right-circle-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                </svg>
              </div>
            </div>
          </TinderCard>
        ))}
      </div>
      {/* <div className="buttons"> */}
      {/* <button
          style={{ backgroundColor: !canSwipe && "#c3c4d3" }}
          onClick={() => swipe("left")}
        >
          Swipe left!
        </button> */}
      {/* <button
          style={{ backgroundColor: !canGoBack && "#E78200" }}
          onClick={() => {
            console.log(theData);
            goBack();
          }}
        >
          Undo swipe
        </button> */}
      {/* <button
          style={{ backgroundColor: !canSwipe && "#c3c4d3" }}
          onClick={() => swipe("right")}
        >
          Swipe right!
        </button> */}
      {/* </div> */}
      {lastDirection ? (
        <h2 key={lastDirection} className="infoText">
          {lastDirection === "left" ? (
            <p>You swiped no</p>
          ) : (
            <p>You swiped yes</p>
          )}
        </h2>
      ) : (
        <h2 className="infoText">Swipe right for yes, left for no</h2>
      )}

      {/* <h2 key={lastDirection} className="infoText">
          You swiped{" "}
          {lastDirection === "left" ? <p>&nbsp;no</p> : <p>&nbsp;yes</p>}
        </h2> */}
      
      </>
      
      
      :

      <div>
        <h2 className="mb-5 fw-bold" style={{color: '#29A2B7'}}>Scan this QR code using your<br/> mobile to access this platform</h2>
        <img src={qrCode} height='250rem'/>
      </div>}
    </div>
  );
}

export default Advanced;

