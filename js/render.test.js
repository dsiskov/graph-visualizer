const { startRendering } = require('./render')

const data = [
  {
    name: 'A',
    description: 'This is a description of A',
    parent: '',
  },
  {
    name: 'C',
    description: 'This is a description of C',
    parent: 'A',
  },
  {
    name: 'B',
    description: 'This is a description of B',
    parent: 'A',
  },
  {
    name: 'D',
    description: 'This is a description of D',
    parent: 'A',
  },
  {
    name: 'B-1',
    description: 'This is a description of B-1',
    parent: 'B',
  },
  {
    name: 'B-2',
    description: 'This is a description of B-2',
    parent: 'B',
  },
  {
    name: 'B-3',
    description: 'This is a description of B-3',
    parent: 'B',
  },
]

describe('render', () => {
  it('works', () => {
    const { nodesToDraw, linesToDraw } = startRendering(data, 100, 0)

    console.log(
      '\n',
      nodesToDraw.map((x) => `${x.node.name}: ${x.point.print()}`).join('\n'),
      '\n\n',
      linesToDraw
        .map((x) => `${x.point1.print()} -> ${x.point2.print()}`)
        .join('\n')
    )
  })
})
