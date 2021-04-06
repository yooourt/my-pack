import { log } from './util'
import { add } from './math'


const calculate = () => {
    return add(1, 2)
}

log('calculate() :', calculate())
document.body.innerHTML = `calculate() : ${ calculate() }`
