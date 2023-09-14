const express = require('express');
const bodyParser = require('body-parser');
const packetCapturer = require('./packetCapturer');

const app = express();
app.use(bodyParser.json());

const PORT = 3000;

packetCapturer.startCapturing('192.168.0.102'); // Starts capturing

app.get('/packets', (req, res) => {
	res.json(packetCapturer.getPackets());
});

app.listen(PORT, () => {
	console.log(`Server started on http://localhost:${PORT}`);
});
