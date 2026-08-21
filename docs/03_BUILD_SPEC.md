# Personal Page — Build Spec

Status: REVIEW CANDIDATE
Last Updated: 2026-08-21

## 1. Purpose

이 문서는 승인된 Strategy, IA, Wireframe을 실제 구현 가능한 기술적 계약으로 전환한다.

구현 agent는 이 문서를 읽기 전에 다음 정본을 순서대로 읽어야 한다.

1. `docs/00_STRATEGY.md`
2. `docs/01_IA.md`
3. `docs/02_WIREFRAME.md`
4. `docs/DECISIONS.md`
5. 본 문서

문서 사이에 표현 차이가 있을 경우 **더 나중에 승인된 결정과 Wireframe을 우선**한다.

특히 IA 초기안의 Home `Selected Work` 중심 구조와 Work Cases 중심 구조는 이후 승인된 Wireframe/Decision에 의해 다음처럼 수정되었다.

- Home → `Personal Directory + Light Stream`
- Work → `Career Narrative`
- Work Detail → `Project Story`

구현 agent는 초기 IA 표현을 이유로 승인된 Wireframe을 되돌리지 않는다.

---

## 2. v1 Technical Direction

### 2.1 Framework

**Astro — static output**

선정 이유:

- 사이트의 중심이 Writing / Work 등 정적 콘텐츠다.
- 파일 기반 route와 콘텐츠 컬렉션을 제공한다.
- Markdown 콘텐츠를 로컬 저장소에서 관리하기 적합하다.
- 기본적으로 불필요한 클라이언트 JavaScript를 만들지 않을 수 있다.
- React/Next.js 수준의 앱 프레임워크가 필요한 로그인, 사용자 상태, 서버 mutation이 없다.

v1에서는 SSR을 사용하지 않는다.
Cloudflare adapter도 사용하지 않는다.

### 2.2 Runtime / Package Manager

- Node.js: **24 LTS major**
- Package manager: **npm**
- lockfile: `package-lock.json` 필수
- `.nvmrc`: `24`
- `package.json`의 `engines.node`: `>=24 <25`

실제 implementation commit에서는 당시 최신 호환 minor/patch 버전을 lockfile에 고정한다.

### 2.3 Language

- Astro components
- TypeScript
- HTML / CSS
- Markdown

`@astrojs/mdx`는 v1 기본 의존성에 넣지 않는다.
실제 콘텐츠에서 Markdown으로 표현하기 어려운 요구가 생긴 경우에만 별도 승인 후 추가한다.

### 2.4 Client-side JavaScript

기본 원칙:

> **필요한 상호작용이 없는 화면에는 클라이언트 JavaScript를 보내지 않는다.**

초기 v1의 Home / Work / Writing / Now / About 및 상세 페이지는 JavaScript 없이 동작 가능해야 한다.

Career Timeline의 시각적 표현도 우선 HTML + CSS로 구현한다.
JavaScript animation은 디자인상 명확한 필요가 확인될 때만 추가한다.

---

## 3. Deployment

### 3.1 Target

**Cloudflare Pages — static deployment**

예상 설정:

```text
Production branch: main
Build command: npm run build
Build output directory: dist
```

GitHub repository integration을 사용한다.

### 3.2 Deployment Policy

Build Spec 승인만으로 실제 public deployment를 실행하지 않는다.

기본 단계:

1. Implementation에서 로컬 production build 검증
2. 필요 시 preview deployment 검증
3. Content 단계에서 실제 공개 콘텐츠 반영
4. 공개 승인 후 production deployment

placeholder / fixture 콘텐츠만 존재하는 상태를 최종 공개본으로 취급하지 않는다.

### 3.3 Domain

custom domain은 v1 기술 구조에서 지원하되 현재 Build Spec에서 도메인 이름을 확정하지 않는다.

Astro `site` 설정에는 실제 공개 시점의 canonical origin을 넣는다.
공개 전 임시 검증에서는 Pages preview URL을 사용할 수 있다.

---

## 4. Repository Structure

Implementation 이후 예상 구조:

