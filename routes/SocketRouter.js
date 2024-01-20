const express = require("express");

function SocketRouter(io) {
  const router = express.Router();
  // routes for api , its an ENDPOINT
  router.get("/forecast", (req, res) => {
    // to fetch the query string
    const count = req.query.count;
    if (!count) {
      res
        .json({
          message: "count not exists",
        })
        .status(401);
    }

    // emitting the event using socket

    io.emit("modified_forecast", count);

    res
      .json({
        message: `data delivered with count ${count}`,
      })
      .status(200);
  });

  return router;
}

module.exports = SocketRouter;
