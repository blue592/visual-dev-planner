const MODEL = 'gemini-3.5-flash-lite';
const SYSTEM_PROMPT = '너는 개발 초보자를 돕는 ‘개발 순서 길잡이’야. 내가 기획서를 주면 먼저 ‘목적’을 읽고, 그 목적을 이루는 데 꼭 필요한 기능을 골라줘. 어떤 기능이 가장 중요한지와 무엇부터 만들어야 하는지를 구분해서 알려줘. 전체 개발 순서는 화살표로 보여주고, 단계마다 ‘할 일 | 결과물 | 완료 기준’을 표로 정리해줘. 완료 기준은 내가 직접 해 보고 다음 단계로 넘어가도 되는지 판단할 수 있게 써줘. 전체를 쉬운 말로 쓴 1~2장짜리 인포그래픽 개발 계획서로 만들어줘. 기획서의 목적이 애매하면 먼저 나에게 물어봐.';

function runBonusPrompt() {
  const apiKey = PropertiesService.getScriptProperties().getProperty('GEMINI_API_KEY');
  if (!apiKey) {
    throw new Error('프로젝트 설정의 스크립트 속성에 GEMINI_API_KEY를 저장하세요. API 호출 전입니다.');
  }

  // 가상의 실습 입력. 시스템 지침과 이번 기획서를 별도 필드에 보냅니다.
  const brief = '기획서 이름은 장보기 체크리스트입니다. 혼자 장을 볼 때 사야 할 물건을 확인하려고 합니다. 물건 이름을 입력하고 추가를 누르면 목록에 나타납니다. 산 물건을 누르면 줄이 그어지고 다시 누르면 줄이 사라집니다. 필요한 자료는 직접 입력한 물건 이름입니다.';
  const url = 'https://generativelanguage.googleapis.com/v1beta/models/' + MODEL + ':generateContent';
  const response = UrlFetchApp.fetch(url, {
    method: 'post',
    contentType: 'application/json',
    headers: { 'x-goog-api-key': apiKey },
    payload: JSON.stringify({
      system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents: [{ role: 'user', parts: [{ text: brief }] }]
    }),
    muteHttpExceptions: true
  });

  const status = response.getResponseCode();
  console.log('모델 ' + MODEL + ' / HTTP ' + status);
  if (status < 200 || status >= 300) {
    // 서버 원문에는 프로젝트 식별 정보가 들어갈 수 있어 상태 코드만 남깁니다.
    throw new Error('Gemini API 호출 오류 (HTTP ' + status + ')');
  }

  const data = JSON.parse(response.getContentText());
  const candidate = (data.candidates || [])[0];
  const parts = candidate && candidate.content ? candidate.content.parts || [] : [];
  const answer = parts.filter(part => part.text && !part.thought).map(part => part.text).join('\n');
  console.log(answer || '응답은 수신했지만 표시할 텍스트가 없습니다.');
}
