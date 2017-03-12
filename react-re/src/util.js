function supplyZero (num) {
  return ('0' + num).substr(-2)
}
function replaceString (resource) {
  return {
    replace (d, r) {
      resource = resource.replace(d, r)
      return this
    },
    get () {
      return resource
    }
  }
}
export function formatDate (date, string) {
  date = new Date(date)
  if (date.toString() === 'Invalid date') {
    return
  }
  return replaceString(string)
    .replace(/yyyy|YYYY/g, date.getFullYear())
    .replace('MM', supplyZero(date.getMonth() + 1))
    .replace(/DD|dd/g, supplyZero(date.getDate()))
    .replace(/hh|HH/g, supplyZero(date.getHours()))
    .replace('mm', supplyZero(date.getMinutes()))
    .replace('ss', supplyZero(date.getSeconds()))
    .get()
}
export function throttle (fn, interval) {
  let timer = null
  let firstTime = true
  let _self = fn
  return function () {
    let args = arguments
    let _me = this
    if (firstTime) {
      firstTime = false
      return _self.apply(_me, args)
    }

    if (timer) {
      return
    }

    timer = setTimeout(() => {
      clearTimeout(timer)
      timer = null
      _self.apply(_me, args)
    }, interval || 200)
  }
}
window.addEventListener('touchstart', (e) => e.stopPropagation())
window.addEventListener('touchmove', (e) => e.stopPropagation())
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
