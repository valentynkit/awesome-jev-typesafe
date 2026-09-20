# Awesome Jev (한국어)

> 이 파일은 영어 목록에서 자동 생성됩니다. 직접 수정하지 말고 [readme.md](readme.md)에 기여해 주세요.

[English](readme.md) · [사이트](https://awesomejev.vercel.app/ko/) · [영어 사이트](https://awesomejev.vercel.app/)

## 여기서 시작

- [Introduction](https://docs.typesafe.ai/introduction) - 두 페이지로 정리한 멘탈 모델입니다: 상태와 타입이 지정된 질문이 들어가고, 확률이 붙은 타입 지정 답변이 나옵니다.
- [Quick start](https://docs.typesafe.ai/introduction/quickstart) - Python, TypeScript, curl로 보내는 첫 요청입니다.
- [Primitives](https://docs.typesafe.ai/primitives) - Choice, Score, Noul과 각각이 어울리는 상황입니다.
- [State](https://docs.typesafe.ai/concepts/state) - Jev가 판정할 대상을 어떻게 담을지, 그리고 적을수록 나은 이유입니다.
- [API reference](https://docs.typesafe.ai/api) - 요청과 응답 계약입니다.
- [Models](https://docs.typesafe.ai/models) - 별칭, 현재 버전, 가격, 요청 한도입니다.
- [Model jaggedness: jev-1.13](https://docs.typesafe.ai/model-jaggedness/jev-1.13) - 공급사가 직접 밝힌 알려진 실패 유형입니다.
- [System One](https://docs.typesafe.ai/concepts/system-one) - 이 범주가 무엇을 뜻하며 챗 모델과 어떻게 다른지 설명합니다.
- [How to build with System One](https://docs.typesafe.ai/concepts/how-to-build-with-system-one) - 판단을 원자적 질문으로 쪼개고 제어 흐름은 코드에 두십시오.
- [Confidence](https://docs.typesafe.ai/confidence) - confidence 필드의 의미와 이를 실행, 검토, 폴백으로 바꾸는 방법입니다.
- [Patterns](https://docs.typesafe.ai/patterns) - 투기적 팬아웃, 신뢰도 라우팅, 복합 점수화, 의도 라우팅입니다.
- [Use-case map](https://docs.typesafe.ai/concepts/use-case-map) - Jev가 맞는 곳과 맞지 않는 곳을 공급사가 직접 정리한 목록입니다.
- [Cookbooks](https://docs.typesafe.ai/cookbooks/parallel_questions) - 여러 질문을 한 요청으로 묶는 것부터 시작하는 실전 레시피이며, 나머지는 사이드바에 있습니다.
- [Workflow evals](https://evals.typesafe.ai/) - 네 가지 워크플로에 대한 공급사 벤치마크이며, 주의 사항이 페이지에 함께 적혀 있습니다.
- [Manifesto](https://typesafe.ai/manifesto) - 제품 철학이며, build prod, not god으로 요약됩니다.
- [llms.txt](https://docs.typesafe.ai/llms.txt) - 에이전트에 넣기 위한, 모든 문서 페이지의 순수 Markdown 버전입니다.
- [Console](https://console.typesafe.ai/) - 대기자 명단, API 키, 사용량입니다.
- [Jev on Vercel AI Gateway](https://vercel.com/ai-gateway/models/jev) - 모델 id는 `typesafe-ai/jev`이며, Vercel로 과금되고 TypeSafe 대기자 명단이 필요 없습니다.
- [Jev on Cloudflare Workers AI](https://developers.cloudflare.com/ai/models/typesafe/jev/) - Worker에서 `env.AI.run`을 통해 `typesafe/jev`를 호출합니다.
- [Jev on OpenRouter](https://openrouter.ai/typesafe/jev-1.13) - 범용 게이트웨이의 베타 등록이며, 모델 id는 `typesafe/jev-1.13`이고 OpenRouter 키로 과금됩니다.
- [Jev-verified cascade](https://openrouter.ai/docs/cookbook/evaluate-and-optimize/jev-verified-cascade) - OpenRouter 쿡북입니다: 저렴한 모델이 답하고 Jev가 그 답을 검사하며, 실패한 것만 상위로 넘어갑니다.
- [Jev on Netlify AI Gateway](https://www.netlify.com/changelog/typesafe-jev-ai-gateway/) - Netlify Functions에서 설정 없이 접근하며, 별도의 TypeSafe 키가 필요 없습니다.
- [LiteLLM pass-through](https://docs.litellm.ai/docs/pass_through/typesafe) - 키 관리와 비용 추적을 위해 System One 엔드포인트를 LiteLLM 프록시로 라우팅하며, TypeSafe에 스트리밍이 없으므로 스트리밍은 지원되지 않습니다.
- [Discord](https://discord.gg/typesafe) - 공식 서버이며, 빌더 데모는 show-and-tell 채널에 있습니다.

## 공식 SDK와 프레임워크 지원

- [typesafe-sdk-js](https://github.com/typesafe-ai/typesafe-sdk-js) - 질문에서 답변 타입을 추론하는 TypeScript 및 JavaScript 클라이언트입니다.
- [typesafe-sdk-python](https://github.com/typesafe-ai/typesafe-sdk-python) - 동기와 비동기를 지원하는 Python 클라이언트입니다.
- [system-one-adapter-python](https://github.com/typesafe-ai/system-one-adapter-python) - LLM API를 기반으로 하는 동일한 `TypeSafeClient` 인터페이스로, 같은 질문에서 Jev와 챗 모델을 비교할 수 있습니다.
- [skills](https://github.com/typesafe-ai/skills) - 질문 설계, 워크플로 구축, 평가를 위한 에이전트 스킬입니다.
- [Agent skill](https://docs.typesafe.ai/agent-skill) - Claude Code, Cursor 등에 공식 스킬을 설치하는 방법입니다.
- [Vercel AI SDK provider](https://ai-sdk.dev/providers/ai-sdk-providers/typesafe-ai) - `@ai-sdk/typesafe-ai`는 `experimental_evaluate`를 통해 Jev를 노출합니다.
- [eve](https://github.com/vercel/eve) - Vercel의 에이전트 프레임워크이며, Jev는 evaluate 단계의 타입 지정 판정입니다.
- [ai-cli](https://github.com/vercel-labs/ai-cli) - 터미널에서 쓰는 Vercel AI SDK이며, evaluate 경로는 Jev에서 실행됩니다.

## 코딩 에이전트

### Claude Code

- [fast-jev-compaction](https://github.com/tamaratran/fast-jev-compaction) - 컨텍스트 압축 요약을 Jev 판단으로 대체합니다: 모든 도구 호출과 결과를 한 요청에서 점수화하고, 오래된 것은 버리며, 남긴 것은 원문 그대로 유지합니다.
- [jev-router](https://github.com/gargpratyush/jev-router) - 각 작업을 처리할 수 있는 가장 저렴한 Claude 모델로 라우팅합니다.
- [winnow](https://github.com/GhalebDweikat/winnow) - 모든 도구 결과가 컨텍스트에 들어가기 전에 판정하여, 나중에 정리하는 대신 창이 더 천천히 차도록 합니다.
- [yoshi](https://github.com/compozy/yoshi) - Claude Code와 Codex를 위한 컨텍스트 정리 프록시이며, 절감량을 주장하지 않고 측정합니다.
- [skillranker](https://github.com/Dicklesworthstone/skillranker) - 실시간 세션 컨텍스트로 다음 단계에 쓸 설치된 스킬의 순위를 매기는 Rust CLI와 훅이며, 기권을 지원합니다.
- [jcm-router](https://github.com/adarshmishra07/jcm-router) - 메시지마다 모델과 추론 강도를 고르고 캐시된 메인 대화는 건드리지 않는 로컬 프록시입니다.
- [jev-skillful](https://github.com/bestagentkits/jev-skillful) - 스킬, MCP 서버, 에이전트, 명령을 프롬프트 단위로 라우팅하며, 주입이 도움이 되었는지 측정합니다.
- [limpet](https://github.com/noplan-inc/limpet) - 에이전트가 너무 일찍 멈추지 않게 하는 Stop 훅이며, 평이한 언어로 쓴 규칙에 따라 판정합니다.
- [jevwire](https://github.com/Brainwires/jevwire) - MCP 서버, 임베드 가능한 결정 모델, 그리고 하네스를 더 엄격하게만 만들 뿐 결코 느슨하게 하지 않는 상향 전용 플러그인입니다.
- [jev-code](https://github.com/devagrawal09/jev-code) - 코딩 에이전트가 판단이 많이 필요한 작업을 넘기는 커맨드라인 툴킷이며, 요청당 타입 지정 Jev 워크플로 하나를 실행합니다.
- [vexjoy-agent](https://github.com/notque/vexjoy-agent) - `/d` 명령이 Jev 호출 한 번으로 전문 에이전트, 스킬, 파이프라인을 고르는 에이전트 툴킷이며, 선택형 Jev 자동 컨텍스트 압축 플러그인도 함께 제공합니다.
- [save-token-jev](https://github.com/IAmUnbounded/save-token-jev-clean) - 어떤 도구 호출이 아직 중요한지 Jev에 묻고 나머지는 원문 그대로 유지하는 컨텍스트 압축이며, Claude Code, Codex, OpenCode, 원본 API 기록용 어댑터를 제공합니다.
- [jev-pruner](https://github.com/tamaratran/jev-pruner) - 명령이 실행된 뒤 모델이 보기 전에 Jev로 긴 Bash 출력을 줄이며, 짧은 출력과 오류, 구조화된 형식은 손대지 않고 통과시킵니다.
- [jev-rules](https://github.com/EliaAlberti/jev-rules) - 상시 규칙을 프롬프트마다 점수화하여 해당되는 것만 세션당 한 번 전달합니다.
- [jev-belay](https://github.com/valentynkit/jev-belay) - 검증되지 않은 "완료"를 막는 Stop 훅입니다: 기록에서 증거를 읽고, 파일이 바뀐 뒤 통과한 검사가 없을 때만 질문 네 개짜리 Jev 호출을 한 번 쓰며, 모든 오류 경로에서는 열린 채로 실패합니다.
- [jev-use](https://github.com/shitianfang/jev-use) - Claude Code, Codex, pi에서 텍스트 출력이 필요 없는 단계를 Jev에 맡기고, 결정해서는 안 되는 모든 사항에는 타입이 지정된 에스컬레이션 계약을 둡니다.
### Codex

- [jev-codex-router](https://github.com/0xNatoshi/jev-codex-router) - Codex의 매 턴마다 모델, 사고 깊이, 속도 모드를 고릅니다.
### Pi

- [pi-jev by y0usaf](https://github.com/y0usaf/pi-jev) - 측정된 도구 호출 게이트와 Pi 안에서 타입 지정 답변을 얻는 `jev_ask` 도구입니다.
- [pi-warden](https://github.com/DevMortimer/pi-warden) - 중단시키는 대신 방향을 잡아 주는 가드레일입니다: 되돌릴 수 없는 호출, 작업 외 호출, 갇힌 루프, 검증되지 않은 완료 주장을 각각 약 250 ms에 처리합니다.
- [pi-jev-auto-mode](https://github.com/jomatsu/pi-jev-auto-mode) - bash, write, edit 호출을 의미 기반으로 자동 승인하며, 판단할 수 없을 때는 닫힌 채로 실패합니다.
- [pi-jev by TheoOliveira](https://github.com/TheoOliveira/pi-jev) - Pi 도구로 제공되는 의미 기반 도구 라우팅과 타입 지정 결정입니다.
- [pi-jev-router](https://github.com/mejiasd3v/pi-jev-router) - Vercel AI Gateway를 통한 Pi의 자동 모델 라우팅입니다.
- [pi-fast-jev-compaction](https://github.com/joelhooks/pi-fast-jev-compaction) - 원문을 그대로 유지하는 컨텍스트 압축 아이디어를 Pi로 이식한 것입니다.
- [bicameral](https://github.com/AbdelStark/bicameral) - Pi용 하이브리드 하네스입니다: LLM이 코드를 쓰고, Jev 반사가 모든 호출을 허용, 확인, 차단, 경고, 유도로 게이트합니다.
- [pi-quiet-ask](https://github.com/HyunjunJeon/pi-quiet-ask) - Pi 코딩 에이전트의 조용한 결정 계층으로 쓰이는 Jev입니다.
- [pi-typesafe-jev](https://github.com/legacybridge-tech/pi-typesafe-jev) - Jev 판정을 다섯 개의 Pi 도구로 노출하는 Pi 확장입니다.
- [pi-typesafe](https://github.com/DevMortimer/pi-typesafe) - 일괄 평가 도구, 터미널 플레이그라운드, 그리고 Pi 확장 작성자를 위한 타입 지정 API입니다.
- [pi-heed](https://github.com/Nyarlathoteppppp/pi-heed) - 부수 효과가 있는 모든 도구 호출을 세션 앞부분에서 한 말과 대조하여, 컨텍스트 압축 이후에도 "검토만"이 유지되게 합니다.
- [pi-jev-sentinel](https://github.com/harshwasan/pi-jev-sentinel) - Pi의 도구 호출, 도구 출력, 응답을 Jev로 검사하여 위험한 작업과 프롬프트 인젝션을 잡아내며, 사용자 승인, 컨텍스트 재검사, 시크릿 제거, 선택적 작업 고정을 제공합니다.
- [pi-mcp-adapter](https://github.com/nicobailon/pi-mcp-adapter) - MCP 도구 결과에 대한 선택적 타입 평가와 시맨틱 검색을 서버별 데이터 반출 허용 목록 뒤에서 제공합니다.
### Hermes

- [typesafe-skill-router](https://github.com/DECRUX9812/typesafe-skill-router) - 모델 호출 전에 불러올 가치가 있는 스킬 하나를 지목하며, 표준 라이브러리만 쓰고 턴당 약 0.1센트가 듭니다.
- [jev-agent-skill-router](https://github.com/GodsBoy/jev-agent-skill-router) - 신뢰도를 고려한 스킬 라우팅이며 기권 경로를 제공합니다.
- [hermes-jev](https://github.com/keeltrace/hermes-jev) - 타입 지정 결정, 순위 매기기, 검증, 그리고 선택형 도구 게이트입니다.
- [ask-jev-skill](https://github.com/shantanugoel/ask-jev-skill) - Hermes를 비롯한 유사 에이전트가 Jev에 직접 물을 수 있게 합니다.
- [hermes-jev-plugin](https://github.com/ajensenwaud/hermes-jev-plugin) - 원자적 검사, 라우팅, 루브릭 점수화를 위한 Hermes 도구 네 개이며, Hermes 플러그인 카탈로그에 등재되어 있습니다.
- [hermes-jev-approvals](https://github.com/anpicasso/hermes-jev-approvals) - 플래그가 붙은 셸 명령을 실행 전에 승인, 거부 또는 상신하며, 속도 향상 수치는 벤더 보고입니다.
### Agent Zero

- [a0-typesafe-ai](https://github.com/3clyp50/a0-typesafe-ai) - Agent Zero를 위한 타입 지정 도구와 확률 카드입니다.
### 에이전트 공통

- [skillbox](https://github.com/kitze/skillbox) - MCP로 제공되는 자체 호스팅 버전 관리 스킬 라이브러리이며, 어떤 스킬을 불러올지는 Jev가 추천합니다.
- [jev-mcp by jkudish](https://github.com/jkudish/jev-mcp) - Jev용 첫 MCP 서버이며, 지금도 가장 많이 링크됩니다.
- [typesafe-mcp](https://github.com/itsmostafa/typesafe-mcp) - Go로 작성한 MCP 커넥터입니다.
- [jev-mcp by blakestone-x](https://github.com/blakestone-x/jev-mcp) - 분류, 점수화, 검사, 매칭, 선별을 수행하며 모든 답변에 신뢰도가 붙습니다.
- [Jevbridge](https://github.com/tacticocc/Jevbridge) - 컴퓨터 사용과 타입 지정 결정을 위해 Jev를 임의의 LLM과 짝지어 주는 ACP 및 MCP 어댑터입니다.
- [jev-eval-mcp](https://github.com/BYK/jev-mcp) - 평가를 우선하는 MCP 서버입니다: 질문을 시제품으로 만들고 여러 항목에 매핑한 다음, 임계값 스윕으로 라벨된 예제에 대해 변형을 측정합니다.
- [azdaja](https://github.com/kubet/azdaja) - 전체 소스를 로컬 평가기에 보관하는 Claude Code, Codex, Gemini, OpenCode용 재귀 언어 모델 계층이며, Jev는 예산이 정해지고 체크포인트가 있는 배치에서 리랭킹, 검증, 분류, 의미 기반 조인을 맡는 선택적 리프입니다.
### Jev 코드 작성용 스킬

- [building-with-jev-skill](https://github.com/dbreunig/building-with-jev-skill) - Jev를 호출하는 프로그램을 작성하고 개선하기 위한 스킬입니다.
- [jev-system-architect](https://github.com/samtay32/jev-system-architect) - 시스템 안의 모호한 판단을 찾아 작은 Choice, Score, Noul 프리미티브로 바꿉니다.
- [jev-judgment](https://github.com/HyunjunJeon/jev-judgment) - 코딩 에이전트의 닫힌 판단을 챗 모델 대신 Jev로 보냅니다.
- [skills by fabricioctelles](https://github.com/fabricioctelles/skills) - 주관적 평가 기준을 Jev로 점수화할 수 있는 에이전트 스킬 디렉터리입니다.
- [Augustus](https://github.com/24601/Augustus) - 타입 지정 판단이 애초에 어디에 속하고 무엇이 코드에 남을지 결정하기 위한 스킬이며, 공식 스킬의 대체가 아니라 동반 도구입니다.

## 브라우저와 컴퓨터 사용

- [jev-ultrafast](https://github.com/browser-use/jev-ultrafast) - 한 요청으로 인덱싱된 DOM 테이블에서 연산과 대상 요소를 모두 고르며, 작은 LLM은 입력할 텍스트만 씁니다. 취리히에서 런던까지 7.1초 만에 예약했습니다.
- [typesafe-computer-use](https://github.com/awlevin/typesafe-computer-use) - 화면을 OCR하고 다음 동작을 분류한 뒤 클릭하며, macOS에서 단계당 약 $0.0002입니다.
- [mobile-jev](https://github.com/droidrun/mobile-jev) - 실제 Android 휴대폰에서 도는 같은 루프이며, 데모에서는 Uber 동작 아홉 개를 21초에 처리합니다.
- [jev-browser by jkudish](https://github.com/jkudish/jev-browser) - Jev 기반 첫 커뮤니티 브라우저 에이전트이며, 데모 GIF가 있습니다.
- [jev-voice-browser](https://github.com/moritzkremb/jev-voice-browser) - 발화된 단어마다 의도와 대상을 약 300 ms에 결정하며, 문장이 끝나기 전인 경우도 많습니다.
- [jev-browser by Ying-Kai-Liao](https://github.com/Ying-Kai-Liao/jev-browser) - LLM이 계획하고 Jev가 결정하며, 라이브러리와 CLI, MCP 서버를 제공합니다.
- [jev-browser by tontoko](https://github.com/tontoko/jev-browser) - 타입 지정 SDK와 상주형 CLI, MCP 서버 뒤에 놓인 하나의 그라운디드 Jev와 Playwright 코어입니다.
- [jev-mobile](https://github.com/friedjof/jev-mobile) - USB로 연결한 Android 서브에이전트가 관찰, 정규화, 결정, 변경, 검증을 수행하며 결정은 Jev가 내립니다.
- [jev-ego](https://github.com/romaluev/jev-ego) - 단계마다 Jev 요청 한 번으로 동작을 고르는 브라우저 에이전트입니다.
- [jev-browser-use](https://github.com/wy-coliney/jev-browser-use) - Jev가 탐색과 클릭, 스크롤을 맡고 Codex가 입력과 검증을 맡는 Codex 스킬 겸 플러그인이며, 브라우저 단계가 5~10배 빨라졌다고 보고합니다.
- [Jev-cu](https://github.com/Sac-Y/Jev-cu) - Jev가 화면 텍스트에서 요소, 동작, 완료 여부, 위험도를 고르고 스크린샷은 보내지 않는 Codex 컴퓨터 사용이며, 중국어 readme입니다.
- [JevScout](https://github.com/hqman/JevScout) - CDP로 Chrome을 조작하고 모든 링크와 공고를 Jev가 점수화하게 하는 구직 스킬입니다.
- [Jev Social](https://github.com/socai-io/jev-social) - Lets Jev choose each read-only social research step while socai runs it in a real Chrome session and streams inspectable Instagram, TikTok, or LinkedIn evidence into a report.

## 오픈 모델과 재현 구현

- [SemIf](https://github.com/TheoLeeCJ/SemIf) - 3090 한 대에서 오픈 모델로 구현한 의미 기반 if이며, 가장 많은 스타를 받은 독립 재구현이고 이전 이름은 openjev입니다.
- [jevlike](https://github.com/vinnylarouge/jevlike) - JSON을 생성하는 대신 후보 로짓을 읽는 오픈 옵션 스코어러입니다.
- [NanoJev](https://github.com/TianyuCodings/NanoJev) - 병렬 결정, 동적 후보, 종단 간 학습 파이프라인을 갖춘 0.6B 재구현입니다.
- [openjev-sglang](https://github.com/ekzhang/openjev-sglang) - SGLang에서 동작하는 Jev 호환 API 엔드포인트이며, prefill만 수행합니다.
- [jev-visual](https://github.com/hr98w/jev-visual) - Apple Silicon용 교육 목적 시각 추론 변형입니다: 공유 컨텍스트와 직접적인 후보 점수화를 씁니다.
- [reflex](https://github.com/kshetrajna12/reflex) - Qwen3.5 기반의 작은 오픈 결정 모델입니다: 상태와 타입 지정 질문을 보정된 확률로 바꿉니다.
- [decider](https://github.com/Mapika/decider) - Qwen3.5-2B에서 파인튜닝한 단일 패스 타입 지정 결정입니다.
- [jevmlx](https://github.com/bnsd55/jevmlx) - Apple Silicon의 모든 MLX 모델에 대해 순전파 한 번으로 수행하는 병렬 제약 결정입니다.
- [mini-jev](https://github.com/r-ms/mini-jev) - 고정된 Qwen3-4B로 진행한 사전 등록 실험입니다: 선택지 문자의 로짓을 읽고 JSON은 건너뜁니다.
- [system-one-open](https://github.com/mithalouni/system-one-open) - Gemma 4 E2B와 Gemma 3 270M에서 순전파 한 번으로 내리는 타입 지정 보정 결정입니다.
- [Verdict-open-jev](https://github.com/Heman10x-NGU/Verdict-open-jev) - 보정된 불확실성과 브라우저 내 WebGPU 플레이그라운드를 갖춘 ModernBERT 기반 비자기회귀 결정 엔진입니다.
- [jevfire](https://github.com/kikoncuo/jevfire) - vLLM API를 통해 CUDA LLM에 병렬 결정을 제공하며, 게임 에이전트 예제와 벤치마크가 함께 있습니다.
- [jevbetter](https://github.com/olanotolu/jevbetter) - jevlike 기본 설계와의 맞대결 벤치마크를 갖춘 더 강력한 단일 패스 스코어러입니다.
- [open-alternative-jev](https://github.com/ikermoel/open-alternative-jev) - Hugging Face와 vLLM에서 임의의 오픈 웨이트 모델로 순전파 한 번에 내리는 타입 지정 보정 결정입니다.
- [openjev by zhihz](https://github.com/zhihz/openjev) - 컨텍스트, 질문, 후보 답변으로부터 내리는 이중 언어 로컬 결정입니다.
- [jev-on-a-laptop](https://github.com/rorshopping/jev-on-a-laptop) - 노트북에서 기본 1.5B~8B 모델로 Jev 방식 결정을 살펴본 연구이며, Hugging Face 데모가 있습니다.
- [typesafe-ai-benchmark](https://github.com/iammrduncan/typesafe-ai-benchmark) - TypeSafe 응답 형태를 흉내 내는 LLM 게이트웨이이며, 키를 기다리는 동안 대체재로 쓸 만합니다.
- [Parallel constrained decoding](https://huggingface.co/spaces/drinkmoonshine/parallel-constrained-decoding) - Qwen2.5-1B에서 RLCD 방식 병렬 디코딩을 보여 주는 Hugging Face Space입니다.
- [openvons](https://github.com/genai-craft/openvons) - 유한한 선택지 집합에 실행, 확인, 거부로 나뉜 확률로 답하는 오픈 결정 계층입니다. TypeSafe 가중치가 아니라 독립 재구현입니다.
- [von](https://github.com/wfzyx/von) - 로컬에서 15 ms 미만을 보고하는 비자기회귀 오픈 결정 모델이며, Jev를 그대로 대체할 수 있습니다.
- [litjev](https://github.com/zhengxuyu/litjev) - 기성 LLM을 Jev 방식 결정 계층으로 바꿉니다.
- [open-jev](https://github.com/JoshuaSP/open-jev) - DiffusionGemma를 이용한 타입 지정 JSON 추론이며, Jev와 벤치마크로 비교합니다.
- [kev](https://github.com/jaredpalmer/kev) - 한 번의 prefill로 여러 타입 지정 질문에 답하는 Qwen2.5-0.5B용 LoRA 어댑터와 리드아웃 헤드이며, MacBook에서 두 시간 안에 학습하고 홀드아웃 ECE 0.065를 기록하며 TypeSafe 전송 형식을 씁니다.
- [simple-jev](https://github.com/featherless-ai/simple-jev) - 임의의 Hugging Face 모델에서 다음 토큰 로짓을 읽어 선택, 루브릭, 지지 여부 질문에 답하며, 키가 필요 없는 공개 데모 API를 제공합니다.
- [OpenJev by razorback16](https://github.com/razorback16/openjev) - vLLM을 통해 DiffusionGemma 26B에서 동작하는 Jev 호환 결정 서버이며, 이미지를 지원하고 [Codiv](https://codiv.ai)에서 무료로 호스팅됩니다.
- [openjev by daseinlabs](https://github.com/daseinlabs/open-jev) - MLX로 Gemma 3 4B에서 한 번 prefill한 뒤 패딩된 패스 한 번으로 모든 선택지를 점수화하며, 데모에서는 터미널에서 Doom을 플레이합니다.
- [jeff by logan-markewich](https://github.com/logan-markewich/jeff) - 400M GLiFormer에서 동작하는 자체 호스팅 System One API이며, 어디에서 Jev에 뒤처지는지 보여 주는 벤치마크를 함께 제공합니다.
- [JevForge](https://github.com/zwliJay/jev-forge) - 감사 가능한 데이터 구축, Qwen3.5-0.8B 학습, 고정된 Mind2Web 및 OOD 평가, 로컬 서빙, 예비 RLCD 기준선까지 아우르는 엔드투엔드 스택입니다.
- [PlayJev](https://github.com/OmniJev/PlayJev) - 미세 조정한 Qwen3.5-0.8B로 화면만 보고 열 가지 브라우저 게임을 플레이하며, 한 수마다 순전파 한 번, 공개 가중치와 브라우저 데모를 제공합니다.

## 코드 리뷰와 품질

- [jev-review by devagrawal09](https://github.com/devagrawal09/jev-review) - 로컬 대시보드를 갖춘 단계별 코드 리뷰 워크플로입니다.
- [jev-review by NiazMorshed2007](https://github.com/NiazMorshed2007/jev-review) - 코딩 에이전트의 지속적 품질 검토를 위한 로컬 우선 MCP 플러그인입니다.
- [foreman](https://github.com/thruwire/foreman) - 에이전트로 이루어진 소프트웨어 공장을 감독하며, 진행과 중단 판단은 Jev가 내립니다.
- [supercov](https://github.com/supercorp-ai/supercov) - 코딩 에이전트를 위한 코드 품질 및 커버리지 신호입니다.
- [diffjury](https://github.com/raihankhan-rk/diffjury) - PR 위험도 라우터이자 리뷰 코치입니다.
- [clean-code-review](https://github.com/frostney/clean-code-review) - PR의 모든 파일을 Clean Code 규칙에 따라 판정한 뒤 LLM이 검토합니다.
- [JevLint](https://github.com/huntedman/JevLint) - 파일 단위 Noul 판정을 쓰는 설정 가능한 의미 기반 린팅입니다.
- [commit-miner](https://github.com/devanshbatham/commit-miner) - 커밋 diff와 메시지를 분류합니다: 버그 수정, CWE가 붙은 보안 수정, 변경 유형을 구분합니다.
- [jev-review-action](https://github.com/fatwang2/jev-review-action) - Jev로 제출물 검토와 PR 분류를 수행하는 GitHub Action이며, 텍스트 생성 모델은 관여하지 않습니다.
- [jev-triage](https://github.com/cephalization/jev-triage) - 큰 저장소를 받아 와 타입 지정 Jev 질문으로 이슈를 분류합니다.
- [perch](https://github.com/lakeday-org/perch) - 의미 기반 린팅입니다: 규칙을 평이한 언어로 쓰고 각 파일을 Jev가 판정하며, 로컬이나 CI에서 실행합니다.
- [jeff by Alurith](https://github.com/Alurith/jeff) - 숨은 부수 효과나 허술한 오류 처리 같은 규칙에 따라 파일을 검사하는 읽기 전용 Go CLI입니다.
- [jev-pref](https://github.com/doeixd/jev-pref) - AGENTS.md에 적힌 선호 사항을, 코드 변경 시 실행되어 결과를 에이전트에 돌려주는 린터로 바꿉니다.
- [jev-commit](https://github.com/valentynkit/jev-commit) - 커밋 전 훅입니다: Jev 호출 한 번으로 커밋 메시지가 스테이징된 diff와 맞는지, 디버그 잔재와 언급되지 않은 작업이 있는지, 자격 증명이 섞였는지 판정하며, 비밀 정보만 차단하고 나머지는 경고합니다.
- [slop-grader](https://github.com/lukstei/slop-grader) - Grades text and markdown files for AI slop, grammar, and technical documentation quality, and guides an AI agent to auto-fix violations.

## 라우팅과 게이트웨이

- [tiershift](https://github.com/iamvatsalpatel/tiershift) - 모든 LLM 호출을 처리 가능한 가장 저렴한 모델로 옮기며, 정책은 YAML로 쓰고 결정은 약 180 ms에 끝납니다.
- [jev-router by prismhq](https://github.com/prismhq/jev-router) - LiteLLM 위에 올린 LLM 라우터입니다.
- [agent-router](https://github.com/nidhi-singh02/agent-router) - 작업에 맞는 Cursor, Claude Code, Codex, OpenCode와 모델, 추론 강도를 고른 뒤 실행합니다.
- [Janus](https://github.com/FirasSX914/Janus) - 내 데이터에서 Jev가 다른 모델을 앞서는 경우를 측정한 뒤 그에 맞게 라우팅합니다.
- [hono-jev-router](https://github.com/yusukebe/hono-jev-router) - Hono에서 HTTP 요청을 의미에 따라 라우팅합니다.
- [JevRouter](https://github.com/BillionsBobby/JevRouter) - 모델, 서브에이전트, 스킬, MCP 도구, CLI를 하나의 후보 집합으로 두어 Jev가 고르고 라우터가 권한과 위험을 강제하며, Toolathlon에서 첫 다섯 도구 호출 적중률 44퍼센트로 DeepSeek의 24퍼센트를 앞섰다고 보고합니다.
- [jev-gateway](https://github.com/vinilana/jev-gateway) - "다음에 어떤 도구를 쓸지" 결정은 Jev로, 나머지는 평소 쓰던 모델로 보내는 Codex와 Claude Code용 로컬 게이트웨이입니다.

## 검색, 리랭킹, RAG

- [jev-search](https://github.com/superagents-lab/jev-search) - 웹 검색을 위한 소스 선택, 질의 이해, 관련도 순위 매기기입니다.
- [blink](https://github.com/ellipsis-dev/blink) - Jev가 후보를 점수화하는 코드베이스 검색입니다.
- [reranker](https://github.com/hev/reranker) - 보정된 리랭커로 쓰는 Jev입니다: 호출 한 번에 문서 최대 30개, 문서마다 확률 하나입니다.
- [llama-index-jev](https://github.com/WiktorB2004/llama-index-jev) - LLM 판정보다 저렴한 LlamaIndex 리랭커 겸 라우터입니다.
- [jev-tree](https://github.com/reachjalil/jev-tree) - 분류 체계를 재귀적으로 선택하여 255개 선택지 상한을 넘어섭니다.
- [jev-folio-recursive-classifier](https://github.com/mttrbrts/jev-folio-recursive-classifier) - OCR한 법률 계약서를 재귀적 Jev Choice, 빔 서치, 신뢰도 기반 리프 정지, 컨텍스트 길이 벤치마크를 통해 FOLIO 문서 유형 온톨로지로 분류합니다.
- [neo4jev](https://github.com/jexp/neo4jev) - 이웃 관계를 분류하며 Neo4j 그래프를 탐색합니다.
- [jev-sift](https://github.com/kbhuw/jev-sift) - 파일, URL, 스니펫 묶음의 관련도를 점수화하여 에이전트가 중요한 것만 열도록 하는 MCP 도구입니다.
- [jev-scout](https://github.com/AkashPriyadarshii/jev-scout) - 평이한 언어로 된 요청에 맞는 실제로 유지 보수되는 저장소와 크레이트를 찾아 주는 Rust CLI 겸 MCP 서버이며, 후보 점수화는 Jev가 맡습니다.

## 데이터와 운영

- [pg-jev](https://github.com/realZachi/pg-jev) - 테이블에 대한 평이한 언어 질문에 답하는 PostgreSQL 확장입니다.
- [vgi-typesafe](https://github.com/Query-farm/vgi-typesafe) - choice, noul, score를 SQL에서 lateral 조인이 가능한 테이블 함수로 노출하는 DuckDB 워커입니다.
- [jevsql](https://github.com/EugeneBoondock/jevsql) - SQLite 위에서 자연어 술어를 쓰는 SQL입니다: 행을 의미로 걸러 내고 순위를 매기고 분류하며, 일괄 처리와 비용 보호 장치를 갖췄습니다.
- [sqlite-jev](https://github.com/mgaitan/sqlite-jev) - 로드 가능한 C 확장과 Python 래퍼를 통해 SQLite에 Jev의 Noul, Choice, Score 판정을 추가하며, 스칼라 함수와 일괄 가상 테이블 질의를 제공합니다.
- [jevlogs](https://github.com/reachjalil/jevlogs) - LLM 분석에 비용을 치르기 전에 OpenTelemetry 로그의 신호를 점수화합니다.
- [jev-curate](https://github.com/AkashPriyadarshii/jev-curate) - Parquet과 JSONL 학습 데이터를 초당 1,500행 넘게 걸러 냅니다.
- [HA-Jev](https://github.com/AboveColin/HA-Jev) - Home Assistant 통합입니다: 집에 관한 질문을 던지면 확률이나 선택, 점수를 엔터티로 받습니다.
- [typesafe-migration-guard](https://github.com/opaielsheikh/typesafe-migration-guard) - 데이터베이스 마이그레이션을 실행하기 전에 안전성 관점에서 검토합니다.
- [jev-for-engineers](https://github.com/Foadsf/jev-for-engineers) - 기계 및 전기 공학에서 가져온 여덟 개의 작은 예제입니다: CAD 라우팅, FEM 분류, DFM 선별, BOM 정렬을 다룹니다.
- [jlink](https://github.com/keltokhy/jlink) - 평이한 영어로 쓴 매칭 규칙으로 두 데이터셋의 레코드를 Python, 셸, Stata, R에서 연결하며, NBER 특허 양수인과 Compustat 연결에서 튜닝된 문자열 매칭의 0.69 대비 F1 0.73을 보고합니다.
- [pg_typesafe](https://github.com/giuliosmall/pg_typesafe) - Jev로 범주 분류를 수행하는 프리알파 PostgreSQL 확장입니다.
- [jev-mode](https://github.com/ddfeyes/jev-mode) - 타입 지정 판단 모델 위에서 수행하는 티켓 분류와 파일 태깅이며, 토큰을 78퍼센트 줄이고 93.7퍼센트 기준선 대비 96.1퍼센트 정확도를 보고합니다.
- [jev-reviewer](https://github.com/choxos/jev-reviewer) - 임상시험 보고서에 체계적 문헌고찰용 데이터를 음성, 텍스트, 질문 파일로 묻고, 모든 답변은 파일과 위치가 붙은 원문 인용입니다.
- [tax-doc-classifier](https://github.com/kyotofin/tax-doc-classifier) - 페이지당 요청 한 번으로 261개 IRS 서식과 일곱 가지 페이지 종류 중에서 고르며, 페이지당 $0.001로 자체 코퍼스에서 100퍼센트를 기록해 대체한 LLM 파이프라인보다 34배 저렴하다고 보고합니다.
- [jevql](https://github.com/kylemclaren/jevql) - PostgreSQL용 의미 기반 SQL이며, 술어는 Jev가 답합니다.
- [duckdb-jev](https://github.com/colliber/duckdb-jev) - 모든 행에 질문을 던지고 실제 SQL 타입을 돌려주는 DuckDB 확장입니다.
- [invalidate](https://github.com/chopratejas/invalidate) - 저장된 모든 에이전트 메모리에 임대 기간을 부여하고 새 증거가 그 기간을 끝내는지 Jev에 묻습니다. [라이브 데모](https://invalidate-playground.vercel.app).

## 안전, 모더레이션, 검증

- [jev-shield](https://github.com/caiovicentino/jev-shield) - 모든 도구 호출과 결과, 설명을 검사하는 의미 기반 MCP 방화벽이며, 검사당 약 $0.00002로 차단 재현율 94퍼센트를 보고합니다.
- [jev-guard](https://github.com/leepokai/jev-guard) - Claude Code, Codex, Cursor, Gemini CLI, Pi, OpenCode를 위한 자동 모드입니다: 각 도구 호출의 위험도를 거부, 확인, 허용으로 점수화하고 결과에 섞인 프롬프트 인젝션을 표시합니다.
- [Jev-Moderation-Bot](https://github.com/brainstormity/Jev-Moderation-Bot) - 편집 가능한 규칙을 쓰는 채팅 모더레이션입니다.
- [citation-verifier](https://github.com/MarissaFamularo/citation-verifier) - 인용된 논문이 그것을 인용한 문장을 뒷받침하는가? Claude가 인용문을 찾고, Jev가 점수를 매기고, 사람이 결정합니다.
- [human-compiler](https://github.com/asfarsadewa/human-compiler) - 텍스트를 붙여 넣으면 진단이 나오며, 산문을 위한 컴파일러와 같습니다.
- [snifftest](https://github.com/DanRWilloughby/snifftest) - AI 글쓰기 티를 잡는 산문 린터입니다: 셀 수 있는 규칙에 판단 모델 하나를 더했습니다.
- [riff](https://github.com/scale-venture-partners/riff) - 글쓰기를 위한 Ruff 스타일 규칙 코드입니다.
- [jev-secret-detection](https://github.com/teyhouse/jev-secret-detection) - 파일 스니펫에서 Jev가 실제 자격 증명을 얼마나 잘 찾아내는지 측정하며, 설정 파일처럼 보이는 어려운 사례는 따로 채점합니다.
- [jev-audio-beeper](https://github.com/santos-sanz/jev-audio-beeper) - 저지연 오디오 검열 개념 증명입니다: Jev의 타입 지정 결정이 ffmpeg를 구동합니다.
- [is-malicious](https://github.com/luantak/is-malicious) - 실행하기 전에 코드베이스에서 숨은 동작이나 데이터 탈취 행위를 검사하며, 깨끗한 보고서가 증거는 아니라고 스스로 밝힙니다.
- [tripwire](https://github.com/noelzappy/tripwire) - 사용자가 보기 전에 모든 LLM 응답에 일곱 가지 Jev 검사를 실행하는 AI SDK 미들웨어 겸 프록시이며, 아직 정확도 수치가 없다고 스스로 밝힙니다.

## 애플리케이션과 확장

- [unclutter](https://github.com/kitze/unclutter) - 재사용 가능한 템플릿 규칙으로 페이지의 잡동사니를 제거하는 브라우저 확장입니다.
- [typesafe-adblock](https://github.com/realZachi/typesafe-adblock) - DOM 노드마다 "이 요소가 광고인가?"를 묻는 Chrome 확장이며, 장난감이라고 스스로 밝힙니다.
- [vibecheck](https://github.com/RafalWilinski/vibecheck) - 게시 버튼을 누르기 전에 X 게시물의 분위기를 점검하십시오.
- [xtags](https://github.com/manifoldor/xtags) - X 타임라인의 모든 게시물에 그 글이 무엇을 시키려는지 라벨을 붙입니다.
- [jevibe-check](https://github.com/sriganesh/jevibe-check) - Bluesky 게시물과 초안에 붙는 실시간 어조 라벨입니다.
- [jevmeter](https://github.com/ChetasLua/jevmeter) - 어떤 영상에나 실시간 계기를 붙입니다: 모든 문장을 다섯 가지 질문으로 점수화해 16:9 편집본으로 렌더링하며, 토론 하나에 약 2센트가 듭니다.
- [killmyidea](https://github.com/monteduro/killmyidea) - 스타트업 아이디어를 설명하면 Jev가 접으라, 고치라, 내보내라 중 하나를 말합니다.
- [notra](https://github.com/usenotra/notra) - 작업을 콘텐츠로 바꾸며, 무엇을 올릴 가치가 있는지는 Jev가 결정합니다.
- [slidepilot](https://github.com/harshil1712/slidepilot) - Cloudflare Agents에서 동작하는 Slidev용 음성 기반 자동 넘김입니다.
- [should-ai-kill-us-all](https://github.com/hellogumbo/should-ai-kill-us-all) - 실제 헤드라인을 사용해 10분마다 Jev에 그 질문을 던집니다.
- [Privacy Facts](https://github.com/thenewpotato/privacy-facts) - 개인정보 처리방침을 평이한 언어 답변과 Jev 신뢰도 점수, 근거 조항 제안이 담긴 영양성분표 형식의 라벨로 바꿉니다.
- [jev-voice-control](https://github.com/chris-wozniczek/jev-voice-control) - 음성 명령을 Jev의 타입 지정 결정과 macOS 동작으로 바꾸는 메뉴 막대 Swift 앱입니다.
- [jev-got](https://github.com/phureewat29/jev-got) - 스토리 모델이 각 장면을 쓰고, Jev가 헤더와 사운드트랙, 아트, 다음 프롬프트를 좌우하는 다섯 개의 타입 지정 질문에 답하는 Game of Thrones 롤플레이입니다.
- [typesafe-jev](https://github.com/gtaras7/typesafe-jev) - 로컬 이력서 선별 워크벤치로 시작하는 Jev 실험 모음이며, 각각 측정된 결과가 함께 있습니다.
- [super-jev](https://github.com/kevthetech143/super-jev) - 증거, Jev 판정, 허용된 동작, 검증된 결과를 잇는 작은 하네스입니다.
- [safer-with-jev](https://github.com/andrelandgraf/safer-with-jev) - 앞단에 Jev 라우팅을 둔 Neon AI Gateway용 Neon Function 프록시입니다.
- [Sponsor Skip](https://github.com/trungdq88/youtube-sponsor-detection) - 자막이나 실시간 오디오에서 협찬 멘트를 찾아 건너뛰는 Chrome 확장이며, 모든 타임스탬프는 코드가 관리하고 자막 모드에서는 시간당 1센트 미만이 듭니다.
- [jev-seo](https://github.com/AkashPriyadarshii/jev-seo) - DuckDuckGo 결과에 대한 SEO 및 GEO 점검을 수행하는 Rust CLI 겸 MCP 서버이며, 점수는 Jev가 매깁니다.
- [jev.nvim](https://github.com/valentynkit/jev.nvim) - Neovim 플러그인입니다: 버퍼에 평이한 언어로 질문하면 Treesitter가 함수 단위로 쪼개고 Jev가 각각을 점수화하며, 답변은 확률 순으로 quickfix에 쌓입니다.
- [jev-skip](https://github.com/valentynkit/jev-skip) - 자막 트랙을 읽어 인트로가 끝나기 전에 구간별 협찬 확률을 탐색 바에 그리는 브라우저 확장이며, 크라우드 데이터베이스 없이 영상 23개에서 영상당 $0.0008로 SponsorBlock 협찬 구간 초의 77퍼센트를 잡았다고 보고합니다.
- [openpoke-meets-jev](https://github.com/0xShin0221/openpoke-meets-jev) - OpenPoke 포크로, 이메일 선별, 도구 호출 가드레일, 검색 재순위를 Jev로 옮기며, 대체한 Sonnet 호출과의 A/B 비교와 인젝션 게이트에 대한 공격 실험을 포함합니다.

## 게임, 로보틱스, 시뮬레이션

- [typesafe-mario](https://github.com/fhshaik/typesafe-mario) - 구조화된 에뮬레이터 상태로 Super Mario Bros.를 플레이하며, NES 컨트롤러 입력은 Jev가 직접 고릅니다.
- [jev-drone](https://github.com/RomanSlack/jev-drone) - MuJoCo에서 카메라만 쓰는 드론이며, Jev가 2.5 Hz로 루프에 참여합니다.
- [tsai-sc](https://github.com/phyous/tsai-sc) - 키보드와 마우스로 오리지널 StarCraft 셰어웨어를 플레이하며, 동작 확률을 기록합니다.
- [tsai-civ2](https://github.com/phyous/tsai-civ2) - 브라우저에서 돌리는 Civilization II이며, 전체 게임 하네스와 실시간 동작 확률을 갖췄습니다.
- [heist-one](https://github.com/AbdelStark/heist-one) - Jev가 경비병의 판단을 내리고 결정론적 코드가 세계를 관리하는 잠입 게임입니다.
- [typesafe-snake](https://github.com/sorrycc/typesafe-snake) - 틱마다 Choice 하나를 쓰며, 합법 수와 사실은 코드가 생성합니다.
- [jev-doom-agent](https://github.com/lukaske/jev-doom-agent) - 구조화된 공간 상태와 실시간 결정 텔레메트리를 갖춘 브라우저 네이티브 Doom 에이전트입니다.
- [OneVOneJev](https://github.com/emrickgarrett/OneVOneJev) - Three.js로 만든 1대1 퀵스코프 아레나입니다.
- [JevPlaysPokemon](https://github.com/anxkhn/JevPlaysPokemon) - Showdown과 실제 FireRed ROM으로 플레이하는 3세대 Pokémon입니다.
- [jev-askable-arm](https://github.com/TarunTomar122/jev-askable-arm) - 시뮬레이션된 Franka 팔에 영어 목표를 제로샷으로 주며, Jev가 하드코딩된 프리미티브를 이어 붙입니다.
- [quackd](https://github.com/rokbenko/quackd) - 일곱 가지 몸체에 걸쳐 LLM이 조종하는 로봇을 위한 커맨드라인이며, 관절 각도를 한 번도 쓰지 않고 호출 중에서 고르는 선택형 Jev 스테퍼를 제공합니다.
- [snake-jev](https://github.com/siroccomask/snake-jev) - 병렬 Jev 평가로 조종하는 Snake이며, 틱당 API 호출 한 번을 씁니다.
- [JevPilot](https://github.com/standardagents/jevpilot) - 샘플링된 경로에서 Jev가 초당 최대 네 번까지 조향과 속도를 고르는 Three.js 운전 시뮬레이터입니다. [직접 운전해 보십시오](https://jevpilot.standardagents.ai).
- [live-jev](https://github.com/vinilana/live-jev) - 브라우저에서 200 ms마다 타입 지정 질문 네 개를 보내는 탑다운 자동차이며, 신뢰도로 게이트된 재정의는 코드에 둡니다.
- [jev-plays-pokemon-red](https://github.com/valentynkit/jev-plays-pokemon-red) - PyBoy로 돌리는 Pokemon Red입니다: 경로와 연산은 코드가 맡고 Jev는 분기에서만 고르며, 전투 턴마다 기절 예측을 기록해 RAM이 말하는 값과 Brier 점수로 비교합니다.

## 금융과 트레이딩

- [jev-trader](https://github.com/jarrodwatts/jev-trader) - Kuru MON-USDC에서 Monad 블록마다 거래 결정을 하나씩 내리며, 각각 약 300 ms가 걸립니다.
- [trade-jev](https://github.com/justinhe16/trade-jev) - NQ 호가창 데이터에서 Jev를 매수, 매도, 보유 트레이더로 백테스트합니다.
- [Jev-Trades](https://github.com/zadescoxp/Jev-Trades) - 백테스트를 지원하는 암호화폐 트레이딩 봇입니다.
- [jev-trade](https://github.com/aowang-ai/jev-trade) - Hyperliquid에서 실시간으로 거래하는 Jev 트레이더입니다.

## 벤치마크, 평가, 보정

- [jev-benchmarks](https://github.com/AbdelStark/jev-benchmarks) - 타입 지정 결정 모델을 위한 확률 인지 평가입니다: 보정, 선택적 위험, 지연 시간을 재현 가능하게 다룹니다.
- [jevcal](https://github.com/abhixhek/jevcal) - 임계값 추측은 그만두십시오: LLM 교사를 기준으로 보정하고 임계값을 정하고 드리프트를 점검하십시오.
- [jev-harness](https://github.com/AntonioCoppe/jev-harness) - 신뢰도 게이트, 섀도 모드, 레시피, 평가를 제공하며, 같은 행 필터 작업에서 Claude CLI 48.9초 대비 Jev 1.3초를 보고합니다.
- [jev-rerank-bench](https://github.com/anessbelbati/jev-rerank-bench) - 데이터셋 14개에서 Jev를 Cohere Rerank, ZeroEntropy, 챗 기준선과 비교하며, 원본 응답도 포함합니다.
- [jev-search-rerank-eval](https://github.com/zhuyansen/jev-search-rerank-eval) - Jev 리랭크가 임베딩 검색을 이기는가? 채점된 쌍 9,831개를 쓰고 판정 순환성 편향도 측정했습니다.
- [jev-sec-bench](https://github.com/Gaurav-Gosain/jev-sec-bench) - 프롬프트 인젝션과 취약 코드 탐지를 위한 블라인드 벤치마크입니다.
- [jev-phishing-bench](https://github.com/anisselbd/jev-phishing-bench) - 피싱 이메일 2,000건에서 Jev와 Claude Haiku를 비교합니다: 정확도, 보정, 지연 시간, 비용을 다룹니다.
- [jev-spam-eval](https://github.com/bitnovus/jev-spam-eval) - Noul 질문으로 제로샷 스팸 필터링을 수행해 TF-IDF 기준선과 비교합니다.
- [jev-agent-failure-benchmark](https://github.com/TokenTrim/jev-agent-failure-benchmark) - Who and When 에이전트 실패 귀인 벤치마크에서 Jev와 강력한 LLM을 비교합니다.
- [jev-korean-benchmark](https://github.com/mahlernim/jev-korean-benchmark) - 한국어 이해와 의료 텍스트를 다루며, 실행 시간과 비용 근거를 함께 제시합니다.
- [jev-behavior-study](https://github.com/RINNECODER/jev-behavior-study) - jev-1.13.0에서 수행한 통제된 프롬프트 실험이며, 원본 결과와 오프라인 검증을 포함합니다.
- [jev-report](https://github.com/HackSing/jev-report) - 중국어로 작성된 독립 연구 보고서입니다: 52쪽, 재현 가능한 테스트 50개, 추적 가능한 데이터 143행입니다.
- [jev-benchmark](https://github.com/wondertwins/jev-benchmark) - 체스와 포식자 식별이라는 두 벤치마크로, 하나는 Jev의 영역 안에 있고 하나는 밖에 있으며 둘 다 결과가 있습니다.
- [jev-dspy-lab](https://github.com/jmanhype/jev-dspy-lab) - DSPy에서 Jev 결정에 대한 재현 가능한 보정 및 선택적 위험 벤치마크입니다.
- [jev-eval-agent](https://github.com/vinilana/jev-eval-agent) - 목 도구 100개를 갖춘 개인 비서 에이전트로, Jev로 게이트된 에이전트가 몇 단계를 필요로 하는지 측정합니다.
- [jev-synergy-screening](https://github.com/PistachioAIHQ/jev-synergy-screening) - 초록 선별을 위해 Choice와 Noul 질문을 ASReview SYNERGY 골드 라벨에 대해 채점합니다.
- [jev-orderby-bench](https://github.com/yodablocks/jev-orderby-bench) - Jev 확률에 대한 ORDER BY가 정당한지를 측정합니다: 사전 등록된 게이트 아래에서 쌍별 역전, 사람 등급 대비 Score 서수성, 보정, 표현 불변성을 점검하며, 20 Newsgroups 주제에서는 통과하고 Amazon ESCI 상품 관련도에서는 여섯 조건 중 넷을 실패하며, DuckDB 확장을 통한 40행 일괄 상태는 요청당 한 행이 통과하는 순위 게이트를 실패함을 보입니다.
- [cultivar](https://github.com/pinecone-io/cultivar) - Pinecone의 스킬 테스트 CLI이며, LLM 채점기보다 약 30배 저렴하다고 보고하는 Jev 채점 백엔드를 갖췄습니다.
- [jev-eval by 4esv](https://github.com/4esv/jev-eval) - 라벨된 세 가지 과제에서 Jev와 GPT-5.6 Terra를 비교합니다: 쉬운 과제에서는 동등하고, 77지 라우팅에서는 6.7포인트 낮으며, 5배 빠르고 41~50배 저렴합니다.
- [jev-benchmark by themsquared](https://github.com/themsquared/jev-benchmark) - 실행 간 분산을 함께 보고하는 도구 호출 위험 분류이며, 오답은 모두 유보적인 신뢰도를 동반했습니다.
- [jev-research-eval](https://github.com/jgridifier/jev-research-eval) - 고정된 jev-ultrafast 커밋 위에서 동작하는 재현 가능한 하네스이며, 기준선 및 스트레스 스위트를 포함합니다.
- [jev-playground by hegargarcia](https://github.com/hegargarcia/jev-playground) - 명시적 상태, 합법 행동, 측정 가능한 결과를 갖춘 게임에서 Jev를 다른 모델과 비교합니다.

## 플레이그라운드와 데모

- [typesafe-playground by TypeSafeAI](https://github.com/TypeSafeAI/typesafe-playground) - 편집 가능한 프롬프트와 A/B 비교를 갖춘 110개의 사용 사례, 게임, 모델 챌린지이며, 공급사가 아닌 커뮤니티 조직이 운영하고 이전에는 BunsDev 아래에 있었습니다.
- [typesafe-playground by kavehmz](https://github.com/kavehmz/typesafe-playground) - 지원 요청 라우팅부터 센서 입력이 보이는 3D 운전 시뮬레이션까지 다룹니다.
- [jev-experiments](https://github.com/dabit3/jev-experiments) - Nader Dabit이 모은 작은 Jev 실험 꾸러미입니다.
- [TypeSafe Typewriter](https://typesafe-demo.val.run/) - Val Town에서 입력하는 동안 열여섯 개의 타입 지정 판정이 갱신됩니다.
- [Yes / No](https://yesno.coderai.dev) - 질문을 던지면 필요할 때 웹 검색까지 거쳐 예, 아니오, 아마도 중 하나를 받으며, 가입이 필요 없습니다.
- [Jev Pac-Man](https://jev-pacman.ephraimduncan.com) - 미로를 JSON으로 주고, 모든 갈림길에서 Jev가 방향을 고릅니다.
- [Jev Tetris](https://jev-omega.vercel.app) - 구멍, 스택 높이, 울퉁불퉁함을 보고 회전과 열을 고릅니다.
- [Hollow Creek](https://hollow-creek-sigma.vercel.app) - 대화하는 대신 틱마다 플레이어를 판정하는 마을 NPC입니다.
- [Crowdcheck](https://crowdcheck-ai.vercel.app/) - 게시하기 전에 합성 페르소나 10,000개로 게시물을 시험하십시오.
- [Magic-8-Jev](https://github.com/willprout/magic-8-ball) - 질문을 던지면 스무 개의 답변에 대한 선택 한 번으로 답이 정해지고 클릭에서 답변까지의 지연 시간이 표시됩니다. [라이브 데모](https://willprout.github.io/magic-8-ball/).
- [typesafe-ai-playground by markjaquith](https://github.com/markjaquith/typesafe-ai-playground) - Jev 관련 실험을 위한 Rust CLI 플레이그라운드입니다.
- [jev-playground by wustep](https://github.com/wustep/jev-playground) - System One 모델이 타입 지정 분류, 점수화, 선택 결정만으로 음악 작곡을 이끌 수 있는지 살펴봅니다.
- [typesafe-jev-workflow](https://github.com/GiesN/typesafe-jev-workflow) - 모의 이메일을 Jev에 보내고 돌아온 타입 지정 Choice로 라우팅하는 LangGraph 데모입니다.
- [jev-little-airways](https://github.com/lbotinelly/jev-little-airways) - Jev의 역량을 보여 주는 쇼앤텔 연구입니다.
- [jev-demos](https://github.com/bud-ro/jev-demos) - Jev가 무엇을 잘하는지 시험하려고 만든 데모입니다.
- [Jev Classifier](https://jevclassifier.vercel.app) - 게시물을 유형, 품질, 감성, 어조로 분류하는 호스팅 데모입니다.
- [Jev Guard demo](https://guard-jev.vercel.app) - 호스팅되는 댓글 모더레이션 플레이그라운드입니다.
- [Companion](https://jev-demo.vercel.app) - 턴마다 아홉 개의 타입 지정 질문에 답해 실행, 질문, 보류를 결정하는 호스팅 로봇 인터페이스이며, 생성된 텍스트는 없습니다.
- [Jev System One](https://github.com/haseeb-heaven/jev-system-one) - OpenAI가 답하고 Jev가 별도로 관련성, 신뢰성, 품질을 점수화하는 터미널 인터페이스입니다.
- [jev-web-analyzer](https://github.com/replynodes/jev-web-analyzer) - SaaS 랜딩 페이지를 Markdown으로 바꾸고 첫 방문자가 무엇을 이해하는지 Jev에 열 가지 제한된 Choice 질문을 던진 뒤, 창업자 관점의 분석으로 보여줍니다.

## 커맨드 라인

- [jev-axi](https://github.com/shiftynick/jev-axi) - 에이전트와 사람을 위한 셸 동사입니다: pick, rate, check, rank, triage, guard를 제공합니다.
- [semdecide](https://github.com/sharziki/semdecide) - Unix 파이프라인과 CI를 위한 타입 지정 의미 결정입니다.
- [every](https://github.com/sufianetaouil/every) - 코드베이스의 모든 함수에 예/아니오 질문을 던지며, 패턴이 질문인 grep입니다.
- [typesafe-cli](https://github.com/y0usaf/typesafe-cli) - 셸에서 noul, choice, score 답변을 숫자로 받습니다.
- [jev-shell-history](https://github.com/mrnugget/jev-shell-history) - Jev가 순위를 매기는 fish 스타일 zsh 히스토리 제안입니다.
- [jgrep](https://github.com/keltokhy/jgrep) - 평이한 영어 설명에 맞는 줄을 출력하며, 지출 상한 아래에서 `tail -f`로부터 스트리밍하고, SMS 스팸에서 키워드 grep의 0.72 대비 F1 0.91을 보고합니다.
- [jev-cli by jtsang4](https://github.com/jtsang4/jev-cli) - 타입 지정 질문이 들어가고 구조화된 JSON 답변이 나옵니다.
- [jev-cli by tumf](https://github.com/tumf/jev-cli) - Choice, Score, Noul을 감싼 의존성 없는 Python CLI입니다.
- [jevctl](https://github.com/Nasrallah-AL/jev-cli) - 키를 OS 키체인에 두는 npm CLI이며, 셸에서 타입 지정 판정을 받습니다.

## 커뮤니티 클라이언트

- [jev-go](https://github.com/Gaurav-Gosain/jev-go) - 타입 지정 판정과 확률을 돌려주는 Go 클라이언트입니다.
- [typesafe-go](https://github.com/zhirschtritt/typesafe-go) - TypeSafe API를 위한 관용적인 Go SDK입니다.
- [typesafe-ai](https://github.com/Twister915/typesafe-ai) - 비동기 및 블로킹 백엔드와 관찰 가능한 재시도를 갖춘 Rust 클라이언트입니다.
- [typesafe-ai-rs](https://github.com/gilljon/typesafe-ai-rs) - 독립적으로 만든 비동기 및 블로킹 Rust SDK입니다.
- [jev](https://github.com/dannote/jev) - OTP를 염두에 두고 만든 Elixir 클라이언트입니다: GenServer에서 Jev에 응답하고 답변을 패턴 매칭합니다.
- [typesafe-sdk](https://github.com/joshmn/typesafe-sdk) - Ruby 클라이언트입니다.
- [ruby_llm-typesafe](https://github.com/kieranklaassen/ruby_llm-typesafe) - RubyLLM 2의 구조화 출력 제공자로 쓰는 TypeSafe입니다.
- [laravel-typesafe-jev](https://github.com/Butochnikov/laravel-typesafe-jev) - 타입 지정 응답, 비동기 요청, 테스트용 페이크를 갖춘 Laravel 통합입니다.
- [typesafe-sdk-java](https://github.com/Premo-Cloud/typesafe-sdk-java) - Java 클라이언트입니다.
- [typesafe-sdk-swift](https://github.com/alterhq/typesafe-sdk-swift) - Swift 클라이언트입니다.
- [TypeSafeAI.Net](https://github.com/Hawxy/TypeSafeAI.Net) - .NET SDK입니다.
- [zio-typesafe-ai](https://github.com/jamesward/zio-typesafe-ai) - ZIO 기반 Scala 클라이언트입니다.
- [jev-dsl](https://github.com/inanna-malick/jev-dsl) - 타입 지정 패킷과 추론된 답변 타입을 갖춘 Haskell DSL입니다.
- [advocaat](https://github.com/pithings/advocaat) - 자신의 데이터에 질문을 던지기 위한 작은 TypeScript 클라이언트입니다.
- [jod](https://github.com/mateonunez/jod) - Jev 위에 올린 Zod 스타일 스키마입니다: 상태를 로컬에서 검증한 뒤 타입 지정 답변을 투영합니다.
- [n8n-nodes-typesafe-ai](https://github.com/DomMonte/n8n-nodes-typesafe-ai) - 예/아니오, choice, score 질문을 위한 n8n 커뮤니티 노드입니다.
- [jevclient](https://github.com/AboveColin/jevclient) - 비동기 Python 클라이언트이며, 확률과 선택이 나오고 파싱할 산문은 없습니다.
- [s1-rs](https://github.com/AbdelStark/s1-rs) - Rust 열거형과 구조체를 Choice, Score, Noul 질문으로 바꾸고, 컴파일 타임에 검사되며 신뢰도로 게이트된 답변을 제공합니다.
- [typesafe-rs](https://github.com/AbdelStark/typesafe-rs) - 지연 시간을 우선하는 Rust 클라이언트이며, crates.io에 있습니다.
- [kunobi-jev](https://github.com/kunobi-ninja/kunobi-jev) - System One API를 위한 Rust 클라이언트입니다.
- [jev-go by Stumble](https://github.com/Stumble/jev-go) - Jev용 Go 클라이언트입니다.
- [typesafe-ai-rails](https://github.com/GenieRobot/typesafe-ai-rails) - 커뮤니티 Ruby gem 위에 만든 Rails 통합입니다.
- [typesafe_sdk by nshkrdotcom](https://github.com/nshkrdotcom/typesafe_sdk) - TypeSafe 제공자를 포함한 TypeScript AI SDK의 Elixir 이식판입니다.
- [ruby_decision_model](https://github.com/obie/ruby_decision_model) - OpenRouter와 TypeSafe 제공자를 하나의 인터페이스 뒤에 두는 결정 모델용 Ruby 클라이언트이며, 표준 라이브러리만 씁니다.
- [zod-jev](https://github.com/jomatsu/zod-jev) - 의미 규칙을 더한 Zod 4 스키마입니다: 형태 검사는 Zod에 남고, 의미 검사는 한 요청으로 Jev에 가서 Zod issue로 돌아옵니다.
- [typesafeai-dotnet-sdk](https://github.com/saibimajdi/typesafeai-dotnet-sdk) - 타입 지정 Noul, Choice, Score 질문을 갖춘 커뮤니티 .NET SDK입니다.
- [typesafe-sdk-go by Tangerg](https://github.com/Tangerg/typesafe-sdk-go) - 서드파티 의존성이 없는 Go SDK입니다.
- [swift-typesafe](https://github.com/ainame/swift-typesafe) - Python SDK의 API를 따르는 Swift 6.4 SDK이며, Apple 플랫폼과 Linux에서 동작합니다.
- [typesafe-sdk-php](https://github.com/Butochnikov/typesafe-sdk-php) - 동기 호출, Guzzle 프로미스, PSR-3 로깅을 갖춘 PHP 클라이언트입니다.

## 글과 발표

### 출시 보도

- [Introducing System One Models and Jev](https://typesafe.ai/blog/introducing-system-one-models-and-jev) - 출시 게시물입니다: 아키텍처, RLCD, 벤치마크, 가격, FAQ를 다룹니다.
- [Launch thread by Diogo Almeida](https://x.com/CompleteSkeptic/status/2099925682726002904) - RLCD로 학습한 결정 모델이 챗보다 가치에 이르는 지름길이라는 창업자의 주장입니다.
- [Hacker News launch thread](https://news.ycombinator.com/item?id=49717558) - 벤치마크를 회의적으로 읽는 시각이 모인 곳입니다.
- [The Register](https://www.theregister.com/ai-and-ml/2026/09/16/typesafe-ai-debuts-model-for-machines-that-plays-doom/5296711) - 출시 보도와 Doom 데모, $40M 시드 라운드를 다룹니다.
- [Latent Space](https://www.latent.space/p/ainews-jev-a-system-one-model-that) - 출시 당일 정리 기사입니다.
- [TypeSafe AI emerges from stealth with $40M](https://finance.yahoo.com/technology/ai/articles/typesafe-ai-emerges-stealth-40m-190000776.html) - 투자 유치 발표입니다.
- [The Rundown](https://www.therundown.ai/news/typesafe-jev-ai-decisions-software) - 짧은 출시 요약입니다.
- [DataCamp](https://www.datacamp.com/blog/system-one-models-jev) - 프리미티브와 가격, 공급사 평가를 설명한 제삼자 해설입니다.
- [How does Jev work? RLCD and parallel inference](https://www.explainx.ai/blog/how-does-jev-work-rlcd-system-one-model-explained-2026) - 학습 방법에 관해 공개된 내용입니다.
- [TypeSafe Jev: the first decision-only model class](https://www.developersdigest.tech/blog/typesafe-jev-system-one-models-release-guide-2026) - 출시 주간 기술 정리입니다: API, 평가, 어댑터, 스킬을 다룹니다.
- [TechCrunch](https://techcrunch.com/2026/09/18/a-new-kind-of-ai-model-from-a-chatgpt-inventor-is-thrilling-developers/) - 출시 이틀째의 기록입니다: 수요로 API가 잠시 내려갔고, Almeida는 프런티어 랩이 되고 싶지 않다고 말합니다.
- [Forkast](https://forkast.news/typesafe-ais-jev-is-not-an-llm-and-that-may-be-the-point/) - 보도된 기업 가치와 Every의 속도 및 비용 수치를 담은 비즈니스 관점의 기사입니다.
### 독립 측정

- [Testing Jev on public and private data](https://amankumar.ai/blogs/jev-measured) - GPT 모델 두 개를 상대로 한 16,000건의 호출입니다: 어디서 이기고 어디서 무너지는지, 그리고 임계값 설정 절차를 다룹니다.
- [One judge call, or twelve dimension scores?](https://agentjournal.dev/blog/llm-judge-vs-feature-extraction/) - 분류 과제 세 개에서 직접 질문 하나와 가중치를 맞춘 열두 개 점수 차원을 비교합니다.
- [Jev vs Mistral and Gemini for event validation](https://nearhere.events/blog/typesafe-jev-mistral-gemini-event-validation) - 지역 행사 목록으로 맞대결하며, 비용과 지연 시간을 함께 다룹니다.
- [Mini-Vibe Check](https://every.to/also-true-for-humans/mini-vibe-check-typesafe-s-jev-judged-everything-i-ve-written-in-0-7-seconds) - Every가 글 아카이브에 1,709건의 판정을 1센트 미만으로 돌립니다.
- [TypeSafe Jev played chess](https://dev.to/maximsaplin/typesafe-jev-played-chess-and-landed-next-to-reasoning-models-28ga) - 합법 수 Choice만으로 추론 모델에 견줄 성적을 냅니다.
- [Jev, Sorted](https://pearpages.com/blog/2026/09/16/jev-sorted-what-typesafes-system-one-model-actually-is-and-what-is-still-just-a-claim) - 1차 자료를 읽었을 때 어떤 출시 주장이 살아남는지 따집니다.
- [Typed decisions, not chat](https://warmersun.com/jev/) - 공표된 주장과 공개 증거가 입증하는 바를 구분합니다.
- [TypeSafeのJevを正しく驚く](https://zenn.dev/nwn/articles/824026c76116e0) - 일본어 글이며, Gemma에서 로짓 지름길을 재현하고 Mario 하네스에서 LLM과 비교합니다.
- [TypeSafe Jev vs Claude Code: 4 models, 2 real jobs](https://primeline.cc/blog/typesafe-jev-pre-registered-test) - 약 9,750건 호출에 대한 사전 등록 테스트입니다: 질문 유형별 보정 오차를 보고, Jev는 커밋 분류에서 앞서고 지식 베이스 분류에서 뒤지며, 기권이 그 격차를 메웁니다.
- [Jev, three days in](https://aiwithmike.substack.com/p/jev-three-days-in-what-is-known-what) - 무엇이 알려졌고 무엇이 추측이며 어디에 쓸모가 있는지를 독립적인 수치와 함께 정리합니다.
### 에세이와 스레드

- [Building a harness with Jev](https://www.langchain.com/blog/building-a-harness-with-jev) - 모델 라우팅과 위험한 도구 호출을 타입 지정 결정 뒤에 게이트하는 방법에 관한 LangChain의 글입니다.
- [Jev, from a developer's angle](https://flaviocopes.com/jev/) - 분류, RAG 필터링, 인용 검사, 신뢰도 게이트를 코드와 함께 다룹니다.
- [Jev is the fish at the poker table](https://backnotprop.com/blog/jev-poker/) - 보정되어 있고 생성하지 않는 모델이 무엇에 쓰이는지에 관한 에세이입니다.
- [Jev as a command safety reviewer](https://x.com/rauchg/status/2100307962262872105) - 모든 fx 명령을 Jev가 검토하는 것에 관한 Guillermo Rauch의 글입니다.
- [Jev Typewriter](https://x.com/stevekrouse/status/2100287368221659289) - Steve Krouse의 열여섯 판정 데모와 영상입니다.
- [He says he co-invented ChatGPT. His new AI will not write a word](https://dev.to/gabrielanhaia/he-says-he-co-invented-chatgpt-his-new-ai-jev-wont-write-a-word-e3c) - Vercel AI SDK 통합을 단계별로 따라가는 설명입니다.
- [Testing Jev for Pi extensions](https://reddit.com/r/PiCodingAgent/comments/1whsav6/anyone_else_testing_out_typesafe_ais_new_system/) - Jev를 도구 사용 안전 계층으로 쓰는 빌더들의 이야기입니다.
- [jev 同士に五目並べで対戦させた](https://zenn.dev/mizchi/articles/jev-plays-gomoku) - 일본어 글이며, 오목에서 Jev끼리 맞붙이고 소스와 시간 로그를 함께 실었습니다.
- [Jev's Architecture Unmasked](https://archerhume.com/posts/jevs-architecture-unmasked/) - 공유 상태와 병렬 분기 아키텍처를 재구성한 10,000건 호출 탐침이며, 위의 kev가 여기서 만들어졌습니다.
- [OpenJev on Hacker News](https://news.ycombinator.com/item?id=49752041) - 로짓을 직접 읽는 것이 과연 새로운지를 길게 논쟁합니다.
- [Open-sourced Jev architecture last year](https://news.ycombinator.com/item?id=49736660) - 비자기회귀 타입 지정 결정에 대한 선행 기술 주장과, 실제 차이는 제로샷 일반성이라는 반박입니다.
