const getStochasticProcess = require("./src/getStochasticProcess")

const mTi = 0.25
const h = 0.01
const n = 100

const correlFunc = (t, t1) => {
    return 1 / Math.pow(Math.cosh(2 * (t - t1)), 2);
}

const result = getStochasticProcess(mTi, h, n, correlFunc)

console.log(result)