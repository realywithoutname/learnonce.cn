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
const prevent = (e) => { e.preventDefault() }
// const stop = (ev) => { ev.stopPropagation() }

window.lock = (selector) => {
  document.body.style.overflow = 'hidden'
  let el = document.querySelector(selector)
  if (el.offsetHeight === window.scrollHeight) {
    el.addEventListener('touchstart', prevent)
    el.addEventListener('touchmove', prevent)
  }
  el.addEventListener('scroll', (ev) => {
    if (el.scrollTop + window.innerHeight >= el.scrollHeight) {
      el.addEventListener('touchstart', prevent)
      el.addEventListener('touchmove', prevent)
    }
  })
}

window.unlock = (selector) => {
  document.body.style.overflow = 'auto'
  let el = document.querySelector(selector)
  el.removeEventListener('touchstart', prevent)
  el.removeEventListener('touchmove', prevent)
}
window.launchFullscreen = (element) => {
  element = element || document.body
  let rfs = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen
  let wscript

  if (typeof rfs !== 'undefined' && rfs) {
    rfs.call(element)
    return
  }
  if (typeof window.ActiveXObject !== 'undefined') {
    wscript = new window.ActiveXObject('WScript.Shell')
    if (wscript) {
      wscript.SendKeys('{F11}')
    }
  }
}
window.exitFullscreen = (element) => {
  element = element || document.documentElement
  let cfs = element.cancelFullScreen || element.webkitCancelFullScreen || element.mozCancelFullScreen || element.exitFullScreen
  let wscript
  if (typeof cfs !== 'undefined' && cfs) {
    cfs.call(document)
    return
  }
  if (typeof window.window.ActiveXObject !== 'undefined') {
    wscript = new window.ActiveXObject('WScript.Shell')
    if (wscript !== null) {
      wscript.SendKeys('{F11}')
    }
  }
}
window.throttle = (fn) => {
  let firstTime = true
  let timer = null
  return () => {
    let args = arguments
    if (firstTime) {
      fn.apply(this, args)
      firstTime = false
      return false
    }
    if (timer) {
      return false
    }
    timer = setTimeout(() => {
      clearTimeout(timer)
      timer = null
      fn.apply(this, args)
    }, 500)
  }
}
window.imgloadError = (e) => {
  e = e || window.event
  e.target.style.display = 'none'
  var xmlhttp = window.XMLHttpRequest ? new window.XMLHttpRequest() : new window.ActiveXObject('Microsoft.XMLHTTP')
  xmlhttp.responseType = 'blob'
  xmlhttp.open('GET', '/img?source-url=' + e.target.src, true)
  xmlhttp.send()
  xmlhttp.onload = function () {
    var objectURL = window.URL.createObjectURL(this.response)
    e.target.src = objectURL
    e.target.height = 60
    e.target.onerror = null
    e.target.onload = function () {
      window.URL.revokeObjectURL(this.src)
      e.target.style.display = 'initial'
    }
  }
}
