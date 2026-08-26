# Personal Page — Design Foundation

Status: APPROVED — REVISED FOR WRITING SITE
Updated: 2026-08-26 KST

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

반복되는 archive row나 reading layout처럼 고유한 시각 계약이 있는 영역만 component-level 변수를 둔다. 한 번만 쓰는 수치를 모두 토큰으로 만들지 않는다.

## 4. Surface Hierarchy

화면의 지속적인 깊이는 두 단계, 일시적인 상태는 한 단계로 제한한다.

1. `canvas`: 페이지 전체의 가장 낮은 바탕
2. `surface`: 디렉터리, 목록처럼 하나의 콘텐츠 단위를 묶는 표면

hover, active, focus는 elevation을 새로 쌓지 않고 색, underline, outline, 2px 이내의 이동으로만 드러낸다.

모든 섹션을 카드로 만들거나 모든 표면에 그림자를 넣지 않는다.

- Header: surface + 낮은 구분선, 그림자 없음
- Home Writing Archive: 데스크톱에서 하나의 cabinet frame + 분리된 drawer fronts + 낮은 elevation
- Writing Detail: canvas 위의 좁은 reading column, 별도 card surface 없음

모바일에서 묶음 surface는 화면 폭에 가깝게 펴고 그림자를 제거한다. 항목 사이의 hairline과 canvas/surface 색 차이만 유지한다.

## 5. Typography and Spacing Rules

- 한글과 영문 모두 self-hosted `Wanted Sans Variable` 한 family를 사용한다. 로컬 파일과 system fallback을 함께 둔다.
- 본문과 메타데이터는 rem 기반으로 사용자의 글자 크기 설정을 존중한다.
- 화면 제목, 읽기 제목, 섹션 제목, 항목 제목, 본문, 메타 역할을 구분한다.
- Home drawer 제목은 일반 item title과 분리된 `drawer-title` semantic role을 사용해 모바일 1rem, 데스크톱 1.125–1.375rem 범위를 유지한다.
- 임의의 `650`, `750` weight는 사용하지 않고 400 / 500 / 700으로 제한한다.
- 제목은 `text-wrap: balance`와 `word-break: keep-all`을 사용한다.
- 페이지 gutter, intro 끝, 섹션 간격, 목록 행 padding은 semantic spacing을 사용한다.
- art direction에만 필요한 수치는 예외로 남길 수 있다.
- Home의 `생각 서랍장`은 cabinet과 균형을 이루는 전용 display 크기, 상세 글 제목은 reading title 크기를 사용한다.
- Intro는 넉넉하게, 목록은 조밀하게, 큰 섹션 전환은 다시 넉넉하게 배치한다.

## 6. Responsive Contract

현재 구조적 breakpoint인 760px을 유지한다.

```text
≤ 760px
- Header는 이름 한 줄
- Home Writing row는 날짜와 제목을 세로 배치
- cabinet surface는 좌우 그림자 없이 viewport 폭으로 확장
- 선형 handle은 날짜와 제목 오른쪽에 유지
- Reading은 한 열로 유지

> 760px
- Header와 Footer는 content max width에 정렬
- Home Writing row는 날짜, 제목, handle의 세 column
- Reading은 좁은 max width로 중앙 정렬
```

기본 검토 폭은 320 / 390 / 1280 / 1440이다. breakpoint 경계 변경이 필요할 때만 760 전후를 추가 확인한다.

## 7. Implementation Files

```text
src/styles/tokens.css  scale + semantic foundation
src/styles/global.css  reset + base + shared layout/components
```

`src/styles/work.css`는 D-017 이후 public build에서 사용하지 않는다.

## 8. Approved Design Edge

사용자 검토로 다음 방향을 확정했다.

- 전체 인상은 따뜻한 editorial과 가벼운 인쇄물 문법에 둔다.
- canvas는 warm neutral, 링크와 상태는 신뢰감이 느껴지는 muted ink blue를 사용한다.
- 큰 표면의 모서리는 0–2px로 유지한다. 장식적인 둥근 카드는 쓰지 않는다.
- 원형 장식은 사용하지 않는다.
- 일반 목록과 index는 항목별 카드가 아니라 하나의 종이 면과 내부 hairline으로 묶는다.
- Home Writing Archive는 `생각 서랍장`이라는 이름을 반영해 예외적으로 cabinet frame과 drawer front 사이에 짧은 간격을 둔다.
- 큰 섹션 구분선은 dark ink, 내부 구분선은 pale neutral로 위계를 나눈다.
- 본문 링크는 underline을 유지한다. Home drawer link는 전체 앞판이 click target이므로 underline을 쓰지 않는다.
- Home drawer 오른쪽에는 질감 없는 짧은 선형 handle을 둔다. 실제 손잡이 이미지는 사용하지 않는다.
- 데스크톱 Home drawer의 hover와 focus는 120–160ms, 오른쪽 2px 이동과 작은 shadow로 제한한다. 모바일에서는 이동시키지 않는다.
- grain이나 texture는 사용하지 않는다.

이 방향은 Writing 중심 IA와 읽기 우선 정보 위계를 시각적으로 지원한다.

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
