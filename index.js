const low = require("lowdb");
const fileSync = require("lowdb/adapters/FileSync");
const adapter = new fileSync("db.json");
const db = low(adapter);

db.defaults({ students: [] }).write();

const func = process.argv[2];

if (func == "read") {
  let students = db
    .get("students")
    .sortBy("name")
    .value();
  console.log(students);
}
if (func == "create" && process.argv[3] != undefined) {
  db.get("students")
    .push({ name: process.argv[3] })
    .write();
}
if (func == "delete" && process.argv[3] != undefined) {
  db.get("students")
    .remove({ name: process.argv[3] })
    .write();
}
if (
  func == "update" &&
  process.argv[3] != undefined &&
  process.argv[4] != undefined
) {
  let userToUpdate = db.get("students").find({ name: process.argv[3] });
  if (userToUpdate) {
    userToUpdate.assign({ name: process.argv[4] }).write();
  }
}
if (func == "search" && process.argv[3] != undefined) {
  let searchStudent = db
    .get("students")
    .filter({ name: process.argv[3] })
    .value();
  console.log(searchStudent);
}
