# Personal Page

이병관의 일과 만든 것, 현재의 관심, 살아가며 발전시키는 생각을 자신의 이름 아래 장기간 축적하고 세상과 공유하는 개인 웹사이트.

## Current Phase

1. Strategy ✅
2. IA ✅
3. Wireframe ✅
4. Build Spec ✅
5. Implementation ← NOW
6. Content
7. Operation

## Project Workflow

```text
Strategy
  ↓
IA
  ↓
Wireframe (GitHub HTML/CSS + Figma reference)
  ↓
Build Spec
  ↓
Implementation
  ↓
Content
  ↓
Operation
```

## Source of Truth

이 저장소의 승인된 문서를 프로젝트 정본으로 사용한다.
대화 기록이나 개별 AI agent의 추정은 정본이 아니다.

승인된 Wireframe 구조의 기준은 `design/wireframe/`의 responsive HTML/CSS prototype과 `docs/02_WIREFRAME.md`다.
Figma는 초기 탐색과 시각적 참고 기록용으로 사용하며 필수 의존성으로 두지 않는다.

구현은 `docs/03_BUILD_SPEC.md`의 기술 계약과 Acceptance Criteria를 따른다.
로컬 Codex 인계 시에는 `docs/04_LOCAL_CODEX_HANDOFF.md`의 현재 브랜치·PR·남은 관문 정보를 함께 따른다.

## Start Here

AI agent와 작업자는 아래 순서로 읽는다.

1. `README.md`
2. `AGENTS.md`
3. `docs/00_STRATEGY.md`
4. `docs/01_IA.md`
5. `docs/02_WIREFRAME.md` — APPROVED
6. `docs/03_BUILD_SPEC.md` — APPROVED
7. `docs/DECISIONS.md`
8. `docs/05_DESIGN_FOUNDATION.md` — APPROVED
9. `docs/04_LOCAL_CODEX_HANDOFF.md` — 현재 구현 인계 상태

## Current Artifacts

```text
docs/
├─ 00_STRATEGY.md
├─ 01_IA.md
├─ 02_WIREFRAME.md
├─ 03_BUILD_SPEC.md
├─ 04_LOCAL_CODEX_HANDOFF.md
├─ 05_DESIGN_FOUNDATION.md
└─ DECISIONS.md

design/
└─ wireframe/
   ├─ index.html
   ├─ work.html
   ├─ work-detail.html
   ├─ writing.html
   ├─ writing-detail.html
   ├─ now.html
   ├─ about.html
   ├─ styles.css
   └─ README.md
```

## Current Implementation Handoff

현재 구현은 아래 브랜치에서 진행 중이다.

```text
implementation/astro-v1
```

Draft PR:

```text
#1 Implement Astro v1 site skeleton
```

로컬 Codex 또는 새로운 agent가 구현을 이어갈 때는 먼저 `docs/04_LOCAL_CODEX_HANDOFF.md`를 확인한다.

## Local Wireframe Review

```bash
python3 -m http.server 8080
```

브라우저에서:

```text
http://localhost:8080/design/wireframe/
```

## Deferred Design Requirement

Work의 `걸어온 길` Career Timeline은 Wireframe의 정보 구조를 유지하되, 최종 웹디자인에서 단순 연도/텍스트 목록보다 경력의 흐름과 전환이 시각적으로 느껴지는 표현으로 refinement한다.

현재 구현 브랜치에서는 이 요구를 infographic-style Career Map으로 반영했다.

## Implementation Stop Rule

아래 조건이 충족되면 구현을 멈추고 Content 단계로 이동한다.

> 승인된 핵심 화면이 desktop/mobile에서 안정적으로 렌더링되고, Markdown으로 Work/Writing을 게시할 수 있으며, production build와 기본 SEO/accessibility가 동작한다.

미승인 기능은 Implementation 중 추가하지 않는다.
