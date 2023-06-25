const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const { User } = require("./models/User");
const config = require("./config/key");

//application/x-www.form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
//application/json
app.use(bodyParser.json());

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI)
  .then(() => console.log("mongoDB connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World! 안녕~");
});

app.post("/register", async (req, res) => {
  //회원가입시 필요한 정보들을 client에서 가져오면,db에 넣어주기
  const user = new User(req.body);

  const result = await user
    .save()
    .then(() => {
      return res.status(200).json({
        success: true,
      });
    })
    .catch((err) => {
      return res.json({ success: false, err });
    });
});
// user.save((err, userInfo) => {
//   if (err) return res.json({ success: false, err });
//   else
//     return res.status(200).json({
//       success: true,
//     });
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
