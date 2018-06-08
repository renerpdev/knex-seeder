class SeedRange {
    constructor(min, max) {
        this.min = min;
        this.max = max;
    }

    get getRange() {
        var array = []
        for (var i = this.min; i <= this.max; i++)
            array.push(i)

        return array
    }

    get getMin() {
        return this.min
    }

    get getMax() {
        return this.max
    }
}

module.exports = SeedRange