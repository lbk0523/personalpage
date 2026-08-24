# Personal Page — Design Foundation

Status: APPROVED — IMPLEMENTED  
Updated: 2026-08-24 KST

## 1. Purpose

사이트가 흰 배경, 검은 글자, 같은 굵기의 선에만 의존해 평면적으로 보이는 문제를 먼저 시스템 차원에서 해결한다.

이 문서는 색상, 타이포그래피, 간격, 표면, 경계, 상태의 공통 문법과 사용자 검토를 거쳐 확정한 사이트의 시각 방향을 함께 기록한다.

## 2. Reference Direction

당근의 공개 디자인 시스템인 SEED Design에서 다음 원칙을 참고한다.

- 유한한 Scale Token과 의도를 담은 Semantic Token을 분리한다.
- 색상은 실제 값보다 foreground, background, stroke의 역할로 부른다.
- 화면의 깊이는 배경색, 경계선, 그림자를 구분해 표현한다.
- 간격, radius, typography, motion을 공통 scale 안에서 사용한다.
- hover, pressed, selected, focus 상태를 같은 문법으로 연결한다.

SEED의 당근 브랜드 색상, 제품 컴포넌트 외형, React 구현은 가져오지 않는다. `@seed-design/*` 패키지를 설치하지 않고 Astro + plain CSS 안에서 프로젝트 소유의 custom properties로 재해석한다.

## 3. Token Structure

### Scale

디자인이 사용할 수 있는 원재료다.

- Neutral color palette
- 2–64px 중심의 spacing scale
- 0–2px radius scale와 의미가 있는 원형 예외
- 11–88px typography scale
- 400 / 500 / 700 font weight
- 120 / 160 / 200ms motion duration
- 낮은 단계의 shadow scale

### Semantic

실제 화면에서는 역할 이름을 우선 사용한다.

```text
foreground: default / muted / subtle / accent / accent-strong / inverted
background: canvas / surface / surface-weak / surface-pressed / accent-subtle / accent-weak / accent / inverted
stroke: subtle / muted / contrast / accent / focus
typography: display-title / page-title / reading-title / section-title / item-title / lead / body / meta
spacing: page-inline / page-start / page-end / intro-end / section / list-row
shape: control / surface / feature / round
elevation: surface
motion: interactive
```

### Component

Career Map처럼 고유한 시각 계약이 있는 영역만 component-level 변수를 둔다. 한 번만 쓰는 수치를 모두 토큰으로 만들지 않는다.

## 4. Surface Hierarchy

화면의 지속적인 깊이는 두 단계, 일시적인 상태는 한 단계로 제한한다.

1. `canvas`: 페이지 전체의 가장 낮은 바탕
2. `surface`: 디렉터리, 목록처럼 하나의 콘텐츠 단위를 묶는 표면

hover, active, focus는 elevation을 새로 쌓지 않고 색, underline, outline, 2px 이내의 이동으로만 드러낸다.

모든 섹션을 카드로 만들거나 모든 표면에 그림자를 넣지 않는다.

- Header: surface + 낮은 구분선, 그림자 없음
- Home Directory: 데스크톱에서 하나로 묶인 surface + stroke + 매우 낮은 elevation
- Writing / Now / Work 목록: 데스크톱에서 하나로 묶인 surface + stroke + 매우 낮은 elevation
- About / Work narrative: canvas 위의 섹션 간 stroke
- Career Map: 승인된 full-bleed, 선, 패턴, 큰 타이포를 유지

모바일에서 묶음 surface는 화면 폭에 가깝게 펴고 그림자를 제거한다. 항목 사이의 hairline과 canvas/surface 색 차이만 유지한다.

## 5. Typography and Spacing Rules

