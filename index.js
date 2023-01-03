// variable declarations

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
let catchDiv = document.getElementById("catch");

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
  catchDiv.hidden = false;
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
  renderChart(
    customerExperienceChart,
    "customerExperienceE",
    "customerExperienceM"
  );
  renderChart(operationsChart, "operationsE", "operationsM");
  renderChart(productKnowledgeChart, "productKnowledgeE", "producKnowledgeM");
  chartDiv.hidden = false;
});

//functions

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

function updateRating(currentData, newData) {
  let currentEmployee = getEmployeeById(currentEmployeeId, employeeData);
  let currentRating = currentEmployee[`${currentData}`];
  let newArray = currentRating.push(newData);
  console.log(currentRating);

  fetch(`http://localhost:3000/employees/${currentEmployeeId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      [currentData]: newArray,
    }),
  });
}

function loadData() {
  fetch(url)
    .then((r) => r.json())
    .then((data) => (employeeData = data));
}
loadData();

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
