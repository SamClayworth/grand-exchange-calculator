import { items } from "./prices.js";

items.sort((a, b) => a.name.localeCompare(b.name));

let totalPrice = 0;

const totalAmount = document.getElementById("total-amount");
const itemsPriceResult = [];
const itemCalculator = document.querySelector(".items");

let itemPrices = [];

items.forEach((item) => {
  // creates a new table element for every item
  const itemTable = document.createElement("table");

  //create a table row for every item
  const itemRow = document.createElement("tr");

  // create table cells for item name, price, quantity, and total
  const itemNameCell = document.createElement("td");
  itemNameCell.textContent = `${item.name}`;
  let itemPriceCell = document.createElement("input");
  itemPriceCell.value = item.price;
  itemPriceCell.type = "number";
  itemPriceCell.className = "price-input";

  itemPriceCell.addEventListener("input", () => {
    const newPrice = parseFloat(itemPriceCell.value);
    item.price = newPrice;

    const quantity = parseInt(quantityInput.value);
    const totalPriceForItem = newPrice * quantity;
    itemPriceResultCell.textContent = `$${totalPriceForItem.toFixed(2)}`;

    itemPrices[item.id] = totalPriceForItem;

    calculateTotalPrice();
  });

  const quantityInputCell = document.createElement("td");
  let quantityInput = document.createElement("input");
  quantityInput.type = "number";
  quantityInput.min = "0";
  quantityInput.className = "quantity-input";
  quantityInput.value = 0;

  const itemPriceResultCell = document.createElement("td");
  itemPriceResultCell.textContent = `$0.00`;

  quantityInput.addEventListener("input", () => {
    const quantity = parseInt(quantityInput.value, 10);
    const price = item.price * quantity;
    itemPriceResultCell.textContent = `$${price.toFixed(2)}`;
    itemPrices[item.id] = price;
    calculateTotalPrice();
  });

  itemRow.appendChild(itemNameCell);
  itemRow.appendChild(itemPriceCell);
  itemRow.appendChild(quantityInputCell);
  quantityInputCell.appendChild(quantityInput);
  itemRow.appendChild(itemPriceResultCell);

  itemTable.appendChild(itemRow);
  itemCalculator.appendChild(itemTable);

  itemsPriceResult.push(itemPriceResultCell);
});

const calculateTotalPrice = () => {
  totalPrice = itemPrices.reduce((total, price) => total + (price || 0), 0);
  console.log(totalPrice);
  totalAmount.textContent = `$${totalPrice.toFixed(0)}`;
};

document.getElementById("clear-btn").addEventListener("click", () => {
  totalAmount.textContent = "$0";
  const quantityInputs = document.querySelectorAll(".quantity-input");
  quantityInputs.forEach((input) => {
    input.value = 0;
  });

  itemsPriceResult.forEach((resultCell) => {
    resultCell.textContent = "$0";
  });

  itemPrices = [];
  calculateTotalPrice();
});

calculateTotalPrice();
