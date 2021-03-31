import tokenizer from '../tokenizer.js'

const a = '["1 2 3", 23, true, null, {3.214}, {"key":false} "234ho"]';
const b = '["1 2, 3", 23, true, null, {"key":3.214}, [{"key":false,"key"2.234},{"key3":23}], "234h,o"]';
const c = '["1a3", [null, false, ["11", [112233],{"easy" : ["hello", {"a":"a"}, "world"]}, 112], 55, "99"],{"a":"str", "b":[912, [5636,33], {"key":"innervalue", "newkeys":[1,2,3,4,5]}]}, true]';
console.log(tokenizer(a));