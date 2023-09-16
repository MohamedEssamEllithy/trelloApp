// all imports
import express from "express";
import userRoutes from "./modules/users/user.routes.js";
import taskRoutes from "./modules/tasks/task.routes.js";
import { connection } from "./db/connection.js";
import cookieParser from "cookie-parser";


// all declerations
const app = express();
const port = 3000;

app.use(cookieParser())
app.use(express.json());
app.use(userRoutes);
app.use(taskRoutes);
connection();


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
