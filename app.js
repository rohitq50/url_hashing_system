import express from 'express'
import routesV1 from "./routes/v1/index.js"
import cors from 'cors';
const app = express()

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }));
app.use(cors({ origin: "*", optionsSuccessStatus: 200 }));

async function startServer() {
	app.listen(3000, () =>
		console.log(`Server is running on localhost: 3000`)
	);
}
startServer();
app.use('/', routesV1);