```text
personalpage/
├─ README.md
├─ AGENTS.md
├─ package.json
├─ package-lock.json
├─ .nvmrc
├─ astro.config.mjs
├─ tsconfig.json
├─ public/
│  ├─ favicon.svg
│  └─ robots.txt
├─ src/
│  ├─ components/
│  │  ├─ SiteHeader.astro
│  │  ├─ SiteFooter.astro
│  │  ├─ CareerTimeline.astro
│  │  ├─ WritingList.astro
│  │  └─ ContentMeta.astro
│  ├─ layouts/
│  │  ├─ BaseLayout.astro
│  │  └─ ReadingLayout.astro
│  ├─ pages/
│  │  ├─ index.astro
│  │  ├─ work/
│  │  │  ├─ index.astro
│  │  │  └─ [slug].astro
│  │  ├─ writing/
│  │  │  ├─ index.astro
│  │  │  └─ [slug].astro
│  │  ├─ now.astro
│  │  ├─ about.astro
│  │  ├─ rss.xml.ts
│  │  └─ 404.astro
│  ├─ content/
│  │  ├─ work/
│  │  │  └─ *.md
│  │  └─ writing/
│  │     └─ *.md
│  ├─ content.config.ts
│  ├─ data/
│  │  ├─ career.ts
│  │  ├─ navigation.ts
│  │  └─ profile.ts
│  └─ styles/
│     └─ global.css
├─ design/
│  └─ wireframe/
│     └─ ... approved review prototype
└─ docs/
   └─ ... canonical project documents
```

파일명과 component 분리는 구현 과정에서 작은 조정이 가능하나, route와 content ownership을 바꾸는 수준의 재설계는 금지한다.

---

## 5. Route Contract

v1의 public route는 다음으로 고정한다.

```text
/
/work
/work/[slug]
/writing
/writing/[slug]
/now
/about
/rss.xml
```

추가:

```text
/404
```

Growth capability이지만 v1에서 만들지 않는 route:

```text
/writing/topic/[slug]
/writing/series/[slug]
```

또한 v1에서 독립 route로 만들지 않는다.

- `/resume`
- `/projects`
- `/parenting`
- `/ayukdae`
- `/archive`
- `/tags`
- `/uses`
- `/bookshelf`
- `/newsletter`
- `/contact`

---

## 6. Content Model

### 6.1 General Principle

Writing과 Work Detail은 repository-local Markdown을 사용한다.

CMS, database, admin UI는 만들지 않는다.

콘텐츠 파일명은 public slug의 source가 된다.

예:

```text
src/content/writing/weekend-after-becoming-a-dad.md
→ /writing/weekend-after-becoming-a-dad
```

slug는 가능하면 짧은 lowercase kebab-case English identifier를 사용한다.
사용자-facing title은 한국어를 기본으로 한다.

### 6.2 Writing Collection

예상 schema:

```ts
{
  title: string
  description: string
  publishedAt: Date
  updatedAt?: Date
  type: 'essay' | 'note'
  topics: string[]
  series?: string
  draft: boolean
}
```

규칙:

- `title` 필수
- `description`은 metadata / RSS / list excerpt에 사용할 수 있을 정도의 짧은 설명
- `type`은 내부 모델에서 지원하지만 목록에서 과도하게 강조하지 않는다.
- `topics`와 `series`는 Cold Start에서 metadata로만 유지한다.
- `draft: true`는 public list, static path, RSS에서 제외한다.
- `아빠들의 육아 대화`는 `series` 값으로 표현할 수 있다.

예:

```yaml
---
title: "아빠가 된 뒤 주말을 다시 생각하게 된 이유"
description: "아기를 위한 외출과 부모를 위한 외출은 같은 것인지 생각한 기록."
publishedAt: 2026-08-20
type: note
topics:
  - parenting
series: "아빠들의 육아 대화"
draft: false
---
```

### 6.3 Work Collection

예상 schema:

```ts
{
  title: string
  summary: string
  period?: string
  role?: string
  organization?: string
  kind: 'professional' | 'personal'
  order?: number
  draft: boolean
}
```

규칙:

- Work Detail은 portfolio card보다 Project Story로 읽혀야 한다.
- body는 자유로운 Markdown narrative를 사용한다.
- UI에서 `Context / Problem / Outcome` 같은 기계적 고정 제목을 강제하지 않는다.
- 공개할 수 없는 수치나 회사 비공개 정보 입력을 요구하는 schema를 만들지 않는다.
- `order`는 Work 페이지에서 수동 editorial order가 필요한 경우에만 사용한다.

### 6.4 Career Timeline

Career Timeline은 `src/data/career.ts`의 정적 typed data로 관리한다.

예상 항목:

```ts
{
  start: string
  end?: string
  title: string
  organization?: string
  description?: string
  href?: string
}
```

Career Timeline은 semantic HTML의 ordered list를 기본 구조로 한다.

최종 디자인에서 시각적으로 더 풍부한 timeline으로 표현하더라도 다음을 유지한다.

