import React from "react";
import qrCode from './img/qr-code.svg';
import logo from './img/logo.png';
import { motion } from "framer-motion";

export default function QRCode(){
    return(
        <div className="app" id="root">
            {/* <img src={logo}/> */}
                <motion.img
                src={logo}
                width="10%"
                className='mb-5'
                animate={{
                    scale: [1, 2, 2, 1, 1],
                    rotate: [0, 0, 0, 0, 0],
                    // borderRadius: ["20%", "20%", "50%", "50%", "20%"]
                }}
                transition={{
                    duration: 2.6,
                    ease: "easeInOut",
                    times: [0, 0.2, 0.5, 0.8, 1],
                    repeat: Infinity,
                    repeatDelay: 1.5
                }}
                />

            <h2 className="mb-3 fw-bold" style={{color: '#3B3B3B'}}>Scan this QR code using your<br/> mobile to access this platform</h2>
            <img src={qrCode} height='250rem'/>
        </div>
    );
}