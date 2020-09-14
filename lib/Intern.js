// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Intern extends Employee {
  constructor(IDnum, role, name, email, school) {
    super(IDnum, role, name, email);
    this.school = school;
  }
  getSchool() {
    return this.school;
  }
}

module.exports = Intern;
