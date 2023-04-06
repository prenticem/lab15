// Define an array of images to display
const images = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg'];

// Keep track of the count of each image and the previous images selected
let previousImages = [];

// Define a function to get a random element from an array
function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

//Starts the count at zero
const imagesCount = Object.fromEntries(images.map(image => [image, 0]));

// Refresh the displayed images
function refreshImages() {
  // Create a copy of the images array to avoid modifying the original array
  const availableImages = [...images];
  const selectedImages = [];

  // Select three random images from the available images pool
  for (let i = 0; i < 3; i++) {
    const imageIndex = Math.floor(Math.random() * availableImages.length);
    const selectedImage = availableImages[imageIndex];

    // Remove the selected image from the available images
    availableImages.splice(imageIndex, 1);

    // Display the image as a product
    const productElement = [product1Span, product2Span, product3Span][i];
    productElement.innerHTML = `<img class='img' src="assets/${selectedImage}">`;

    // Add the selected image to the selected images array
    selectedImages.push(selectedImage);
  }

  // Update the previous images array
  previousImages = selectedImages;

  // Increment the count for the selected images
  selectedImages.forEach(image => {
    imagesCount[image]++;
  });

  // Store the updated imagesCount object in local storage as a formatted JSON string
  localStorage.setItem('imagesCount', JSON.stringify(imagesCount));
}

// Get the elements to display the products
const product1Span = document.getElementById('product-1');
const product2Span = document.getElementById('product-2');
const product3Span = document.getElementById('product-3');

// Display a new set of images when one of the products is clicked
refreshImages();

product1Span.addEventListener('click', refreshImages);
product2Span.addEventListener('click', refreshImages);
product3Span.addEventListener('click', refreshImages);

// Retrieve the imagesCount object from local storage and parse it as JSON
const storedImagesCount = localStorage.getItem('imagesCount');
if (storedImagesCount) {
  const parsedImagesCount = JSON.parse(storedImagesCount);
  
  // Merge the parsed imagesCount object with the existing imagesCount object
  Object.keys(parsedImagesCount).forEach(key => {
    imagesCount[key] += parsedImagesCount[key];
  });
}

// Show the voting results when the "View Results" button is clicked
const viewResultsBtn = document.querySelector('.view-results-btn');
viewResultsBtn.addEventListener('click', showResults);

function showResults() {
  // Get the labels and data for the chart from the imagesCount object
  const labels = Object.keys(imagesCount);
  const data = Object.values(imagesCount);

  // Create a chart to display the voting results
  const canvas = document.getElementById('results-chart');

  const chart = new Chart(canvas, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Image Votes',
        data: data,
        // Set the color of the bars in the chart
        backgroundColor: [
          'rgb(255, 99, 132,)',
          'rgb(54, 162, 235,)',
          'rgb(255, 206, 86,)',
          'rgb(75, 192, 192,)'
        ]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      // Set the title of the chart
      title: {
        display: true,
        text: 'Image Votes'
      }
    }
  });
}
