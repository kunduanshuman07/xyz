import Express, {json, urlencoded} from "express";
import http from "http";
import { config } from "dotenv";
import cors from "cors";
import {logger} from "./logger.js";
import xyzRoutes from "./routes/index.js";

const app = Express();
const server = http.createServer(app);
config();
const PORT = process.env.PORT || 5001;

app.use(json());
app.use(urlencoded({extended: true}));
app.use((req,res, next) => {
    logger.info(`Incoming request : ${req.method} ${req.url}`);
    next();
})

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE']
}));
app.use("/attachments", Express.static("public/attachments"));
app.use('/xyz/v1', xyzRoutes);

server.listen(PORT, () => {
    console.log('Backend server started on PORT', PORT);
})