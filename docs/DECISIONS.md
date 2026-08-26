# Decisions

이 문서는 프로젝트 방향에 영향을 주는 주요 결정과 그 이유를 기록한다.
세부 작업 로그나 TODO는 기록하지 않는다.

## D-001 — 2026-08-19 — 개인 이름을 상위 브랜드로 사용

### Decision

사이트의 상위 브랜드를 특정 직무명, `아육대`, 개별 프로젝트명이 아니라 **이병관 개인**으로 둔다.

### Reason

사이트를 현재 직무에 한정하지 않고 경력, 프로젝트, 생각, 삶의 변화를 장기간 축적하는 개인 본진으로 운영하기 위함이다.

---

## D-002 — 2026-08-19 — 육아는 Writing 내부의 주제/연재로 운영

### Decision

`아빠들의 육아 대화`는 독립 웹사이트나 최상위 메뉴로 분리하지 않고 `Writing` 안의 연재/주제로 운영한다.

### Reason

육아는 현재 삶에서 중요한 주제지만 개인 전체 정체성을 대체하지 않는다. 일, 시스템, 삶 등 다른 관심과 함께 한 사람의 기록 안에서 축적하는 편이 장기 목적에 맞는다.

---

## D-003 — 2026-08-19 — 사이트를 먼저 구축한 뒤 콘텐츠 제작

### Decision

프로젝트 실행 순서를 Strategy → 사이트 설계/구축 → 실제 콘텐츠 제작 방향으로 진행한다.

세부 공정은 다음과 같다.

1. Strategy
2. IA
3. Wireframe
4. Build Spec
5. Implementation
6. Content
7. Operation

### Reason

사용자는 먼저 실제 출판 환경을 마련한 뒤 그 공간을 사용하며 콘텐츠를 축적하는 방식을 선호한다. 문제는 사이트를 먼저 만드는 것 자체가 아니라 개발 범위를 통제하지 못하는 것이므로 단계별 승인과 범위 제한으로 관리한다.

---

## D-004 — 2026-08-19 — Wireframe 승인 공정 추가

### Decision

IA와 Build Spec 사이에 별도의 **Wireframe** 단계를 둔다.

### Reason

IA만으로는 실제 화면의 정보 위계, 레이아웃, 섹션 순서, 콘텐츠 밀도와 모바일 변화에 해석 여지가 남는다. 사용자가 직접 화면을 보고 승인한 뒤 AI 구현 agent에게 전달함으로써 UI 설계 결정을 구현 agent에게 떠넘기지 않기 위함이다.

Wireframe은 시각적 구현 계약으로 취급한다.

---

## D-005 — 2026-08-19 — Wireframe 도구는 Figma Starter

### Decision

Wireframe 정본 도구는 **Figma Starter 무료 플랜 ($0)**으로 사용한다.

### Reason

- 현재 프로젝트 규모에서 무료 플랜으로 충분하다.
- 추가 월 구독비가 필요하지 않다.
- 디자인 이후 개발 handoff와 AI agent workflow 연계가 유리하다.
- Balsamiq은 이번 용도만으로 별도 유료 구독을 추가할 필요성이 낮다.
- Penpot도 무료 대안이지만 현재 생태계 연계 측면에서 Figma를 우선한다.

유료 Figma 플랜은 무료 제약이 실제 작업을 방해할 때만 재검토한다.

### Superseded by

D-012. 실제 사용 중 Figma Starter의 MCP 호출량이 AI 반복 작업에 제약이 되는 것이 확인되어, Figma는 보조 시각 자료로 역할을 변경했다.

---

## D-006 — 2026-08-19 — 별도 고충실도 디자인 단계는 기본 공정에서 제외

### Decision

현재 기본 공정은 IA → Low/Mid-fi Wireframe → Build Spec → Implementation으로 운영하며 별도 High-fidelity UI Design 단계를 두지 않는다.

### Reason

