// create express app
import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';


const app = express();
app.use(bodyParser.json());

const PORT = process.env.PACKET_PORT || 3000;

packetCapturer.startCapturing(process.env.PACKET_IP_ADDRESS);

app.get('/info', (req, res) => {
	res.json({ message: 'griddb server' });
});

app.listen(PORT, () => {
	console.log(`Server started on http://localhost:${PORT}`);
});
