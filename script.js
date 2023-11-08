import { items } from "./prices.js";

let totalPrice = 0;

const totals = document.querySelector(".total");
const totalAmount = document.getElementById("total-amount");

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

  const itemPriceCell = document.createElement("td");
  itemPriceCell.textContent = `$${item.price}`;

  const quantityInputCell = document.createElement("td");
  let quantityInput = document.createElement("input");
  quantityInput.type = "number";
  quantityInput.min = "0";
  quantityInput.value = "0";

  const itemPriceResultCell = document.createElement("td");
  itemPriceResultCell.textContent = "$0";

  quantityInput.addEventListener("input", () => {
    const quantity = parseInt(quantityInput.value, 10);
    const price = item.price * quantity;
    itemPriceResultCell.textContent = `$${price}`;
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
});

const calculateTotalPrice = () => {
  totalPrice = itemPrices.reduce((total, price) => total + (price || 0), 0);
  console.log(totalPrice);
  totalAmount.textContent = `$${totalPrice}`;
};

document.getElementById("clear-btn").addEventListener("click", () => {
  totalAmount.textContent = "$0";
  const quantityInputs = document.querySelectorAll("input[type='number']");
  quantityInputs.forEach((input) => {
    input.value = 0;
  });
});

calculateTotalPrice();
