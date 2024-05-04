// import { user } from "../router/authRouter.mjs";
import authService from "../service/authService.mjs";

const authController = {
  googleLogin: async (req, res) => {
    try {
      const authUser =await authService.googleLogin();

    return res.render(authUser)
    } catch (error) {
      console.error(error)
    }
  },
  googleLogout:async (req,res)=>{
    try {
      req.logout(function(err) {
            if (err) { return next(err); }
            res.redirect("/");
          });
    } catch (error) {
      console.error(error)
    }
  },
  authFailure:async (req,res)=>{
    try {
      const failure=await authService.authFailure()
      res.send(failure)
    } catch (error) {
      console.error(error)
    }
  },
  protected:async ()=>{
    try {
      const resultUser=await authService.protected()
      return resultUser
    } catch (error) {
      
    }
  }
};

export default authController;
