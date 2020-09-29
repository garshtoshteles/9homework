const Manager = require("./lib/Manager"),
  Engineer = require("./lib/Engineer"),
  Intern = require("./lib/Intern"),
  inquirer = require("inquirer"),
  path = require("path"),
  fs = require("fs"),
  OUTPUT_DIR = path.resolve(__dirname, "output"),
  outputPath = path.join(OUTPUT_DIR, "team.html"),
  render = require("./lib/htmlRenderer"),
  Employee = require("./lib/Employee");
let idnum = 0;
const employeeObjs = [];
console.log("Greetings. Please tell me about your team.");
var roleQ = [
    {
      type: "list",
      name: "role",
      message: "What's this employee's role?",
      choices: ["Engineer", "Intern", "Manager"],
    },
  ],
  standardQs = [
    {
      type: "input",
      name: "name",
      message: "What's this employee's name?",
      default: "unnamed",
    },
    {
      type: "input",
      name: "email",
      message: "What's this employee's email?",
      default: "none@no.ne",
    },
    {},
    {
      type: "confirm",
      name: "another",
      message: "Would you like to add another employee?",
      default: !1,
    },
  ],
  roleBank = [
    {
      type: "input",
      name: "github",
      message: "What's this employee's GitHub username?",
      default: "none",
    },
    {
      type: "input",
      name: "school",
      message: "Where does this intern go to school?",
      default: "none",
    },
    {
      type: "input",
      name: "office",
      message: "What's this manager's office number?",
      default: "none",
    },
  ];
function inquireEmployee() {
  inquirer.prompt(roleQ).then((a) => {
    idnum++;
    var b = standardQs;
    (b[2] =
      "Engineer" === a.role
        ? roleBank[0]
        : "Intern" === a.role
        ? roleBank[1]
        : roleBank[2]),
      inquirer.prompt(b).then((b) => {
        if ("Engineer" === a.role) {
          let c = new Engineer(idnum, a.role, b.name, b.email, b.github);
          employeeObjs.push(c);
        } else if ("Intern" === a.role) {
          let c = new Intern(idnum, a.role, b.name, b.email, b.school);
          employeeObjs.push(c);
        } else {
          let c = new Manager(idnum, a.role, b.name, b.email, b.office);
          employeeObjs.push(c);
        }
        if (b.another) inquireEmployee();
        else {
          const a = render(employeeObjs);
          fs.writeFile(outputPath, a, (a) => {
            if (a) return console.log(a);
          });
        }
      });
  });
}
inquireEmployee();
