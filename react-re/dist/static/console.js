window.debug = {
  log () {
    postMessage({message: [...arguments].join(' '), type: 'log'})
  },
  error () {
    postMessage({message: [...arguments].join(' '), type: 'error'})
  }
}
window.ready = function () {
  postMessage({message: 'reload', type: 'reload'})
}
function postMessage (data) {
  window.parent.postMessage(JSON.stringify(data), '*')
}
