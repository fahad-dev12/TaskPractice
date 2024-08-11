//  Get the elements
let create_new = document.getElementById('create-new-button');
 let section = document.getElementById('hidden-section');
 let tableHeader = document.getElementById('table-header');
 let create_Button = document.getElementById('create-new-button');
 let filter = document.getElementById('icon-filter');
 let closefilter = document.getElementById('close-filter');




 // Function to show elements and change styles
 function show() {
     section.style.display = 'grid'; // Change display style
     tableHeader.style.backgroundColor = 'var(--primary)'; // Set background color of table header
     create_Button.style.backgroundColor = 'var(--primary)'; // Set background color of create button
 }
 function hide() {
    section.style.display = 'none'; // Change display style
    tableHeader.style.backgroundColor = 'var(--primary-light)'; // Set background color of table header
    create_Button.style.backgroundColor = 'var(--primary-light)'; // Set background color of create button
}

filter.addEventListener('click' , show);
closefilter.addEventListener('click' , hide);


 function fetchData() 
 {
    // Fetch data from the API
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=3')
        .then(response => response.json()) // Directly parse JSON
        .then(data =>
        {
            // Populate the table with data
            populateTable(data);
        })
}

const ITEMS_PER_PAGE = 5;
let data = [];
let currentPage = 1;

function fetchData() {
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=3')
        .then(response => response.json())
        .then(fetchedData => {
            data = fetchedData;
            updateTable();
            updatePaginationControls();
        })
      
}

function updateTable() {
    const tbody = document.querySelector('#forms-tbody');
    tbody.innerHTML = '';

    // Calculate start and end index for the current page
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, data.length);

    // Populate table with data for the current page
    for (let i = startIndex; i < endIndex; i++) {
        const item = data[i];
        const row = document.createElement('tr');
        
        const idCell = document.createElement('td');
        idCell.textContent = item.id;
        row.appendChild(idCell);

        const titleCell = document.createElement('td');
        titleCell.textContent = item.title;
        row.appendChild(titleCell);

  

        const completedCell = document.createElement('td');
        completedCell.textContent = item.completed ? 'Yes' : 'No';
        row.appendChild(completedCell);

        const date2 = document.createElement('td');
        date2.textContent = '22-10-2022 2.31م';
         row.appendChild(date2);

         const span = document.createElement('td');
         span.textContent = item.id;
          row.appendChild(span);   
           

      
        tbody.appendChild(row);
    }
}

function updatePaginationControls() {
    const paginationControls = document.getElementById('paginationControls');
    paginationControls.innerHTML = '';

    const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  // Create Previous button
  const prevButton = createButton('السابق', () => goToPage(currentPage - 1));
  if (currentPage === 1) {
      prevButton.disabled = true; // Disable button if current page is 1
      prevButton.classList.add('disabled'); // Add 'disabled' class for styling
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
            pageButton.classList.add('active'); // Add 'active' class for the current page
        }
        paginationControls.appendChild(pageButton);
    }

    // Create Next button
    if (currentPage < totalPages) {
        const nextButton = createButton('التالي', () => goToPage(currentPage + 1));
        paginationControls.appendChild(nextButton);
    }
}// end of update pagination

function createButton(text, onClick) {
    const button = document.createElement('button');
    button.textContent = text;
    button.addEventListener('click', onClick);
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
document.addEventListener('DOMContentLoaded', fetchData);


    
function addRow(){
    const tbody2 = document.querySelector('#forms-tbody');
    tbody2.innerHTML = '';

    const newrow = document.createElement('tr');
    
    let newidCell = document.createElement('td');
    newidCell.textContent = '9999';
    newrow.appendChild(newidCell);

    let newcontentcellar = document.createElement('td');
    newcontentcellar.textContent =' temp text';
    newrow.appendChild(newcontentcellar);

    let newcontentcellen = document.createElement('td');
    newcontentcellen.textContent =' temp text';
    newrow.appendChild(newcontentcellen);

    let newtime = document.createElement('td');
    newtime.textContent =' temp time';
    newrow.appendChild(newtime);
    
    let newtempce = document.createElement('td');
    newtempce.textContent =' temp text';
    newrow.appendChild(newtempce);


    
    tbody2.appendChild(newrow);

}

addRow(); 

