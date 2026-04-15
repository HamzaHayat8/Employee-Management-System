import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
dotenv.config();

const PORT = process.env.PORT || 8080;
connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
