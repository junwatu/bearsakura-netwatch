import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import * as packetCapturer from './packetCapturer.js';

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PACKET_PORT || 3000;
const HOST = process.env.PACKET_IP_ADDRESS || 'localhost';
const SERVER_DB_HOST = process.env.DATABASE_SERVER || 'localhost';
const SERVER_DB_PORT = process.env.DATABASE_SERVER_PORT || 4000;

packetCapturer.startCapturing(process.env.PACKET_IP_ADDRESS);

setInterval(async () => {
	const packets = packetCapturer.getPackets();
	try {
		await axios.post(`http://${SERVER_DB_HOST}:${SERVER_DB_PORT}/save-packets`, packets);
		console.log('Packets sent successfully');
	} catch (error) {
		console.error('Error sending packets:', error);
	}
}, 5000);  // Adjust the interval to your needs


app.get('/packets', (req, res) => {
	res.json(packetCapturer.getPackets());
});

app.listen(PORT, HOST, () => {
	console.log(`Server started on http://${HOST}:${PORT}`);
});
