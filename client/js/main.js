// NB: test locally with: npx nodemon --exec 'http-server'

import { startRendering } from './render.js'
import { drawNodes, drawLines } from './d3.js'

const dataEndpoint = 'http://localhost:4000/api/data'

async function initializeScreen() {
  try {
    const response = await axios.get(dataEndpoint)
    console.log(response)

    const { nodesToDraw, linesToDraw } = startRendering(
      response.data.data,
      300,
      40
    )
    drawNodes(nodesToDraw)
    drawLines(linesToDraw)
  } catch (error) {
    throw new Error('Error while initializing screen', error)
  }
}

var modal = document.getElementById('modal')
var closePopup = document.getElementsByClassName('close')[0]

closePopup.onclick = function () {
  modal.style.display = 'none'
}

window.onload = function () {
  initializeScreen()
}
