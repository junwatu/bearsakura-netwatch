// create express app
import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import * as griddb from './griddbservice.js'

const app = express();
app.use(bodyParser.json());

const PORT = process.env.DATABASE_SERVER_PORT || 4000;

app.get('/info', (req, res) => {
	res.json({ message: 'database server' });
});

app.post('/save-packets', async (req, res) => {
	const packets = req.body;
	console.log(packets);
	griddb.saveData(packets);
	res.json({ message: 'saved' });
});

app.get('/get-all-packets', async (req, res) => {
	const packets = await griddb.getAllData();
	res.json({ packets });
})

app.listen(PORT, () => {
	console.log(`Server started on http://localhost:${PORT}`);
});
