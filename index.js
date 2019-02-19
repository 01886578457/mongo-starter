const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("connected mongodb"))
  .catch(err => console.log("Could not connect mongodb", err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Node.js starter",
    author: "TML",
    tags: ["node", "backend"],
    isPublished: true
  });

  const result = await course.save();
  console.log(result);
}

createCourse();
