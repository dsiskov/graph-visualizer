// NB: test locally with: npx nodemon --exec 'http-server'

import { startRendering } from './render.js'
import { drawNodes, drawLines } from './d3.js'

const dataGraph = [
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
  // {
  //   name: 'E',
  //   description: 'This is a description of E',
  //   parent: 'D',
  // },
]

const { nodesToDraw, linesToDraw } = startRendering(dataGraph, 300, 100)
drawNodes(nodesToDraw)
// drawNodes([nodesToDraw[1], nodesToDraw[5]])
drawLines(linesToDraw)