- DOM 순서는 시간 흐름을 이해할 수 있어야 한다.
- 스타일 제거 상태에서도 텍스트 정보가 완전해야 한다.
- mobile에서 별도 가로 스크롤을 필수로 만들지 않는다.
- 시각적 장식 때문에 경력기술서보다 더 복잡한 인포그래픽이 되지 않는다.

### 6.5 Profile / Navigation

이름, 기본 소개, navigation, contact target 등 사이트 전역의 짧은 정보는 local typed data module로 관리한다.

중복 문자열을 여러 page component에 복사하지 않는다.

### 6.6 Now

Now는 고정 route 하나를 유지한다.

v1에서는 별도의 `Now archive`를 만들지 않는다.
현재 상태와 `last updated` 날짜를 local data 또는 page content에서 관리한다.

---

## 7. Approved Wireframe Mapping

### `/` Home

구조:

```text
Intro
↓
Personal Directory
↓
Light Current Status
↓
Footer
```

금지:

- Selected Work cards를 Home의 주인공으로 복원
- Career Timeline 노출
- Selected Writing placeholder
- 실적 숫자 / KPI / 경력 증명 hero

### `/work`

구조:

```text
현재 하는 일
↓
걸어온 길 / Career Timeline
↓
어떻게 여기까지 왔나
↓
해온 일과 만든 것
↓
일하며 배운 것
```

핵심:

- Career Narrative여야 한다.
- 프로젝트는 이야기의 증거로 연결한다.
- 프로젝트 grid/card gallery가 page identity를 지배하지 않는다.

### `/work/[slug]`

읽기 중심 Project Story.

예상 narrative 흐름:

```text
프로젝트 소개
시작
무엇을 고민했나
어떤 판단을 했나
그 뒤에
돌아보면
```

위 문구를 UI의 고정된 section heading으로 강제하지 않는다.

### `/writing`

Cold Start:

```text
Intro
↓
Writing List
```

날짜 + 제목 중심의 quiet archive.

금지:

- Featured carousel
- Topic nav
- Series nav
- Notes / Essays 별도 탭
- 검색

### `/writing/[slug]`

Reading First.

```text
Article Header
↓
Body
↓
Back / Optional Navigation
```

사이드바, 추천 콘텐츠 rail, 공유 버튼 묶음 등은 v1 기본 범위가 아니다.

### `/now`

현재 하는 일과 관심을 짧게 보여준다.
현재성이 핵심이며 About과 역할이 겹치지 않아야 한다.

### `/about`

사람 자체의 소개.
Work의 timeline이나 resume를 반복하지 않는다.

---

## 8. Component Contract

### Required shared components

최소한 다음 책임은 재사용 component로 분리한다.

#### `SiteHeader`

- site name → `/`
- Work / Writing / Now / About navigation
- current page 상태 제공

#### `SiteFooter`

- 실제 사용 중인 link만 렌더링
- Email / GitHub / RSS는 실제 target이 준비된 것만 활성화

#### `CareerTimeline`

- career data를 semantic list로 렌더링
- 디자인 refinement의 주요 대상
- desktop/mobile 모두 동일 데이터 사용

#### `WritingList`

- public writing 정렬
- draft 제외
- Cold Start의 단순 archive 표현 유지

#### `ContentMeta`

- Writing / Work Detail의 최소 metadata 표시
- 화면마다 metadata 규칙이 중복되지 않도록 함

### Layouts

#### `BaseLayout`

책임:

- `<html lang="ko">`
- global metadata
- canonical URL
- SiteHeader / SiteFooter
- skip link
- page `<main>`

#### `ReadingLayout`

Work Detail과 Writing Detail이 공유할 수 있는 읽기 폭과 article shell 제공.

콘텐츠 종류가 다르다는 이유로 두 상세 페이지의 typography system을 완전히 별도로 만들지 않는다.

---

## 9. Responsive Contract

### General

mobile-first CSS를 기본으로 한다.

구조 검증 기준 폭:

- narrow mobile: **320px**
- common mobile: **390px**
- tablet / structural transition: **720px 전후**
- desktop: **1280px**
- wide desktop sanity check: **1440px**

Wireframe candidate breakpoint는 `720px`이다.
실제 디자인 중 텍스트 wrapping 또는 layout 안정성 때문에 작은 조정은 허용하되, mobile/desktop 정보 구조 자체를 바꾸지 않는다.

### Hard responsive requirements

- 320px에서 horizontal page overflow 없음
- nav가 잘리거나 viewport 밖으로 나가지 않음
- Home directory는 mobile에서 single-column flow
- Career Timeline은 mobile에서 자연스러운 vertical narrative
- Writing list는 mobile에서 date/title이 읽기 쉬운 single-column flow
- article reading width는 viewport에 맞춰 축소
- 이미지가 추가될 경우 `max-width: 100%` 원칙
- 핵심 콘텐츠를 horizontal scroll container 안에 숨기지 않음

