const inquirer = require("inquirer");

const promptUser = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is your name? (REQUIRED)",
      validate: nameInput => {
          if (nameInput) {
              return true;
          } else {
              console.log("Please Enter Your Name");
              return false;
          }
      }
    },
    {
      type: "input",
      name: "github",
      message: "Enter your Github Username (REQUIRED)",
      validate: githubInput => {
          if (githubInput){
              return true;
          } else {
              console.log("ENTER GITHUB NAME")
              return false;
          }
      }
    },
    {
      type: "input",
      name: "about",
      message: "Provide some information about yourself!",
    },
  ]);
};

const promptProject = portfolioData => {
  if (!portfolioData.projects) {
    portfolioData.projects = [];
  }

  console.log(`
    =================
    Add a New Project
    =================
    `);
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is the name of your project? (REQUIRED)",
      validate: projectNameInput => {
        if (projectNameInput){
            return true;
        } else {
            console.log("ENTER PROJECT NAME")
            return false;
        }
    }
    },
    {
      type: "input",
      name: "description",
      message: "Provide a description of your project. (REQUIRED)",
      validate: projectDescInput => {
        if (projectDescInput){
            return true;
        } else {
            console.log("ENTER DESCRIPTION")
            return false;
        }
    }
    },
    {
      type: "checkbox",
      name: "languages",
      message: "What did you make this project with? (Check all that apply)",
      choices: [
        "Javascript",
        "HTML",
        "CSS",
        "ES6",
        "jQuery",
        "Bootstrap",
        "Node",
      ],
    },
    {
      type: "input",
      name: "link",
      message: "Enter the Github Link to your project. (REQUIRED)",
      validate: githubLink => {
        if (githubLink){
            return true;
        } else {
            console.log("ENTER GITHUB LINK")
            return false;
        }
    }
    },
    {
      type: "confirm",
      name: "feature",
      message: "Would you like to feature this project?",
      default: false,
    },
    {
      type: "confirm",
      name: "confirmAddProject",
      message: "Would you like to enter another project?",
      default: false,
    },
  ])
  .then(projectData => {
      portfolioData.projects.push(projectData);
      if (projectData.confirmAddProject) {
          return promptProject(portfolioData);
      } else {
          return portfolioData;
      }
  });
};
promptUser()
  .then(promptProject)
  .then(portfolioData => {
      console.log(portfolioData);
  }); 

// const fs = require('fs');
// const generatePage = require('./src/page-template');

// const profileDataArgs = process.argv.slice(2, process.argv.length);

// const [name, github] = profileDataArgs;

// fs.writeFile('index.html', generatePage(name, github), err =>{
//     if (err) throw err;

//     console.log("Portfolio complete! Checkout index.html to see the output!");
// });
