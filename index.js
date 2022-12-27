let dropdown = getElementById("employeeDropdown");
dropdown.length = 0;

let defaultOption = document.createElement("option");
defaultOption.text = "Choose Employee";

dropdown.add(defaultOption);
dropdown.selectedIndex = 0;

const url = "./db.json";

fetch(url).then(function (response) {
  response.json().then(function (data) {
    let option;
    for (let i = 0; i < data.length; i++) {
      option = document.createElement("option");
      option.text = data[i].name;
      option.value = data[i].id;
      dropdown.add(option);
    }
  });
});
