const nodeHeightPx = 50
const nodeWidthPx = 300
const horizontalLineWidthPx = 15
const verticalMarginPx = 5

const nodesToDraw = []
const linesToDraw = []

class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  print() {
    return `(${this.x}, ${this.y})`
  }
}

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

  const rootX = firstChildX - 2 * horizontalLineWidthPx - nodeWidthPx
  const rootY = firstChildY + height / 2

  drawNode(root, rootX, rootY)

  const connectorY = rootY + nodeHeightPx / 2
  const connectorX = rootX + nodeWidthPx
  // connector to the right
  drawLine(
    new Point(connectorX, connectorY),
    new Point(connectorX + horizontalLineWidthPx, connectorY)
  )

  console.log(
    '\n',
    nodesToDraw.map((x) => `${x.node.name}: ${x.point.print()}`).join('\n'),
    '\n\n',
    linesToDraw
      .map((x) => `${x.point1.print()} -> ${x.point2.print()}`)
      .join('\n')
  )
}

function renderGraph(data, node, x, y, hasChildren) {
  if (node.parent !== '') {
    const connectorY = y + nodeHeightPx / 2 // middle of block
    if (hasChildren) {
      const connectorX = x + nodeWidthPx // end of block
      // connector to the right
      drawLine(
        new Point(connectorX, connectorY),
        new Point(connectorX + horizontalLineWidthPx, connectorY)
      )
    }

    // connector to the left
    drawLine(
      new Point(x, connectorY),
      new Point(x - horizontalLineWidthPx, connectorY)
    )
    drawNode(node, x, y)
  }
  const children = data.filter((x) => x.parent === node.name)

  let height = 0
  for (let index = 0; index < children.length; index++) {
    const descendentCount = getDescendentCount(data, children[index])
    height += descendentCount * nodeHeightPx
    renderGraph(
      data,
      children[index],
      x + 2 * horizontalLineWidthPx + nodeWidthPx,
      nodeHeightPx + verticalMarginPx + height / 2,
      descendentCount > 1
    )
  }

  if (height) {
    // vertical children connector
    const connectorX = x - horizontalLineWidthPx
    drawLine(new Point(connectorX, y), new Point(connectorX, y + height))
  }
  return height
}

function getDescendentCount(data, node) {
  const children = data.filter((x) => x.parent === node.name)
  if (!children.length) return 1

  return children.reduce((acc, curr) => acc + getDescendentCount(data, curr), 0)
}

function drawNode(node, x, y) {
  nodesToDraw.push({ point: new Point(x, y), node })
}

function drawLine(point1, point2) {
  linesToDraw.push({ point1, point2 })
}

module.exports = { startRendering }
