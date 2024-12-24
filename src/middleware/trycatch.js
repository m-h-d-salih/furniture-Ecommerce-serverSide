export const trycatch = (controller) => {
    return async (req, res, next) => {
      try {
        await controller(req, res, next);
      } catch (error) {
        console.log("Error", error);
        return next(error);
      }
    };
  };
  
  