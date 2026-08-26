# Personal Writing Site — Wireframe

Status: APPROVED
Revised and Approved: 2026-08-25
Supersedes: Version approved 2026-08-21

## Purpose

승인된 Writing 중심 전략과 IA를 실제 화면 흐름으로 고정한다. 이 문서와 `design/wireframe/`의 responsive HTML/CSS prototype을 구현의 구조적 기준으로 사용한다.

## Canonical Review Prototype

```text
design/wireframe/index.html
design/wireframe/writing-detail.html
design/wireframe/styles.css
```

로컬 검토:

```bash
python3 -m http.server 8080
```

```text
http://localhost:8080/design/wireframe/
```

## Screen Inventory

1. Home / Writing Archive — `design/wireframe/index.html`
2. Writing Detail — `design/wireframe/writing-detail.html`
3. 404 — 제품 구현의 공통 shell과 error state로 확인

이전 Work, Work Detail, 별도 Writing index, Now, About prototype은 D-017에 따라 active wireframe에서 제외한다.

## Structural Direction

### Home — Writing Is the Home

Home은 개인 영역을 나열하는 디렉터리가 아니라 **공개된 글을 바로 발견하는 아카이브**다.

기본 흐름:

```text
Header: 이병관
↓
Intro: 생각 서랍장
↓
Writing Archive: 날짜 + 제목
↓
Footer: 짧은 설명 + RSS
```

구조 원칙:

- Header에는 별도 primary navigation을 두지 않는다.
- Intro는 사이트의 쓰기와 공유 목적만 짧게 말한다.
- 경력, 현재 역할, 프로젝트, Now 상태를 Home에 넣지 않는다.
- 공개 글은 Home에서 한 번의 추가 navigation 없이 바로 보인다.
- Writing 항목은 날짜와 제목이 먼저 읽히게 한다.
- 설명문, type, topic, series는 Home 목록의 필수 정보가 아니다.
- 추천글, Featured, 카드형 분류, 빈 placeholder를 만들지 않는다.

### Writing Detail — Reading and Source

공유받은 독자가 사이트 구조를 이해하지 않아도 글을 바로 읽을 수 있어야 한다.

기본 흐름:

```text
Header: 이병관
↓
Title
↓
Published date · Optional updated date · 글/노트 · Optional series
↓
Body
↓
글 목록으로
↓
Footer
```

구조 원칙:

- 글 제목과 본문이 가장 강한 시각 위계를 가진다.
- metadata는 본문 읽기를 방해하지 않는 한 줄 수준으로 유지한다.
- 본문 폭은 Home archive보다 좁게 유지한다.
- 관련 글, 공유 버튼, 댓글, author card를 초기에는 넣지 않는다.
- 하단에는 Home의 글 목록으로 돌아가는 링크만 둔다.

### 404 — Return to Writing

- 오류를 짧게 설명한다.
- `홈으로`보다 역할이 분명한 `글 목록으로` 링크를 제공한다.

## Responsive Contract

구조적 breakpoint는 현재 디자인 foundation의 `760px`을 유지한다.

### Mobile — 760px 이하

- Header는 한 줄의 사이트 이름만 유지한다.
- Intro와 목록은 viewport 폭을 충분히 사용한다.
- Writing row는 날짜와 제목을 세로로 쌓는다.
- 목록 surface는 좌우 border와 shadow 없이 화면 폭에 가깝게 편다.
- Reading은 한 열을 유지하고 본문 글자 크기와 행간을 우선한다.

### Desktop — 761px 이상

- Header와 Footer는 content max width 안에 둔다.
- Writing row는 날짜 column과 제목 column으로 나눈다.
- Archive는 하나의 grouped paper surface와 내부 hairline으로 표현한다.
- Reading content는 별도의 좁은 max width로 중앙 정렬한다.

검토 폭:

```text
320 / 390 / 760 / 761 / 1280 / 1440
```

## Visual Direction

`docs/05_DESIGN_FOUNDATION.md`의 다음 공통 방향을 유지한다.

- warm neutral canvas
- paper-like surface
- self-hosted Wanted Sans Variable
- dark ink text + muted ink blue links and states
- 0–2px radius
- pale hairline과 dark section line
- 장식적인 카드, grain, 과한 shadow 없음

Writing-only 전환을 이유로 새로운 시각 테마나 animation을 추가하지 않는다. 포트폴리오 인상은 장식을 바꾸는 대신 정보 구조와 카피에서 제거한다.

## Copy Direction

- 사람이 직접 쓴 것처럼 짧고 구체적으로 말한다.
- `기록합니다`, `공유합니다`, `아카이브입니다`를 설명문마다 반복하지 않는다.
- 직업 소개로 시작하지 않는다.
- `Writing`을 별도 메뉴나 서비스 이름처럼 반복 노출하지 않는다.
- Home 제목은 `생각 서랍장`을 사용한다.
- Intro는 외부 채널에 나누더라도 원문은 이곳에 오래 남긴다는 뜻을 자연스럽게 전달한다.

## Cross-page Consistency Rules

1. Home은 Writing Archive다.
2. Header의 이름은 항상 Home으로 돌아간다.
3. Writing Detail은 읽기와 출처 확인을 우선한다.
4. Footer는 저자 맥락과 RSS만 제공한다.
5. Work, Now, About을 암시하는 빈 navigation이나 teaser를 만들지 않는다.
6. 실제 공개 콘텐츠가 생기기 전 fixture를 public UI에 노출하지 않는다.

## Approval Result

2026-08-25 사용자는 다음 전략 변경을 승인하고 웹페이지 수정 착수를 요청했다.

- 사이트를 공개 글의 정본이자 아카이브로 전환
- Home을 글 목록으로 변경
- Work, Now, 별도 About을 초기 public scope에서 제외
- 외부 채널을 배포·대화 수단으로 분리

이 승인에 따라 위 구조를 implementation contract로 사용한다.
