//to do
// create new employee: form, sends post request
//

// variable declarations: data

let currentEmployeeId;
let employeeData;
let employeeName = document.getElementById("employeeName");
let customerExperienceRating;
let operationsRating;
let productKnowledgeRating;
let url = "http://localhost:3000/employees";

// grab elements: event listeners

let employeeSelection = document.getElementById("employeeDropdown");
let customerExperienceSelection = document.getElementById("customerExperience");
let operationsSelection = document.getElementById("operations");
let productKnowledgeSelection = document.getElementById("productKnowledge");
let evalDiv = document.getElementById("evalDiv");
let submit = document.getElementById("submitReview");
let chartDiv = document.getElementById("chartContainer");

//grab elements: charts

let customerExperienceChart = document.getElementById(
  "customerExperienceChart"
);
let operationsChart = document.getElementById("operationsChart");
let productKnowledgeChart = document.getElementById("productKnowledgeChart");

//create event listeners

employeeSelection.addEventListener("change", (event) => {
  employeeName.textContent =
    employeeSelection.options[employeeSelection.selectedIndex].text;
  currentEmployeeId = event.target.value.toString();
  evalDiv.hidden = false;
});

customerExperienceSelection.addEventListener("change", (event) => {
  customerExperienceRating = event.target.value;
  updateRating("customerExperienceM", customerExperienceRating);
});

operationsSelection.addEventListener("change", (event) => {
  operationsRating = event.target.value;
  updateRating("operationsM", operationsRating);
});

productKnowledgeSelection.addEventListener("change", (event) => {
  productKnowledgeRating = event.target.value;
  updateRating("producKnowledgeM", productKnowledgeRating);
});

submit.addEventListener("click", () => {
  //POST customerExperienceRating, operationsRating, productKnowledgeRating to db.

  renderChart(
    customerExperienceChart,
    "customerExperienceE",
    "customerExperienceM"
  );
  renderChart(operationsChart, "operationsE", "operationsM");
  renderChart(productKnowledgeChart, "productKnowledgeE", "producKnowledgeM");
  chartDiv.hidden = false;
});

//function: add employees from db.json

function addEmployeeOptions() {
  employeeSelection.length = 0;

  let defaultOption = document.createElement("option");
  defaultOption.text = "Employees";

  defaultOption.disabled = true;

  employeeSelection.add(defaultOption);
  employeeSelection.selectedIndex = 0;

  fetch(url).then(function (response) {
    response.json().then(function (data) {
      let option;

      for (let i = 0; i < data.length; i++) {
        option = document.createElement("option");
        option.text = data[i].name;
        option.value = data[i].id;
        employeeSelection.add(option);
      }
    });
  });
}
//function: update rating

function updateRating(currentData, newData) {
  let currentEmployee = getEmployeeById(currentEmployeeId, employeeData);
  let currentRating = currentEmployee[`${currentData}`];
  let newRating = currentRating.push(newData);
  fetch(`http://localhost:3000/employees/${currentEmployeeId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(newRating),
  });
}

//function; load data for charts

function loadData() {
  fetch(url)
    .then((r) => r.json())
    .then((data) => (employeeData = data));
}
loadData();

//function: render charts
// adds data for each dataset (emp, manager)

function renderChart(chartIdentifier, typeE, typeM) {
  return new Chart(chartIdentifier, {
    type: "bar",
    data: {
      labels: renderLabels(),
      datasets: [
        {
          label: "Employee Rating",
          data: renderRating(typeE),
          borderWidth: 1,
        },
        {
          label: "Manager Rating",
          data: renderRating(typeM),
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

function renderLabels() {
  let person = getEmployeeById(currentEmployeeId, employeeData);
  return person.datesWorked;
}

function renderRating(type) {
  let person = getEmployeeById(currentEmployeeId, employeeData);
  return person[type];
}

function getEmployeeById(id, employees = []) {
  return employees.find((person) => {
    return person.id == id;
  });
}

addEmployeeOptions();

// async function loadData3() {
//   const response = await fetch(url)
//     .then((r) => r.json())
//     .then((data) => (employeeData = data));
//   return response;
// }

// async function init() {
//   console.log("run");
//   let data = await loadData3();
//   console.log("data", data);
//   addOptions(data.employees);

//   //
//   renderChart(customerExperienceChart);
//   renderChart(operationsChart);
//   renderChart(productKnowldgeChart);
// }

// init();

// function loadData2(endpoint) {
//   return fetch(endpoint).then((r) => r.json());
// }

//1. query API and get data
// loadData2(url).then((data) => {
//// DEMO //////
// console.log("data", data);
// employeeData = data;
// currentEmployeeId = "emp-1";
// let per = renderLabels();
// console.log("per", per);
// //////////////////

//call functions
//name each chart

//2. Create drop-down selector using employee data
// addOptions(data.employees);

// //
// renderChart(customerExperienceChart);
// renderChart(operationsChart);
// renderChart(productKnowldgeChart);
// });
