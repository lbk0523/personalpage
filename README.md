# Personal Writing Site

이병관이 살아가며 오래 붙잡게 되는 생각을 공개하고, 다른 사람이 지금과 미래에 읽을 수 있도록 장기간 축적하는 개인 웹사이트.

웹사이트는 공개 원문과 아카이브를 담당한다. X 등 외부 채널은 글을 발견하게 하고 반응을 주고받는 배포·대화 수단으로 사용할 수 있다.

## Current Phase

2026-08-26 첫 실제 Writing `평범하게 산다는 것`을 production에 공개했다.

```text
Strategy Revision ✅
IA Revision ✅
Wireframe Revision ✅
Build Spec Revision ✅
Implementation Adjustment ✅
Content / Operation ← CURRENT
```

현재 Home에서 공개 글을 발견하고 독립 URL로 읽을 수 있으며 RSS와 sitemap에도 포함된다.

## Approved Public Structure

```text
/
├─ /writing/[slug]
├─ /rss.xml
└─ /404
```

`/`는 Home과 Writing Archive 역할을 함께 수행한다.

초기 public build에서 제외:

```text
/writing
/work
/work/[slug]
/now
/about
```

기존 Work 콘텐츠와 구현 이력은 저장소에 보존하지만 public HTML은 생성하지 않는다.

## Source of Truth

아래 순서로 읽는다.

1. `AGENTS.md`
2. `docs/00_STRATEGY.md` — APPROVED, revised 2026-08-25
3. `docs/01_IA.md` — APPROVED, revised 2026-08-25
4. `docs/02_WIREFRAME.md` — APPROVED, revised 2026-08-25
5. `docs/03_BUILD_SPEC.md` — APPROVED, revised 2026-08-25
6. `docs/DECISIONS.md` — D-017
7. `docs/05_DESIGN_FOUNDATION.md`
8. `docs/04_LOCAL_CODEX_HANDOFF.md`

대화 기록이나 agent의 기억보다 저장소 문서를 우선한다.

## Active Wireframe

```text
design/wireframe/
├─ index.html
├─ writing-detail.html
├─ styles.css
└─ README.md
```

로컬 검토:

```bash
python3 -m http.server 8080
```

```text
http://localhost:8080/design/wireframe/
```

## Local Development

Node 24 사용:

```bash
npm ci
npm run check
npm run build
npm run dev
```

## Content

Writing source:

```text
src/content/writing/*.md
```

필수 frontmatter:

```yaml
title: "글 제목"
description: "공유와 검색에 사용할 짧은 설명"
publishedAt: 2026-08-25
type: essay
topics: []
draft: true
```

실제 공개 전에는 `draft: true`를 유지한다. 구조 검증용 Writing fixture도 production 목록, 상세 route, RSS, sitemap에서 제외한다.

## Production

```text
URL: https://byungklee.pages.dev
Cloudflare project: byungklee
Production branch: main
Automatic preview branch deployments: disabled
```

주의:

- 현재 production은 D-017 Writing 중심 구현을 제공한다.
- Work, Now, About, 별도 Writing index는 public build에서 제외한다.
- 제거 경로에는 Cloudflare의 삭제 자산 재캐시를 막기 위한 `no-store` header를 적용한다.
- 로컬 `main`을 push하면 Cloudflare production 자동 배포가 발생할 수 있다.
- push와 production deploy는 사용자 별도 승인 전 실행하지 않는다.

## Publication Gate

첫 공개의 기준은 프로필 페이지 완성이 아니다.

- 사용자 검토를 마친 실제 Writing이 최소 하나 존재한다.
- Home에서 해당 글을 바로 발견할 수 있다.
- Writing Detail을 독립 URL로 읽고 공유할 수 있다.
- fixture와 제외 route가 public output, RSS, sitemap에 없다.
- `npm run check`와 `npm run build`가 통과한다.

실제 공개 원고를 사용자 확인 없이 창작하거나 fixture를 임의로 public 전환하지 않는다.
