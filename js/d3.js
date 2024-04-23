import { nodeWidthPx, nodeHeightPx } from './render.js'

// Define SVG dimensions
const svgWidth = 1400
const svgHeight = 1200

// Define data for rectangles and line
const data = [
  { x: 50, y: 50 },
  { x: 150, y: 50 },
]

// Create SVG element
const svg = d3
  .select('#svg-container')
  .attr('width', svgWidth)
  .attr('height', svgHeight)

export function drawNodes(nodes) {
  svg
    .selectAll('.rect')
    .data(nodes)
    .enter()
    .append('rect')
    .attr('class', 'rect')
    .attr('x', (d) => d.point.x)
    .attr('y', (d) => d.point.y)
    .attr('width', nodeWidthPx)
    .attr('height', nodeHeightPx)
}

// svg
//   .append('line')
//   .attr('class', 'line')
//   .attr('x1', data[0].x + 50 / 2)
//   .attr('y1', data[0].y + 50 / 2)
//   .attr('x2', data[1].x + 50 / 2)
//   .attr('y2', data[1].y + 50 / 2)
