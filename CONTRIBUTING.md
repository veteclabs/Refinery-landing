# 기여 · 협업 가이드 (브랜치 전략 & 배포)

Refinery Landing의 브랜치 전략과 배포 흐름을 정의한다. 모든 기여자와 자동화(Claude 등)는 이 문서를 따른다.
프로젝트 전반 규칙은 [CLAUDE.md](CLAUDE.md)를, 이 문서는 **git-flow(브랜치·릴리스)** 를 다룬다.

## 요약 (TL;DR)

- `main` = **프로덕션** (refinery.kr 자동 배포). **직접 푸시 금지.**
- `develop` = **통합·스테이징** (최종 배포 전 리뷰 게이트). 작업 브랜치는 여기로 먼저 머지.
- 흐름: **작업 브랜치 → `develop` → (릴리스) → `main`**

## 브랜치 구조

| 브랜치 | 역할 | Vercel 배포 |
|---|---|---|
| `main` | 프로덕션 | Production → https://refinery.kr |
| `develop` | 통합·스테이징 (리뷰 게이트) | Preview(고정) → 스테이징 |
| `feat/*` `fix/*` `chore/*` `docs/*` `content/*` | 작업 | 브랜치별 Preview |
| `release/*` (선택) | 릴리스 준비/최종 QA | Preview |
| `hotfix/*` | 긴급 프로덕션 수정 | Preview |

## Vercel 환경 매핑

Vercel은 **프로덕션 브랜치를 하나만** 프로덕션 도메인에 배포한다. 이 프로젝트는 저장소 기본 브랜치인 `main`이 프로덕션 브랜치다.

- **main** → Production → `https://refinery.kr`
- **develop** → Preview(스테이징). 브랜치 고정 Preview URL로 리뷰/QA.
- **작업 브랜치 / PR** → 브랜치별 Preview 자동 생성.

> 확인: Vercel → 프로젝트 → **Settings → Git → Production Branch = `main`**.
> (선택) Vercel → **Domains** 에서 `staging.refinery.kr` 를 `develop` 브랜치에 매핑하면 고정 스테이징 주소가 생긴다.

## 워크플로우

### 1) 일반 기능 / 수정

```bash
git switch develop && git pull            # 최신 develop
git switch -c feat/<짧은-설명>            # develop에서 분기
# ... 작업 ...
git push -u origin feat/<짧은-설명>
```

- **PR 생성 (base: `develop`)** → 브랜치 Preview에서 확인 → 리뷰 → `develop` 머지
- 머지 후 `develop` Preview(스테이징)에서 통합 검증

### 2) 릴리스 (develop → 프로덕션)

- 스테이징 검증 완료 후 **PR 생성 (base: `main`, head: `develop`)**
- 리뷰 → `main` 머지 = **프로덕션 배포(refinery.kr)**
- (선택) 릴리스 태그: `git tag -a vYYYY.MM.DD -m "..." && git push --tags`

### 3) 긴급 수정 (hotfix)

```bash
git switch main && git pull
git switch -c hotfix/<짧은-설명>          # main에서 분기
```

- 수정 → **PR (base: `main`)** → 머지(즉시 프로덕션)
- **반드시 `develop`에도 반영** (`main` → `develop` 머지 또는 동일 변경 재-PR). 안 하면 다음 릴리스에서 되돌아간다.

## 브랜치 네이밍

`feat/` 기능 · `fix/` 버그 · `chore/` 잡무·설정 · `docs/` 문서 · `content/` 콘텐츠(블로그·카피) · `hotfix/` 긴급 · `release/` 릴리스
→ 짧은 kebab-case. 예: `feat/usecase-power-quality`, `fix/hero-demo-mobile-crop`

## PR 규칙

- base 브랜치 확인: **일반 작업 → `develop`**, **릴리스 → `main`**, **hotfix → `main`(+develop)**
- 본문: **변경 요약 · 검증 방법 · 영향 범위**
- 병합 전 **Preview URL 육안 확인** (상태코드만 믿지 말 것 — 히어로 iframe 등 실제 표시 확인)
- 리뷰어 1인 이상 승인(팀 규모에 맞게)

## 커밋 규칙

- 한국어 요약 + 변경 근거. 이미지 변환은 before/after 용량 명시.
- **AI 공동작성/생성 표기 금지** (`Co-Authored-By`, `Generated with …` 등).

## 배포 전 로컬 확인

```bash
npm run build && npm run preview   # http://localhost:4321
```

콘솔 404 0 · 깨진 이미지 0 · 히어로 iframe/외부 리소스 표시 · sitemap/RSS/추적 스크립트 로드 확인.

## 초기 설정 체크리스트 (대시보드 — 1회, 사람이 수행)

- [ ] **GitHub → Settings → Branches**: `main` 보호 규칙 — 직접 푸시 금지, PR 필수, 리뷰 승인 필수(가능하면 상태체크 통과 필수). `develop`도 선택적으로 PR 필수 보호.
- [ ] **Vercel → Settings → Git → Production Branch = `main`** 확인.
- [ ] (선택) **Vercel → Domains**: `staging.refinery.kr` → `develop` 브랜치 매핑(고정 스테이징 주소).
- [ ] (선택) 병합 완료된 오래된 원격 브랜치 정리(`git push origin --delete <branch>`).
