# Agent Instructions

## Workspace Policy Inheritance

This repository inherits `/Users/byung/agent-workspace/AGENTS.md` and
`/Users/byung/agent-workspace/policies/codex-rules.md`. Follow the stricter
applicable rule. Do not push, merge, deploy, publish private material, or widen
the approved product scope without the required human approval.

## Project Goal

이 저장소는 이병관의 Writing 중심 개인 웹사이트를 설계·구현·운영하기 위한 정본 저장소다.
웹사이트는 이병관이 살아가며 오래 붙잡게 되는 생각을 자신의 이름 아래 공개하고, 다른 사람이 지금과 미래에 읽을 수 있도록 장기간 축적하는 공개 정본이자 아카이브다.

## Required Reading Order

작업을 시작하기 전에 아래 순서로 읽는다.

1. workspace `AGENTS.md`와 `policies/codex-rules.md`
2. repo `AGENTS.md`
3. `README.md`
4. `docs/00_STRATEGY.md`
5. 현재 작업 단계의 승인 문서
6. 필요 시 `docs/DECISIONS.md`

## Source of Truth

- 승인된 전략과 프로젝트 결정은 이 저장소의 문서를 기준으로 한다.
- 대화 기록, 개별 AI agent의 기억, 임시 메모는 정본이 아니다.
- 승인된 문서와 새로운 요청이 충돌하면 임의로 덮어쓰지 말고 충돌을 명시한다.
- 현재 단계보다 뒤의 문서가 아직 존재하지 않는 것은 정상이다. 승인 전 빈 문서를 만들지 않는다.

## Development Sequence

프로젝트의 기본 공정은 다음 순서를 따른다.

1. Strategy
2. IA
3. Wireframe
4. Build Spec
5. Implementation
6. Content
7. Operation

공정을 건너뛰거나 뒤 단계의 결정을 앞 단계에서 임의 확정하지 않는다.

## Core Product Constraints

- 이 프로젝트의 목적은 웹개발 자체가 아니다.
- 웹사이트의 초기 공개 범위는 Home / Writing Archive, Writing Detail, RSS, 404다.
- Work / Work Detail / Now / 별도 About은 D-017에 따라 초기 public route에서 제외한다.
- 사이트의 상위 브랜드는 특정 직무, 육아 브랜드, 개별 프로젝트가 아니라 이병관 개인이다.
- 사이트의 첫인상을 현재 직업이나 포트폴리오로 만들지 않는다.
- 웹사이트는 공개 원문과 장기 축적을 담당하고, X 등 외부 채널은 배포와 대화 수단으로 사용할 수 있다.
- 육아 콘텐츠는 `Writing` 안의 중요한 연재/주제로 다루며 독립 사이트나 상위 브랜드로 분리하지 않는다.

## Agent Rules

- 승인된 전략을 임의로 변경하지 않는다.
- 요구되지 않은 기능이나 범위를 임의로 추가하지 않는다.
- 신규 아이디어가 생기면 즉시 구현하지 말고 제안 또는 backlog 후보로 남긴다.
- 설계 또는 구현 판단에 필요한 정보가 승인 문서에 없으면 기존 원칙을 우선 적용하고, 중요한 가정은 명시한다.
- 작업 결과가 승인되면 관련 정본 문서를 최신 상태로 갱신한다.
- 구현 단계에서는 승인된 IA, Wireframe, Build Spec을 함께 준수한다.
- 승인된 Wireframe과 구현이 충돌할 경우 임의 재설계하지 않는다.

## Wireframe Rules

- 반복 검토와 구조 수정의 기준은 `design/wireframe/`의 responsive HTML/CSS prototype이다.
- Figma는 초기 탐색 과정과 승인 스냅샷을 보존하는 보조 시각 자료로 사용하며, Figma MCP를 작업의 필수 의존성으로 두지 않는다.
- Wireframe의 목적은 IA를 시각적 구현 계약으로 전환하는 것이다.
- Wireframe 단계에서는 정보 위계, 레이아웃, 섹션 순서, 콘텐츠 밀도, 내비게이션, 주요 반응형 변화를 결정한다.
- 정확한 브랜드 컬러, 최종 폰트, 고충실도 시각 효과, 복잡한 애니메이션은 기본적으로 Wireframe 범위가 아니다.
- Wireframe prototype은 제품 코드가 아니다. 실제 구현 단계에서 그대로 배포한다고 가정하지 않는다.
- 승인 후 `docs/02_WIREFRAME.md`가 구조적 원칙과 승인 대상을 정본으로 고정한다.
- 별도 고충실도 UI 디자인 단계는 현재 기본 공정에 포함하지 않는다. 필요성이 확인될 때만 별도 결정한다.

## Wireframe Review

로컬에서 다음과 같이 검토할 수 있다.

```bash
python3 -m http.server 8080
```

```text
http://localhost:8080/design/wireframe/
```

우선 모바일 검토 대상:

- Home
- Writing Detail

## Scope Discipline

초기 v1에서 다음과 같은 확장은 기본적으로 제외한다. 실제 필요가 생기면 Build Spec 단계에서 별도 승인한다.

- 로그인/회원
- 댓글
- 뉴스레터
- 커스텀 CMS
- 복잡한 검색/태그 시스템
- 다국어
- 자체 분석 대시보드
- 화려한 인터랙션이나 애니메이션 중심 설계
- 별도 육아 브랜드 사이트

## Privacy and Publication

- 회사의 비공개 정보나 특정 동료를 식별할 수 있는 민감한 내부 이야기를 공개하지 않는다.
- 사용자 본인의 경험과 판단을 중심으로 작성한다.
- 배우자나 자녀 등 다른 사람의 사생활을 사용자 자신의 콘텐츠 자산으로 간주하지 않는다.
- 자녀의 민감한 건강·발달·생활 정보, 정확한 위치/일정 등은 공개하지 않는 것을 기본으로 한다.
