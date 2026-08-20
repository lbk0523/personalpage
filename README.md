# Personal Page

이병관의 일과 만든 것, 현재의 관심, 살아가며 발전시키는 생각을 자신의 이름 아래 장기간 축적하고 세상과 공유하는 개인 웹사이트.

## Current Phase

1. Strategy ✅
2. IA ✅
3. Wireframe ← NOW
4. Build Spec
5. Implementation
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

Wireframe 반복 검토의 기준은 `design/wireframe/`의 responsive HTML/CSS prototype이다.
Figma는 초기 탐색과 시각적 참고/승인 기록용으로 사용하며 필수 의존성으로 두지 않는다.

## Start Here

AI agent와 작업자는 아래 순서로 읽는다.

1. `README.md`
2. `AGENTS.md`
3. `docs/00_STRATEGY.md`
4. `docs/01_IA.md`
5. `docs/02_WIREFRAME.md` — 현재 REVIEW CANDIDATE
6. 필요 시 `docs/DECISIONS.md`

## Current Artifacts

```text
docs/
├─ 00_STRATEGY.md
├─ 01_IA.md
├─ 02_WIREFRAME.md
├─ 03_BUILD_SPEC.md        # Wireframe 승인 후 생성
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

## Local Wireframe Review

```bash
python3 -m http.server 8080
```

브라우저에서:

```text
http://localhost:8080/design/wireframe/
```

Wireframe 승인 전에는 `03_BUILD_SPEC.md`를 만들지 않는다.
