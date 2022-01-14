const Koa = require("koa");
const app = new Koa();
const cors = require("cors");
const router = require("./routes/api");
const koaBody = require("koa-body");
require("dotenv").config();

app
  .use(router.routes())
  .use(require("koa-body")())
  .use(router.allowedMethods())
  .use(cors());

app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

module.exports = app;
