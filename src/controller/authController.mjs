import authService from "../service/authService.mjs";

const authController = {
  test: (req, res) => {
    const test = authService.test();

    return res.send(test);
  },
};

export default authController;
