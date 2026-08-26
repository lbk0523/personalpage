# Local Codex Handoff — Writing Site Revision

Updated: 2026-08-26 KST

## 1. Current State

사용자가 D-017 Writing 중심 전략을 승인하고 웹페이지 수정 착수를 요청했다.

완료:

- Strategy revision 승인
- IA revision 승인·반영
- Wireframe revision 승인·반영
- Build Spec revision 승인·반영
- Astro public route와 Home 구조 조정
- responsive browser QA
- local check/build/route/XML 검증
- `main` push와 Cloudflare Pages production 배포
- production Home, RSS, sitemap, 404 화면 smoke test
- 첫 실제 Writing `평범하게 산다는 것` 공개
- production Home, Writing Detail, RSS, sitemap 재검증

현재 단계는 **Writing을 계속 준비하고 공개하는 Content / Operation**이다.

## 2. Approved Product Direction

사이트의 정체성:

> 이병관이 쓴 공개 글의 정본이자 아카이브

역할 분리:

```text
Private Draft
  → Public Canonical Writing on Website
  → Distribution and Conversation on External Channels
```

public structure:

```text
/
├─ /writing/[slug]
├─ /rss.xml
└─ /404
```

초기 public route 제외:

```text
/writing
/work
/work/[slug]
/now
/about
```

Work 콘텐츠는 삭제하지 않고 `src/content/work/`에 보존한다.

## 3. Key Implementation Changes

- Home이 Personal Directory에서 Writing Archive로 변경됨
- Header primary navigation 제거
- Footer는 짧은 저자 맥락과 RSS만 유지
- Home Writing list는 날짜 + 제목 중심
- Writing Detail back link는 `/`의 `글 목록으로`
- optional `updatedAt` metadata와 article modified meta 지원
- Work, Now, About, 별도 Writing index page source 제거
- sitemap과 RSS에는 public Writing만 포함
- draft fixture는 계속 public output에서 제외

Active product page source:

```text
src/pages/index.astro
src/pages/writing/[slug].astro
src/pages/rss.xml.ts
src/pages/404.astro
```

## 4. Verification Completed

자동 검증:

```text
npm run check    PASS — 0 errors, 0 warnings, 0 hints
npm run build    PASS
git diff --check PASS
xmllint          PASS — RSS and sitemap XML
```

final build output:

```text
/index.html
/404.html
/rss.xml
/sitemap-index.xml
/sitemap-0.xml
```

확인한 제외 항목:

- `/work`
- `/now`
- `/about`
- `/writing` index
- draft Writing detail
- fixture reference in RSS / sitemap

Browser QA:

- Browser plugin available, Chrome extension path 사용
- Home과 404의 page identity / DOM / console 확인
- Writing fixture를 local QA build에서만 임시 표시해 archive와 detail 검증 후 즉시 `draft: true` 복원
- Home → Writing Detail → 글 목록 interaction 확인
- 404 → 글 목록 interaction 확인
- 320 / 390 / 760 / 761 / 1280 / 1440 width 확인
- 모든 검토 폭에서 horizontal overflow 없음
- Home / Writing Detail console error·warning 없음
- first Writing 공개 전 final state에서 public Writing count 0 확인

Known QA note:

- Chrome extension이 local raw `/rss.xml` navigation을 `ERR_BLOCKED_BY_CLIENT`로 차단했지만 클릭은 정확한 URL로 이동했다.
- RSS 파일 자체는 build output과 `xmllint`로 정상 검증했다.

## 5. Content State

첫 공개 Writing:

```text
src/content/writing/ordinary.md
draft: false
URL: https://byungklee.pages.dev/writing/ordinary/
```

2026-08-26 production에서 Home, 상세 route, RSS, sitemap 노출을 확인했다.

Writing 초안:

```text
src/content/writing/format.md
draft: true
```

`ordinary`와 일부 내용이 겹치는 미완성 초안이며 public output에서 제외한다.

Writing fixture:

```text
src/content/writing/weekend-after-becoming-a-dad.md
draft: true
```

실제 공개 글이 아니며 사용자 승인 없이 `draft: false`로 바꾸지 않는다.

Work 원고:

```text
src/content/work/*.md
```

D-017 이후 public route는 없지만 원고 자체는 보존한다.

## 6. Production and Git Safety

Production:

```text
URL: https://byungklee.pages.dev
Cloudflare project: byungklee
Production branch: main
origin/main before this local revision: 21c40fd
Automatic preview branch deployments: disabled
```

Writing 중심 구현 커밋 `c3d6f67`은 2026-08-25 production에 배포되었다.
첫 Writing 공개 커밋 `aaa327e`는 2026-08-26 production에 배포되었다.

Production smoke test:

- Home은 Writing Archive 구조와 새 문구를 제공
- RSS와 sitemap은 정상 응답하며 draft fixture를 포함하지 않음
- draft Writing detail은 404
- `ordinary`는 Home, 독립 상세 URL, RSS, sitemap에서 정상 공개
- `format`과 fixture Writing detail은 404
- 이전 Work, Now, About, Writing index 내용은 더 이상 노출되지 않고 404 화면을 제공

Cloudflare Pages는 삭제 자산을 데이터센터에 최대 1주 보존할 수 있다. 배포 직후 canonical URL의 기존 네 경로에 예전 HTML cache가 남아 있어 임시 404 사본으로 cache key를 교체했다. 현재 화면은 404지만 일부 edge에서 HTTP status가 일시적으로 `200`일 수 있으므로, `public/_headers`의 `no-store` 규칙으로 재캐시를 방지하고 후속 운영 시 상태가 `404`로 수렴했는지 확인한다.

주의:

- `main` push는 production 자동 배포를 유발할 수 있다.
- Git push, production deploy, custom domain 연결은 사용자 별도 승인 전 실행하지 않는다.
- fixture public 전환과 실제 공개 원고 창작도 별도 사용자 검토가 필요하다.

## 7. Next Work

1. 다음 Writing 원고 준비
2. privacy와 공개 범위 검토
3. local Home / Detail / RSS / sitemap 재검증
4. 실제 원고 공개 전 사용자 최종 확인 후 `draft: false` 전환과 production 배포

신규 기능, Topic/Series UI, Work/Now/About 복원, 외부 채널 자동 배포는 현재 범위가 아니다.
