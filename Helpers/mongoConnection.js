import mongoose from "mongoose";

const mongoConnection = () => {
  if (mongoose.connections[0].readyState) {
    console.log("Already Connected");
    return;
  }
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Connection Successful"))
    .catch((e) => console.log("Connection Failed", e));
};

export default mongoConnection;
