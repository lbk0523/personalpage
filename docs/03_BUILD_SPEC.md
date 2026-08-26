# Personal Writing Site — Build Spec

Status: APPROVED
Revised and Approved: 2026-08-25
Supersedes: Version approved 2026-08-22

## 1. Purpose

이 문서는 Writing 중심으로 개정된 Strategy, IA, Wireframe을 실제 Astro 구현 계약으로 전환한다.

구현 순서의 정본:

1. `docs/00_STRATEGY.md`
2. `docs/01_IA.md`
3. `docs/02_WIREFRAME.md`
4. `docs/DECISIONS.md`
5. 본 문서
6. `docs/05_DESIGN_FOUNDATION.md`

D-017 이전 문서와 구현에 남아 있는 Home Directory, Work, Now, About public scope는 이 개정 계약보다 우선하지 않는다.

## 2. Technical Direction

기존 기술 방향을 유지한다.

- Framework: Astro static output
- Node.js: 24 LTS major
- Package manager: npm
- Language: Astro components, TypeScript, HTML, CSS, Markdown
- Deployment target: Cloudflare Pages
- Content source: repository-local Markdown
- Client JavaScript: 없음
- 신규 dependency: 없음

사이트의 핵심은 공개 Writing의 생성, 읽기, RSS와 sitemap이다. 로그인, server mutation, SSR이 필요하지 않다.

## 3. Public Route Contract

새 public route:

```text
/
/writing/[slug]
/rss.xml
/404
```

Astro의 not-found output은 host 환경에서 `/404.html`로 제공될 수 있다.

다음 route는 새 build에서 생성하지 않는다.

```text
/writing
/work
/work/[slug]
/now
/about
```

요구사항:

- 제거된 route는 navigation, sitemap, RSS에 나타나지 않는다.
- 제거된 route에 별도 placeholder나 soft-retired page를 만들지 않는다.
- 기존 Work Markdown과 관련 이력은 저장소에 보존할 수 있지만 public HTML을 생성하지 않는다.
- legacy redirect는 실제 외부 링크 보존 필요가 확인되기 전에는 만들지 않는다.

## 4. Repository Mapping

구현 후 핵심 구조:

```text
src/
├─ components/
│  ├─ ContentMeta.astro
│  ├─ SiteFooter.astro
│  ├─ SiteHeader.astro
│  └─ WritingList.astro
├─ content/
│  ├─ writing/*.md
│  └─ work/*.md              # 보존, public route 없음
├─ data/
│  └─ profile.ts
├─ layouts/
│  ├─ BaseLayout.astro
│  └─ ReadingLayout.astro
├─ pages/
│  ├─ index.astro
│  ├─ writing/
│  │  └─ [slug].astro
│  ├─ rss.xml.ts
│  └─ 404.astro
└─ styles/
   ├─ tokens.css
   └─ global.css
```

Work 전용 component, data, styles는 public page에서 import하지 않는다. 후속 정리에서 삭제할 수 있지만 실제 사용자 원고는 보존한다.

## 5. Writing Content Contract

### 5.1 Schema

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

### 5.2 Publication Rule

public Writing 조건:

```text
draft !== true
```

draft Writing은 다음에서 모두 제외한다.

- Home archive
- Writing static paths
- RSS
- sitemap

현재 fixture Writing은 실제 원고로 간주하지 않으며 `draft: true`를 유지한다.

### 5.3 Ordering

Home과 RSS는 `publishedAt` 내림차순으로 정렬한다.

### 5.4 URL

```text
src/content/writing/{slug}.md
→ /writing/{slug}/
```

slug 변경은 공개 URL 변경이므로 실제 게시 이후에는 신중하게 처리한다.

## 6. Page Contracts

### 6.1 `/` — Home / Writing Archive

Data:

- `getCollection('writing')`
- `draft` 제외
- `publishedAt` 내림차순

Structure:

```text
BaseLayout
└─ Page title
   └─ h1
└─ Writing archive, public entry가 있을 때
   ├─ section heading
   └─ WritingList
```

Approved copy direction:

```text
생각 서랍장
```

요구사항:

- 이름은 Header에서 보이므로 Home h1에서 다시 크게 반복하지 않는다.
- Home h1 아래에는 lead, subtitle, description 영역을 렌더링하지 않는다.
- Work, Now, About directory와 current strip을 제거한다.
- public Writing이 없을 때 fixture, 가짜 제목, 빈 card를 렌더링하지 않는다.
- public Writing이 생기면 Home에서 즉시 목록이 보인다.

### 6.2 `/writing/[slug]` — Writing Detail

Data:

- public Writing만 `getStaticPaths()`에 포함
- Markdown body는 Astro content `render()` 사용

Structure:

```text
ReadingLayout
├─ title
├─ publishedAt
├─ updatedAt, optional
├─ type
├─ series, optional
├─ Markdown body
└─ / 로 돌아가는 링크
```

요구사항:

- back link: `/`
- back label: `글 목록으로`
- `updatedAt`이 있을 때 `수정 {date}`로 구분해 표시
- description을 page description과 Open Graph description에 사용
- `type="article"` Open Graph metadata 유지
- canonical은 실제 path를 사용

### 6.3 `/rss.xml`

