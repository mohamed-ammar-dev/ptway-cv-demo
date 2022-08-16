import { server } from "../../config/server";
import storageRouter from "../app/routes/storageRouter";
const app = server.app;

app.use("/storage", storageRouter);
