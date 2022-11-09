// Connect to mongodb Database. URI is in environment variables.
import mongoose from "mongoose";

const connect = async () => {
  try {
    const mongoURI = process.env.NEXT_PUBLIC_MONGODBURI;
    if (mongoURI) {
      mongoose.connect(mongoURI);
      mongoose.connection.once("open", () => {
        console.log("Connected to MongoDB");
      });
    }
  } catch (err) {
    console.log({ err });
  }
};

export default connect;
