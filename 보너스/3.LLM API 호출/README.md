# 보너스 3. Google Apps Script에서 LLM API 호출하기

브라우저에서 Google Apps Script로 Gemini API에 요청을 한 번 보내는 실습이다. 요구사항 8에서 **페르소나**로 분류한 시스템 프롬프트 v1을 코드의 `SYSTEM_PROMPT`에 그대로 넣었다. 실행할 때마다 같은 가상 장보기 기획서를 별도의 사용자 입력으로 보낸다. [프롬프트 원문](../../docs/system-design.md#5-1-시스템-프롬프트-v1--18턴-대화에-사용한-원문)

| 파일 | 용도 |
|---|---|
| [Code.gs](Code.gs) | Apps Script 편집기에 붙여 넣어 실행할 코드 |
| [실행기록.md](실행기록.md) | 실제 키 발급·입력 경과와 호출 결과를 남기는 기록지 |

## 브라우저에서 실행하기

1. Google AI Studio에서 사용할 프로젝트의 API 키를 확인하거나 새 키를 만든다. 결제 수단 등록 안내 때문에 발급을 중단했다면 실행기록에 실제 안내와 중단 지점을 적는다. [Google AI Studio 키 관리](https://aistudio.google.com/apikey)
2. Google Apps Script에서 개인용 새 프로젝트를 열고 기본 편집기의 내용을 이 폴더의 `Code.gs`로 바꿔 저장한다. [Apps Script 열기](https://script.google.com/)
3. **프로젝트 설정 → 스크립트 속성**에서 이름에 `GEMINI_API_KEY`, 값에 발급받은 키를 입력해 저장한다. 공개 기록에는 속성 이름과 저장 여부만 적는다. [Google 스크립트 속성 안내](https://developers.google.com/apps-script/guides/properties)
4. 편집기에서 `runBonusPrompt`를 선택해 실행한다. 첫 실행에서는 Google의 권한 안내를 확인한다. 실행 로그의 HTTP 상태와 실제 응답을 기록한다. HTTP 오류도 관찰한 결과로 남길 수 있다. 속성 누락으로 실행이 멈추면 ‘호출 전’으로 적는다. [Gemini API 문서](https://ai.google.dev/api/generate-content)
