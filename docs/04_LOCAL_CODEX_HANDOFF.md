# Personal Page — Local Codex Handoff

Status: ACTIVE HANDOFF  
Updated: 2026-08-24 KST

Latest implementation update:

- 전체 한국어 copy pass와 browser QA를 완료했다.
- 사용자 피드백에 따라 SEED Design을 참고한 local design foundation을 구현했다.
- `docs/05_DESIGN_FOUNDATION.md`와 `src/styles/tokens.css`가 foundation의 현재 기준이다.
- 사용자 검토를 거쳐 warm editorial, square grouped surface, muted ink blue, self-hosted Wanted Sans 방향을 확정하고 구현했다.
- fixture 콘텐츠는 production에서 제외하기로 승인되어 `draft: true`로 전환했다.
- 현재 남은 공개 전 관문은 canonical URL과 최종 production 승인이다.

## 1. Purpose

이 문서는 ChatGPT에서 진행하던 `lbk0523/personalpage` 구현 작업을 사용자의 로컬 Codex 환경으로 넘기기 위한 실행용 핸드오프다.

로컬 Codex는 이 대화 기록을 전제로 하지 말고 **GitHub 저장소의 승인 문서와 현재 구현 브랜치**를 정본으로 사용한다.

---

## 2. Repository / Branch / PR

Repository:

```text
lbk0523/personalpage
```

Default branch:

```text
main
```

현재 구현 브랜치:

```text
implementation/astro-v1
```

현재 Draft PR:

```text
#1 Implement Astro v1 site skeleton
https://github.com/lbk0523/personalpage/pull/1
```

중요:

- `main`에는 아직 구현을 merge하지 않았다.
- 구현/수정 작업은 우선 `implementation/astro-v1`에서 이어간다.
- 사용자의 명시적 승인 전 production 배포를 임의 실행하지 않는다.
- Draft PR을 임의 merge하지 않는다.

---

## 3. Required Reading Order

작업 시작 전 반드시 아래 순서로 읽는다.

1. `README.md`
2. `AGENTS.md`
3. `docs/00_STRATEGY.md`
4. `docs/01_IA.md`
5. `docs/02_WIREFRAME.md`
6. `docs/03_BUILD_SPEC.md`
7. `docs/DECISIONS.md`
8. `docs/05_DESIGN_FOUNDATION.md`
9. `docs/04_LOCAL_CODEX_HANDOFF.md` — 본 문서

문서 사이에 표현 차이가 있을 경우 **더 나중에 승인된 결정 / Wireframe / Build Spec / 본 핸드오프의 현재 상태 정보**를 우선한다.

대화 기억이나 추정으로 승인된 구조를 되돌리지 않는다.

---

## 4. Project Goal

사이트 목적:

> 이병관이 해온 일과 만든 것, 현재의 관심, 살아가며 발전시키는 생각을 자신의 이름 아래 장기간 축적하고 세상과 공유하는 개인 웹사이트.

사이트는 취업용 포트폴리오 하나로 축소하지 않는다.

상위 정체성:

```text
이병관
├─ Work
├─ Writing
├─ Now
└─ About
```

육아 글 `아빠들의 육아 대화`는 별도 브랜드 사이트가 아니라 Writing 내부의 topic/series다.

---

## 5. Approved Product Direction

### Home

`Personal Directory + Light Stream`.

- 커리어 포트폴리오 요약 페이지가 아니다.
- 이병관이라는 사람의 여러 영역으로 들어가는 첫 관문이다.
- Selected Work / KPI / 경력 증명 hero를 전면에 두지 않는다.

### Work

`Career Narrative`.

- 프로젝트 카드 갤러리가 주인공이 아니다.
- 어떤 일을 거쳐 현재 역할에 왔는지가 중심이다.
- Work Detail은 기계적인 case-study 템플릿이 아니라 긴 Project Story다.

현재 사용자 피드백을 반영해 Work의 Career 영역은 **infographic-style Career Map**으로 구현되어 있다.

현재 허용된 방향:

- 데스크톱: 서비스 운영 → 콘텐츠 기획 → 사업 PM의 역할 변화를 하나의 visual route로 표현
- 모바일: 같은 정보를 세로 route로 축약
- full-bleed Career section
- 선 / 패턴 / 큰 타이포 / 공간 분할을 이용한 시각화
- 화려한 인포그래픽 자체가 목적은 아님

사용자 최신 평가:

> "그래 우선 이정도로 하자."

따라서 Work visual direction을 다시 전면 재설계하지 않는다. 이후 실제 콘텐츠가 들어갈 때 필요한 작은 refinement만 허용한다.

### Writing

`Quiet Archive`.

Cold Start에서는:

- Featured 없음
- Topic navigation 없음
- Series navigation 없음
- 검색 없음
- 날짜 + 제목 중심의 단순 목록

