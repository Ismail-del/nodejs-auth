import express from "express";
import cors from "cors";
import db from "./models/index.js";
import tutorialsRoutes from "./routes/tutorial.routes.js";
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';

const app = express();
const Role = db.roles;
const corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
})

app.use(tutorialsRoutes);
app.use(authRoutes);
app.use(userRoutes);
function initial(){
  Role.create({
    id:1,
    name:'user'
  });
  Role.create({
    id:2,
    name:'moderator'
  });
  Role.create({
    id:3,
    name:'admin'
  });
}

db.sequelize.sync().then(() => {
  console.log("drop and re-sync db.");
  // initial();
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("server is running on port ", PORT);
});
