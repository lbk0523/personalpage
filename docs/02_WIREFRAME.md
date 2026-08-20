# Personal Page — Wireframe

Status: REVIEW CANDIDATE
Last Updated: 2026-08-20

## Purpose

IA에서 확정한 페이지 구조를 실제 화면 흐름으로 검증하고, 사용자와 AI agent가 같은 화면을 기준으로 구현을 논의하기 위한 시각적 계약 단계다.

## Canonical Review Prototype

GitHub:

```text
design/wireframe/
```

로컬 실행:

```bash
python3 -m http.server 8080
```

브라우저:

```text
http://localhost:8080/design/wireframe/
```

현재 반복 수정과 구조 검토의 기준은 GitHub의 HTML/CSS prototype이다.

## Figma Reference

Exploration file:

https://www.figma.com/design/KGrf7u7VUH9rGkHXc5f2I0

Figma에는 초기 구조 탐색과 Home/Work 방향 검토의 기록을 보존한다.
Starter plan의 MCP 호출량 제약 때문에 이후 반복 작업의 필수 의존성으로 사용하지 않는다.

## Screen Inventory

### Desktop / responsive source

1. Home — `design/wireframe/index.html`
2. Work — `design/wireframe/work.html`
3. Work Detail — `design/wireframe/work-detail.html`
4. Writing — `design/wireframe/writing.html`
5. Writing Detail — `design/wireframe/writing-detail.html`
6. Now — `design/wireframe/now.html`
7. About — `design/wireframe/about.html`

### Mobile priority review

Responsive CSS로 별도 구현한다.

1. Home
2. Work
3. Writing
4. Writing Detail

Breakpoint candidate:

```text
max-width: 720px
```

정확한 breakpoint 값은 Build Spec 또는 실제 구현 단계에서 조정할 수 있다. 구조적 동작이 우선이다.

## Structural Direction

### Home — Personal Directory + Light Stream

Home은 커리어 포트폴리오 요약이 아니라 **이병관이라는 사람으로 들어가는 첫 관문**이다.

- 일하고 만든 것
- 생각하고 기록한 것
- 요즘의 나
- 조금 더 나에 대해

위 영역으로 진입할 수 있는 개인 디렉터리를 중심으로 하고, 현재성이 느껴지는 작은 상태 영역을 함께 둔다.

Home에 대표 프로젝트, Career Timeline, 성과 증명을 전면 배치하지 않는다.

### Work — Career Narrative

Work는 프로젝트 전시장이 아니라 **어떤 일을 거쳐 지금의 역할에 왔는지를 설명하는 경력 이야기**다.

기본 흐름:

1. 현재 하는 일
2. Career Timeline
3. 어떻게 여기까지 왔나
4. 해온 일과 만든 것
5. 일하며 배운 것

프로젝트는 경력 서사를 보조하는 증거이며 필요할 때 Work Detail로 연결한다.

### Work Detail — Project Story

전형적인 Case Study UI를 피하고 한 프로젝트에 대한 긴 이야기로 구성한다.

기본 흐름:

1. 프로젝트 소개
2. 시작
3. 무엇을 고민했나
4. 어떤 판단을 했나
5. 그 뒤에
6. 돌아보면

내부 데이터 모델에서는 context / role / problem / decision / execution / outcome / reflection 등을 가질 수 있으나 사용자-facing 화면에 기계적 제목으로 강제하지 않는다.

### Writing — Quiet Archive

Cold Start에서는 추천글, Topic navigation, Series landing을 노출하지 않는다.

- 짧은 소개
- 날짜 + 제목 중심의 글 목록

으로 시작한다.

### Writing Detail — Reading First

글 읽기가 사이트 기능보다 우선한다.

- 제목
- 최소 메타데이터
- 본문
- 목록으로 돌아가기

정도로 유지한다.

### Now — Living Status

현재의 관심과 상태를 업데이트하는 페이지다.
About과 달리 자주 바뀔 수 있다.

### About — Person, Not Resume

Work의 경력 정보를 반복하지 않는다.

- 어떤 사람인가
- 삶에서 중요하게 생각하는 것
- 이 사이트를 운영하는 이유
- 연락

처럼 업무 이력만으로 설명되지 않는 사람의 면을 다룬다.

## Cross-page Consistency Rules

1. Home은 현관이지 요약 포트폴리오가 아니다.
2. Work는 이력서가 아니라 경력 이야기다.
3. Work Detail과 Writing Detail은 모두 읽는 경험을 우선한다.
4. Now는 변하고 About은 상대적으로 안정적이다.
5. 각 페이지가 서로 다른 서비스처럼 보이지 않고 한 사람의 개인 웹사이트 안의 다른 방처럼 느껴져야 한다.
6. Work 페이지에서만 갑자기 취업 포트폴리오 스타일로 전환하지 않는다.
7. Writing 페이지에서만 갑자기 별도 블로그 서비스 스타일로 전환하지 않는다.

## Cold Start Rules

- Home의 Selected Writing은 숨긴다.
- Writing은 단순 목록으로 시작한다.
- Topic / Series는 metadata로 지원하되 탐색 가치가 생길 때 UI를 활성화한다.
- 내용이 부족한 영역을 빈 section이나 placeholder card로 채우지 않는다.

## Language / Visual Design Deferred

현재 구조 승인 대상에서 제외한다.

- 최종 한국어 사용자-facing copy
- `Work / Writing / Now / About`의 실제 메뉴 라벨
- typography
- color palette
- 정확한 spacing / grid
- image / illustration
- animation
- component visual styling

한국어 표현은 단순 번역이 아니라 이후 디자인 정제 과정에서 실제 한국 사용자에게 자연스러운 언어로 다시 작성한다.

## Approval Gate

이 문서는 아직 `REVIEW CANDIDATE`다.

Wireframe APPROVED 조건:

- 사용자에게 Home / Work / Writing / Now / About의 역할과 흐름에 이견이 없다.
- Work Mobile을 포함한 responsive 구조의 방향에 이견이 없다.
- Work Detail / Writing Detail의 읽기 중심 구조에 이견이 없다.
- 위 Deferred 항목을 Wireframe 승인과 분리하는 것에 동의한다.

승인 이후:

1. 이 문서 상태를 `APPROVED`로 변경
2. `README.md`의 Current Phase를 `Build Spec ← NOW`로 변경
3. `docs/03_BUILD_SPEC.md` 작성 시작