---

## 10. Visual Implementation Boundary

Build Spec은 최종 visual design을 고정하지 않는다.

실제 브라우저 구현 과정에서 다음을 refinement한다.

- 최종 한국어 copy
- 실제 navigation label
- typography
- color palette
- spacing / grid
- Career Timeline 시각화
- hover / focus treatment
- 필요 시 최소한의 image / illustration

단, refinement가 승인된 정보 구조를 바꾸면 안 된다.

### Career Timeline 특별 요구사항

Work의 `걸어온 길`은 현재 Wireframe보다 더 디자인적인 시각화를 탐색한다.

목표:

> 경력의 시간 흐름과 역할 변화가 시각적으로 느껴지되, 이력서 표나 화려한 인포그래픽처럼 보이지 않는다.

구현 시 최소 2개의 visual direction을 실제 브라우저에서 비교한 뒤 하나를 선택하는 것을 권장한다.

---

## 11. Typography / CSS Architecture

### CSS

v1에서는 별도 CSS framework를 도입하지 않는다.

- global CSS
- component-scoped Astro styles
- CSS custom properties

으로 충분히 구현한다.

Tailwind는 기본 의존성으로 넣지 않는다.
실제 구현 중 반복 utility가 명확한 문제로 확인되기 전에는 추가하지 않는다.

### Design tokens

`global.css`에서 최소한 다음 semantic token을 관리한다.

```css
--color-bg
--color-text
--color-muted
--color-border
--color-accent
--content-max
--reading-max
--space-*
```

최종 색상/값은 디자인 refinement에서 결정한다.

### Font

초기 implementation은 system font stack으로 시작할 수 있다.

최종 웹디자인에서 별도 webfont가 필요하면 다음 조건을 만족해야 한다.

- 한국어 본문 가독성
- 합법적인 web 사용 license
- 과도한 font payload 방지
- fallback font 지정

---

## 12. SEO Minimum

v1 SEO는 검색 성장 프로젝트가 아니라 **정상적인 웹 문서 기본기** 수준으로 제한한다.

모든 public page:

- 고유 `<title>`
- `meta description`
- canonical URL
- `og:title`
- `og:description`
- `og:type`
- `og:url`
- `<html lang="ko">`

Writing Detail:

- published date를 metadata에서 사용할 수 있음
- article semantics 사용

추가:

- `@astrojs/sitemap`
- `robots.txt`
- `/rss.xml` — public Writing만 포함
- RSS autodiscovery link

v1에서 하지 않는다.

- SEO dashboard
- keyword landing page
- 자동 생성 tag archive
- schema markup의 과도한 확장
- programmatic SEO

---

## 13. Accessibility Minimum

목표는 WCAG 2.2 AA 수준의 기본 원칙을 지키는 것이다.

필수:

- semantic landmarks: header / nav / main / footer
- heading level 순서
- keyboard navigation
- visible focus state
- skip-to-content link
- 충분한 text/background contrast
- link를 색상만으로 구분하지 않음
- image alt text
- decorative image는 빈 alt 또는 presentation 처리
- interaction target은 mobile에서 누르기 어려울 정도로 작지 않게 함
- animation이 있을 경우 `prefers-reduced-motion` 대응

mouse hover가 없어도 모든 public content에 접근 가능해야 한다.

---

## 14. Performance / Privacy Principles

### Performance

- static generation
- 불필요한 client JS 금지
- 이미지 추가 시 적절한 크기/format 사용
- third-party script 최소화
- initial v1에서 analytics script 없음

### Privacy

v1에서 다음을 사용하지 않는다.

- advertising tracker
- marketing pixel
- behavioral analytics
- cookie banner가 필요한 third-party tracking

분석 도구가 실제 운영상 필요해질 때 별도 결정한다.

---

## 15. v1 Explicit Scope

### Included

- 7 core screen types
- Work/Writing dynamic static routes
- responsive implementation
- Markdown content collections
- RSS
- sitemap
- basic SEO metadata
- 404
- accessibility baseline
- Cloudflare Pages deployability
- Career Timeline design refinement

### Excluded

- authentication
- comments
- newsletter signup
- database
- custom CMS/admin
- site search
- complex tags/topics UI
- series landing pages
- multilingual
- dark mode
- theme switcher
- analytics dashboard
- realtime features
- contact form backend
- heavy animation system
- design system project