개인 웹사이트의 핵심 가치는 콘텐츠와 정보 구조에 있으며, Figma 디자인 자체가 또 하나의 프로젝트로 확대되는 것을 방지한다. 최종 타이포그래피와 시각적 polish는 실제 브라우저 구현 과정에서 조정한다.

---

## D-007 — 2026-08-19 — GitHub 저장소를 프로젝트 정본으로 사용

### Decision

`lbk0523/personalpage` 저장소를 프로젝트의 source of truth로 사용한다.

### Reason

작업 환경, 채팅 세션, AI agent가 달라져도 승인된 전략과 설계, 현재 작업 단계를 동일하게 인계하기 위함이다.

대화 기록이나 agent의 기억보다 저장소의 승인 문서를 우선한다.

---

## D-008 — 2026-08-19 — Cold Start에서는 현재 콘텐츠만큼만 노출

### Decision

IA는 향후 확장을 지원하되, 실제 UI는 현재 존재하는 콘텐츠 양과 탐색 가치만큼만 노출한다.

초기 Home에서는 `Selected Writing`을 숨기고, Writing에서도 Featured/Topic/Series 탐색 UI를 만들지 않는다. Topic/Series는 metadata로만 지원하다가 콘텐츠가 충분히 쌓였을 때 화면을 활성화한다.

### Reason

콘텐츠가 적은 상태에서 빈 섹션과 과도한 분류 구조를 먼저 보여주면 사이트가 오히려 빈약해 보이고 관리 복잡도만 늘어난다.

---

## D-009 — 2026-08-19 — 사용자-facing 문구는 Wireframe에서 국내 레퍼런스를 보고 결정

### Decision

IA와 개발 문서에서는 `Work`, `Writing`, `Now`, `About` 등 영어 식별자를 사용할 수 있지만, 실제 웹페이지는 한국어 사용자 중심으로 설계한다.

실제 내비게이션 라벨, 섹션명, 카피는 IA에서 직역해 확정하지 않고 Wireframe 단계에서 한국인이 운영하는 개인 웹사이트 레퍼런스를 조사한 뒤 결정한다.

### Reason

개발 편의를 위한 내부 식별자와 실제 사용자 경험의 언어는 분리해야 하며, 번역투 표현보다 한국 사용자가 자연스럽게 받아들이는 정보 구조와 카피를 실제 화면 맥락에서 판단하는 편이 낫다.

---

## D-010 — 2026-08-20 — Home은 개인 디렉터리를 중심으로 설계

### Decision

Home의 기본 성격은 커리어 포트폴리오 요약이 아니라 **이병관이라는 사람의 여러 영역으로 들어가는 첫 관문**으로 둔다.

Wireframe 방향은 `Personal Directory`를 중심으로 하고, 현재 상태가 느껴지도록 `Personal Stream`의 성격을 소량 섞는다.

Home에서 대표 프로젝트, 경력 타임라인, 성과 증명 등을 전면에 두지 않는다. Work, Writing, Now, About으로 이어지는 각 영역을 사람의 언어로 소개하고, 현재 하고 있거나 관심을 두는 것을 가볍게 보여주는 정도로 제한한다.

현재 Figma의 `HOME D — Personal Directory + Light Stream` 방향을 구조적 기준으로 사용한다.

### Deferred

아래 항목은 Wireframe 구조 승인과 분리하여 이후 디자인 정제 과정에서 결정한다.

- 실제 사용자-facing 한국어 문구
- 내비게이션 라벨
- 타이포그래피
- 색상과 시각 스타일
- 세부 여백과 배치
- 각 영역의 최종 표현 방식

### Reason

사이트의 목적은 특정 직무를 증명하는 커리어 포트폴리오에 한정되지 않는다. 방문자가 첫 화면에서 이병관이라는 사람의 일, 생각, 현재 관심, 삶의 여러 면을 인지하고 원하는 방향으로 들어갈 수 있어야 장기간 운영할 개인 웹사이트의 목적에 부합한다.

