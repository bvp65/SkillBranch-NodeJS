import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

function canonize(name) {
	const re = new RegExp('@?(https?:)?(\/\/)?(([a-zA-Z0-9.]*)[^\/]*\/)?([a-zA-Z0-9.]*)', 'i');
	return '@'+name.match(re)[5];
}

app.get('/task2C', (req, res) => {
	console.log(req.query.username);
	const badName = 'Invalid username';
	const usName = canonize(req.query.username);
	console.log(usName);
	res.send(usName);
});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
