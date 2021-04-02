# JSON parser 구현 알고리즘

- 테스트 데이터 :`["a "," ",["c","d"],1,"]["]`

## 1. tokenizer

- 문자열을 하나하나 재귀돌며 검사

- 구분자(`"[", "]", "{", "}", ",", ":"`)가 아닐 경우 임시배열에 저장

- 구분자를 만난 경우 임시배열을 하나의 원소로 `join()`하여 push

- 문자열안에 공백이나 구분자가 있는지 `isQuoteClosed` 에서 체크

- 결과 : `["[", ""a "", ",", "" "", ",", "[", ""c"", ",", ""d"", "]", ",", "1", ",", ""]["", "]"]`

## 2. lexer

- tokenize된 배열을 순회하며 타입을 구분 

- `{ type:타입, value:값 }`의 형태로 return

- type의 종류
  
  - separator : `"[", "]", "{", "}", ",", ":"`
  - string : `/^\".+\"$/`
  - number : `/^\d+$/`
  - null : null
  - undefined : undefined
  - boolean : true, false

- 결과 : 

  ```js
  [
    {type: "separator", value: "["},
    {type: "string", value: ""a ""},
    {type: "separator", value: ","},
    {type: "string", value: "" ""},
    {type: "separator", value: ","},
    {type: "separator", value: "["},
    {type: "string", value: ""c""},
    {type: "separator", value: ","},
    {type: "string", value: ""d""},
    {type: "separator", value: "]"},
    {type: "separator", value: ","},
    {type: "number", value: "1"},
    {type: "separator", value: ","},
    {type: "string", value: ""][""},
    {type: "separator", value: "]"},
  ]
  ```

## 3. parser

- lex된 배열을 순회하며 tree 구조 생성

- `"["`를 만난 경우 
  - makeArrayTemplate을 통해 부모노드 생성
    - `{type: "array", child: []}`
  - 위 노드를 parentNode로 하는 새로운 parse 호출
    - `parse(lexedArr, makeArrayTemplate())`
  - 위 parse의 결과값을 현재 parentNode의 child에다 push
    - `parentNode.child.push(parse(lexedArr, makeArrayTemplate())`

- `"{"`를 만난 경우
  - makeObjectTemplate, makePropertyTemplate을 통해 부모노드 생성
  - 위 노드를 parentNode로 하며 isObject 인자를 `"propKey"`로 하는 새로운 parse 호출
    - `parse(lexedArr, makeObjectTemplate(), "propKey")`
  - 위 parse의 결과값을 현재 parentNode의 child에다 push

- `":"`을 만난 경우
  - isObject 속성만 `"propValue"`로 바꿔준 채로 다음 재귀로 넘어간다.

- `","`를 만난 경우
  - isObject가 false가 아닌 경우 객체의 속성값이 추가된다.
    - `parentNode.child.push(makePropertyTemplate())`
  - objIndex를 1 늘려준다.
  - isObject 속성을 `"propKey"`로 바꿔주고 다음 재귀로 넘어간다.

- `"}", "]"`의 경우
  - return parentNode로 해당 깊이의 parse를 종료

- 원소가 원시타입인 경우
  - `isObject`가 false
    - parentNode의 child에다 push (switch문에서 default 부분)
  - `isObject`가 `"propKey"`
    - parentNode의 child의 objIndex의 value의 propKey에 할당
  - `isObject`가 `"propValue"`
    - parentNode의 child의 objIndex의 value의 propValue에 할당

- 결과 : 
    ```js
    [
      {
        "type": "array",
        "child": [
          {
            "type": "string",
            "value": "\"a \""
          },
          {
            "type": "string",
            "value": "\" \""
          },
          {
            "type": "array",
            "child": [
              {
                "type": "string",
                "value": "\"c\""
              },
              {
                "type": "string",
                "value": "\"d\""
              }
            ]
          },
          {
            "type": "number",
            "value": "1"
          },
          {
            "type": "string",
            "value": "\"][\""
          }
        ]
      }
    ]
    ```

- 카운트 체크
  - number type, string type
    - lex된 배열에서 filter를 통해 개수 파악
  - depth
    - lex된 배열에서 `"[", "]", "{", "}"` 요소를 filter
    - stack에 "["와 "{"를 넣으며, "]", "}"를 만나면 해당 한쌍을 빼줌
    - stack의 최고 length를 기록