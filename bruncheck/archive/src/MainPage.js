import React, { useState, useRef, useEffect } from "react";
import logo from "./img/logo.png";
import { useSwipeable } from "react-swipeable";
import { motion, useMotionValue, useTransform } from "framer-motion";
import yesIcon from "./img/yes.png";
import noIcon from "./img/no.png";
import swipeIcon from "./img/Icon_Hand.png";
import { config } from "react-spring";
import startIcon from "./img/Icon_Start.png";

import certBreakfast from './img/cert/Icon_Breakfast.png';
import certBrunch from './img/cert/Icon_Brunch.png';
import certDessert from './img/cert/Icon_Dessert.png';
import certDinner from './img/cert/Icon_Dinner.png';
import certLunch from './img/cert/Icon_Lunch.png';
import certSnack from './img/cert/Icon_Snack.png';

import Certificate from './img/Certificate.png';

export default function MainPage() {
  var [setting, setSetting] = useState(async () => {
    await fetch(
      `https://www.bruncheck.com/api/setting/6212e4b8669c2894855d121c`
    )
      .then((response) => response.json())
      .then((data) => setSetting(data));
  });

  const x = useMotionValue(0);

  var [theData, setData] = useState([]);
  const [randomArray, setRandomArray] = useState([0]);
  const [play, setPlay] = useState(false);
  const [finished, setFinished] = useState(false);
  const [theIndex, setIndex] = useState(0);
  const [yesIconSize, setYesIconSize] = useState(50);
  const [noIconSize, setNoIconSize] = useState(50);
  var [totalEachData, setTotalEachData] = useState({
    breakfast: null,
    brunch: null,
    lunch: null,
    snack: null,
    dinner: null,
    dessert: null,
    total: null,
  });
  const [portionTotal, setPortionTotal] = useState({
    breakfast: null,
    brunch: null,
    lunch: null,
    snack: null,
    dinner: null,
    dessert: null,
  });

  const [score, setScore] = useState(0);
  const [maxType, setMaxType] = useState(null);
  const [maxTypeImage, setMaxTypeImage] = useState(null);

  function scoreSetter(){
    console.log("SET SCORE")
    const values = Object.values(portionTotal);
    console.log(values); 

    const max = Math.max(...values);
    console.log('max' + max); 

    var maxKey = Object.keys(portionTotal).reduce((a, b) => portionTotal[a] > portionTotal[b] ? a : b);
    setMaxType(maxKey.charAt(0).toUpperCase() + maxKey.slice(1));
    maxKey === 'breakfast' && setMaxTypeImage(certBreakfast);
    maxKey === 'brunch' && setMaxTypeImage(certBrunch);
    maxKey === 'lunch' && setMaxTypeImage(certLunch);
    maxKey === 'snack' && setMaxTypeImage(certSnack);
    maxKey === 'dinner' && setMaxTypeImage(certDinner);
    maxKey === 'dessert' && setMaxTypeImage(certDessert);

    const score = max * 400;
    score <= 100 ? setScore(Math.round(score)) : setScore(100);
  }

  const handlers = useSwipeable({
    onSwipedLeft: (eventData) => {
        console.log("portion");
        console.log(portionTotal);
    },
    onSwiping: (eventData) => {
      if (eventData.dir === "Left") {
        setNoIconSize(50 + eventData.deltaX * -1);
        setYesIconSize(50);
      } else if (eventData.dir === "Right") {
        setYesIconSize(50 + eventData.deltaX);
        setNoIconSize(50);
      }
    },
    onSwiped: async (eventData) => {
        if ( await eventData.dir === "Right" && (theIndex < randomArray.length && play)) {
            totalEachData.breakfast = totalEachData.breakfast + theData[randomArray[theIndex]].breakfast;
            totalEachData.brunch = totalEachData.brunch + theData[randomArray[theIndex]].brunch;
            totalEachData.lunch = totalEachData.lunch + theData[randomArray[theIndex]].lunch;
            totalEachData.snack = totalEachData.snack + theData[randomArray[theIndex]].snack;
            totalEachData.dinner = totalEachData.dinner + theData[randomArray[theIndex]].dinner;
            totalEachData.dessert = totalEachData.dessert + theData[randomArray[theIndex]].dessert;
            totalEachData.total =
            totalEachData.breakfast +
            totalEachData.brunch +
            totalEachData.lunch +
            totalEachData.snack +
            totalEachData.dinner +
            totalEachData.dessert;

            setPortionTotal({
                breakfast: totalEachData.breakfast / totalEachData.total,
                brunch: totalEachData.brunch / totalEachData.total,
                lunch: totalEachData.lunch / totalEachData.total,
                snack: totalEachData.snack / totalEachData.total,
                dinner: totalEachData.dinner / totalEachData.total,
                dessert: totalEachData.dessert / totalEachData.total,
            })

            console.log("total");
            console.log(totalEachData);
        }

        setYesIconSize(50);
        setNoIconSize(50);
    //   console.log(randomArray);
        if (theIndex < randomArray.length - 1){ 
            setIndex(theIndex + 1)
        }
        else {
            console.log("finished");
            setFinished(true);
            scoreSetter();
        }
    },
  });

  const handlePlay = useSwipeable({
    onSwiped: (eventData) => {
      setPlay(true);
    },
  });

  useEffect(() => {
    fetch("https://www.bruncheck.com/api/questions/")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        

        const nums = new Set();
        while (nums.size !== 7) {
          nums.add(Math.floor(Math.random() * data.length));
        }
        setRandomArray(Array.from(nums));
        console.log([...nums]);
      })
      .catch(function (error) {
        console.log(`the error is ${error}`);
      });
  }, []);

  const tickPath = useTransform(x, [10, 100], [0, 1]);
  const crossPathA = useTransform(x, [-10, -55], [0, 1]);
  const crossPathB = useTransform(x, [-50, -100], [0, 1]);

  var progressBar =
    theData.length > 0 ? ((theIndex + 1) / randomArray.length) * 100 : 0;

  return (
    <div className="pe-4 ps-4 text-center overflow-hidden" style={!play || finished ? {height: '120vh'} : {height: '120vh'}}>
      <img
        alt="logo"
        src={!finished? logo : Certificate}
        width="100%"
        style={finished ? {} : {marginTop: "0%", marginBottom: "15%"} }
        className='mx-center text-center'
      />

      {/* Questions */}
      {!play ? (
        <div>
          <h2 className="fw-bold fs-1" style={{ color: "#3B3B3B", marginBottom: "25%" }}>
            Test to see if your meal is really brunch or not
          </h2>
          <h2 className="fw-bold mb-1 mt-5 fs-1" style={{ color: "#3B3B3B" }}>
            Swipe below to play
          </h2>
          <div className="row mt-3 content justify-content-center p-0">
            <div
              className="col m-0 content text-center justify-content-center position-absolute"
              // {...handlers}
              style={{
                backgroundColor: setting.color,
                zIndex: -1,
                borderRadius: "30px",
                height: 90,
                width: "83%",
              }}
            />
            <motion.div
              {...handlePlay}
              className="box mx-auto col-4"
              style={{ x, zIndex: 9 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1.0}
            >
              <img src={startIcon} height="60" />
            </motion.div>
          </div>
        </div>
      ) : (
        <>
          {finished ? (
            <>
            {/* <h1 style={{color: '#3B3B3B', marginTop: '-25%', fontWeight: 'bolder', marginBottom: '7%', fontSize: '45px'}}>CERTIFIED</h1> */}
            <img src={maxTypeImage} style={{width: '40vw', marginTop: '10%'}}/>
            <h1 style={{color: '#3B3B3B', marginTop: '1%', fontWeight: 'bold', marginBottom: '1%', fontSize: '55px'}}>{maxType}</h1>

            <div
                className="mb-3 mt-2 pe-4 ps-4 pt-0 pb-0 content mx-auto text-center justify-content-center"
                style={{
                  backgroundColor:
                    typeof setting !== undefined ? setting.color : "#38B2C9",
                  borderRadius: "30px",
                  height: 90,
                  width: "83vw",
                }}
              >
                  <div className="p-0 m-0">
                    <p className="m-0 p-0 fw-bold fs-4 text-white">Certainty Score:</p>
                    <p className="m-0 p-0 fw-bold fs-1 text-white">{score}%</p>
                  </div>
             </div>
                <a href='https://www.instagram.com/explore/tags/bruncheck/?hl=en' style={{'textDecoration': 'none'}} target='_blank'>
                    <p className="m-0 p-0 fw-bold fs-4" style={{color:"#38B2C9"}}>{setting.finishedStr} <u> #bruncheck</u></p>
                </a>


            </>
          ) : (
            <>
              <div
                className="mb-3 mt-3 pe-4 ps-4 pt-0 pb-0 content mx-auto text-center justify-content-center"
                style={{
                  backgroundColor:
                    typeof setting !== undefined ? setting.color : "#38B2C9",
                  borderRadius: "30px",
                  height: 90,
                  width: "83vw",
                }}
              >
                {theIndex < theData.length && theIndex < randomArray.length ? (
                  <p className="m-0 p-0 fw-bold fs-4 text-white">
                    {theData[randomArray[theIndex]].question}
                  </p>
                ) : (
                  <p className="m-0 p-0 fw-bold fs-4 text-white">DONE</p>
                )}
              </div>

              <div
                className="progress mx-auto"
                style={{
                  height: "2.3rem",
                  borderRadius: "40px",
                  width: "93%",
                  backgroundColor: "#D9D9D9",
                }}
              >
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{
                    width: `${progressBar}%`,
                    borderRadius: "40px",
                    backgroundColor:
                      typeof setting !== undefined ? setting.color : "#38B2C9",
                  }}
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                />
              </div>

              <div className="row mt-3 content justify-content-center p-0">
                <div
                  className="col m-0 content text-center justify-content-center position-absolute"
                  style={{
                    backgroundColor: "#D9D9D9",
                    zIndex: 1,
                    borderRadius: "30px",
                    height: 90,
                    width: "83%",
                  }}
                />
                <img
                  className="col-3 p-0 position-relative"
                  src={noIcon}
                  style={{
                    width: `${noIconSize}px`,
                    zIndex: 10,
                    maxWidth: 80,
                    height: `${noIconSize}px`,
                    maxHeight: 80,
                    left: 0,
                  }}
                />

                <motion.div
                {...handlers} 
                  className="mx-auto col-4 box p-5" 
                  style={{ x, zIndex: 13, left: 0, right: 0, top: 0, bottom: 0, width: "55%" }}
                  drag="x"
                  dragConstraints={{ left: true, right: true, top: true, bottom: true }}
                  dragElastic={1.0}
                >
                  <img style={{ x, zIndex: 9 }} src={swipeIcon} height="60" >
                  </img>
                </motion.div>

                <img
                  className="col-3 position-relative p-0"
                  src={yesIcon}
                  style={{
                    width: `${yesIconSize}px`,
                    zIndex: 10,
                    maxWidth: 80,
                    height: `${yesIconSize}px`,
                    maxHeight: 80,
                    right: 0,
                  }}
                />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

