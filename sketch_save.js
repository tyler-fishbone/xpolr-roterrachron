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

// moon times // i don't think I'm doing this part right fwiw
// https://www.almanac.com/full-moon-december#:~:text=Full%20Moon%3A%20December%207%2C%2011%3A09%20P.M.&text=First%20Quarter%3A%20December%2029%2C%208%3A22%20P.M.
const recentFirstQuarterDate = new Date('December 29, 2022 08:22:00')
const secondsInRecentFirstQuarterDate = recentFirstQuarterDate.getTime() / 1000
const secondsMoonCycle = 2360591
console.log("secondsMoonCycle", secondsMoonCycle)
const secondsSoFarInMoonCycle = secondsInRecentFirstQuarterDate % secondsMoonCycle
console.log("secondsSoFarInMoonCycle", secondsSoFarInMoonCycle)
console.log(secondsSoFarInMoonCycle / secondsMoonCycle)

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
  moonRadius = radius * .7
  
  faceImg = loadImage("https://i.ibb.co/q9JnbJd/face-1.png")
  earthImg = loadImage("https://i.ibb.co/JRjGqC5/earth-1.png")
  sunImg = loadImage("https://i.ibb.co/c3x6r0d/sun-1.png")
  moonImg = loadImage("https://i.ibb.co/VNVSPJG/moon-1.png")
}

function draw() {
  drawBackground()
  
  drawEarth()
  
  drawSun()
  
  drawMoon()
}

// helper functions

const drawBackground = () => {
  image(faceImg, 0, 0, canvasWidth, canvasHeight)
}

const drawSun = () => {
  sunRads = getRadsYearElapsed()
  sunRads = rotateRadsForTopStart(sunRads)
  sunX = cx + cos(sunRads) * sunRadius;
  sunY = cy + sin(sunRads) * sunRadius
  push()
  imageMode(CENTER)
  image(sunImg, sunX, sunY)
  pop()
}

const drawMoon = () => {
  moonRads = getRadsForSecondsSoFarInMoonCycle()
  moonRads = rotateRadsForTopStart(moonRads)
  moonX = cx + cos(moonRads) * moonRadius
  moonY = cy + sin(moonRads) * moonRadius
  push()
  imageMode(CENTER)
  image(moonImg, moonX, moonY)
  pop()
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

const getRadsForSecondsSoFarInMoonCycle = () => {
  // secondsMoonCycle
  // secondsSoFarInMoonCycle
  const percentOfMoonCycleElapsed = secondsSoFarInMoonCycle / secondsMoonCycle
  const degreesElapsed = percentOfMoonCycleElapsed * 360
  // console.log("moondegreesElapsed", degreesElapsed)
  return radians(degreesElapsed)
}

const drawTicks = () => {
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
