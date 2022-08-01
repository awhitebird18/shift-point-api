import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const getAllUserAccounts = async (req, res) => {
  const token = req.headers["x-access-token"];
  const decoded = token && jwt.verify(token, "secrettokenofdoom");

  if (!decoded) {
    res.status(403).json({
      status: "fail",
      message: "You do not have access to user accounts.",
    });
  }

  const users = await User.find();

  res.status(200).json({
    status: "success",
    data: users,
  });
};

export const getCurrentUser = async (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    const decoded = token && jwt.verify(token, "secrettokenofdoom");

    let searchParams = {};
    if (decoded && decoded.username) {
      searchParams = { username: decoded.username };
    }

    const user = await User.findOne(searchParams);

    console.log(user);

    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (e) {
    res.status(500).json({
      message: "fail",
    });
  }
};

export const createNewUserAccount = async (req, res) => {
  try {
    if (
      !req.body.password ||
      !req.body.passwordConfirm ||
      req.body.password !== req.body.passwordConfirm
    ) {
      throw new Error("Passwords do not match");
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email,
      admin: req.body.admin,
      departments: req.body.departments,
      clientId: "D20003",
      moduleAccess: req.body.moduleAccess,
      active: req.body.active ? req.body.active : true,
    });

    res.status(201).json({
      status: "success",
      data: newUser,
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e,
    });
  }
};

export const loginUser = async (req, res) => {
  const { clientId, username, password } = req.body;

  const user = await User.findOne({ clientId: clientId, username: username });

  const result = await bcrypt.compare(password, user.password);

  if (!result) {
    return res.status(400).json({
      status: "fail",
      message: "Incorrect Username or Password",
    });
  }

  const token = jwt.sign(
    {
      clientId,
      username,
    },
    "secrettokenofdoom"
  );

  return res.status(200).json({
    status: "success",
    token,
  });
};

export const updateUserAccount = async (req, res) => {
  const id = req.body._id;

  const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });

  return res.status(200).json({
    status: "success",
    updatedUser,
  });
};

export const updateUserField = async (req, res) => {
  const token = req.headers["x-access-token"];
  const decoded = token && jwt.verify(token, "secrettokenofdoom");

  let searchParams = {};
  if (decoded && decoded.username) {
    searchParams = { clientId: "D20003", username: decoded.username };
  }

  const user = await User.findOneAndUpdate(
    searchParams,
    {
      "dashboardConfig.weeklyHours": req.body,
    },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    user,
  });
};

export const deleteUserAccount = async (req, res) => {
  const userId = req.params.id;

  await User.findByIdAndDelete(userId);

  res.status(204).json({
    status: "success",
    data: {
      fake: `object`,
      another: `object`,
    },
  });
};
