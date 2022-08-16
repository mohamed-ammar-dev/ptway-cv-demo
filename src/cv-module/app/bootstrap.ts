import { server } from "../../config/server";
import cvRouter from "./routes/cvRouter";

const app = server.app;

app.use("/cv", cvRouter);