새 기능은 "있으면 좋아 보인다"는 이유만으로 v1에 추가하지 않는다.

---

## 16. Implementation Commands

예상 package scripts:

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "check": "astro check"
  }
}
```

Implementation acceptance 전 반드시 실행:

```bash
npm ci
npm run check
npm run build
```

필요 시 local production output을 `npm run preview`로 확인한다.

---

## 17. Implementation Sequence

구현 agent는 다음 순서를 권장한다.

1. Astro + TypeScript scaffold
2. content collections / schema
3. routes 생성
4. BaseLayout / ReadingLayout
5. Header / Footer / list components
6. 승인 Wireframe 구조 재현
7. mobile responsive 재현
8. actual browser visual refinement
9. Career Timeline visual direction 비교 및 선택
10. SEO / RSS / sitemap / 404
11. accessibility QA
12. production build QA

초기부터 미세한 animation, design token 확장, component library 구축을 먼저 하지 않는다.

---

## 18. Acceptance Criteria

### Build

- `npm ci` 성공
- `npm run check` 성공
- `npm run build` 성공
- `dist/`에 public routes가 생성됨

### Routes

다음 route가 정상 render됨.

- `/`
- `/work`
- 최소 1개의 `/work/[slug]`
- `/writing`
- 최소 1개의 `/writing/[slug]`
- `/now`
- `/about`
- `/rss.xml`
- 존재하지 않는 route의 404

### Structure

- Home은 Personal Directory 중심
- Home에 Selected Work gallery 없음
- Work는 Career Narrative 중심
- Work Detail은 읽기 중심 Project Story
- Writing은 quiet archive
- Writing Detail은 reading-first
- Now와 About의 역할이 시각적으로/내용적으로 구분됨

### Responsive

- 320px / 390px / 1280px / 1440px에서 주요 화면 확인
- horizontal page overflow 없음
- Home / Work / Writing / Writing Detail mobile 흐름 확인
- Career Timeline이 mobile에서 의미를 잃지 않음

### Accessibility

- keyboard만으로 주요 navigation과 public links 접근 가능
- visible focus
- skip link 동작
- semantic heading/landmark 구조
- 필수 이미지 alt 처리

### Content

- Writing/Work schema validation 동작
- `draft: true` 콘텐츠는 public list / detail static path / RSS에서 제외
- Writing RSS에는 public Writing만 포함

### Scope

- 로그인/댓글/CMS/search/analytics 등 미승인 기능이 추가되지 않음
- 승인 Wireframe과 다른 정보 구조를 agent가 임의로 만들지 않음

### Definition of Done — Implementation

아래가 모두 충족되면 구현을 멈추고 Content 단계로 이동한다.

> **승인된 핵심 화면이 desktop/mobile에서 안정적으로 렌더링되고, Markdown으로 Work/Writing을 게시할 수 있으며, production build와 기본 SEO/accessibility가 동작한다.**

이 시점에 떠오른 추가 기능은 구현하지 않고 backlog 후보로 남긴다.

---

## 19. Approval Gate

이 문서는 현재 `REVIEW CANDIDATE`다.

Build Spec APPROVED를 위해 확인할 주요 결정:

1. Astro static을 v1 framework로 사용
2. Node 24 LTS + npm
3. local Markdown content collections
4. v1에서는 MDX / CMS를 사용하지 않음
5. Cloudflare Pages를 deployment target으로 사용
6. client JavaScript 최소화 / 기본 zero-JS
7. CSS framework 없이 CSS custom properties + Astro scoped styles 사용
8. analytics 없음
9. 현재 v1 포함/제외 범위
10. Implementation Definition of Done

승인 후:

1. 본 문서 Status를 `APPROVED`로 변경
2. `README.md`의 Current Phase를 `Implementation ← NOW`로 변경
3. 필요 시 `docs/DECISIONS.md`에 기술 선택 결정 기록
4. 구현 agent에게 Strategy → IA → Wireframe → Build Spec 순으로 전달

---

## 20. External Technical References

아래 공식 문서를 기술 선택 검증에 참고했다.

- Astro Content Collections: https://docs.astro.build/ko/guides/content-collections/
- Astro Pages / File-based routing: https://docs.astro.build/ko/basics/astro-pages/
- Astro Markdown: https://docs.astro.build/en/guides/markdown-content/
- Astro RSS: https://docs.astro.build/ko/recipes/rss/
- Cloudflare Pages + Astro: https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/
- Cloudflare Pages GitHub integration: https://developers.cloudflare.com/pages/configuration/git-integration/github-integration/
- Node.js releases: https://nodejs.org/en/about/previous-releases
