 // Get the elements
 let section = document.getElementById('hidden-section');
 let tableHeader = document.getElementById('table-header');
 let createButton = document.getElementById('create-new-button');
 let filter = document.getElementById('icon-filter');

 // Function to show elements and change styles
 function show() {
     section.style.display = 'grid'; // Change display style
     tableHeader.style.backgroundColor = 'var(--primary)'; // Set background color of table header
     createButton.style.backgroundColor = 'var(--primary)'; // Set background color of create button
 }

 // Add event listener to the filter button
 filter.addEventListener('click', show);