- public Writing만 포함
- `publishedAt` 내림차순
- Writing Detail path 사용
- Work 콘텐츠 포함 금지
- site origin은 Astro `site` 또는 현재 canonical fallback 사용

### 6.4 `404`

- 짧은 오류 설명
- `/`로 이동하는 `글 목록으로 →` 링크

## 7. Shared Component Contracts

### `SiteHeader`

- 사이트 이름 `이병관`
- `/` link
- primary navigation 없음
- `navigation.ts` dependency 없음

### `SiteFooter`

- copyright
- 설명 문구와 navigation link 없음

### `WritingList`

- `CollectionEntry<'writing'>[]` 입력
- 날짜 + 제목만 표시
- 설명과 card CTA 없음
- 항목 전체를 과도한 card로 만들지 않음
- empty message를 자체 생성하지 않음

### `ContentMeta`

- published date
- optional updated date
- optional series
- type label `글` / `노트`
- Work 전용 period와 role은 public Writing component contract에서 제거 가능

### `BaseLayout`

- canonical, description, Open Graph 유지
- RSS alternate link 유지
- semantic header/main/footer와 skip link 유지
- client JavaScript 없음

## 8. Visual and Responsive Contract

`docs/05_DESIGN_FOUNDATION.md`의 warm editorial foundation을 유지한다.

- Wanted Sans Variable
- warm neutral canvas
- paper-like grouped archive surface
- muted ink blue link와 focus state
- 0–2px radius
- subtle border와 낮은 desktop elevation
- decorative card, grain, 과한 motion 없음

Breakpoint:

```text
mobile: ≤ 760px
desktop: ≥ 761px
```

### Mobile

- Header는 이름 한 줄
- Home intro는 한 열
- Writing row는 날짜 → 제목 순서의 한 열
- Archive surface는 viewport 폭에 가깝게 확장하고 shadow 제거
- Reading body는 가로 overflow 없이 한 열

### Desktop

- Header와 Footer는 content max width 안에서 정렬
- Writing row는 날짜 고정 column + 제목 flexible column
- Reading body는 reading max width로 중앙 정렬

검토 폭:

```text
320 / 390 / 760 / 761 / 1280 / 1440
```

## 9. SEO and Shareability

### Required

- unique page title
- meta description
- canonical URL
- `og:title`
- `og:description`
- `og:type`
- `og:url`
- article published time
- sitemap
- RSS
- robots.txt

### Deferred

- generated social preview image
- Twitter Card 전용 image
- schema.org JSON-LD
- analytics
- share buttons

외부 채널 배포는 사이트 구현 범위가 아니다. 사이트는 공유할 canonical URL과 metadata를 제공한다.

## 10. Accessibility

- 한국어 문서 언어 `lang="ko"`
- semantic landmark 사용
- skip link 유지
- keyboard focus가 항상 보임
- heading 순서 유지
- 링크 목적이 텍스트만으로 이해됨
- mobile 320px에서 가로 overflow 없음
- `prefers-reduced-motion` 존중

## 11. Privacy and Content Safety

- 회사 비공개 정보와 동료 식별 정보 금지
- 배우자와 자녀의 민감 정보 금지
- 실제 공개 원고를 사용자 확인 없이 창작하지 않음
- fixture를 실제 글처럼 public 전환하지 않음
- Work 원고는 public route가 제거되더라도 저장소 내 콘텐츠로 보존

## 12. Deployment Policy

이 구현 조정은 로컬 commit까지 수행한다. 다음은 별도 사용자 승인 전 실행하지 않는다.

- Git push
- Cloudflare production deploy
- custom domain 연결
- fixture `draft: false` 전환
- 실제 공개 원고 창작

현재 `main`은 Cloudflare production branch이므로 이후 push는 production 배포를 유발할 수 있다.

## 13. Verification

필수 자동 검증:

```bash
npm run check
npm run build
```

build output 검증:

- `/index.html` 존재
- `/rss.xml` 존재
- `/404.html` 존재
- `/work/index.html` 없음
- `/now/index.html` 없음
- `/about/index.html` 없음
- `/writing/index.html` 없음
- draft Writing detail 없음
- sitemap과 RSS에 제외 route 및 fixture 없음
- XML parse 가능

필수 화면 검증:

- Home / Writing Archive
- Writing Detail fixture는 draft를 임시 해제하지 않고 wireframe 또는 별도 안전한 검증 방식 사용
- 404
- 320 / 390 / 760 / 761 / 1280 / 1440
- keyboard focus
- 가로 overflow
- browser console / request error

## 14. Acceptance Criteria

- Home에서 경력·프로젝트·Now보다 글이 첫 경험이 된다.
- Home은 사이트 소개와 public Writing archive만 제공한다.
- Work, Now, About, 별도 Writing index가 public build에서 생성되지 않는다.
- Writing Detail은 독립 URL, canonical, metadata, 읽기 중심 layout을 제공한다.
- Header에는 이름 외 primary navigation이 없다.
- Footer는 저작권만 제공한다.
- draft Writing은 목록, detail, sitemap, RSS에 나타나지 않는다.
- existing warm editorial foundation과 responsive behavior를 유지한다.
- client JavaScript와 신규 dependency를 추가하지 않는다.
- `npm run check`와 `npm run build`가 통과한다.
- production 배포는 실행하지 않는다.
