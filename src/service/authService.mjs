const authService = {
  authFailure: async () => {
    try {
      return "something went wrong...";
    } catch (error) {
      console.error(error);
    }
  },
  protected: async () => {
    try {
      return;
    } catch (error) {
      console.error(error);
    }
  },
};

export default authService;
