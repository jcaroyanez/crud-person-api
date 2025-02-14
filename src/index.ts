import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import peopleRoutes from './routes/person';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/people', peopleRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});