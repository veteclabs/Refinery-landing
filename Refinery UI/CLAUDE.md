# Refinery UI · Project Memory

> Claude Code 가 이 프로젝트에 진입할 때 자동으로 로드되는 메모리 파일입니다.
> 모든 작업은 아래 디자인 시스템 가이드를 **단일 진실 공급원(single source of truth)** 으로 사용합니다.

---

## Design System Reference

신규 페이지·기능 작성 시 아래 가이드를 항상 먼저 참조합니다. 토큰·컴포넌트·Do/Don't·코드 템플릿·체크리스트가 모두 정리되어 있습니다.

@./Refinery_DesignSystem_Guide.md

**CSS 단일 진실 공급원 = `refinery.css`**. 토큰(:root/body.dark)·컴포넌트(.rfn-*)·App Shell·뷰 라우팅이 이 파일 하나에만 정의돼 있고, 모든 페이지가 `<link rel="stylesheet" href="refinery.css">` 로 공유합니다. 색·폰트·사이즈·컴포넌트 변경은 **오직 `refinery.css` 에서만** 합니다 (그 한 번으로 전 페이지 반영 · 페이지 간 드리프트 구조적 불가). 페이지 HTML 에 `<style>` 블록이나 토큰 hex/px 리터럴을 두지 않습니다.

기준 HTML — 컴포넌트의 실제 마크업 예시는 다음 파일에 있습니다. 신규 페이지는 이 파일들과 동일한 톤앤매너로 작성합니다 (셸·CSS 는 모두 refinery.css 가 제공).

- `UI_Refinery_DesignSystem.html` (디자인 시스템 레퍼런스 페이지 · 컴포넌트 마크업 예시 · 마스터)
- `UI_Refinery_Dashboard.html` (모니터링/대시보드 화면 · refinery.css link)
- `UI_Refinery_Ontology.html` (Ontology · Object Types 서브페이지 포함 · refinery.css link)
- `UI_Refinery_Pipeline.html` (데이터 파이프라인 · 스키마 트리(`body.app-side-wide`) · ERD · refinery.css link)
- `UI_Refinery_Plate.html` (대시보드 편집기/빌더 · 캔버스 + Inspector 도크 · refinery.css link)
- `UI_Refinery_Tile.html` (타일 카탈로그 · 정적 카테고리 chip(`.chip--static --pill`) · refinery.css link)
- `UI_Refinery_Login.html` (로그인/인증 화면 · refinery.css link)

---

## 핵심 작업 원칙

1. **토큰만 사용** — hex / px 리터럴을 컴포넌트에 직접 박지 않습니다. 색은 `var(--brand)`, `var(--ink-*)`, `var(--surface-*)`, `var(--good|warn|bad)`. 폰트는 `var(--font-en|kr|mono)`. 간격·반경은 정해진 스케일 값만.
2. **재사용 컴포넌트** — `.rfn-btn`, `.rfn-widget`, `.rfn-box`, `.rfn-table`, `.rfn-popover`, `.rfn-modal`, `.rfn-field`, `.rfn-tabs`, `.rfn-toast`, `.rfn-tooltip`, `.rfn-carousel`, `.rfn-inspector`, 그리고 `.rfn-badge`/`.chip`(`--static|quiet|pill|sm`)/`.rfn-seg`/`.rfn-toggle`/`.rfn-checkbox`/`.rfn-radio`/`.rfn-tree`/`.rfn-erd`·`.rfn-node` 등 **이미 정의된 컴포넌트만** 사용합니다 (전체 셀렉터 = `Refinery_DesignSystem_Guide.md` 부록 「컴포넌트 셀렉터 한눈에 보기」 / DS 페이지). 같은 의미의 새 컴포넌트를 만들지 않습니다.
3. **위계 보존** — Rail → Side → Topbar → Page → Widget 1depth → Widget 2depth 의 깊이/표면 위계를 그대로 따릅니다. **3depth 이상의 중첩은 금지** 합니다.
4. **모드 동등** — 라이트/다크 모드 양쪽에서 동일한 의미 인덱스의 톤을 유지합니다. CSS 변수 토큰만 호출하면 자동 적응됩니다.
5. **접근성** — icon-only 트리거에는 `title` 또는 `aria-label` 을 반드시 제공합니다. Focus 링은 절대 제거하지 않습니다.
6. **변경 금지** — 토큰 값 / 컴포넌트 스펙 변경이 필요할 때는 페이지가 아닌 디자인 시스템 자체를 먼저 확장합니다. 임의 hex / 임의 폰트 / 임의 컴포넌트를 새로 만들지 않습니다.

