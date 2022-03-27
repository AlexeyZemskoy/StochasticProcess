const pushZerosAndOne = (i, stroke) => {
    for (let m = 0; m < i; m++) {
        stroke.push(0);
    }
    stroke.push(1);
}

module.exports = {pushZerosAndOne}