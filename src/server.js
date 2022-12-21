import express from "express";
import cors from "cors";
import usersRoutes from "./routes/users.routes.js"
import linksRoutes from "./routes/links.routes.js"

const app = express();
app.use(express.json());
app.use(cors());

app.use(usersRoutes)
app.use(linksRoutes)

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running in port ${port}`));