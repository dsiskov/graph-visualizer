// Define SVG dimensions
const svgWidth = 400
const svgHeight = 200
const spaceBetween = 10

// Define data for rectangles and line
const data = [
  { x: 50, y: 50 },
  { x: 150, y: 50 },
  { x: 150, y: 100 + 1 * spaceBetween },
  { x: 150, y: 150 + 2 * spaceBetween },
]

// Create SVG element
const svg = d3
  .select('#svg-container')
  .attr('width', svgWidth)
  .attr('height', svgHeight)

// Draw rectangles
svg
  .selectAll('.rect')
  .data(data)
  .enter()
  .append('rect')
  .attr('class', 'rect')
  .attr('x', (d) => d.x)
  .attr('y', (d) => d.y)
  .attr('width', 50)
  .attr('height', 50)

svg
  .append('line')
  .attr('class', 'line')
  .attr('x1', data[0].x + 50 / 2)
  .attr('y1', data[0].y + 50 / 2)
  .attr('x2', data[1].x + 50 / 2)
  .attr('y2', data[1].y + 50 / 2)

svg
  .append('line')
  .attr('class', 'line')
  .attr('x1', data[1].x + 50 / 2)
  .attr('y1', data[1].y + 50 / 2)
  .attr('x2', data[2].x + 50 / 2)
  .attr('y2', data[2].y + 50 / 2)

svg
  .append('line')
  .attr('class', 'line')
  .attr('x1', data[2].x + 50 / 2)
  .attr('y1', data[2].y + 50 / 2)
  .attr('x2', data[3].x + 50 / 2)
  .attr('y2', data[3].y + 50 / 2)

// // Draw line connecting rectangles
// for (let index = 0; index < data.length; index += 2) {
//   svg
//     .append('line')
//     .attr('class', 'line')
//     .attr(`x${index}`, data[index].x)
//     .attr(`y${index}`, data[index].y)
//     .attr(`x${index + 1}`, data[index + 1].x)
//     .attr(`y${index + 1}`, data[index + 1].y)
// }
