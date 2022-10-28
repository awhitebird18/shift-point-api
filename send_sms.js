import twilio from "twilio";
import Timesheet from "./models/timesheetModel.js";
import Employee from "./models/employeeModel.js";
import Shift from "./models/shiftModel.js";
import dayjs from "dayjs";
import fetch from "node-fetch";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

// Every hour, look for notifications and send manager text
setInterval(() => {
  const warningTime = 6;
  const currentTime = dayjs();
  const shiftStarts = [0, 15, 30, 45];
  const warningTimes = shiftStarts.map((el) => {
    return el + warningTime;
  });

  if (warningTimes.includes(currentTime.minute())) {
    missedEmployeePunches();
  }
}, 1000 * 60);

function sendText(message) {
  client.messages
    .create({
      body: message,
      from: "+17406743472",
      to: "+19058057155",
    })
    .then((message) => {});
}

async function missedEmployeePunches() {
  const employees = await Employee.find({});
  const currentDate = new Date(Date.now());
  currentDate.setHours(0);
  currentDate.setMinutes(0);
  currentDate.setSeconds(0);
  currentDate.setMilliseconds(0);

  const currentTime = dayjs();
  const currentMinute = +currentTime.format("mm");
  let startTime = dayjs().second(0).millisecond(0);

  if (currentMinute >= 0 && currentMinute < 15) {
    startTime = startTime.minute(0);
  } else if (currentMinute >= 15 && currentMinute < 29) {
    startTime = startTime.minute(15);
  } else if (currentMinute >= 30 && currentMinute < 45) {
    startTime = startTime.minute(30);
  } else if (currentMinute >= 45 && currentMinute < 60) {
    startTime = startTime.minute(45);
  }

  const shifts = await Shift.find({ start: startTime });

  const employeesMissedPunch = [];
  shifts.forEach(async (shift, index) => {
    const eeNum = shift.eeNum;

    const timesheets = await Timesheet.findOne({
      date: currentDate,
      eeNum: eeNum,
    });

    if (!timesheets?.start) {
      const employee = employees.find((employee) => {
        return +employee.eeNum === +eeNum;
      });

      employeesMissedPunch.push(
        `${employee.firstName} ${employee.lastName}${
          index === shifts.length - 2
            ? ", and "
            : index === shifts.length - 1
            ? ""
            : ", "
        }`
      );
    }

    if (index === shifts.length - 1) {
      const employeesMissedPunchesString = employeesMissedPunch.join("");
      const messageFormatted = `${employeesMissedPunchesString} have missed their ${dayjs(
        shift.start
      ).format("hh:mm a")} start time.`;

      sendText(messageFormatted);

      fetch("http://127.0.0.1:5000/notification", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          time: currentTime,
          message: messageFormatted,
          unread: true,
        }),
      });
    }
  });
}
