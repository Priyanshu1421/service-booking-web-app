
const servicesData = [
  {
    id: 1,
    name: "Dry Cleaning",
    price: 200.00,
    image: "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 2,
    name: "Ironing",
    price: 30.00,
    image: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 3,
    name: "Wedding Dress Cleaning",
    price: 2400.00,
    image: "https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 4,
    name: "Stain Removal",
    price: 500.00,
    image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&q=80&w=600"
  }
];

let currentIndex = 0;
let cart = [];


const serviceImg = document.getElementById("service-img");
const serviceName = document.getElementById("service-name");
const servicePrice = document.getElementById("service-price");
const addBtn = document.getElementById("add-btn");
const skipBtn = document.getElementById("skip-btn");
const cartTableBody = document.getElementById("cart-table-body");
const totalAmountEl = document.getElementById("total-amount");
const bookingForm = document.getElementById("booking-form");


function loadService(index) {
  if (index >= servicesData.length) {
    
    currentIndex = 0;
  }
  const service = servicesData[currentIndex];
  serviceImg.src = service.image;
  serviceName.textContent = service.name;
  servicePrice.textContent = `₹${service.price.toFixed(2)}`;
}


function addCurrentServiceToCart() {
  const currentService = servicesData[currentIndex];
  cart.push(currentService);
  updateCartUI();
  nextService();
}


function nextService() {
  currentIndex = (currentIndex + 1) % servicesData.length;
  loadService(currentIndex);
}


function updateCartUI() {
  cartTableBody.innerHTML = "";

  if (cart.length === 0) {
    cartTableBody.innerHTML = `
      <tr id="empty-row">
        <td colspan="3" class="text-center empty-msg">No items added yet</td>
      </tr>`;
    totalAmountEl.textContent = "₹ 0.00";
    return;
  }

  let total = 0;
  cart.forEach((item, index) => {
    total += item.price;
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${item.name}</td>
      <td class="text-right">₹${item.price.toFixed(2)}</td>
    `;
    cartTableBody.appendChild(row);
  });

  totalAmountEl.textContent = `₹ ${total.toFixed(2)}`;
}


bookingForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (cart.length === 0) {
    alert("Please add at least one service before booking.");
    return;
  }

  const name = document.getElementById("fullName").value;
  alert(`Thank you, ${name}! Your booking for ${cart.length} service(s) has been placed successfully.`);
  
  
  cart = [];
  updateCartUI();
  bookingForm.reset();
});


addBtn.addEventListener("click", addCurrentServiceToCart);
skipBtn.addEventListener("click", nextService);


loadService(currentIndex);