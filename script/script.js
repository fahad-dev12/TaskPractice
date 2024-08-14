let create_new = document.getElementById("create-new-button");
let section = document.getElementById("hidden-section");
let tableHeader = document.getElementById("table-header");
let create_Button = document.getElementById("create-new-button");
let filter = document.getElementById("icon-filter");
let closefilter = document.getElementById("close-filter");
const now = new Date();

const dialog = document.getElementById('itemDialog');
const itemId = document.getElementById('itemId');
const itemTitle = document.getElementById('itemTitle');
const itemBody = document.getElementById('itemBody');
const closeDialog = document.getElementById('closeDialog');


const headerId = document.getElementById('header-id');
const headerTitle = document.getElementById('header-title');
const headerBody = document.getElementById('header-body');
const headerDate = document.getElementById('header-date');



// Add event listener to the close button
closeDialog.addEventListener('click', () => {
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
let shown = []; // This will host the items displayed per page
let currentPage = 1;

function fetchData() {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((fetchedData) => {
      data = fetchedData;
      updateTable();
      updatePaginationControls();
    });
}

function updateTable() {
  const tbody = document.querySelector("#forms-tbody");
  tbody.innerHTML = ""; // Clear existing rows

  // Calculate start and end index for the current page
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, data.length);

  // Update the shown array with items for the current page
  shown = data.slice(startIndex, endIndex);
  // Populate table with data for the current page
  shown.forEach((item, index) => {
    const row = document.createElement("tr");

    const indexcell = document.createElement("td");
    indexcell.textContent = startIndex + index + 1; // Adjust for pagination
    row.appendChild(indexcell);

   

    const idcell = document.createElement("td");
    idcell.textContent = item.userId; 
    row.appendChild(idcell);

      const useridcell = document.createElement("td");
    useridcell.textContent = item.id; 
    row.appendChild(useridcell);

    
    const titleCell = document.createElement("td");
    titleCell.textContent = item.title;
    row.appendChild(titleCell);

    const bodycell = document.createElement("td");
    bodycell.textContent = item.body;
    row.appendChild(bodycell);

    const date = document.createElement("td");
    date.textContent = now.toLocaleString();
    date.classList.add("time");
    row.appendChild(date);

    const span = document.createElement("span");
    span.textContent = "";
    span.classList.add("icon-eye-open", "large", "shadow", "8");
    const icon = document.createElement("td");
    icon.appendChild(span);
    row.appendChild(icon);

  // Add event listener to the span
span.addEventListener('click', () => {
  // Extract and format the item properties
  itemId.textContent = `ID: ${item.id}`;
  itemTitle.textContent = `Title: ${item.title}`;
  itemBody.textContent = `Body: ${item.body}`;

  // Show the dialog
  dialog.showModal();
});


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

// Fetch and populate table data on page load
document.addEventListener("DOMContentLoaded", fetchData);

const newObject = {
    "userId": 8,
    "id": 160,
    "title": "et praesentium aliquam est",
    "body": "natus corrupti maxime laudantium et voluptatem laboriosam odit",
    "completed": false
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



headerId.addEventListener("click",function(){shown = shown.reverse();updateTable(); updatePaginationControls();    });

