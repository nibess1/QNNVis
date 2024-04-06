
import data from './data.json' assert {type : 'json'}
const images = data.img0;
console.log(images);
const imageData = [];

images.forEach((row, y) => {
  row.forEach((value, x) => {
    imageData.push({ x, y, value });
  });
});

// Set dimensions for each 'pixel' and the overall SVG
const pixelSize = 10;
const svgSize = 28 * pixelSize;

// Variables to track the box position
let boxX = 0;
let boxY = 0;

// Create SVG container
const svg = d3.select('body').append('svg')
  .attr('width', svgSize)
  .attr('height', svgSize);

// Plot each 'pixel'
svg.selectAll('rect')
  .data(imageData)
  .enter()
  .append('rect')
  .attr('x', d => d.x * pixelSize)
  .attr('y', d => d.y * pixelSize)
  .attr('width', pixelSize)
  .attr('height', pixelSize)
  .attr('fill', d => `rgb(${d.value * 255}, ${d.value * 255}, ${d.value * 255})`);

// Create a 2x2 box
const box = svg.append('rect')
  .attr('x', boxX * pixelSize)
  .attr('y', boxY * pixelSize)
  .attr('width', pixelSize * 2)
  .attr('height', pixelSize * 2)
  .attr('fill', 'none')
  .attr('stroke', 'red')
  .attr('stroke-width', 2);

// Function to move the box
function moveBox() {
  if (boxX < 26) {
    boxX += 2;
  } else {
    boxX = 0;
    if (boxY < 26) {
      boxY += 2;
    } else {
      // Reset to start position if at the end
      boxY = 0;
    }
  }
  
  box.attr('x', boxX * pixelSize)
    .attr('y', boxY * pixelSize);
}

// Event listener for the "next" button
document.getElementById('nextButton').addEventListener('click', moveBox);
