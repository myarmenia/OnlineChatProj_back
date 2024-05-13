import googleFunc from "../utils/socialAuth/authGoogle.mjs";

export const isLoggedIn = (req, res, next) => {
  req.user ? next() : res.sendStatus(401);
};

export const authMiddle = (req, res, next) => {
  next();
};
