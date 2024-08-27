let create_new = document.getElementById("create-new-button");
let section = document.getElementById("hidden-section");
let tableHeader = document.getElementById("table-header");
let create_Button = document.getElementById("create-new-button");
let filter = document.getElementById("icon-filter");
let closefilter = document.getElementById("close-filter");
let create_form = document.getElementById("form-dialog");
const now = new Date();

const dialog = document.getElementById("itemDialog");
const itemId = document.getElementById("itemId");
const itemTitle = document.getElementById("itemTitle");
const itemBody = document.getElementById("itemBody");
const closeDialog = document.getElementById("closeDialog");

const headerId = document.getElementById("reverse-button");

// Add event listener to the close button
closeDialog.addEventListener("click", () => {
  dialog.close();
});
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
let shown = []; // This will contain the items displayed per page
let currentPage = 1;

function fetchData() {
  fetch("https://jsonplaceholder.typicode.com/posts?_limit=7")
    .then((response) => response.json())
    .then((fetchedData) => {
      data = fetchedData;
      updateTable();
      updatePaginationControls();
    });
}  
const tbody = document.querySelector("#forms-tbody");

function updateTable() {
  tbody.innerHTML = ""; // Clear existing rows

  // Calculate start and end index for the current page
  const startIndex = (currentPage -1 ) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, data.length);

  // Update the shown array with items for the current page
  shown = data.slice(startIndex, endIndex);

  // Populate the table with data for the current page
  populateTable(shown, tbody);
}

function populateTable(items, tbody) {
  items.forEach((item, index) => {
    const row = document.createElement("tr");

    // Index cell
    const indexCell = document.createElement("td");
    indexCell.textContent = (currentPage - 1) * ITEMS_PER_PAGE + index + 1; // Adjust for pagination
    row.appendChild(indexCell);

    // ID cell
    const idCell = document.createElement("td");
    idCell.textContent = item.userId;
    row.appendChild(idCell);

    // User ID cell
    const userIdCell = document.createElement("td");
    userIdCell.textContent = item.id;
    row.appendChild(userIdCell);

    // Title cell
    const titleCell = document.createElement("td");
    titleCell.textContent = item.title;
    row.appendChild(titleCell);

    // Body cell
    const bodyCell = document.createElement("td");
    bodyCell.textContent = item.body;
    row.appendChild(bodyCell);

    // Date cell
    const dateCell = document.createElement("td");
    dateCell.textContent = now.toLocaleString();
    dateCell.classList.add("time");
    row.appendChild(dateCell);

    // Icon cell
    const iconCell = document.createElement("td");
    const span = document.createElement("span");
    span.textContent = "";
    span.classList.add("icon-eye-open", "large", "shadow", "8");
    iconCell.appendChild(span);
    row.appendChild(iconCell);

    // Add event listener to the span
    span.addEventListener("click", () => {
      // Extract and format the item properties
      itemId.textContent = `ID: ${item.id}`;
      itemTitle.textContent = `Title: ${item.title}`;
      itemBody.textContent = `Body: ${item.body}`;

      // Show the dialog
      dialog.showModal();
    });

    // Append the row to the tbody
    tbody.appendChild(row);
  });
}

function updatePaginationControls() {
  const paginationControls = document.getElementById("paginationControls");
  paginationControls.innerHTML = "";

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  // Create Previous button
  const prevButton = createButton("السابق", () => goToPage(currentPage - 1));
  if (currentPage === 1) {
    // prevButton.disabled = true; // Disable button if current page is 1
    prevButton.classList.add("disabled"); // Add 'disabled' class for styling
  }
  paginationControls.appendChild(prevButton);

  // Define the maximum number of page buttons to display
  const maxPageButtons = 5;

  // Calculate the starting page number for the buttons
  let startPage = currentPage - Math.floor(maxPageButtons / 2);
  startPage = Math.max(1, startPage);

  // Calculate the ending page number for the buttons
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
    nextButton.classList.add("notactive"); // Add 'notactive' class if on the last page
  }
  paginationControls.appendChild(nextButton);
}

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



function addRow(newObject) {

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


function submitForm() {
  
  const form = document.getElementById('dialogForm');
  const newObject = {
      userId: parseInt(form.userId.value),
      id: parseInt(form.Id.value),
      title: form.title.value,
      body: form.body.value
  };
  addRow(newObject);
  
  // Reset form fields
  form.reset();
  alert('Form submitted!');
  hideDialog(); // Close the dialog after submission
}

// Show the dialog
document.getElementById('open-dialog').onclick =function() {
document.getElementById('form-dialog').style.display = 'block';
};

// Hide the dialog
function hideDialog() {
  document.getElementById('form-dialog').style.display = 'none';
}



// Hide dialog if user clicks outside 
window.onclick = function(event) {
  if (event.target == document.getElementById('form-dialog')) {
      hideDialog();
  }
};

// Fetch and populate table data on page load
document.addEventListener("DOMContentLoaded", fetchData);
