// create express app
import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

const PORT = process.env.DATABASE_SERVER_PORT || 4000;

app.get('/info', (req, res) => {
	res.json({ message: 'database server' });
});

app.listen(PORT, () => {
	console.log(`Server started on http://localhost:${PORT}`);
});
