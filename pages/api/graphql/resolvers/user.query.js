import User from "../../../../server/models/user.model.js";
import isAuth from "../auth.js";

const query = {
  getUser: async (_, __, ctx) => {
    try {
      const user = await isAuth(ctx);

      return {
        success: true,
        user: user,
        error: false,
      };
    } catch (err) {
      return {
        success: false,
        user: null,
        error: err,
      };
    }
  },

  getUserByUsername: async (_, { username }, ctx) => {
    const user = await User.findOne({ username });
    return {
      success: true,
      user: user,
      error: false,
    };
  },
  // searchForUserAvailability: async (parent, args, { models }) => {},
};

export default query;