Writing Detail은 Reading First.

### Now

현재의 일 / 관심 / 만드는 것 / 삶의 변화를 짧게 보여준다.

### About

Work의 resume 반복이 아니라 사람 자체를 설명한다.

---

## 6. Technical Stack — APPROVED

```text
Astro static output
TypeScript
plain CSS
local Markdown Content Collections
Node.js 24 LTS
npm
Cloudflare Pages target
```

v1에서 사용하지 않는다:

- React
- Next.js
- Tailwind
- MDX
- CMS
- database
- authentication
- comments
- search
- analytics
- dark mode
- heavy animation framework

기본 원칙:

> 상호작용이 필요 없는 페이지에는 client-side JavaScript를 보내지 않는다.

---

## 7. Current Implementation State

현재 브랜치에는 다음이 구현되어 있다.

### Routes

```text
/
/work
/work/[slug]
/writing
/writing/[slug]
/now
/about
/rss.xml
/404
```

### Core implementation

- Astro static project scaffold
- TypeScript
- shared BaseLayout / ReadingLayout
- SiteHeader / SiteFooter
- Markdown content collections
- Work collection
- Writing collection
- Career data
- responsive CSS
- Work infographic-style Career Map
- RSS
- sitemap
- basic SEO metadata
- robots.txt
- favicon
- skip link
- keyboard focus baseline
- semantic HTML baseline
- SEED-inspired local design tokens
- semantic typography / spacing / surface / stroke / radius / state roles
- self-hosted Wanted Sans Variable
- warm neutral canvas + muted ink blue accent
- desktop grouped paper surfaces + mobile full-width flat surfaces

### Verification already achieved

로컬 Node 24.19.0 / npm 11.17.0 환경에서 검증 완료:

```text
npm ci        PASS
npm run check PASS
npm run build PASS
```

브라우저 screenshot/DOM QA도 다음 화면과 폭에서 수행했다.

```text
Home / Work / Writing / Writing Detail / Now / About
× 320 / 390 / 1280 / 1440
```

760 / 761px 경계도 별도로 확인했다. 주요 responsive flow, 가로 overflow, nav clipping, self-hosted font load, focus, reduced motion이 정상 동작하고 browser console/page/request error가 없음을 확인했다.

---

## 8. Korean Copy Direction — IMPORTANT

사용자의 최신 전역 피드백:

> 각종 메뉴 및 내용에 대한 한국어 표현들이 전반적으로 너무 딱딱하거나 AI 어투가 많다.

새 카피를 추가하거나 fixture를 실제 콘텐츠로 바꿀 때도 이 기준을 계속 적용한다.

### Copy principles

- 짧게 말한다.
- 실제 개인 홈페이지 주인이 직접 쓴 말처럼 쓴다.
- 설명문 / 보고서 / PRD 어투를 피한다.
- `~을 기록합니다`, `~에 관심이 있습니다`, `~을 중요하게 생각합니다`, `~하고자 합니다`, `~하는 공간입니다` 같은 반복 패턴을 경계한다.
- 불필요하게 추상적인 명사를 줄이고 구체적인 동사를 쓴다.
- 제목은 문서 목차보다 사람이 붙인 제목처럼 쓴다.
- 한국어를 억지로 직역하지 않는다.

현재 적용된 예:

```text
생각하고 경험한 것을 기록합니다.
→ 생각이 남을 때 씁니다.

요즘은 이렇습니다.
→ 요즘은

어떤 사람인가
→ 생각하는 방식

삶에서 중요하게 생각하는 것
→ 중요한 것

일하며 배운 것
→ 일하면서 생긴 기준

어떻게 여기까지 왔나
→ 어쩌다 여기까지 왔나
```

### Navigation labels

현재 상단 nav는 다음 영어 라벨을 유지한다.

```text
Work / Writing / Now / About
```

이유:

- `작업 / 글 / 지금 / 소개` 같은 기계적 한국어 번역보다 현재 영문 라벨이 자연스럽다고 판단했다.
- 사용자가 별도 변경 요청하기 전 임의로 번역하지 않는다.

---

## 9. Current Content State

중요: 현재 Work/Writing 상세에는 **구조 검증용 fixture/sample 콘텐츠**가 있다.

예:

```text
src/content/work/project-story-sample.md
src/content/writing/weekend-after-becoming-a-dad.md
```

이 파일들은 콘텐츠 모델과 route를 검증하기 위해 존재한다.

2026-08-24 사용자 승인에 따라 두 fixture는 `draft: true`로 유지하며 production 공개 대상에서 제외한다. 따라서 public 목록, 상세 static path, RSS, sitemap에 포함하지 않는다.

원칙:

