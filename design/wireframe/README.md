# HTML/CSS Wireframe Prototype

이 디렉터리는 `personalpage`의 **구조 검토용 와이어프레임 프로토타입**이다.
제품 코드가 아니며, 실제 구현 단계에서 그대로 배포하지 않는다.

## 목적

- Figma MCP 호출량과 무관하게 AI agent가 동일한 화면 구조를 이어서 작업할 수 있게 한다.
- 사용자와 AI가 실제 브라우저 크기에서 Desktop / Mobile 구조를 확인한다.
- 승인된 구조를 `docs/02_WIREFRAME.md`와 이후 `docs/03_BUILD_SPEC.md`의 시각적 근거로 사용한다.

## Pages

- `index.html` — Home / Personal Directory + Light Stream
- `work.html` — Career Narrative
- `work-detail.html` — Project Story
- `writing.html` — Quiet Writing Archive
- `writing-detail.html` — Reading-first Article
- `now.html` — Current Status
- `about.html` — Person, Not Resume

## Local Review

repo를 clone한 뒤 프로젝트 루트에서:

```bash
python3 -m http.server 8080
```

브라우저에서:

```text
http://localhost:8080/design/wireframe/
```

을 연다.

별도 build step이나 dependency 설치는 필요 없다.

## Responsive Review

브라우저 폭을 줄여 아래 화면을 우선 확인한다.

- Home
- Work
- Writing
- Writing Detail

`styles.css`의 `@media (max-width: 720px)`에서 모바일 구조가 정의된다.

## Review Scope

현재 승인 대상:

- 페이지 존재 이유
- 정보 위계와 섹션 순서
- 페이지 간 이동
- Desktop → Mobile에서 정보 구조가 자연스럽게 접히는지
- 전체 사이트가 하나의 개인 웹사이트처럼 느껴지는지

현재 승인 대상이 아님:

- 최종 한국어 문구
- 최종 내비게이션 라벨
- 폰트
- 색상
- 정확한 spacing
- 장식, 이미지, 애니메이션
- 최종 컴포넌트 스타일

## Source-of-truth Rule

Wireframe 단계가 `APPROVED`되기 전까지는 이 디렉터리를 **review candidate**로 취급한다.
승인 후 `docs/02_WIREFRAME.md`에서 승인 버전과 구조적 원칙을 고정한다.

Figma 파일은 탐색 과정과 시각적 참고를 보존하지만, Figma MCP 호출 한도 때문에 이후 반복 작업의 필수 의존성으로 두지 않는다.
