import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

const pc = {
  board: {
    vendor: "IBM",
    model: "IBM-PC S-100",
    cpu: {
      model: "80286",
      hz: 12000
    },
    image: "http://www.s100computers.com/My%20System%20Pages/80286%20Board/Picture%20of%2080286%20V2%20BoardJPG.jpg",
    video: "http://www.s100computers.com/My%20System%20Pages/80286%20Board/80286-Demo3.mp4"
  },
  ram: {
    vendor: "CTS",
    volume: 1048576,
    pins: 30
  },
  os: "MS-DOS 1.25",
  floppy: 0,
  hdd: [
    {
      vendor: "Samsung",
      size: 33554432,
      volume: "C:"
    },
    {
      vendor: "Maxtor",
      size: 16777216,
      volume: "D:"
    },
    {
      vendor: "Maxtor",
      size: 8388608,
      volume: "C:"
    }
  ],
  monitor: null,
  length:42,
  height:21,
  width:54
};

var _ = require('lodash');

app.get('/task3A/:id1?/:id2?/:id3?', function(req, res) {
  console.log("id1 = " + req.params.id1);
  console.log("id2 = " + req.params.id2);
  console.log("id3 = " + req.params.id3);
  let hdd = {};
  if (req.params.id1 === `volumes`) {
    pc.hdd.forEach((item)=>{
      hdd[item.volume] = hdd[item.volume] || 0;
      hdd[item.volume] += item.size;
    });
    pc.hdd.forEach((item)=>{
      if (hdd[item.volume].toString().slice(-1)!==`B`) {
        hdd[item.volume]+=`B`;
      }
    });
    return res.json(hdd);
  }
  else if (req.params.id1 === undefined){
    return res.json(pc);
  }
  else if (req.params.id2 === undefined){
    if (_.has(pc,`${req.params.id1}`)){
      return res.json(_.get(pc,`${req.params.id1}`));
    }
    else res.sendStatus(404);
  }
  else if (req.params.id3 === undefined){
    if (_.has(pc,`${req.params.id1}.${req.params.id2}`)){
    return res.json(_.get(pc,`${req.params.id1}.${req.params.id2}`,"Not Found"));
    }
    else res.sendStatus(404);
  }
  else{
    if (_.has(pc,`${req.params.id1}.${req.params.id2}.${req.params.id3}`)){
    return res.json(_.get(pc,`${req.params.id1}.${req.params.id2}.${req.params.id3}`,"Not Found"));
    }
    else res.sendStatus(404);
  }
});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
