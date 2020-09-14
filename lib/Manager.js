// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Manager extends Employee {
  constructor(IDnum, role, name, email, office) {
    super(IDnum, role, name, email);
    this.office = office;
  }
  getOfficeNumber() {
    return this.office;
  }
}

module.exports = Manager;
