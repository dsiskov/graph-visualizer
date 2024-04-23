export const nodeHeightPx = 50
export const nodeWidthPx = 120
export const connectorWidthPx = 15
export const nodeSpacingPx = 20

let nodesToDraw = []
let linesToDraw = []

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
  // nodesToDraw = []
  // linesToDraw = []

  const roots = data.filter((x) => x.parent === '')
  if (roots.length !== 1)
    throw new Error('Multiple or no root elements are not supported')

  const root = roots[0]
  const children = data.filter((x) => x.parent === root.name)

  // render root children
  const height = renderGraph(
    data,
    root,
    firstChildX,
    firstChildY,
    children.length > 0
  )

  console.log('height', height)

  // render root
  if (height === 0) {
    // no children
    drawNode(root, firstChildX, firstChildY)
    return
  }

  const rootX = firstChildX - 2 * connectorWidthPx
  const rootY = firstChildY + height / 2
  console.log({ firstChildX, rootX, rootY })

  drawNode(root, rootX, rootY)

  const connectorY = rootY + nodeHeightPx / 2
  const connectorX = rootX + nodeWidthPx
  // connector to the right
  drawLine(
    new Point(connectorX, connectorY),
    new Point(connectorX + connectorWidthPx, connectorY)
  )

  return { nodesToDraw, linesToDraw }
}

function renderGraph(data, node, x, y, hasChildren) {
  if (node.parent !== '') {
    const connectorY = y + nodeHeightPx / 2 // middle of block
    if (hasChildren) {
      const connectorX = x + nodeWidthPx // end of block
      // connector to the right
      drawLine(
        new Point(connectorX, connectorY),
        new Point(connectorX + connectorWidthPx, connectorY)
      )
    }

    // connector to the left
    drawLine(
      new Point(x, connectorY),
      new Point(x - connectorWidthPx, connectorY)
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
      x + 2 * connectorWidthPx + nodeWidthPx,
      y + nodeHeightPx + nodeSpacingPx + height / 2,
      descendentCount > 1
    )
  }

  if (height) {
    // vertical children connector
    const connectorX = x + connectorWidthPx + nodeWidthPx
    drawLine(
      new Point(connectorX, y + nodeHeightPx / 2),
      new Point(connectorX, y + height + nodeHeightPx / 2)
    )
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

export { startRendering }
// module.exports = { startRendering }
