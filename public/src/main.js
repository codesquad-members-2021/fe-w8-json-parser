import '../scss/style.scss';
import MainView from '../view/view';
import packageJson from '../../package.json';

const packageJsonData = JSON.stringify(packageJson);
console.log(packageJsonData);

const mainView = new MainView();

const dataJson = [
  '1a3',
  [null, false, ['11', [112233], { easy: ['hello', { a: 'a' }, 'world'] }, 112], 55, '99'],
  { a: 'str', b: [912, [5656, 33], { key: 'innervalue', newkeys: [1, 2, 3, 4, 5] }] },
  true,
];

const jsonData = JSON.parse(JSON.stringify(dataJson));

const parserObject = {
  identifier: [],
  keyword: [],
  seperator: [],
  operator: [],
  literal: [],
  comment: [],
};

const tokenList = [];

function getTokenList(data) {
  data.forEach((el) => {
    console.log(el);
    console.log(typeof el);
    switch (typeof el) {
      case 'string':
      case 'number':
      case 'boolean':
      case 'null':
        pushToken(el);
        break;
      case 'object':
        checkObject(el);
        break;
      default:
        break;
    }
  });
  return tokenList;
}

function pushToken(data) {
  tokenList.push(data);
}

function checkObject(data) {
  if (data === null) return pushToken(data);
  if (Array.isArray(data)) {
    return getTokenList(data);
  } else {
    return getObjectToken(data);
  }
}

function getObjectToken(data) {
  const objKey = Object.keys(data);
  const objValue = Object.values(data);
  getTokenList(objKey);
  getTokenList(objValue);
}
