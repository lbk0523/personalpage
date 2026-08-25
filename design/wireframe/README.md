# HTML/CSS Wireframe Prototype

이 디렉터리는 Writing 중심 공개판의 구조 검토용 responsive prototype이다. 제품 코드가 아니며 실제 배포 파일로 사용하지 않는다.

## Active Pages

- `index.html` — Home / Writing Archive
- `writing-detail.html` — Reading-first Writing Detail
- `styles.css` — Desktop / Mobile 구조

D-017 이전의 Work, 별도 Writing index, Now, About prototype은 active wireframe에서 제거했다. 이전 구조는 Git history에서 확인할 수 있다.

## Local Review

프로젝트 루트에서:

```bash
python3 -m http.server 8080
```

브라우저에서:

```text
http://localhost:8080/design/wireframe/
```

## Responsive Review

다음 폭에서 Home과 Writing Detail을 확인한다.

```text
320 / 390 / 760 / 761 / 1280 / 1440
```

## Review Scope

- Home에서 글이 첫 경험인지
- 날짜와 제목 중심 archive가 읽히는지
- Writing Detail의 읽기 폭과 돌아가기 흐름
- 별도 navigation 없이 사이트 이름으로 Home에 복귀 가능한지
- Desktop에서 Mobile로 자연스럽게 접히는지

최종 색상과 typography token은 `docs/05_DESIGN_FOUNDATION.md`와 제품 CSS가 정본이다.
