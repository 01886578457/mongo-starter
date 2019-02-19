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

async function getCourses() {
  //eq (equal) //ne (not equal) // gt (greater than)
  //gte (greater than or equal to) // lt (less than)
  // lte (less than or equal to) // in //nin (not in)
  //logical ----- or // and

  const courses = await Course
    // .find({ price: { $in: [10, 15, 20] } })
    // .find({ price: { $gte: 10, $lte: 20 } })
    // .find({ author: "TML" })
    // .or([{ author: "TML" }, { isPublished: false }])
    // .and([{ author: "TML" }, { isPublished: true }])
    //start with tm
    // .find({ author: /^TM/ })
    //end with ml
    // .find({ author: /ML$/i })
    // contains ml
    .find({ author: /.*ML.*/i })
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  console.log(courses);
}

getCourses();
