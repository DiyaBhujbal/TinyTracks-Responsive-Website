// Function to upload image and display it
function uploadImage() {
    var imageInput = document.getElementById('imageInput');
    var textInput = document.getElementById('textInput');
    var gallery = document.getElementById('gallery');
  
    // Get the uploaded image file
    var file = imageInput.files[0];
    if (!file) {
      alert('Please select an image.');
      return;
    }
  
    // Create a new image element
    var imgElement = document.createElement('img');
    imgElement.classList.add('uploaded-image');
  
    // Read the uploaded image as URL and set it as the source of the image element
    var reader = new FileReader();
    reader.onload = function(event) {
      imgElement.src = event.target.result;
  
      // Create a new div element to display the text alongside the image
      var divElement = document.createElement('div');
      divElement.classList.add('gallery-item');
      divElement.innerHTML = '<p class="text">' + textInput.value + '</p>';
  
      // Create delete button
      var deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.classList.add('delete-button');
      deleteButton.addEventListener('click', function() {
        divElement.remove();
      });
  
      // Append the image, text, and delete button to the gallery
      divElement.appendChild(imgElement);
      divElement.appendChild(deleteButton);
      gallery.appendChild(divElement);
    };
  
    reader.readAsDataURL(file);
  }
  
  // Save data to localStorage
  function saveData() {
    var galleryItems = document.querySelectorAll('.gallery-item');
  
    var data = [];
    galleryItems.forEach(function(item) {
      var imageSrc = item.querySelector('img').src;
      var textContent = item.querySelector('.text').textContent;
      data.push({ imageSrc: imageSrc, textContent: textContent });
    });
  
    localStorage.setItem('galleryData', JSON.stringify(data));
  }
  
  // Load data from localStorage
  function loadData() {
    var data = JSON.parse(localStorage.getItem('galleryData'));
  
    if (data) {
      var gallery = document.getElementById('gallery');
      gallery.innerHTML = '';
  
      data.forEach(function(item) {
        var imgElement = document.createElement('img');
        imgElement.classList.add('uploaded-image');
        imgElement.src = item.imageSrc;
  
        var divElement = document.createElement('div');
        divElement.classList.add('gallery-item');
        divElement.innerHTML = '<p class="text">' + item.textContent + '</p>';
  
        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', function() {
          divElement.remove();
          saveData();
        });
  
        divElement.appendChild(imgElement);
        divElement.appendChild(deleteButton);
        gallery.appendChild(divElement);
      });
    }
  }
  
  // Clear localStorage
  function clearData() {
    localStorage.removeItem('galleryData');
    var gallery = document.getElementById('gallery');
    gallery.innerHTML = '';
  }
  
  // Event listener for saving data
  window.addEventListener('beforeunload', saveData);
  
  // Event listener for loading data when the page loads
  window.addEventListener('DOMContentLoaded', loadData);
  
  // Event listener for clear button
  var clearButton = document.getElementById('clearButton');
  clearButton.addEventListener('click', clearData);
  