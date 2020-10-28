const canvas = document.getElementById("canvas")

canvas.width = 500
canvas.height = 500

const context = canvas.getContext("2d")

let keyPress 

let score = 0

let x = 10

let y = 10

let difficulty = 100

let fruitPosition = {}

let positionHead = { x, y }

let position = [positionHead, { x: 10, y: 0 }]

let movement = "ArrowDown"

let pause = true

context.fillStyle = "rgb(3,3,3,0.6)"

document.addEventListener("keydown", (e) => {
    keyPress = e.key
})

function checkKey(key) {
  if (key === "ArrowUp" && movement !== "ArrowDown") {
    movement = key
    return
  }
  if (key === "ArrowDown" && movement !== "ArrowUp") {
    movement = key
    return
  }
  if (key === "ArrowRight" && movement !== "ArrowLeft") {
    movement = key
    return
  }
  if (key === "ArrowLeft" && movement !== "ArrowRight") {
    movement = key
    return
  }
}

function updateBodyPosition() {
  for (let p = position.length - 1; p > 0; p--) {
    position[p].x = position[p - 1].x
    position[p].y = position[p - 1].y
  }
}

function upDatePosition(key) {
  const move = {
    ArrowUp: () => {
      positionHead.y -= 10
    },
    ArrowDown: () => {
      positionHead.y += 10
    },
    ArrowLeft: () => {
      positionHead.x -= 10
    },
    ArrowRight: () => {
      positionHead.x += 10
    },
  }

  move[key]()
}

function generateFruit() {
  fruitPosition.x = Math.floor(Math.random() * 50) * 10
  fruitPosition.y = Math.floor(Math.random() * 50) * 10

  for (let p = 0; p < position.length; p++) {
    if (fruitPosition.x === position[p].x && fruitPosition.y === position[p].y) {
      generateFruit()
      return
    }
  }
}

function updateCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height)
  //desenha cobra
  for (let p = 0; p < position.length; p++) {
    context.fillRect(position[p].x, position[p].y, 8, 8)
  }
  //desenha fruta

  context.fillRect(fruitPosition.x, fruitPosition.y, 8, 8)
}

function catchFruit() {
  position.push({ x: 500, y: 500 })
}

function checkPosition() {
  if (positionHead.x < 0) {
    positionHead.x = 490
  }
  if (positionHead.y < 0) {
    positionHead.y = 490
  }

  if (positionHead.x > 495) {
    positionHead.x = 0
  }

  if (positionHead.y > 495) {
    positionHead.y = 0
  }

  if (positionHead.x === fruitPosition.x && positionHead.y === fruitPosition.y) {
    catchFruit()
    generateFruit()
    score++
  }
}

function GameOver() {
  pause = true
  context.clearRect(0, 0, canvas.width, canvas.height)
  context.font = "20px Arial"
  context.fillText("Game Over", 200, 240)
  context.font = "16px Arial"
  context.fillText(`Score: ${score}`, 200, 270)
  ResetGame()
}

function checkGameOver() {
  for (let p = 1; p < position.length; p++) {
    if (positionHead.x === position[p].x && positionHead.y === position[p].y) {
      GameOver()
      return
    }
  }
}

function Game() {

  checkKey(keyPress)

  updateBodyPosition()

  upDatePosition(movement)

  checkPosition()

  updateCanvas()

  checkGameOver()

  if (!pause) setTimeout(Game, difficulty)
}

function ResetGame() {
  score = 0

  x = 10

  y = 10

  fruitPosition = {}

  positionHead = { x, y }

  position = [positionHead, { x: 10, y: 0 }]

  movement = "ArrowDown"

  generateFruit()
}

generateFruit()

updateCanvas()

document.getElementById("StartButton").addEventListener("click", () => {
  if (pause) {
    pause = false
    Game()
  }
})

document.getElementById("PauseButton").addEventListener("click", () => {
  pause = true
})

document.getElementById("ResetButton").addEventListener("click", () => {
  ResetGame()
  updateCanvas()
})

document.getElementById("Hard").addEventListener("change", (e) => {
  difficulty = e.target.value
  e.target.blur()
})
document.getElementById("Normal").addEventListener("change", (e) => {
  difficulty = e.target.value
  e.target.blur()
})
document.getElementById("Easy").addEventListener("change", (e) => {
  difficulty = e.target.value
  e.target.blur()
})
