import * as v from "./variables.js"

const tokenize = (str, temp = [], queue = []) => {
    if (!str.length) return queue;
    
    if(str[0] === ' ' && isQuoteClosed(temp))
        return tokenize(str.substring(1), temp, queue);

    if (v.separator.includes(str[0]) && isQuoteClosed(temp)) {
        if (temp.length > 0) queue.push(temp.join('').trim());
        queue.push(str[0]);
        return tokenize(str.substring(1), [], queue);
    }
    return tokenize(str.substring(1), [...temp, str[0]], queue);
}

const isQuoteClosed = tokenArr => tokenArr.filter(e => e === `"`).length !== 1;

export { tokenize }