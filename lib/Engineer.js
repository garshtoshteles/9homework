// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Engineer extends Employee {
  constructor(IDnum, role, name, email, github) {
    super(IDnum, role, name, email);
    this.github = github;
  }
  getGithub() {
    return this.github;
  }
}

module.exports = Engineer;
