const path = require("path");
const express = require("express");
const app = express();
const PORT = 8000;
// One way to upload image
const multer = require("multer");
// const upload = multer({ dest: "uploads/" });
// app.post("/uploads", upload.single("profileImage"), (req, res) => {
//   console.log(req.body);
//   console.log(req.file);
//   return res.redirect("/");
// });
// second way
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });
app.post("/uploads", upload.single("profileImage"), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  return res.redirect("/");
});
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  return res.render("Homepage");
});
// app.post("/uploads", (req, res) => {});
app.listen(PORT, () => {
  console.log("server at 8000");
});
