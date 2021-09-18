const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/mongoose-relationship")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String,
});

const Author = mongoose.model("Author", authorSchema);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    author: {
      type: [authorSchema],
      required: true,
    },
  })
);

async function createCourse(name, author) {
  const course = new Course({
    name,
    author,
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

const updateCourseAuthor = async (courseId) => {
  const course = await Course.update(
    { _id: courseId },
    {
      $set: {
        "author.name": "Mosh",
      },
    }
  );

  console.log("course", Course);
};

const addAuthor = async (authorId) => {
  const course = await Course.findById(authorId);
  course.author.push({ name: "new One" });
  course.save();
  console.log(course);
};

const removeAuthor = async (courseId, authorId) => {
  const course = await Course.findById(courseId);
  const removeOne = course.author.filter((courseAuthorId) => {
    return courseAuthorId.name !== authorId;
  });
  course.author = removeOne;
  course.save();
  console.log("removeOne", removeOne);
};

// addAuthor("61459a701369352a847df2d4");
removeAuthor("61459a701369352a847df2d4", "Mosh");
// updateCourseAuthor("61457f1b5b70022a481c1a52");
// createCourse("Node Course", [new Author({ name: "Mosh" }),new Author({ name: "Anik" })]);
