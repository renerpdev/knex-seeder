class SeedFaker {
    constructor(faker, lang) {
        this.faker = faker;
        if (!lang)
            this.lang = 'en'
        else
            this.lang = lang;
    }

    get getFaker() {
        return this.faker;
    }

    get getLang() {
        return this.lang;
    }
}

module.exports = SeedFaker