---

## D-011 — 2026-08-20 — Work는 포트폴리오 전시장보다 경력 서사로 구성

### Decision

Work의 기본 성격을 프로젝트 카드와 성과 중심의 포트폴리오 페이지가 아니라 **어떤 일을 거쳐 현재의 역할에 이르렀는지를 설명하는 career narrative**로 둔다.

기본 흐름은 다음과 같다.

1. 현재 하는 일에 대한 짧은 소개
2. Career Timeline
3. 어떻게 여기까지 왔는지에 대한 경력 서사
4. 공개할 가치가 있는 일부 작업과 개인 프로젝트 연결
5. 일을 통해 형성된 관점과 학습

프로젝트는 Work 페이지의 주인공이 아니라 경력 서사를 뒷받침하는 증거로 배치한다.

`/work/[slug]` 상세 경로는 유지하되, 실제 화면은 전형적인 Case Study 템플릿보다 **프로젝트에 대한 긴 이야기**에 가깝게 구성한다. 내부적으로 상황·역할·문제·판단·실행·결과·회고 정보를 관리할 수 있으나, 사용자-facing UI에서 이를 기계적인 섹션명으로 강제하지 않는다.

### Reason

개인 웹사이트 전체가 취업용 포트폴리오처럼 보이는 것을 막으면서도, 필요한 방문자에게는 경력과 전문성을 충분히 설명할 수 있어야 한다. Work를 개인적인 경력 이야기로 만들면 Home의 개인 디렉터리 성격, Writing의 기록 성격, Now의 현재성, About의 인간적인 소개와도 자연스럽게 연결된다.

---

## D-012 — 2026-08-20 — Wireframe 반복 검토 기준을 GitHub HTML/CSS prototype으로 전환

### Decision

Wireframe의 반복 제작·수정·responsive 검토 기준을 `design/wireframe/`의 정적 HTML/CSS prototype으로 전환한다.

Figma는 초기 방향 탐색과 시각적 참고/승인 기록을 보존하는 보조 도구로 유지하지만, Figma MCP를 프로젝트 진행의 필수 의존성으로 두지 않는다.

HTML/CSS prototype은 제품 코드가 아니라 구조 검토용 산출물이며, 실제 구현에서는 승인된 Wireframe과 Build Spec을 기준으로 별도 구현한다.

### Reason

실제 작업 중 Figma Starter의 MCP 호출량이 AI agent가 반복적으로 화면을 읽고 수정하는 workflow에 제약이 되는 것이 확인되었다.

프로젝트의 원래 목적은 특정 디자인 도구를 사용하는 것이 아니라 **사용자와 AI agent가 동일한 화면을 보고 합의하고, 작업 환경이 달라져도 승인된 구조를 인계하는 것**이다.

GitHub에 HTML/CSS prototype을 보존하면 다음 장점이 있다.

- 추가 월 구독비 없이 반복 수정 가능
- Figma MCP 한도와 무관
- 어느 AI agent든 repo만 읽고 화면 구조를 재현 가능
- 실제 브라우저 폭에서 responsive 구조 확인 가능
- 프로젝트 source of truth를 GitHub에 둔다는 D-007과 일치

Figma 유료 플랜은 Figma 자체가 여러 프로젝트의 상시 디자인 작업 도구가 되는 등 별도 필요성이 확인될 때만 재검토한다.

---

## D-013 — 2026-08-21 — Work Career Timeline은 디자인 refinement 대상으로 관리

### Decision

Work의 `걸어온 길` Career Timeline은 Wireframe에서 확정한 정보 구조와 시간 순서를 유지하되, 최종 웹디자인에서는 단순한 `연도 + 텍스트` 목록보다 **경력의 흐름과 역할 전환이 시각적으로 느껴지는 표현**을 탐색한다.

