const { Schema, model } = require("mongoose");

const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      //maxlength: [200, "Title must be 200 characters or fewer"],
    },

    description: {
      type: String,
      trim: true,
      default: "",
      //maxlength: [1000, "Description must be 1000 characters or fewer"],
    },

    done: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = model("Todo", todoSchema);
