import "dotenv/config";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import compression from "compression";

// Sends Text Message Every 20 seconds
import "./send_sms.js";

import timesheetRoutes from "./routes/timesheetRoutes.js";
import breaksheetRoutes from "./routes/breaksheetRoutes.js";
import payScheduleRoutes from "./routes/payScheduleRoutes.js";
import timesheetRulesRoutes from "./routes/timesheetRulesRoutes.js";
import positionRoutes from "./routes/positionRoutes.js";
import premiumRoutes from "./routes/premiumRoutes.js";
import departmentRoutes from "./routes/departmentRoutes.js";
import costCentreRoutes from "./routes/costCentreRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import earningRoutes from "./routes/earningRoutes.js";
import userAccountRoutes from "./routes/userAccountRoutes.js";
import overtimeScheduleRoutes from "./routes/overtimeScheduleRoutes.js";
import moduleRoutes from "./routes/moduleRoutes.js";
import companyInfoRoutes from "./routes/companyInfoRoutes.js";
import bulletinRoutes from "./routes/bulletinRoutes.js";
import scheduleRoutes from "./routes/scheduleRoutes.js";
import shiftRoutes from "./routes/shiftRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import productNewsRoutes from "./routes/productNewsRoutes.js";

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//   })
// );

// app.use(cors());

app.use("/timesheetrules", timesheetRulesRoutes);
app.use("/timesheet", timesheetRoutes);
app.use("/breaksheet", breaksheetRoutes);
app.use("/payschedule", payScheduleRoutes);
app.use("/overtimeschedule", overtimeScheduleRoutes);
app.use("/position", positionRoutes);
app.use("/premium", premiumRoutes);
app.use("/department", departmentRoutes);
app.use("/costcentre", costCentreRoutes);
app.use("/employee", employeeRoutes);
app.use("/earning", earningRoutes);
app.use("/userAccounts", userAccountRoutes);
app.use("/module", moduleRoutes);
app.use("/companyinfo", companyInfoRoutes);
app.use("/bulletin", bulletinRoutes);
app.use("/notification", notificationRoutes);
app.use("/schedule", scheduleRoutes);
app.use("/shift", shiftRoutes);
app.use("/report", reportRoutes);
app.use("/productNews", productNewsRoutes);

const PORT = process.env.PORT || 5000;
const CONNECTION_URL = `mongodb+srv://awhitebird:cha0+Sit@cluster0.g8l3k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Connected to port ${PORT}`);
    });
  })
  .catch((err) => {
    "Error connecting to mongoose", err;
  });

process.on("uncaughtException", (err) => {
  console.error("There was an uncaught errorrrrrr", err);
  process.exit(1);
});