이 요구사항은 Wireframe 구조 변경이 아니라 디자인 refinement 항목으로 관리한다.

### Design constraints

- 지나치게 경력기술서나 이력서 표처럼 딱딱해 보이지 않아야 한다.
- 경력의 시간 흐름과 역할의 변화가 시각적으로 인지되어야 한다.
- 과도하게 화려한 인포그래픽이나 장식 중심 표현은 피한다.
- Home과 Writing 등 사이트 전체의 개인적·editorial 성격과 연결되어야 한다.
- Desktop과 Mobile에서 각각 자연스러운 형태로 동작해야 한다.

### Reason

모바일 Wireframe 검토에서 Work의 전체 구조에는 이견이 없었지만 `걸어온 길` 영역이 다른 페이지에 비해 지나치게 딱딱하게 느껴진다는 피드백이 있었다. 구조를 다시 설계할 문제는 아니며, 이후 실제 웹디자인에서 시각적 표현을 보완하는 것이 적절하다.

---

## D-014 — 2026-08-23 — SEED 기반 foundation을 먼저 정리한 뒤 고유한 디자인 엣지를 탐색

### Decision

사이트의 평면적인 인상을 개별 장식으로 보완하기 전에, 당근이 공개한 SEED Design의 foundation 원칙을 참고해 색상 역할, 타이포그래피 위계, 간격, surface, stroke, radius, state를 먼저 시스템화한다.

SEED 패키지나 React 컴포넌트는 설치하지 않는다. 당근 브랜드 색상과 제품 UI를 복제하지 않고 Astro + plain CSS 안에서 프로젝트 소유의 로컬 디자인 토큰으로 재해석한다.

Foundation의 responsive 및 visual QA가 끝난 뒤에만 개인 accent, signature graphic, surface 질감처럼 이 사이트만의 디자인 엣지를 별도 후보로 비교한다.

### Constraints

- 승인된 IA, Wireframe, 정보 위계, 콘텐츠 순서를 바꾸지 않는다.
- Work Career Map의 현재 visual direction을 전면 재설계하지 않는다.
- 모든 섹션을 카드화하거나 그림자를 장식처럼 반복하지 않는다.
- Foundation 단계에서 신규 프레임워크나 UI dependency를 추가하지 않는다.

### Reason

현재의 평면적인 인상은 장식 부족보다 여러 화면이 같은 배경, 같은 선, 제각각인 간격을 공유하는 데서 온다. 공통 문법을 먼저 만들면 시각 위계를 일관되게 보완할 수 있고, 이후 고유한 표현을 추가해도 일회성 스타일이 아니라 유지 가능한 시스템 안에서 운영할 수 있다.

---

## D-015 — 2026-08-24 — 따뜻한 editorial 방향과 절제된 ink blue를 디자인 엣지로 사용

### Decision

SEED에서 참고한 토큰 구조 위에 다음 시각 방향을 적용한다.

- warm neutral canvas와 종이에 가까운 밝은 surface
- 한글과 영문에 self-hosted `Wanted Sans Variable` 한 family
- Home 이름과 Work 대표 제목만 크게 쓰는 display hierarchy
- 큰 표면은 0–2px radius, 원형은 Career Map station처럼 의미가 있는 도형에만 허용
- 데스크톱 목록/index는 개별 카드가 아닌 하나의 grouped paper surface
- 모바일 grouped surface는 viewport 폭으로 펴고 shadow 제거
- 큰 섹션은 dark ink line, 내부 항목은 pale hairline
- muted ink blue를 링크, active state, index marker, Work의 3단계 blue graphic에 사용
- active nav는 weight + thin underline, body link는 underline
- hover/focus는 120–160ms 색 변화와 최대 2px arrow movement
- grain, texture, 장식적인 둥근 카드, 과한 elevation은 사용하지 않음

Work의 Career Map 구조와 visual grammar는 유지하며 blue scale만 정돈한다. Career Map의 route 문법을 다른 페이지의 장식으로 확장하지 않는다.

