import '../scss/style.scss';
import MainView from '../view/view';

const mainView = new MainView();

const inputData = '["1a3",[null,false,["11",[112233],{"easy" : ["hel]lo", {"a":"a"}, "world"]},112],55, "99"],{"a":"str", "b":[912,[5656,33],{"key" : "innervalue", "newkeys": [1,2,3,4,5]}]}, true]';
const saperatorArr= ['[',']',',','{','}',':'];
const tokenArr = [];
const stack = [];
function getToken(inputData) {
  for(let i=0; i<inputData.length; i++) {
    if(isSaperator(inputData[i])) {
      pushToken(inputData[i])
    }

    else if(isSaperator(inputData[i-1]) && isNotFisrt(i)) {
      pushToken(inputData[i])
    }

    else if(!isSaperator(inputData[i-1]) && isNotFisrt(i)) {
      makeString(inputData[i]);
    }
  }
  return tokenArr;
}
function pushToken(data) {
  tokenArr.push(data);
}

function makeString(data) {
return tokenArr[tokenArr.length-1]+=data;
}

function isSaperator(data) {
return saperatorArr.includes(data)
}

function isNotFisrt(idx) {
return idx>=1
}

function isQuote(data) {
return data === '"'
}

function isFullSatck() {
return stack.length !==0
}
getToken(inputData.split(''));


