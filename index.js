let currentEmployee;
let customerExperienceRating;
let operationsRating;
let productKnowledgeRating;

//event listeners

let employeeSelect = document.getElementById("employeeDropdown");

employeeSelect.addEventListener("change", (event) => {
  let employeeName = document.getElementById("employeeName");

  employeeName.textContent =
    employeeSelect.options[employeeSelect.selectedIndex].text;

  currentEmployee = event.target.value;
});

let customerExperienceSelection = document.getElementById("customerExperience");

customerExperienceSelection.addEventListener("change", (event) => {
  customerExperienceRating = event.target.value;
});

let operationsSelection = document.getElementById("operations");

operationsSelection.addEventListener("change", (event) => {
  operationsRating = event.target.value;
});

let productKnowledgeSelection = document.getElementById("productKnowledge");

productKnowledgeSelection.addEventListener("change", (event) => {
  (productKnowledgeRating = event.target), value;
});

//Employee Selection

//Add employees from db.json

function addOptions() {
  employeeSelect.length = 0;

  let defaultOption = document.createElement("option");
  defaultOption.text = "Employees";
  defaultOption.value = "";
  defaultOption.disabled = true;

  employeeSelect.add(defaultOption);
  employeeSelect.selectedIndex = 0;

  const url = "./db.json";

  fetch(url).then(function (response) {
    response.json().then(function (data) {
      let option;

      for (let i = 0; i < data.employees.length; i++) {
        option = document.createElement("option");
        option.text = data.employees[i].name;
        option.value = data.employees[i].id;
        employeeSelect.add(option);
      }
    });
  });
}

addOptions();

//Render Charts

const CEChart = document.getElementById("CEChart");
const oChart = document.getElementById("oChart");
const pChart = document.getElementById("pChart");

function renderChart(chartName) {
  new Chart(chartName, {
    type: "bar",
    data: {
      labels: [],
      datasets: [
        {
          label: "Performance Rating",
          data: [12, 19, 3, 5, 2, 3],
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

renderChart(CEChart);
renderChart(oChart);
renderChart(pChart);