### Reason

사용자는 전체 페이지가 한 font family를 유지하는 편이 안정적이라고 판단했고, AI 제작물에서 자주 보이는 과도한 곡률과 카드화를 피하고 싶다고 명확히 밝혔다. 따뜻한 editorial 바탕은 개인 홈페이지의 읽기 성격을 살리고, 절제된 blue는 사용자가 선호하는 색이면서 링크와 상태의 신뢰감 있는 기준점이 된다.

이 결정은 정보 구조나 기능 범위를 바꾸지 않고, foundation 안에서 위계와 간격, 표면의 깊이를 일관되게 만드는 refinement다.

---

## D-016 — 2026-08-24 — fixture를 제외한 상태로 Cloudflare Pages production 공개

### Decision

`lbk0523/personalpage`의 Astro v1 구현을 Cloudflare Pages project `byungklee`에 GitHub integration으로 연결하고 `https://byungklee.pages.dev`를 canonical production URL로 사용한다.

Production 운영 범위는 다음과 같다.

- production branch는 `main`
- build command는 `npm run build`
- build output directory는 `dist`
- Node version은 `24.19.0`
- `SITE_URL`은 `https://byungklee.pages.dev`
- non-production branch의 자동 preview 배포는 비활성화
- 구조 검증용 Work/Writing fixture 두 개는 `draft: true`로 유지하여 public 목록, 상세 경로, RSS, sitemap에서 제외
- 실제 공개용 Work/Writing 원고는 Content 단계에서 사용자 검토 후 게시

### Reason

사이트 구현과 배포 환경을 먼저 마련한 뒤 실제 콘텐츠를 축적한다는 D-003의 실행 순서를 따르면서도, fixture를 실제 개인 원고처럼 공개하지 않기 위함이다. production URL과 Git 연동을 먼저 안정화하면 이후 Content 단계에서 승인된 원고를 저장소에 반영하는 것만으로 일관된 배포 절차를 사용할 수 있다.

---

## D-017 — 2026-08-25 — 사이트를 Writing 중심의 공개 정본으로 전환

### Decision

사이트의 초기 공개 정체성을 개인 종합 홈페이지에서 **이병관이 쓴 공개 글의 정본이자 아카이브**로 변경한다.

초기 공개 화면은 다음으로 제한한다.

```text
Home / Writing Archive
Writing Detail
RSS
404
```

Work, Work Detail, Now, 별도 About은 public route에서 제외한다. 관련 원고와 구현 이력은 삭제 대상으로 간주하지 않으며, 실제 필요가 확인될 때 별도 전략·IA 변경을 거쳐 재검토한다.

웹사이트와 외부 채널의 역할은 다음처럼 분리한다.

```text
Private Draft
  → Public Canonical Writing on Website
  → Distribution and Conversation on External Channels
```

웹사이트는 원문, 독립된 공개 주소, 장기 축적과 이식성을 담당한다. X 등 외부 채널은 글을 발견하게 하고 반응을 주고받는 배포·대화 수단으로 사용할 수 있지만 글의 유일한 보관 장소로 두지 않는다.

### Reason

장기 보관만 필요하다면 로컬 파일로 충분하고, 즉각적인 배포와 대화만 필요하다면 X 같은 외부 채널만으로도 가능하다. 독립 웹사이트의 근거는 **지속성과 공유성을 함께 제공하는 공개 정본**에 있다.

기존 사이트는 Home에서 Work, Writing, Now, About을 동등한 개인 디렉터리로 보여주고 Work를 첫 진입점으로 두어, 글을 공개하고 축적하려는 출발점보다 포트폴리오 인상을 강하게 만들었다. 글 자체를 첫 경험으로 바꾸어 사이트의 운영 동기와 공개 목적을 일치시킨다.

### Supersedes

