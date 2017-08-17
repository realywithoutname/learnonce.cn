const DATA = {}
const E_BUS = {}
export default {
  pull (name) {
    return DATA[name]
  },
  push (name, value) {
    E_BUS[name] && E_BUS[name].call(null, value)
    DATA[name] = value
  },
  on (name, fn) {
    E_BUS[name] = fn
  }
}