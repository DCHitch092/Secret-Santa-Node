import express from "express";
import mongoose from 'mongoose';
import bodyparser from "body-parser";
import {Owner} from './models/owner.js';
import {Want} from './models/want.js';
import {Participant} from './models/participant.js';
import {Result} from './models/result.js';
import {config} from 'dotenv';
import generateValidResult from './utilities/generateValidResult.js'
import createPDF from './src/createPDF.js';

config();
const PASSWORD = process.env.MONGODB
const app = express();
const port = 4000;

var uri = `mongodb+srv://Chumchi:${PASSWORD}@dchitch092.ok1hp6k.mongodb.net/SecretSanta?retryWrites=true&w=majority`;

mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });
const connection = mongoose.connection;

connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});

const router = express.Router();

app.get('/', (req, res) => {
  res.send('hello world')
})
app.use("/", router);
app.use(bodyparser.json());

app.listen(port, function() {
  console.log("Server is running on Port: " + port);
});

// OWNERS
app.get("/owners", (req, res) =>{
  Owner.find({}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/owners/add", (req, res) => {
  Owner.insertMany(req.body, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

// PARTICIPANTS
app.get("/participants", (req, res) => {
  Participant.find({}, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/participants/add", (req, res) => {

    const responseArray = []

    req.body.forEach((item) => {

      const participant = new Participant({
        name: item.name,
        type: item.type
      });


    item.wants.forEach((item) => {

      Want.create({ name: item.name, participant: participant._id}, (err, small) => {
        if (err) handleError(err)
      })

    })

    participant.save();
    responseArray.push(participant);
  })

  res.send(responseArray);

});

app.get("/participants/:name", (req, res) => {
  Participant.find({name: req.params.name}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result)
    }
  })
});

// WANTS
app.get("/wants", (req, res) => {
  Want.find({}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});


app.post("/wants/add", (req, res) => {
  Want.insertMany(req.body, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/wants/by-name", (req, res) => {
  Want.findOne({ name: req.body[0].name}, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/wants/by-participant/:name", (req, res) => {
  const target = Participant.findOne({ name: req.params.name})
  Want.find({ participant: target._id }, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result)
    }
  });
});

app.get("/result/generate", async (req, res) => {

  const participants = await Participant.find({});

  const owners = await Owner.find({});

  const result = generateValidResult( owners, participants )

  Result.create({ outcomes: result}, (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result)
      }
  })

})

app.get("/result/by-id/:id", (req, res) => {
  const id = req.params.id
  Result.findById(id, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/result/latest", async (req, res) => {

  Result.findOne({}).sort({ createdAt: 'desc'}).then((err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  })

})

app.get("/result/render-latest", async (req, res) => {

  Result
    .findOne({})
    .sort({ createdAt: 'desc'})
    .exec()
    .then(
      (res) => {
        // console.log(JSON.stringify(res))
        res.outcomes.forEach(( ownerData ) => {
          createPDF(ownerData);
        })
      })

      res.send("PDFs Generated!")
  // const result = createPDF(data);

})
