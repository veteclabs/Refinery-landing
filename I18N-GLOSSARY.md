# 한국어–영어 용어집 (Refinery)

영어 페이지에서 실제로 쓰고 있는 대응어와 그 선택 근거를 모았다.
`I18N-PLAN.md`의 **원어민 검수** 단계에서 이 문서를 먼저 보면, 전체를 읽는 대신
**결정이 갈리는 지점만** 확인할 수 있다.

- **상태 표기**: ✅ 표준 용어라 이견이 적음 · ⚠️ 검수 필요(지역·업계에 따라 갈림) · 🔵 자체 조어
- 용어를 바꾸면 반영해야 할 파일은 각 표 아래에 적었다.

---

## 0. 표기 규칙 (확정)

| 항목 | 규칙 |
|---|---|
| 철자 | **미국식**. `optimization`·`organization`·`analyze`·`judgment`·`program`·`toward` |
| 인용부호 구두점 | **미국식** — 마침표·쉼표를 닫는 따옴표 **안쪽**에. `"…wrong."` |
| 아포스트로피 | 곡선 `’` (직선 `'` 사용 금지) |
| 대시 | em dash `—` (양옆 공백 있음) |
| 날짜 | `en-US` — `July 30, 2026` |
| 제목 대소문자 | **문장형(sentence case)**. `Power management` (○) / `Power Management` (×) |

> `analysis`·`realistic`처럼 영·미 공통인 단어는 그대로 둔다.

---

## 1. 제품·플랫폼

| 한국어 | 영어 | 상태 | 메모 |
|---|---|---|---|
| 온톨로지 | ontology | ✅ | 업계 표준어 |
| AI 에이전트 | AI agent | ✅ | |
| 통합 지능 레이어 | integrated intelligence layer | 🔵 | **자체 조어.** 영어권에서 자연스럽게 읽히는지 확인 필요. 대안: `unified intelligence layer` |
| 데이터 계보 | data lineage | ✅ | |
| 파이프라인 | pipeline | ✅ | |
| 자동화 · 워크플로우 | automation & workflows | ✅ | |
| 근거 있는 / 근거를 들어 | evidence-backed / with evidence | ⚠️ | 마케팅 톤 문제. `explainable`을 쓸지 검토 |
| 전조 | early signs | ⚠️ | 기술 문서라면 `precursors`·`leading indicators`가 더 정확할 수 있음 |
| 현장 | site / field / plant | ⚠️ | **문맥마다 다르게 옮겼다.** 통일할지 결정 필요 (아래 §7) |

## 2. 설비·예지보전

| 한국어 | 영어 | 상태 |
|---|---|---|
| 예지보전 | predictive maintenance | ✅ |
| 예방정비 | preventive maintenance | ✅ |
| 3축 진동 | 3-axis vibration | ✅ |
| 가동 이력 | runtime history | ⚠️ `operating history`도 흔함 |
| 베어링 마모 | bearing wear | ✅ |
| 다운타임 / 계획 외 정지 | downtime / unplanned stoppage | ✅ |
| 무선 진동센서 | wireless vibration sensor | ✅ |
| 게이트웨이 | gateway | ✅ |

고유명사는 그대로 둔다 — `WISE-2410`, `WISE-6610`, `LoRaWAN`, `ISO 20816`, `IP66`.
> 한국어 본문은 `ISO-20816`(하이픈), 영어는 `ISO 20816`(공백)으로 썼다. 영어 표기는 공백이 표준이다.

## 3. 전력

| 한국어 | 영어 | 상태 | 메모 |
|---|---|---|---|
| 전력품질 | power quality | ✅ | |
| 역률 | power factor | ✅ | |
| 부하율 | load ratio | ⚠️ `load factor`가 더 일반적일 수 있음 |
| **계약전력** | **contracted demand** | ⚠️ | **가장 확인이 필요한 항목.** 미국은 `contracted capacity`·`demand charge`를 더 씀 |
| 피크 | peak | ✅ | |
| 유효/무효 전력 | active/reactive power | ✅ | 미국에서 `real/reactive power`도 씀 |
| 고조파(THD) | harmonics (THD) | ✅ | |
| 불평형 | imbalance | ✅ | |
| 순간 전압 강하 / 상승 | sag / swell | ✅ | 업계 표준어 |
| 전압 · 주파수 | voltage · frequency | ✅ | |

## 4. 에너지·ESG

| 한국어 | 영어 | 상태 | 메모 |
|---|---|---|---|
| **원단위** | **energy intensity** | ⚠️ | 표준 용어는 맞음. 업계 관용어 확인 권장 |
| 에너지경영시스템 | energy management system (EnMS) | ✅ | ISO 50001 용어 |
| 공장 에너지관리 | factory energy management (FEMS) | ✅ | |
| 에너지 최적화 | energy optimization | ✅ | |
| 배출량 | emissions | ✅ | |
| 생산량 | output | ⚠️ `production volume`이 더 명확할 수 있음 |
| 전기·가스·스팀·용수 | electricity · gas · steam · water | ✅ | |
| 낭비 | waste | ✅ | |

