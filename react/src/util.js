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
    }, interval || 20000)
  }
}
