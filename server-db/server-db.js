// create express app
import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import * as griddb from './griddbservice.js'

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.DATABASE_SERVER_PORT || 4000;
const HOST = process.env.DATABASE_SERVER || 'localhost';

app.get('/info', (req, res) => {
	res.json({ message: 'database server' });
});

app.post('/save-packets', async (req, res) => {
	const packets = req.body;

	for (let packet of packets) {
		const { length, srcaddr, dstaddr, protocol, srcport, dstport } = packet;
		await griddb.saveData({ length, srcaddr, dstaddr, protocol, srcport, dstport });
	}

	res.json({ message: 'saved' });
});

app.get('/get-all-packets', async (req, res) => {
	const packets = await griddb.getAllData();
	res.json({ packets });
})

app.listen(PORT, HOST, () => {
	console.log(`Server started on http://${HOST}:${PORT}`);
});
