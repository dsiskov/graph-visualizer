import {
  startRendering,
  nodeWidthPx,
  nodeHeightPx,
  connectorWidthPx,
} from './render'

describe('render', () => {
  it('does not render a graph with more or less than one parent', () => {
    const data = [
      {
        name: 'A',
        parent: '',
      },
      {
        name: 'C',
        parent: '',
      },
    ]
    expect(() => startRendering(data, 100, 0)).toThrow(/not supported/)
  })

  it('renders a simple graph with one child per node', () => {
    const data = [
      {
        name: 'A',
        parent: '',
      },
      {
        name: 'B',
        parent: 'A',
      },
      {
        name: 'C',
        parent: 'B',
      },
    ]

    const { nodesToDraw, linesToDraw } = startRendering(data, 100, 0)
    expect(nodesToDraw).toEqual([
      { node: { name: 'B', parent: 'A' }, point: { x: 250, y: 70 } },
      { node: { name: 'C', parent: 'B' }, point: { x: 400, y: 140 } },
      { node: { name: 'A', parent: '' }, point: { x: 100, y: 70 } },
    ])
    expect(linesToDraw).toEqual([
      { point1: { x: 370, y: 95 }, point2: { x: 385, y: 95 } },
      { point1: { x: 250, y: 95 }, point2: { x: 235, y: 95 } },
      { point1: { x: 400, y: 165 }, point2: { x: 385, y: 165 } },
      { point1: { x: 385, y: 95 }, point2: { x: 385, y: 165 } },
      { point1: { x: 235, y: 95 }, point2: { x: 235, y: 95 } },
      { point1: { x: 220, y: 95 }, point2: { x: 235, y: 95 } },
    ])
  })

  /**
   *    B
   *       C
   *       E
   * A  D
   *    F
   */
  it('renders a complex graph with multiple children for some nodes', () => {
    const getNode = (nodeName) =>
      nodesToDraw.find((x) => x.node.name === nodeName)
    const getLeftConnector = (nodeName) => {
      const nodeBMiddleLeftY = getNode(nodeName).point.y + nodeHeightPx / 2
      const nodeBMiddleLeftX = getNode(nodeName).point.x
      return linesToDraw.find(
        (x) =>
          x.point1.x === nodeBMiddleLeftX && x.point1.y === nodeBMiddleLeftY
      )
    }
    const getRightConnector = (nodeName) => {
      const nodeBMiddleLeftY = getNode(nodeName).point.y + nodeHeightPx / 2
      const nodeBMiddleLeftX = getNode(nodeName).point.x
      return linesToDraw.find(
        (x) =>
          x.point1.x === nodeBMiddleLeftX + nodeWidthPx &&
          x.point1.y === nodeBMiddleLeftY
      )
    }

    // arrange
    const data = [
      {
        name: 'A',
        parent: '',
      },
      {
        name: 'B',
        parent: 'A',
      },
      {
        name: 'C',
        parent: 'B',
      },
      {
        name: 'D',
        parent: 'A',
      },
      {
        name: 'E',
        parent: 'B',
      },
      {
        name: 'F',
        parent: 'A',
      },
    ]

    // act
    const { nodesToDraw, linesToDraw } = startRendering(data, 100, 0)
    expect(nodesToDraw).not.toBeNull()

    // assert

    // Draw D node to have sufficient spacing for its children, if any
    expect(getNode('D').point.y).toBeGreaterThan(getNode('E').point.y)

    // Children are displayed on the right of their parent
    expect(getNode('C').point.x).toBeGreaterThan(getNode('B').point.x)

    const allNodesXOffsetExceptParent = nodesToDraw
      .filter((x) => x.node.parent !== '')
      .map((x) => x.point.x)
    const rootXOffset = getNode('A').point.x

    // The root is the left-most node in the drawn graph
    expect(allNodesXOffsetExceptParent.every((x) => x > rootXOffset)).toBe(true)

    // Node B has two connector lines: left and right
    const connectorLineLeft = getLeftConnector('B')
    const nodeBMiddleLeftY = getNode('B').point.y + nodeHeightPx / 2

    // left connector
    expect(connectorLineLeft).toBeTruthy()
    expect(connectorLineLeft.point2.x).toBe(
      getNode('B').point.x - connectorWidthPx
    )
    expect(connectorLineLeft.point2.y).toBe(nodeBMiddleLeftY)

    // right connector
    const connectorLineRight = getRightConnector('B')
    expect(connectorLineRight).toBeTruthy()
    expect(connectorLineRight.point2.x).toBe(
      getNode('B').point.x + nodeWidthPx + connectorWidthPx
    )
    expect(connectorLineRight.point2.y).toBe(nodeBMiddleLeftY)
  })
})
