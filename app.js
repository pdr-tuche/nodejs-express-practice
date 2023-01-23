const express = require("express");
const app = express();

app.get("/", (req, res) => {
  return res.json({
    message: "acessou o /",
  });
});
app.listen(3000, () => console.log("server is runnin at port 3000"));
