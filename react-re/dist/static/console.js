window.debug = {
  log() {
    postMessage({ message: arguments, type: 'log' })
  },
  error() {
    postMessage({ message: arguments, type: 'error' })
  }
}
window.ready = function () {
  postMessage({ message: 'reload', type: 'reload' })
}
function postMessage(data) {
  window.parent.postMessage(JSON.stringify(data), '*')
}
