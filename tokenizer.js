class Tokenizer {
    constructor(str){
        this.queue = [];
        this.seperator = ["[", "]", "{", "}", ",", ":"];
        this.tokenize(str);
    }

    tokenize(str, temp = []){
        if (!str.length) return
        
        if(str[0] === ' ' && this.isQuoteClosed(temp))
            return this.tokenize(str.substring(1), temp);

        if (this.seperator.includes(str[0]) && this.isQuoteClosed(temp)) {
            if (temp.length > 0) this.queue.push(temp.join('').trim());
            this.queue.push(str[0]);
            return this.tokenize(str.substring(1), []);
        }

        else {
            return this.tokenize(str.substring(1), [...temp, str[0]]);
        }
    }

    isQuoteClosed(tokenArr){
        return tokenArr.filter(e => e === `"`).length !== 1;
    }

    getToken(){
        return this.queue;
    }
}

export { Tokenizer }