- 한글과 영문 모두 self-hosted `Wanted Sans Variable` 한 family를 사용한다. 로컬 파일과 system fallback을 함께 둔다.
- 본문과 메타데이터는 rem 기반으로 사용자의 글자 크기 설정을 존중한다.
- 화면 제목, 읽기 제목, 섹션 제목, 항목 제목, 본문, 메타 역할을 구분한다.
- 임의의 `650`, `750` weight는 사용하지 않고 400 / 500 / 700으로 제한한다.
- 제목은 `text-wrap: balance`와 `word-break: keep-all`을 사용한다.
- 페이지 gutter, intro 끝, 섹션 간격, 목록 행 padding은 semantic spacing을 사용한다.
- Career Map의 패턴 각도와 도형 비율처럼 art direction에만 필요한 수치는 예외로 남길 수 있다.
- Home 이름과 Work 대표 제목은 display 크기, 일반 페이지와 상세 제목은 한 단계 낮은 크기를 사용한다.
- Intro는 넉넉하게, 목록은 조밀하게, 큰 섹션 전환은 다시 넉넉하게 배치한다.

## 6. Responsive Contract

현재 구조적 breakpoint인 760px을 유지한다.

```text
≤ 760px
- Header 세로 배치
- Home Directory 1열
- Career Map 1열 세로 route
- Work Principles 1열
- 묶음 surface는 좌우 그림자 없이 viewport 폭으로 확장

> 760px
- Home Directory 2열
- Career Map 3열 가로 route
- Work Principles 2열
```

기본 검토 폭은 320 / 390 / 1280 / 1440이다. breakpoint 경계 변경이 필요할 때만 760 전후를 추가 확인한다.

## 7. Implementation Files

```text
src/styles/tokens.css  scale + semantic foundation
src/styles/global.css  reset + base + shared layout/components
src/styles/work.css    approved Work-specific visual direction
```

## 8. Approved Design Edge

사용자 검토로 다음 방향을 확정했다.

- 전체 인상은 따뜻한 editorial과 가벼운 인쇄물 문법에 둔다.
- canvas는 warm neutral, 링크·상태·Career Map은 신뢰감이 느껴지는 muted ink blue를 사용한다.
- 큰 표면의 모서리는 0–2px로 유지한다. 장식적인 둥근 카드는 쓰지 않는다.
- 원형은 Career Map station처럼 의미가 있는 도형에만 사용한다.
- 목록과 index는 항목별 카드가 아니라 하나의 종이 면과 내부 hairline으로 묶는다.
- 큰 섹션 구분선은 dark ink, 내부 구분선은 pale neutral로 위계를 나눈다.
- active nav는 굵기와 얇은 blue underline으로만 표시한다.
- 본문 링크는 underline을 유지하고, index CTA는 blue text와 arrow를 사용한다.
- hover와 focus는 120–160ms 색 변화, 화살표는 최대 2px 이동으로 제한한다.
- grain이나 texture는 사용하지 않는다.
- Career Map의 blue scale과 route 문법은 Work 안에서만 사용한다.

이 방향은 기존 DOM, 정보 위계, 콘텐츠 순서, Work Career Narrative를 바꾸지 않는다.

## 9. Official References

2026-08-24 기준 공식 문서를 참고했다.

- [SEED Design System](https://seed-design.io/)
- [Design Token](https://seed-design.io/foundations/design-token)
- [Color Roles](https://seed-design.io/foundations/color/color-role)
- [Typography](https://seed-design.io/foundations/typography)
- [Spacing](https://seed-design.io/foundations/spacing)
- [Radius](https://seed-design.io/foundations/radius)
- [Elevation](https://seed-design.io/foundations/elevation)
- [Motion](https://seed-design.io/foundations/motion)
- [Official GitHub Repository](https://github.com/daangn/seed-design)
- [Wanted Sans](https://github.com/wanteddev/wanted-sans/blob/v1.0.3/packages/wanted-sans/README.md)
- [Wanted Sans Webfont Guide](https://github.com/wanteddev/wanted-sans/blob/v1.0.3/packages/wanted-sans/documentation/webfonts/README.md)
- [SIL Open Font License 1.1](https://github.com/wanteddev/wanted-sans/blob/v1.0.3/OFL.txt)
