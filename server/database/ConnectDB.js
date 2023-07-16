import mongoose from "mongoose";

const connectDB = () => {
  mongoose
    .connect(process.env.DB_URI, { useNewUrlParser: true })
    .then((data) => {
      console.log("MongoDB connected with " + data.connection.host);
    });
};

export default connectDB;
