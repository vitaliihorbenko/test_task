const Koa = require("koa");
const Router = require("koa-router");

const { Object } = require("../../models/objects");

const router = new Router();

router.get("/api/objects/categories", async (ctx) => {
  try {
    const objects = await Object.distinct("category");
    ctx.body = objects;
  } catch (err) {
    console.error(err);
    ctx.status = 500;
    ctx.body = err.message || "Internal error";
  }
});

router.get("/api/objects/:category", async (ctx) => {
  try {
    const { category } = ctx.request.params;
    const objects = await Object.find({ category: category });
    if (objects.length) {
      ctx.body = objects;
    } else {
      ctx.status = 404;
      ctx.body = "Not Found";
    }
  } catch (err) {
    console.error(err);
    ctx.status = 404;
    ctx.body = err.message || "Internal error";
  }
});

router.get("/api/objects/categories/items", async (ctx) => {
  try {
    const categories = await Object.aggregate([
      { $match: {} },
      {
        $project: {
          _id: 0,
          name: 1,
          category: 1,
        },
      },
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
    ]);
    ctx.body = categories;
  } catch (err) {
    console.error(err);
    ctx.status = 500;
    ctx.body = err.message || "Internal error";
  }
});

module.exports = router;
