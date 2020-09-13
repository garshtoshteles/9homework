const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Employee = require("./lib/Employee");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
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
];

var standardQs = [
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
    default: false,
  },
];

var roleBank = [
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
  inquirer.prompt(roleQ).then((roleA) => {
    idnum++;
    var standardQsCopy = standardQs;
    //based on the role they have, push a roleBank question to the standardquestions copy
    if (roleA.role === "Engineer") {
      // code for engineer q
      standardQsCopy[2] = roleBank[0];
    } else if (roleA.role === "Intern") {
      // code for intern Q
      standardQsCopy[2] = roleBank[1];
    } else {
      // code for manager question
      standardQsCopy[2] = roleBank[2];
    }
    inquirer.prompt(standardQsCopy).then((answers) => {
      const answersCopy = answers;
      delete answersCopy.another;
      // push an object with all the meployee data to the employeeObjs array
      // THIS IS DONE IMPROPERLY. THE CONCEPT IS FINE, BUT IT SHOULD BE AN ARRAY OF EMPLOYEE OBJS MADE WITH THE EMPLOYEE CONSTRUCTOR
      if (roleA.role === "Engineer") {
        // code for if an engineer
        let newEng = new Engineer(idnum, roleA.role, ...answersCopy);
        employeeObjs.push(newEng);
      } else if (roleA.role === "Intern") {
        // code for if an intern
        let newInt = new Intern(idnum, roleA.role, ...answersCopy);
        employeeObjs.push(newInt);
      } else {
        // code for if a manager
        let newMan = new Manager(idnum, roleA.role, ...answersCopy);
        employeeObjs.push(newMan);
      }
      console.log(JSON.stringify(employeeObjs));
      if (answers.another) {
        // if they want to enter another employee, have the function call itself
        inquireEmployee();
      } else {
        // in here is what happens when they're done entering employees, it will only happen once even though these functions are executing inside one another
        render(employeeObjs);
        // After the user has input all employees desired, call the `render` function (required
        // above) and pass in an array containing all employee objects; the `render` function will
        // generate and return a block of HTML including templated divs for each employee!
      }
    });
  });
}

inquireEmployee();

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