- 실제 공개용 콘텐츠를 사용자 확인 없이 임의 창작하여 대체하지 않는다.
- 회사 비공개 정보, 동료 식별 정보, 배우자/아이의 민감 정보는 넣지 않는다.
- Content 단계에서 사용자와 함께 실제 공개 원고로 교체한다.

---

## 10. Deployment Readiness

기술적으로는 현재 static production build가 성공하므로 **배포 가능한 상태**다.

Cloudflare Pages 예상 설정:

```text
Production branch: main
Build command: npm run build
Build output directory: dist
```

현재 `astro.config.mjs`는 `SITE_URL` 환경변수를 사용하고, 없을 경우 임시 canonical origin을 사용한다.

production 배포 전 해야 할 일:

1. 실제 공개 URL 또는 Cloudflare Pages production URL 확정
2. `SITE_URL`에 실제 canonical origin 설정
3. fixture Work/Writing 콘텐츠의 `draft: true`와 public output 제외 상태 확인
4. 실제 콘텐츠는 사용자 원고가 준비된 뒤 별도로 교체
5. 최종 `npm ci && npm run check && npm run build`
6. 모바일/데스크톱 browser QA
7. 사용자 배포 승인
8. PR merge
9. Cloudflare Pages 연결 / production deploy
10. 배포 URL smoke test

### Publication gate

이전 권고는 다음과 같았다.

> Home / Work / Now / About은 현재 상태로 두고, 샘플 Work/Writing 2개를 실제 첫 콘텐츠로 교체한 뒤 공개하는 편이 깔끔하다.

2026-08-24 사용자는 production에서 fixture를 제외하는 권고안에 동의했다. 실제 공개 원고가 준비될 때까지 두 fixture를 `draft: true`로 유지한다.

---

## 11. Immediate Next Work for Local Codex

### A. Keep the approved visual direction

`docs/05_DESIGN_FOUNDATION.md`와 D-015를 현재 디자인 기준으로 사용한다. 구조나 기능을 넓히지 않고 실제 콘텐츠가 들어올 때 필요한 작은 조정만 한다.

### B. Content and publication gate

fixture Work/Writing은 `draft: true`로 유지한다. 실제 콘텐츠는 사용자 원고가 준비된 뒤 교체하며, 사용자 사실이나 원고는 임의로 만들지 않는다.

### C. Report to user before destructive/public actions

아래는 사용자 승인 없이 하지 않는다.

- PR merge
- production deploy
- custom domain 연결
- fixture 콘텐츠를 `draft: false`로 바꾸는 결정
- 실제 공개용 Work 내용 창작
- 실제 공개용 Writing 원고 창작

---

## 12. Implementation Definition of Done

Build Spec의 Implementation DoD:

> 승인된 핵심 화면이 desktop/mobile에서 안정적으로 렌더링되고, Markdown으로 Work/Writing을 게시할 수 있으며, production build와 기본 SEO/accessibility가 동작한다.

현재 기술적으로는 이 기준을 충족한다. 아래 항목은 구현 DoD와 별개인 publication gate다.

남은 핵심은:

- 실제 canonical URL 확정
- production publication gate

추가 기능을 구현하여 Implementation을 불필요하게 연장하지 않는다.

---

## 13. Do Not Do

다음 작업을 임의로 하지 않는다.

- 사이트를 다시 career portfolio 중심으로 변경
- Home에 Selected Work hero 복원
- Work를 카드형 프로젝트 gallery 중심으로 변경
- Work Career Map을 승인 없이 제거
- 별도 Parenting/Ayukdae route 추가
- Topic / Series archive UI 추가
- search 추가
- CMS 추가
- auth/comments/newsletter 추가
- React/Tailwind 도입
- analytics/tracker 추가
- dark mode 추가
- 복잡한 animation 추가
- 임의 SEO growth 기능 추가
- `main` 직접 작업
- PR #1 임의 merge
- production 임의 deploy

---

## 14. Handoff Success Condition

로컬 Codex가 다음을 이해하면 핸드오프 성공이다.

1. 현재 작업은 `implementation/astro-v1`에서 이어간다.
2. 제품 전략/IA/Wireframe/Build Spec은 이미 승인됐다.
3. Work visual direction도 현재 수준으로 유지한다.
4. 한국어 copy pass와 승인된 foundation/design edge 구현이 완료됐다.
5. fixture 콘텐츠는 production에서 제외하기로 결정됐다.
6. 로컬 Node 24 검증과 핵심 화면 browser QA는 통과했다.
7. production merge/deploy는 사용자 승인 관문이다.
8. SEED는 구조와 원칙을 참고할 뿐이며, 당근 브랜드나 React 컴포넌트를 복제하지 않는다.

이 문서를 읽은 뒤 기존 결정을 다시 처음부터 재논의하지 말고, 현재 단계에서 필요한 검증/수정/배포 준비로 바로 이어간다.
