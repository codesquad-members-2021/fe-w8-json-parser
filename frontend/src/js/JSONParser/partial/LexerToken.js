class LexerToken {
    constructor({type, value}) {
        this.type = type;
        this.value = value;
    }

    set setType(type) { this.type = type };
    set setValue(value) { this.value = value };

    get getType() { return this.type };
    get getValue() { return this.value };
}

export default LexerToken;