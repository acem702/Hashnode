import PostQuery from "./posts.query.js";
import TagQuery from "./tags.query.js";
import UserQuery from "./user.query.js";

import UserMutation from "./user.mutation.js";
import PostMutation from "./posts.mutation.js";
import TagMutation from "./tags.mutation.js";

const res = {
  Query: {
    ...UserQuery,
    ...PostQuery,
    ...TagQuery,
  },

  Mutation: {
    ...UserMutation,
    ...PostMutation,
    ...TagMutation,
  },
};

export default res;
