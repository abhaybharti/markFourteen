/* The above code is used to select the elements from the HTML page. */
const initialPrice = document.querySelector("#initialprice");
const quantityOfStock = document.querySelector("#quantityofstock");
const currentPrice = document.querySelector("#currentprice");
const tellMeButton = document.querySelector("#tellme");
const profitNumbers = document.querySelector("#profitnumber");

/* A flag variable that is used to check if the profit/loss message or field validation message is to be shown. */
var doNotShowProfitNumber = true;

/* Adding an event listener to the button. When the button is clicked, the function
`checkStockProfitLoss` is called. */
tellMeButton.addEventListener("click", checkStockProfitLoss);

/**
 * Calculate the profit or loss of the stock
 */
function checkStockProfitLoss() {
  doNotShowProfitNumber = true;
  isFieldValueBlank(quantityOfStock, "Quantity Of Stocks");
  isFieldValueNegativeOrZero(quantityOfStock, "Quantity Of Stocks");
  var currentCost = getCostOfStockAtCurrentPrice();
  var purchaseCost = getCostOfPurchasingStocks();

  calculateProfitOrLoss(purchaseCost, currentCost);
}

/**
 * Calculate the profit or loss and display it in the output box
 * @param purchaseCost - The cost of the item when you bought it.
 * @param currentCost - The current cost of the product.
 */
function calculateProfitOrLoss(purchaseCost, currentCost) {
  var profit = currentCost - purchaseCost;
  var textForOutput = "";
  var profitInPercent = profitInPercentage(profit, purchaseCost);

  if (!doNotShowProfitNumber) {
    profitNumbers.style.color = "red";
  }

  if (doNotShowProfitNumber) {
    if (profit >= 0) {
      textForOutput =
        "Hey, the profit is " +
        profit +
        "₹ and the profit in percent is " +
        profitInPercent +
        "%";
      profitNumbers.style.color = "green";
    } else {
      textForOutput =
        "Hey, the loss is " +
        profit +
        "₹ and the loss in percent is " +
        profitInPercent +
        "%";
      profitNumbers.style.color = "red";
    }
    profitNumbers.innerText = textForOutput;
  }
}

/**
 * Calculate the profit percentage
 * @param profit - The profit made on the sale of the stock.
 * @param purchaseCost - The cost of the stock when you purchased it.
 * @returns The percentage of profit.
 */
function profitInPercentage(profit, purchaseCost) {
  return (profit * 100) / purchaseCost;
}

/**
 * Get the cost of purchasing the stocks
 * @returns The cost of purchasing the stocks.
 */
function getCostOfPurchasingStocks() {
  isFieldValueBlank(initialPrice, "Initial Price");
  isFieldValueNegativeOrZero(initialPrice, "Initial Price");

  return parseInt(initialPrice.value) * parseInt(quantityOfStock.value);
}

/**
 * Get the cost of the stock at the current price
 * @returns The cost of the stock.
 */
function getCostOfStockAtCurrentPrice() {
  isFieldValueBlank(currentPrice, "Current Price");
  isFieldValueNegativeOrZero(currentPrice, "Current Price");

  return parseInt(currentPrice.value) * parseInt(quantityOfStock.value);
}

/**
 * If the value of the field is blank, then display the message
 * @param fieldName - The name of the field that you want to check.
 * @param message - The message to display if the field is blank.
 */
function isFieldValueBlank(fieldName, message) {
  if (fieldName.value.length === 0) {
    profitNumbers.innerText = message + " can't be blank";
    doNotShowProfitNumber = false;
  }
}

/**
 * If the value of the field is less than or equal to zero, then display the message in the
 * profitNumbers element
 * @param fieldName - The name of the field that you want to check.
 * @param message - The message to display if the condition is true.
 */
function isFieldValueNegativeOrZero(fieldName, message) {
  if (parseInt(fieldName.value) <= 0) {
    profitNumbers.innerText = message + " can't 0 or negative number";
    doNotShowProfitNumber = false;
  }
}
