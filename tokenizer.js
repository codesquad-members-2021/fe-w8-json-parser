class Tokenizer {
    constructor(str){
        this.queue = [];
        this.seperator = ["[", "]", "{", "}", ",", ":"];
        this.tokenize(str);
    }

    tokenize(str, temp = []){
        if (!str.length) return
        
        if (this.isQuoteClosed(temp)) temp = temp.filter(e => e !== ' ');

        if (this.seperator.includes(str[0]) && this.isQuoteClosed(temp)) {
            if (temp.length > 0) this.queue.push(temp.join('').trim());
            this.queue.push(str[0]);
            return this.tokenize(str.substring(1), []);
        }

        else return this.tokenize(str.substring(1), [...temp, str[0]]);
    }

    isQuoteClosed(tokenArr){
        return tokenArr.filter(e => e === `"`).length !== 1;
    }

    getToken(){
        return this.queue;
    }
}

const test1 = `["a","b",["c","d"],1,"]["]`

const test2 = `["1a3",[null,false,["11",[112233],{"easy" : ["hello", {"a":"a"}, "world"]},112],55, "99"]]`

const test3 = '["1a3",[null,false,["11",[112233],{"easy" : ["hello", {"a":"a"}, "world"]},112],55, "99"],{"a":"str", "b":[912,[5656,33],{"key" : "innervalue", "newkeys": [1,2,3,4,5]}]}, true]'

console.log(new Tokenizer(test3).getToken())
