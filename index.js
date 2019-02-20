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

  const pageNumber = 1;
  const pageSize = 10;
  // /api/courses?pageNumber=1&pageSize=10

  const courses = await Course
    // .find({ price: { $in: [10, 15, 20] } })
    // .find({ price: { $gte: 10, $lte: 20 } })
    .find({ author: "TML" })
    // .or([{ author: "TML" }, { isPublished: false }])
    // .and([{ author: "TML" }, { isPublished: true }])
    //start with tm
    // .find({ author: /^TM/ })
    //end with ml
    // .find({ author: /ML$/i })
    // contains ml
    // .find({ author: /.*ML.*/i })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize) //pagination
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  console.log(courses);
}

async function updateCourses(id) {
  //Query first -- findById() -> modify its props --> save()
  // const course = await Course.findById(id);
  // if (!course) return;
  // course.isPublished = true;
  // course.author = "TML Another";
  // const result = await course.save();
  // console.log(result);
  //Update first -- update directly -> Optionally: get the updated document

  const result = await Course.findByIdAndUpdate(
    id,
    {
      $set: {
        author: "TML Ano",
        isPublished: false
      }
    },
    { new: true }
  );
  console.log(result);
}

async function removeCourse(id) {
  const result = await Course.findByIdAndRemove(id);
  console.log(result);
}
removeCourse("5c6bda2c352310043413c4b5");
