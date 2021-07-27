const router = require("express").Router();
const verify = require("./verifyToken");

router.get("/", verify, (req, res) => {
  res.status(200).send({
    post: {
      title: "my first post",
      description: "random data you shouldnt access",
    },
  });
});

module.exports = router;
