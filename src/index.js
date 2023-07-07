const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { PORT } = require("./config/serverConfig");
const connect = require("./config/database");
const apiRoutes = require("./routes/index");

const corsOptions = {
  origin: "http://localhost:1234",
  credentials: true,
  optionSuccessStatus: 200,
};
const setupAndStartServer = () => {
  const app = express();

  app.use(cookieParser());
  app.use(cors(corsOptions));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use("/api", apiRoutes);
  app.listen(PORT, async () => {
    console.log(`Server started at ${PORT}`);
    await connect();
  });
};

setupAndStartServer();
