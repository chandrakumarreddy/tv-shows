const express = require("express");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const PORT = process.env.PORT || 3000;
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.get("/cast/:personId", (req, res) => {
    return app.render(req, res, "/cast", { personId: req.params.personId });
  });
  server.all("*", (req, res) => handle(req, res));
  server.listen(PORT, err => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
