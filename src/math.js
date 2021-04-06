import { log } from './util'
import { one } from './number'

const add = function(a, b) {
    return a + b
}

const add1 = function(a) {
  return add(a, one)
}

const log2 = function(...args) {
  return log('fake log')
}

export {
  add,
  log2,
}