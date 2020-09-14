// TODO: Write code to define and export the Employee class
class Employee {
  constructor(IDnum, role, name, email) {
    this.IDnum = IDnum;
    this.role = role;
    this.name = name;
    this.email = email;
  }
  getRole() {
    return this.role;
  }
  getName() {
    return this.name;
  }
  getEmail() {
    return this.email;
  }
  getId() {
    return this.IDnum;
  }
}

module.exports = Employee;
