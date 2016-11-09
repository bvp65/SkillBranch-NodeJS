import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.get('/', (req, res) => {
  res.json({
    hello: 'JS World',
  });
});

app.get('/task2A', (req, res) => {
    const sum = (+req.query.a||0) + (+req.query.b||0);
	res.send(sum.toString());
});

app.get('/task2B', (req, res) => {
    const badName = 'Invalid fullname';

    var nameFull = req.query.fullname;
    var nameFirst, nameOwn, nameLast;
    var array1 = nameFull.split(' ');

    if (array1.length == 3) {
    	nameFirst = array1[2];
    	nameOwn = array1[0];
    	nameLast = array1[1];
    	nameFull = nameFirst + ' ' + nameOwn[0] + '. ' + nameLast[0]+'.';
    } else if (array1.length == 2) {
    	nameFirst = array1[1];
    	nameOwn = array1[0];
    	nameFull = nameFirst + ' ' + nameOwn[0]+'.';
    } else if (array1.length == 1) {
    	nameFirst = array1[0];
    	nameFull = nameFirst;
    } else {
    	nameFull = badName;
    }

    if (nameFull.length==0) {
    	nameFull = badName;
    }
    res.send(nameFull);
});


app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
