const getCountdowns = (n, h) => {
    const result = [];
    for (let i = 0; i < n; i++) {
        result.push(i*h)
    }
    return result;
}

module.exports = {getCountdowns}