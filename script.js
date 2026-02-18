var stocks = [
  { symbol: 'APPEL', price: 175.43, base: 175.43 },
  { symbol: 'MSFT', price: 378.91, base: 378.91 },
  { symbol: 'TSLA', price: 248.48, base: 248.48 },
  { symbol: 'RELIANCE', price: 2456.30, base: 2456.30 },
	{ symbol: 'TCS', price: 3845.75, base: 3845.75 },
	{ symbol: 'INFY', price: 1456.80, base: 1456.80 },
	{ symbol: 'HDFCBANK', price: 1678.90, base: 1678.90 },
	{ symbol: 'ICICIBANK', price: 1025.40, base: 1025.40 },
	{ symbol: 'SBIN', price: 742.10, base: 742.10 },
	{ symbol: 'ITC', price: 462.55, base: 462.55 },
	{ symbol: 'LT', price: 3650.25, base: 3650.25 },
	{ symbol: 'BHARTIARTL', price: 1125.60, base: 1125.60 },
	{ symbol: 'MARUTI', price: 10485.90, base: 10485.90 }

];

var watchlist = [];
var searchTerm = "";

function renderStocks() {
  var tbody = document.getElementById("stocks-tbody");
  var html = "";

  for (var i = 0; i < stocks.length; i++) {

    if (searchTerm &&
        stocks[i].symbol.toLowerCase().indexOf(searchTerm.toLowerCase()) === -1) {
      continue;
    }

    var change = stocks[i].price - stocks[i].base;
    var changeClass = change >= 0 ? "change-up" : "change-down";

    html += `
      <tr>
        <td>${stocks[i].symbol}</td>
        <td>$${stocks[i].price.toFixed(2)}</td>
        <td class="${changeClass}">
          ${change >= 0 ? "+" : ""}${change.toFixed(2)}
        </td>
        <td>
          <button class="buy-btn" onclick="buyStock('${stocks[i].symbol}')">Buy</button>
          <button class="watch-btn" onclick="toggleWatch('${stocks[i].symbol}')">⭐</button>
        </td>
      </tr>
    `;
  }

  tbody.innerHTML = html;
}

function updatePrices() {
  for (var i = 0; i < stocks.length; i++) {
    var random = (Math.random() - 0.5) * 5;
    stocks[i].price += random;
  }
  renderStocks();
  renderWatchlist();
}

function buyStock(symbol) {
  alert("Buy Order Placed for " + symbol);
}

function toggleWatch(symbol) {
  if (watchlist.indexOf(symbol) === -1) {
    watchlist.push(symbol);
  } else {
    watchlist.splice(watchlist.indexOf(symbol), 1);
  }
  renderWatchlist();
}

function renderWatchlist() {
  var container = document.getElementById("watchlist-items");
  var html = "";

  for (var i = 0; i < watchlist.length; i++) {
    html += `<div class="watch-item">${watchlist[i]}</div>`;
  }

  container.innerHTML = html;
}

function searchStocks() {
  searchTerm = document.getElementById("search-stock").value;
  renderStocks();
}

renderStocks();
setInterval(updatePrices, 3000);
