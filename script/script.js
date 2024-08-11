//  Get the elements
let create_new = document.getElementById("create-new-button");
let section = document.getElementById("hidden-section");
let tableHeader = document.getElementById("table-header");
let create_Button = document.getElementById("create-new-button");
let filter = document.getElementById("icon-filter");
let closefilter = document.getElementById("close-filter");
const now = new Date();

// Function to show elements and change styles
function show() {
  section.style.display = "grid"; // Change display style
  tableHeader.style.backgroundColor = "var(--primary)"; // Set background color of table header
  create_Button.style.backgroundColor = "var(--primary)"; // Set background color of create button
}
function hide() {
  section.style.display = "none"; // Change display style
  tableHeader.style.backgroundColor = "var(--primary-light)"; // Set background color of table header
  create_Button.style.backgroundColor = "var(--primary-light)"; // Set background color of create button
}

filter.addEventListener("click", show);
closefilter.addEventListener("click", hide);

const ITEMS_PER_PAGE = 5;
let data = [];
let currentPage = 1;

function fetchData() {
  fetch("https://jsonplaceholder.typicode.com/posts?_limit=18")
    .then((response) => response.json())
    .then((fetchedData) => {
      data = fetchedData;
      updateTable();
      updatePaginationControls();
    });
}

function updateTable() {
  const tbody = document.querySelector("#forms-tbody");
  tbody.innerHTML = ""; //delete all existing

  // Calculate start and end index for the current page
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, data.length);

  // Populate table with data for the current page
  for (let i = startIndex; i < endIndex; i++) {
    const item = data[i];
    const row = document.createElement("tr");

    const idcell = document.createElement("td");
    idcell.textContent = i + 1;
    row.appendChild(idcell);

    const titleCell = document.createElement("td");
    titleCell.textContent = item.title;
    row.appendChild(titleCell);

    const bodycell = document.createElement("td");
    bodycell.textContent = item.body;
    row.appendChild(bodycell);

    const date2 = document.createElement("td");
    date2.textContent = now.toLocaleString();
    date2.classList.add("time"); // Add the 'time' class to the <td> element
    row.appendChild(date2); // Append the <td> to the row

    const span = document.createElement("span");
    span.textContent = "";
    span.classList.add("icon-eye-open", "large", "shadow", "8");
    const icon = document.createElement("td");
    icon.appendChild(span);
    row.appendChild(icon);

    span.addEventListener("click", () => {
      alert(JSON.stringify(data[i]));
    });

    tbody.appendChild(row);
  }
}

function updatePaginationControls() {
  const paginationControls = document.getElementById("paginationControls");
  paginationControls.innerHTML = "";

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  // Create Previous button
  const prevButton = createButton("السابق", () => goToPage(currentPage - 1));
  if (currentPage === 1) {
    prevButton.disabled = true; // Disable button if current page is 1
    prevButton.classList.add("disabled"); // Add 'disabled' class for styling
  }
  paginationControls.appendChild(prevButton);

  // Define the maximum number of page buttons to display
  const maxPageButtons = 5;

  // Calculate the starting page number for the buttons
  // We want to center the current page in the middle if possible
  let startPage = currentPage - Math.floor(maxPageButtons / 2);

  // Ensure that startPage is at least 1 (we don’t want negative page numbers)
  startPage = Math.max(1, startPage);

  // Calculate the ending page number for the buttons
  // Make sure we don't go beyond the total number of pages
  let endPage = startPage + maxPageButtons - 1;
  endPage = Math.min(totalPages, endPage);

  // Adjust start page if end page is less than maxPageButtons
  if (endPage - startPage + 1 < maxPageButtons) {
    startPage = Math.max(1, endPage - maxPageButtons + 1);
  }

  // Create numbered page buttons
  for (let i = startPage; i <= endPage; i++) {
    const pageButton = createButton(i, () => goToPage(i));
    if (i === currentPage) {
      pageButton.classList.add("active"); // Add 'active' class for the current page
    }
    paginationControls.appendChild(pageButton);
  }

  // Create Next button
  const nextButton = createButton("التالي", () => goToPage(currentPage + 1));
  if (currentPage >= totalPages) {
    // Disable if on the last page
    nextButton.classList.add("notactive");
  }
  paginationControls.appendChild(nextButton);
} // end of update pagination

function createButton(text, onClick) {
  const button = document.createElement("button");
  button.textContent = text;
  button.addEventListener("click", onClick);
  return button;
}

function goToPage(pageNumber) {
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  if (pageNumber < 1 || pageNumber > totalPages) {
    return;
  }
  currentPage = pageNumber;
  updateTable();
  updatePaginationControls();
}

// Fetch and populate table data on page load
document.addEventListener("DOMContentLoaded", fetchData);

const newObject = {
  userId: 2,

  title: "New Title",
  body: "New Body",
};
function addRow() {
  // Push the new object into the data array
  data.push(newObject);
  // Determine if pagination needs to be updated
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  if (currentPage > totalPages) {
    // If the current page is greater than the total number of pages, set to the last page
    currentPage = totalPages;
  }

  // Update the table and pagination controls
  updateTable();
  updatePaginationControls();
}

create_new.addEventListener("click", addRow);
