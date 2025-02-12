const form = document.getElementById("vehicleForm");
const vehicleList = document.getElementById("vehicleList");

// Load saved vehicles from localStorage
let vehicles = JSON.parse(localStorage.getItem("vehicles")) || [];

function saveToLocalStorage() {
  localStorage.setItem("vehicles", JSON.stringify(vehicles));
}

function createVehicleItem(vehicle, index) {
  const li = document.createElement("li");
  li.className = "todo-item";
  li.innerHTML = `
                <div class="vehicle-info">
                    <div><strong>${vehicle.name}</strong> (${
    vehicle.type
  })</div>
                    <div>License: ${vehicle.license}</div>
                    <div class="timestamp">Added: ${new Date(
                      vehicle.timestamp
                    ).toLocaleString()}</div>
                </div>
                <div class="actions">
                    <button onclick="editVehicle(${index})">Edit</button>
                    <button class="delete" onclick="deleteVehicle(${index})">Delete</button>
                </div>
            `;
  return li;
}

function renderVehicles() {
  vehicleList.innerHTML = "";
  vehicles.forEach((vehicle, index) => {
    vehicleList.appendChild(createVehicleItem(vehicle, index));
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const newVehicle = {
    name: document.getElementById("vehicleName").value,
    type: document.getElementById("vehicleType").value,
    license: document.getElementById("registrationNumber").value,
    timestamp: Date.now(),
  };

  vehicles.push(newVehicle);
  saveToLocalStorage();
  renderVehicles();
  form.reset();
});

function deleteVehicle(index) {
  vehicles.splice(index, 1);
  saveToLocalStorage();
  renderVehicles();
}

function editVehicle(index) {
  const vehicle = vehicles[index];
  document.getElementById("vehicleName").value = vehicle.name;
  document.getElementById("vehicleType").value = vehicle.type;
  document.getElementById("registrationNumber").value = vehicle.license;

  vehicles.splice(index, 1);
  saveToLocalStorage();
  renderVehicles();
}

// Initial render
renderVehicles();
