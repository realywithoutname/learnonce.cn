window.addWave = (e) => {
  let {x, y} = offset(e.target)
  let {offsetX, offsetY} = e
  let {offsetWidth, offsetHeight} = e.target
  let wave = document.getElementById('wave')
  if (wave === null) {
    wave = document.createElement('div')
    wave.id = 'wave'
    document.body.appendChild(wave)
  }
  e.target.classList = e.target.classList.value + ' active'
  wave.style.top = `${y}px`
  wave.style.left = `${x}px`
  wave.style.zIndex = 1
  let radius = Math.max(offsetWidth, offsetHeight)
  wave.style.width = `${offsetWidth}px`
  wave.style.height = `${offsetHeight}px`
  let wc = wave.children[0]
  if (!wc) {
    wc = document.createElement('div')
    wave.appendChild(wc)
  }
  wc.style.top = `${offsetY}px`
  wc.style.left = `${offsetX}px`
  wc.style.paddingTop = `${2 * radius}px`
  wc.style.paddingLeft = `${2 * radius}px`
  wc.style.marginTop = `${-radius}px`
  wc.style.marginLeft = `${-radius}px`
  if (~e.target.classList.value.indexOf('wave-light')) {
    wc.classList = 'wave light'
  } else {
    wc.classList = 'wave dark'
  }
  setTimeout(() => {
    wave.style.zIndex = -1
    e.target.classList = e.target.classList.value.substr(0, e.target.classList.value.length - 7)
    wc.classList = []
  }, 1000)
}
let offset = (e) => {
  let x = e.offsetLeft
  let y = e.offsetTop
  let ie = document.compatMode === 'BackCompat'
  let st = ie ? document.body.scrollTop : document.documentElement.scrollTop
  let sl = ie ? document.body.scrollLeft : document.documentElement.scrollLeft
  e = e.offsetParent
  while (e) {
    x += e.offsetLeft
    y += e.offsetTop
    e = e.offsetParent
  }
  return {x: x - sl, y: y - st}
}
window.lock = (selector) => {
  let el = document.querySelector(selector)
  el.style.overflow = 'hidden'
}
window.unlock = (selector) => {
  let el = document.querySelector(selector)
  el.style.overflow = 'auto'
}
