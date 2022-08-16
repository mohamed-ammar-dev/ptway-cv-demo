import { server } from "./src/config/server";

server.startServer();

import "./src/cv-module/app/bootstrap";
import "./src/error-module/app/routes/errorHandler";