---

## 작업 시 자동 적용되는 규칙 요약

| 항목 | 항상 | 절대 안 됨 |
|---|---|---|
| 색 | 토큰 호출 | hex 리터럴 직접 사용 |
| 표면 | `--surface-rail / side / topbar / card / page` 5종 | Rail/Side/Topbar/Card 의 hex 직접 사용 |
| 폰트 | 영문 Roboto / 국문 Pretendard / 코드 Mono | 입력값·본문에 Mono |
| 아이콘 | Phosphor Regular | weight 혼용, 자체 아이콘 |
| 위젯 안 아이콘 | 콘텐츠 식별 = 의미 톤 자유 / 보조 신호(chevron·더보기·전체보기) = `ink-400`, 모두 MD(14px) | 콘텐츠 식별에 ink-400 강제 / 보조 신호에 brand·의미 컬러 |
| 그리드 | 16-col, span 합 = 16 | 임의 column 수 / 페이지별 breakpoint |
| 버튼 | Primary = Refined Blue 만 | Primary 외 변형에 Refined Blue |
| 위젯 | 1depth + 2depth 두 단계 | 3depth 이상, 2depth 에 shadow |
| 모달 | 4 사이즈(360/480/640/800), 4 의도 | 임의 px 너비, 모달 안 모달 |
| 페이지 상태 | Sub Nav / 페이지 1depth Tab 위치는 `refinery-{view}-state-v1` 키로 localStorage 영속화 → 새로고침 시 자동 복원 | 일시 UI(popover/modal/hover) 영속화 |

---

## 신규 페이지 작성 시 사용할 Skill

작업자가 "Refinery 새 페이지" / "신규 시안" 키워드를 사용하면 다음 Skill 이 자동으로 트리거됩니다.

- `refinery-html-page` — 가이드 워크플로우(`§6`) + 코드 템플릿(`§7`) + 최종 검수 체크리스트(`§8`) 를 한 번에 적용

Skill 본문 — `.claude/skills/refinery-html-page/SKILL.md`

---

## 파일 위치

```
.
├── CLAUDE.md                              ← 이 파일 (프로젝트 메모리)
├── refinery.css                           ← ★ CSS 단일 진실 공급원 (토큰·컴포넌트·셸·라우팅)
├── refinery-verify.sh                     ← 단일 소스 계약 무결성 검증기
├── Refinery_DesignSystem_Guide.md         ← 규칙 문서 (Do/Don't·토큰 표)
├── UI_Refinery_DesignSystem.html       ← 디자인시스템 레퍼런스 페이지 (refinery.css link)
├── UI_Refinery_Dashboard.html          ← 대시보드/모니터링 화면 (refinery.css link)
├── UI_Refinery_Ontology.html           ← Ontology · Object Types 포함 (refinery.css link)
├── UI_Refinery_Pipeline.html           ← 데이터 파이프라인 · 스키마 트리 · ERD (refinery.css link)
├── UI_Refinery_Plate.html              ← 대시보드 편집기 · 캔버스 + Inspector 도크 (refinery.css link)
├── UI_Refinery_Tile.html               ← 타일 카탈로그 · 정적 카테고리 chip (refinery.css link)
├── UI_Refinery_Login.html              ← 로그인/인증 화면 (refinery.css link)
├── fav_refienry-symbol.svg                ← 파비콘 (단일 정적)
└── .claude/
    └── skills/
        └── refinery-html-page/
            ├── SKILL.md                   ← Skill 본문
            ├── template.html              ← 신규 페이지 코드 골격
            └── checklist.md               ← 최종 검수 체크리스트
```

---

## 작업 종료 시 항상 수행

1. 라이트 모드와 다크 모드 양쪽에서 페이지가 의도된 색으로 렌더되는지 확인합니다.
2. `.claude/skills/refinery-html-page/checklist.md` 의 모든 항목을 통과시킵니다.
3. `bash refinery-verify.sh` 를 실행해 **exit 0(✅ 통과)** 을 확인합니다 — 모든 페이지가 `refinery.css` 만 link(인라인 `<style>`·토큰 hex 재도입·phantom `.rfn-*`·Cloudflare 잔재 0)함을 증명하는 단일 소스 게이트입니다. 색·폰트·사이즈·컴포넌트 변경은 **`refinery.css` 에서만** 합니다 (그 한 번으로 전 페이지 반영 · 재동기화 불필요).
4. 통과하지 못한 항목이 있으면 사용자에게 명시적으로 보고합니다 — 임의로 통과시키지 않습니다.
