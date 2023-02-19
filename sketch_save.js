// known values
const millisInFullYear = 31556926000
const secondsInDay = 86400

// now
const nowDate = new Date()
const nowMillis = nowDate.getTime()
const nowYear = nowDate.getFullYear()

// start of year / Jan 1
const yearStartDate = new Date(nowYear + '-01-01T00:00:00');
const yearStartMillis = yearStartDate.getTime()

// year calculations
const millisElaspsedThisYear = nowMillis - yearStartMillis
const percentOfYearElapsed = millisElaspsedThisYear / millisInFullYear

// checks
const daysElapsedManual = 12
const daysInFullYearManual = 365


// drawing settings
const canvasWidth = 600
const canvasHeight = 600



function setup() {
  createCanvas(canvasWidth, canvasHeight)
  
  cx = canvasWidth / 2
  cy = canvasHeight / 2
  
  radius = min(width, height) / 2;
  sunRadius = radius * .8
  
  earthImg = loadImage("https://i.ibb.co/JRjGqC5/earth-1.png")
  sunImg = loadImage("https://i.ibb.co/c3x6r0d/sun-1.png")
}

function draw() {
  background(220);
  
  drawTicks()
  
  drawEarth()
  
  drawSun(percentOfYearElapsed)
}

// helper functions

function drawTicks() {
  strokeWeight(5);
  beginShape(POINTS);
  for (a = 0; a < 360; a+=30) {
    angle = radians(a);
    x = cx + cos(angle) * sunRadius;
    y = cy + sin(angle) * sunRadius;
    vertex(x, y);
  }
  endShape();
}

const drawSun = () => {
  // fill(234, 221, 202)
  sunRads = getRadsYearElapsed()
  sunRads = rotateRadsForTopStart(sunRads)
  sunX = cx + cos(sunRads) * sunRadius;
  sunY = cy + sin(sunRads) * sunRadius
  push()
  imageMode(CENTER)
  image(sunImg, sunX, sunY)
  pop()
  fill(234, 221, 202)
  ellipse(sunX, sunY, 10)
}

const drawEarth = () => {
  push()
  imageMode(CENTER)
  translate(cx, cy)
  rotate(getRadsForSecondsElapsedToday())
  image(earthImg, 0, 0);
  pop()
}

const getRadsYearElapsed = () => {
  const degreesElapsed = percentOfYearElapsed * 360
  return radians(degreesElapsed)
}

const getRadsForSecondsElapsedToday = () => {
  const secondsElapsedToday = second() + (minute() * 60) + (hour() * 60 * 60)
  const percentOfTodayElapsed = secondsElapsedToday / secondsInDay
  const degreesElapsed = percentOfTodayElapsed * 360
  return radians(degreesElapsed)
}

const rotateRadsForTopStart = (rads) => {
  return rads - HALF_PI
}