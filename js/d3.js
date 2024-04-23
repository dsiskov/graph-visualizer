import { nodeWidthPx, nodeHeightPx } from './render.js'

// Define SVG dimensions
const svgWidth = 1400
const svgHeight = 1200

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
    .attr('x', (d) => {
      console.log('drawing', d.point.print())
      return d.point.x
    })
    .attr('y', (d) => d.point.y)
    .attr('width', nodeWidthPx)
    .attr('height', nodeHeightPx)
    .style('fill', 'steelblue')

  svg
    .selectAll('.text')
    .data(nodes)
    .enter()
    .append('text')
    .attr('class', 'text')
    .attr('x', (d) => d.point.x + nodeWidthPx / 2)
    .attr('y', (d) => d.point.y + nodeHeightPx / 2)
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')
    .style('fill', 'white')
    .text((d) => d.node.name)
}

export function drawLines(lines) {
  const lineSelection = svg
    .selectAll('.line')
    .data(lines)
    .enter()
    .append('line')
    .attr('class', 'line')

  lineSelection
    .attr('x1', (d) => d.point1.x)
    .attr('y1', (d) => d.point1.y)
    .attr('x2', (d) => d.point2.x)
    .attr('y2', (d) => d.point2.y)
    .style('stroke', 'red')
    .style('stroke-width', 2)
}
