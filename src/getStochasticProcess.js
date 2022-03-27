const {getCountdowns} = require("./getCountdowns")
const {pushZerosAndOne} = require("./pushZerosAndOne")
const Stochator = require("stochator")

const getStochasticProcess = (mTi, h, n, calculateCorrelFunc) => {

    // const calculateCorrelFunc = (t, t1) => {
    //     return 1 / (1 + Math.abs(t - t1));
    // }

    let realizationsArray = [];
    const countdowns = getCountdowns(n, h);
    const sigmas = [];
    const FiTjFuncValuesArray = [];
    let stroke = [];
    for (let iter = 0; iter < 1000; iter++) {
        for (let i = 0; i < n; i++) {
            if (sigmas.length === 0) {
                sigmas.push(1);
                for (let index = 0; index < countdowns.length; index++) {
                    stroke.push(calculateCorrelFunc(countdowns[0], countdowns[index]));
                }
                FiTjFuncValuesArray.push(stroke);
                stroke = [];
                continue;
            }

            pushZerosAndOne(i, stroke)

            let forSigmaSum = 0;
            for (let k = 0; k < i; k++) {
                forSigmaSum += FiTjFuncValuesArray[k][i] ** 2 * sigmas[k];
            }
            sigmas.push(calculateCorrelFunc(countdowns[i], countdowns[i]) - forSigmaSum)
            let test2 = [];
            for (let j = 0; j < n - i - 1; j++) {
                let forFiSum = 0;
                for (let k = 0; k < i; k++) {
                    forFiSum += FiTjFuncValuesArray[k][i] * FiTjFuncValuesArray[k][i + 1 + j]
                        * sigmas[k];
                }
                let correlFuncValue = calculateCorrelFunc(countdowns[i],
                    countdowns[i + 1 + j]);
                let result = (correlFuncValue - forFiSum) / sigmas[i];
                test2.push(correlFuncValue)
                stroke.push(result);
            }
            FiTjFuncValuesArray.push(stroke);
            stroke = [];
        }
        const randomValues = [];
        for (let i = 0; i < n; i++) {
            const stoch = new Stochator({
                mean: 0,
                stdev: Math.sqrt(sigmas[i]),
                min: -1,
                max: 1
            });
            const newRandomValue = stoch.next();
            randomValues.push(newRandomValue);
        }
        let realization = [];
        let test = [];
        for (let i = 0; i < n; i++) {
            let currentSum = 0;
            for (let k = 0; k <= i; k++) {
                currentSum += randomValues[k] * FiTjFuncValuesArray[k][i];
            }
            test.push(currentSum);
            realization.push(mTi + currentSum);
        }
        realizationsArray.push(realization);
    }
    return realizationsArray
}

module.exports = getStochasticProcess