- D-008의 `Home Selected Writing 숨김` 결정
- D-010의 `Personal Directory + Light Stream` Home 구조
- D-011의 Work public page 방향
- D-013의 Work Career Timeline 공개 디자인 요구
- D-016의 기존 public route 범위

D-001의 개인 이름 상위 브랜드, D-002의 육아 콘텐츠 Writing 내부 운영, D-014와 D-015의 공통 디자인 foundation은 새 공개 범위 안에서 유지한다.

---

## D-018 — 2026-08-25 — Writing 중심 revision을 production에 배포

### Decision

사용자 승인에 따라 D-017의 Writing 중심 구현을 `main`에 push하고 Cloudflare Pages project `byungklee`의 production에 배포한다.

- canonical URL은 `https://byungklee.pages.dev`
- Home, Writing Detail, RSS, 404만 public 구조로 유지
- Work, Now, About, 별도 Writing index는 build output에서 제외
- 구조 검증용 Writing fixture는 `draft: true`를 유지하여 Home, 상세 route, RSS, sitemap에서 제외
- Cloudflare의 삭제 자산 cache가 제거 경로를 다시 제공하지 않도록 legacy 경로에 `no-store` header를 적용

### Reason

승인된 전략과 구현을 실제 공개 사이트의 기본 구조로 전환하기 위함이다. 첫 실제 Writing은 아직 없으므로 이번 배포는 공개 글을 임의 생성하거나 fixture를 공개하지 않고, 장기적으로 글을 쌓을 수 있는 정본 구조만 먼저 연다.

---

## D-019 — 2026-08-26 — Home Writing Archive에 절제된 서랍장 문법을 적용

### Decision

Home의 `생각 서랍장`이라는 이름을 시각 구조에도 반영한다.

- Writing 목록 전체를 하나의 넓은 cabinet frame으로 묶는다.
- 각 Writing entry는 날짜, 제목, 짧은 선형 handle로 구성된 drawer front로 표현한다.
- drawer 전체를 글 상세로 이동하는 하나의 링크로 사용한다.
- `쓴 글` section heading은 제거하여 `생각 서랍장`에서 drawer archive로 바로 이어지게 한다.
- 데스크톱 hover와 keyboard focus에서 drawer는 오른쪽으로 최대 2px 이동하고 작은 shadow가 생긴다. 모바일에서는 이동시키지 않는다.
- 나무 질감, grain, 실제 가구 이미지, 과도한 입체감은 사용하지 않는다.
- Writing Detail은 기존의 읽기 중심 layout을 유지한다.

### Reason

사이트가 포트폴리오가 아닌 개인 Writing archive라는 정체성을 더 분명하게 드러내면서도, 글보다 장식이 먼저 보이지 않게 하기 위함이다. 여러 시각안 중 기존 warm editorial foundation을 가장 많이 보존하는 넓은 서랍장 방향을 사용자가 승인했다.

이 결정은 D-015의 grouped paper surface 규칙에 대한 Home Writing Archive 한정 예외이며, D-017의 공개 범위와 읽기 우선 원칙은 변경하지 않는다.

---

## D-020 — 2026-08-26 — Home 서랍장 디자인을 production에 배포

### Decision

사용자 승인에 따라 D-019의 넓은 서랍장 방향을 반영한 Home 구현을 `main`에 push하고 Cloudflare Pages project `byungklee`의 production에 배포한다.

- Writing 목록 전체는 cabinet frame, 각 공개 글은 drawer front로 제공한다.
- 현재 공개 글과 Writing Detail, RSS, 404의 범위는 변경하지 않는다.
- canonical production URL은 `https://byungklee.pages.dev`를 유지한다.

### Reason

독립 prototype에서 비교한 세 방향 중 기존 warm editorial foundation과 읽기 우선 원칙을 가장 많이 보존하는 A안을 사용자가 선택하고 실제 구현 및 반응형 검증 결과를 승인했기 때문이다.