## 5. 품질·공정

| 한국어 | 영어 | 상태 |
|---|---|---|
| 품질 예측 | quality prediction | ✅ |
| 불량 | defect | ✅ |
| 원료 로트 | material lot | ✅ |
| 공정 조건 | process conditions | ✅ |
| 검사 결과 | inspection results | ✅ |
| 완성품 검사 | final inspection | ✅ |

## 6. 시스템·프로토콜

약어는 번역하지 않고 그대로 쓴다.

`SCADA` · `MES` · `ERP` · `EMS` · `AMI` · `Modbus` · `OPC-UA` · `DNP3` · `IEC 61850` · `OT/IT`

| 한국어 | 영어 | 상태 |
|---|---|---|
| 스마트미터 | smart meters | ✅ |
| 온프레미스 | on-premises | ✅ `on-premise`(단수)는 쓰지 않는다 |
| 연동 | integration / connect | ✅ |
| 레거시 | legacy | ✅ |

## 7. 사이트 UI·내비게이션

헤더·푸터는 한국어와 **같은 축**을 쓴다. → `src/i18n/nav.ts`

| 한국어 | 영어 |
|---|---|
| 솔루션 | Solutions |
| 산업별 | By industry |
| 과제별 | By challenge |
| 리소스 | Resources |
| 회사 / 회사 소개 | Company / About |
| 문의하기 | Contact |
| 데모 신청하기 | Request a demo |
| 자료실 · 백서 | Resources & whitepapers |
| 문서 | Docs |
| 약관 | Legal |
| 준비중 | Soon |
| 왜 필요한가 | Why it matters |
| Refinery는 이렇게 풉니다 | How Refinery solves it |
| 다루는 데이터·신호 | Data and signals |
| 템플릿으로 시작 | Start from a template |
| 더 읽어보기 | Read more |
| 목차 | Contents |
| 이전 글 / 다음 글 | Previous / Next |
| 약 N분 읽기 | N min read |

### ⚠️ "현장"을 어떻게 옮길지

한국어 카피에서 가장 자주 나오는 단어인데, 영어에는 1:1 대응어가 없어 문맥별로 나눠 썼다.
**검수 시 통일 여부를 결정해야 한다.**

| 문맥 | 현재 영어 | 예 |
|---|---|---|
| 사업장 일반 | `site` | "problems on industrial **sites**" |
| 공장 건물 | `plant` | "walked the **plants** themselves" |
| 현장 직군·경험 | `field` | "**field** engineers" |
| 작업 현장 | `the floor` | "people who have been on **the floor**" |

---

## 8. 브랜드 카피 (번역이 아니라 결정)

아래는 직역이 아니라 영어 카피로 새로 쓴 문장이다. **가장 먼저 검수받아야 할 대상.**

| 위치 | 영어 |
|---|---|
| 회사 h1 | Industrial AI built by people who know the field |
| 회사 스토리 h2 | Built by people who have been on the floor |
| 블로그 h1 | Insight & news |
| 문의 히어로 | Let's find the answer that fits your operation, together. |
| 유즈케이스 CTA | Let's look at how this fits your operation. |
| 산업 CTA | Let's find the answer that fits your energy operation, together. |

> 위 문장의 아포스트로피는 실제 파일에서 곡선(`’`)이다.

---

## 용어를 바꿀 때 고쳐야 할 파일

| 대상 | 파일 |
|---|---|
| 유즈케이스 본문 | `src/data/usecases/en.ts` |
| 산업 본문 | `src/data/industries/energy.en.ts` |
| 헤더·푸터·CTA | `src/i18n/nav.ts` |
| 페이지 UI 문구 | `src/components/{UseCase,Industry,Contact,Company,Docs,Resources}Page.astro`의 `T` 사전 |
| 블로그 UI 문구 | `src/layouts/BlogPost.astro`의 `T` 사전 |
| 블로그 본문 | `src/content/blog/en/*.md` |

**한국어 파일(`index.ts`·`energy.ts`·`src/content/blog/*.md`)은 건드리지 않는다.**

---

## 검수 순서 제안

1. **§8 브랜드 카피** — 톤 결정이라 다른 것보다 먼저
2. **§3 계약전력**, **§4 원단위**, **§1 통합 지능 레이어** — 잘못되면 전문성 신뢰를 잃는 항목
3. **§7 "현장"** 통일 여부
4. 블로그 5편 전체 정독

> 약관 3종(개인정보처리방침·이용약관·쿠키 정책)은 **영어판을 만들지 않았다.**
> 법적 효력이 있어 전문 번역이 필요하다고 판단해 한국어 원문으로 연결해 두었다.
