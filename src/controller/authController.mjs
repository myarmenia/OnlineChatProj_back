// import { user } from "../router/authRouter.mjs";
import authService from "../service/authService.mjs";

const authController = {
  googleLogin: async (req, res) => {
    try {
      // const authUser =await authService.googleLogin();
      const url="http://localhost:3000"
    return res.redirect(301,url)
    } catch (error) {
      console.error(error)
    }
  },
  googleLogout:async (req,res)=>{
    try {
      req.logout(function(err) {
            if (err) { return next(err); }
            res.redirect("/api");
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
