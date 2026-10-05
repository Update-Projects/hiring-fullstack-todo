const Router = require("express");
const mongoose = require("mongoose");
const Todo = require("../models/Todo");
//const HttpError = require("../errors");

const router = Router();

const cleanText = (value) => (typeof value === "string" ? value.trim() : "");

// Reject malformed ids before they hit MongoDB
router.param("id", (_req, _res, next, id) => {
  if (!mongoose.isValidObjectId(id))
    return next(new HttpError(400, "Invalid todo id"));
  next();
});

// GET /api/todos - get all TODO items
router.get("/", async (_req, res, next) => {
  try {
    res.json(await Todo.find().sort({ createdAt: -1 }));
  } catch (err) {
    next(err);
  }
});

// POST /api/todos - create a new TODO item
router.post("/", async (req, res, next) => {
  try {
    const title = cleanText(req.body?.title);
    if (!title) throw new HttpError(400, "Title is required");
    const todo = await Todo.create({
      title,
      description: cleanText(req.body?.description),
    });
    res.status(201).json(todo);
  } catch (err) {
    next(err);
  }
});

// PUT /api/todos/:id - update a TODO (title/description)
router.put("/:id", async (req, res, next) => {
  try {
    const title = cleanText(req.body?.title);
    if (!title) throw new HttpError(400, "Title is required");
    const description = cleanText(req.body?.description);

    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true, runValidators: true },
    );
    if (!todo) throw new HttpError(404, "Todo not found");
    res.json(todo);
  } catch (err) {
    next(err);
  }
});

// PATCH /api/todos/:id/done - toggle the done status
// Body is optional: { "done": true } sets it explicitly, no body flips the current value.
router.patch("/:id/done", async (req, res, next) => {
  try {
    const explicit = req.body?.done;
    if (explicit !== undefined && typeof explicit !== "boolean") {
      throw new HttpError(400, '"done" must be a boolean');
    }

    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      typeof explicit === "boolean"
        ? { done: explicit }
        : [{ $set: { done: { $not: "$done" } } }],
      { new: true },
    );
    if (!todo) throw new HttpError(404, "Todo not found");
    res.json(todo);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/todos/:id - delete a TODO
router.delete("/:id", async (req, res, next) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) throw new HttpError(404, "Todo not found");
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
