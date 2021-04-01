# fe-w8-json-parser

## Server 환경 구성

- [x] Express 를 설치하고 로컬서버환경을 구성한다.

## JavaScript

- [x] Webpack, babel을 직접 구성한다. (기존 구성 재활용),
- 객체지향, 함수형 상관 없음.
- 하나의 커다란 함수(객체)로 만들지 않고 모듈을 나눈다.

  - functio JSONDataParser (string: inputData())

        - Tokenizer 모듈

          <!-- - input: (string: '["1a3",["she\'s gone", null,false,["11",[112233],{"easy" : ["hel]lo", {"a":"a"}, "world"]},112],55, "99"],{"a":"str",  "b":[912,[5656,33],{"key" : "innervalue", "newkeys": [1,2,3,4,5]}]}, true]') -->
          - input: '[1, 2, null, 3, "raccoon", [4, [ 5, true, 6], 7], 8, "luke"]'

          <!-- - output: (array: ["[", ""1a3"", ",", "[", ""she's gone"", ",", "null", ",", "false", ",", "[", ""11"", ",", "[", "112233", "]", ",", "{", ""easy"", ":", "", "[", ""hel]lo"", ",", "", "{", ""a"", ":", ""a"", "}", ",", "", ""world"", "]", "}", ",", "112", "]", ",", "55", ",", "", ""99"", "]", ",", "{", ""a"", ":", ""str"", ",", "", ""b"", ":", "[", "912", ",", "[", "5656", ",", "33", "]", ",", "{", ""key"", ":", "", ""innervalue"", ",", "", ""newkeys"", ":", "", "[", "1", ",", "2", ",", "3", ",", "4", ",", "5", "]", "}", "]", "}", ",", "true", "]"]) -->

          - output: ["[", "1", "2", "null", "3", ""raccooon"", "[", "4", "[", "5", "true", "6", "]", "7", "]", "8", ""luke"", "]"]

        - Lexer 모듈

          <!-- - input: (array: ["[", ""1a3"", ",", "[", ""she's gone"", ",", "null", ",", "false", ",", "[", ""11"", ",", "[", "112233", "]", ",", "{", ""easy"", ":", "", "[", ""hel]lo"", ",", "", "{", ""a"", ":", ""a"", "}", ",", "", ""world"", "]", "}", ",", "112", "]", ",", "55", ",", "", ""99"", "]", ",", "{", ""a"", ":", ""str"", ",", "", ""b"", ":", "[", "912", ",", "[", "5656", ",", "33", "]", ",", "{", ""key"", ":", "", ""innervalue"", ",", "", ""newkeys"", ":", "", "[", "1", ",", "2", ",", "3", ",", "4", ",", "5", "]", "}", "]", "}", ",", "true", "]"]) -->

          - input: ["[", "1", "2", "null", "3", ""raccooon"", "[", "4", "[", "5", "true", "6", "]", "7", "]", "8", ""luke"", "]"]

          - output: [
            {
              key: 0,
              type: 'array',
              value: '[',
              subType: arrayOpen,
              child: [
                {
                  key: 1,
                  type: 'number',
                  value: '1',
                  subType: null,
                  child: null,
                },
                {
                  key: 2,
                  type: 'number',
                  value: '2',
                  subType: null,
                  child: null,
                },
                {
                  key: 3,
                  type: 'null', // typeof object, 예외처리가 필요
                  value: 'null',
                  subType: typeofNull,
                  child: null,
                },
                {
                  key: 4,
                  type: 'number'
                  value: '3',
                  subType: null,
                  child: null,
                },
                {
                  key: 5,
                  type: 'string'
                  value: 'raccoon',
                  subType: null,
                  child: null,
                },
                {
                  key: 6,
                  type: 'array'
                  value: '[',
                  subType: 'arrayOpen',
                  child: [
                    {
                      key: 7,
                      type: 'number'
                      value: '4',
                      subType: null,
                      child: null,
                    },
                    {
                      key: 8,
                      type: 'array'
                      value: '[',
                      subType: 'arrayOpen',
                      child: [
                        {
                          key: 9,
                          type: 'number'
                          value: '5',
                          subType: null,
                          child: null,
                        },
                        {
                          key: 10,
                          type: 'boolean'
                          value: true,
                          subType: null,
                          child: null,
                        },
                        {
                          key: 11,
                          type: 'number'
                          value: 6,
                          subType: null,
                          child: null,
                        },
                      ],
                    },
                    {
                      key: 12,
                      type: 'array'
                      value: ']',
                      subType: 'arrayClose',
                      child: null,
                    },
                    {
                      key: 13,
                      type: 'number'
                      value: '7',
                      subType: null,
                      child: null,
                    },
                  ],
                },
                {
                  key: 14,
                  type: 'array'
                  value: ']',
                  subType: 'arrayClose',
                  child: null,
                },
                {
                  key: 15,
                  type: 'number'
                  value: 8,
                  subType: null,
                  child: null,
                },
                {
                  key: 16,
                  type: 'string'
                  value: 'luke',
                  subType: null,
                  child: null,
                },
              ]
            },
            {
              key: 17,
              type: 'array'
              value: ']',
              subType: 'arrayClose',
              child: null,
            },
          ]

    {
    key: 0 //배열의 index 또는 객체의 키값
    type: 'array' //string, null, 등
    value: '[' //값
    subType: 'open' || 'close' // arrayOpen, objectOpen..
    child: [
    {
    key: 0,
    type:
    }
    ] //자식노드
    },
    ...
    ])

        - Parser 모듈

- TypeScript를 babel에 연동하고, 부분적으로 적용해본다.

## 힌트

문제를 단순화 해서 해결해본다. 예를들어 이런 문자열부터 분석해보기
const data = "[1]"

## Parser Array 를 어떻게 만들까

1. json data가 오면 시작과 끝에 `을 추가한다. (string으로 변환)
2. split(' '), whitespace를 기준으로 잘라서 배열을 만든다.
3. 각 요소를 탐색하며 data를 파싱한다.
   3-1. data 형식
   - {
     type: "object",
     child: ""
     }

// identifier : 식별하기 위한 이름- > 변수명 dataArr,
// keyword : 미리 지정한 예약어 -> ex) const, if, for, class, while, forEach..
// separator : 글자를 구분하는 문자 -> 구분자 ex) {, }, [, ], ,
// operator : 연산을 위한 심볼 -> ex) + - ,%, =, ;,
// literal : 숫자, 논리, 문자 -> true, 3.14, &&,
// comment : 줄 또는 블록 코멘터리 -> 주석..

// idetifier -> '1a3', "key:",
// keyword ->
// speparator -> [] {} '' :
// operator =>
// literal => '11', 912, 'hello', 'world', true, Null, false
