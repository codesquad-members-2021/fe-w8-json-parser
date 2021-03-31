class LexerToken {
    constructor({key, type, value}) {
        this.key = key;
        this.type = type;
        this.value = value;
        this.child = [];
    }

    set setKey(key) { this.key = key };
    set setType(type) { this.type = type };
    set setValue(value) { this.value = value };
    set setChild(child) { this.child = child };

    get getKey() { return this.key };
    get getType() { return this.type };
    get getValue() { return this.value };
    get getChild() { return this.child };
}

export default LexerToken;