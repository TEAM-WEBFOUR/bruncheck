const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer  = require('multer');
const router = express.Router();

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: null,
}));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
app.use(express.json());

console.log("TEST");



const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const questionsRouter = require("./routes/questions");
const usersRouter = require("./routes/users");
const settingRouter = require('./routes/setting')
const uploadersRouter = require('./routes/uploaders')


  
  
app.use("/questions", questionsRouter);
app.use("/users", usersRouter);
app.use('/setting', settingRouter);
// app.use('/upload', uploadersRouter);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../src/img/')
  },
  filename: (req, file, cb) => {
    cb(null, "logo.png")
  },
})

const upload = multer({ storage: storage })

app.post('/image', upload.single('file'), function (req, res) {
  res.json({})
})


app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});



// router.post('/a/update', upload.single('image'), (req, res, next) => {
//   console.log("TES66");
//   const url = req.protocol + '://' + req.get('host')
//   const logo = new Logo({
//       // _id: new mongoose.Types.ObjectId(),
//       // name: req.body.name,
//       image: url + '/public/' + req.body.image
//   });
//   logo.save().then(result => {
//       res.status(201).json({
//           message: "Logo updated successfully!",
//           imageUploaded: {
//               image: result.image
//           }
//       })
//   }).catch(err => {
//       console.log(err),
//           res.status(500).json({
//               error: err
//           });
//   })
// });

// const DIR = './public/';

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, DIR);
//     },
//     filename: (req, file, cb) => {
//         const fileName = file.originalname.toLowerCase().split(' ').join('-');
//         cb(null, uuidv4() + '-' + fileName)
//     }
// });



// app.use(cors({
//   origin: 'https://bruncheck.com/',
// }));
// app.options('*', cors());
// const corsOpts = {
//   origin: '*',
//   credentials: true,
//   methods: ['GET','POST','HEAD','PUT','PATCH','DELETE'],
//   allowedHeaders: ['Content-Type'],
//   exposedHeaders: ['Content-Type']
// };
// app.all('*', function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });
// app.use(cors(corsOpts));



// app.use(function(req, res, next){
//   res.header("Access-Control-Allow-Origin", "*");
//   next();
//   });
