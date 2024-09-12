const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config({ path: "./config/.env" });
const connectDatabase = require("./config/db.config");
const user_route = require("./routes/user");
const art_route = require("./routes/art");
const series_route = require("./routes/series");
const bid_route = require("./routes/bid");
const deal_route = require("./routes/deal");

const app = express();
app.listen(process.env.PORT || 8080, () => {
  console.log(`server is on ${process.env.PORT || 8080}`);
});

connectDatabase();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api/v1/user", user_route);
app.use("/api/v1/art", art_route);
app.use("/api/v1/series", series_route);
app.use("/api/v1/bid", bid_route);
app.use("/api/v1/deal", deal_route);
