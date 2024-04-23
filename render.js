const nodeHeightPx = 50
const nodeWidthPx = 300
const horizontalLineWidthPx = 15
const verticalMarginPx = 5

function startRendering(data, firstChildX, firstChildY) {
  const root = data.find((x) => x.parent === '')
  const children = data.filter((x) => x.parent === root.name)

  const height = renderGraph(
    data,
    root,
    firstChildX,
    firstChildY,
    children.length > 0
  )
  if (height === 0) {
    // no children
    drawNode(root, firstChildX, firstChildY)
    return
  }

  rootX = firstChildX - 2 * horizontalLineWidthPx - nodeWidthPx
  rootY = firstChildY + height / 2

  drawNode(root, rootX, rootY)
  drawHorizontal(
    rootY + nodeHeightPx / 2,
    rootX + nodeWidthPx,
    horizontalLineWidthPx
  )
}

function renderGraph(data, node, offsetX, offsetY, hasChildren) {
  if (node.parent !== '') {
    if (hasChildren)
      drawHorizontal(
        offsetY + nodeHeightPx / 2,
        offsetX + nodeWidthPx,
        horizontalLineWidthPx
      )
    drawHorizontal(offsetY + nodeHeightPx / 2, offsetX, -horizontalLineWidthPx)
    drawNode(node, offsetX, offsetY)
  }
  const children = data.filter((x) => x.parent === node.name)

  let height = 0
  for (let index = 0; index < children.length; index++) {
    const descendentCount = getDescendentCount(data, children[index])
    height += descendentCount * nodeHeightPx
    renderGraph(
      data,
      children[index],
      offsetX + 2 * horizontalLineWidthPx + nodeWidthPx,
      nodeHeightPx + verticalMarginPx + height / 2,
      descendentCount > 1
    )
  }

  if (height) drawVertical(offsetX - horizontalLineWidthPx, offsetY, height)
  return height
}

function getDescendentCount(data, node) {
  const children = data.filter((x) => x.parent === node.name)
  if (!children.length) return 1

  return children.reduce((acc, curr) => acc + getDescendentCount(data, curr), 0)
}

function drawNode(node, x, y) {
  console.log('drawing', node.name, 'on', { x, y })
}

function drawHorizontal(y, x, length) {
  console.log(`drawing horizontal from (${x}, ${y}) to (${x + length}, ${y})`)
}

function drawVertical(x, y, length) {
  console.log(`drawing vertical from (${x}, ${y}) to (${x}, ${y + length})`)
}

module.exports = { startRendering }
