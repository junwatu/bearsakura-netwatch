import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import * as packetCapturer from './packetCapturer.js';

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

packetCapturer.startCapturing(process.env.IP_ADDRESS);

app.get('/packets', (req, res) => {
	res.json(packetCapturer.getPackets());
});

app.listen(PORT, () => {
	console.log(`Server started on http://${HOST}:${PORT}`);
});
