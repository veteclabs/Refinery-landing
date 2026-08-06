import type { UseCase } from './types';

// 유즈케이스 목록. 순서 = 메뉴/목록 노출 순서.
export const useCases: UseCase[] = [
  {
    slug: 'predictive-maintenance',
    redesigned: true,
    ctaTitle: '예지보전, 우리 현장에 어떻게 적용될지<br>Refinery와 함께 확인해보세요.',
    name: '예지보전',
    // 히어로를 제목 중심으로 정리 — 위치 표시·eyebrow를 빼고 좌측을 헤더 로고 선에 맞춘다.
    showBreadcrumb: false,
    showEyebrow: false,
    heroAlignsWithNav: true,
    // 버튼 형태가 되면서 화살표가 어색해져 뺀다
    heroSecondaryAction: { label: '플랫폼 개요', href: '/why-refinery' },
    heroTaglineAsTitle: true,
    heroTitle: '무선 진동센서로 모터의 고장 전조를<br>읽어 멈춤과 손실을 줄입니다',
    tagline: '무선 진동센서로 모터의 고장 전조를 읽어 멈춤과 손실을 줄입니다.',
    heroImageAsBackground: true,
    heroImage: {
      src: '/use-cases/predictive-hero.webp',
      alt: '펌프와 배관이 늘어선 공장 기계실. 예지보전으로 상태를 감시하는 대상 설비다.',
      width: 1920,
      height: 1206,
    },
    problem:
      '달력에 맞춘 정비는 아직 쓸 수 있는 부품을 버리거나 교체 주기 사이에 발생하는 갑작스러운 고장을 놓칩니다. 시간은 설비의 실제 상태를 반영하지 못하는 기준이기 때문입니다. 그렇다고 사람이 직접 현장을 돌며 진동을 측정하거나 설비마다 유선 센서를 배선하는 것도 현실적으로 부담이 큽니다.',
    problemHtml:
      '달력에 맞춘 정비는 아직 쓸 수 있는 부품을 버리거나 교체 주기 사이에 발생하는 갑작스러운 고장을 놓칩니다.<br>시간은 설비의 실제 상태를 반영하지 못하는 기준이기 때문입니다.<br>그렇다고 사람이 직접 현장을 돌며 진동을 측정하거나 설비마다 유선 센서를 배선하는 것도 현실적으로 부담이 큽니다.',
    how: [
      { icon: 'ph-broadcast', title: '무선 진동센서 부착', desc: '배선 공사 없이 모터에 센서를 붙이면<br>LoRaWAN 무선으로 3축 진동과<br>온도를 실시간으로 보냅니다.' },
      { icon: 'ph-gauge', title: 'ISO-20816 기준 판정', desc: '3축 진동을 국제 표준(ISO-20816)<br>기준으로 판정해 지금 상태가 정상인지<br>주의인지 한눈에 보여줍니다.' },
      { icon: 'ph-trend-up', title: '추세 기반 조기 감지', desc: '순간값이 아니라 추세에서 이상을 읽어<br>오탐과 알람 피로를 줄이고 전조를<br>일찍 잡습니다.' },
      { icon: 'ph-lightbulb', title: '근거 있는 조치 제안', desc: 'AI가 원인 추정과 다음 조치를<br>근거 데이터 · 이력과 함께 제시합니다.' },
    ],
    signals: [
      { label: '3축 진동', icon: 'vibration' },
      { label: '온도', icon: 'temperature' },
      { label: '전류', icon: 'current' },
      { label: '가동 이력', icon: 'runtime' },
    ],
    // 본문에서 형제 유즈케이스로 가는 링크가 없어 막다른 길이던 것을 보완한다.
    // 우선 예지보전에서만 시험하고, 괜찮으면 나머지 6개에도 켠다.
    relatedAsHeaderLink: true,
    signalsAsCards: true,
    showRelatedUseCases: true,
    ctaBackgroundImage: '/use-cases/predictive-cta.webp',
    template: {
      badge: '무선 진동센서 · LoRaWAN',
      decoImage: '/use-cases/template-deco.webp',
      title: 'WISE-2410 무선 센서로 배선 없이 시작',
      desc: '배선 공사 없이, 모터에 부착만 하면 시작됩니다. Advantech WISE-2410 무선 진동센서가 3축 진동과 온도를 재고, WISE-6610 게이트웨이가 LoRaWAN으로 데이터를 모읍니다.<br>배터리로 오래 돌고 거친 산업 환경에서도 견딥니다.',
      includes: ['배선 불필요 · 부착식 설치', 'LoRaWAN 무선 · 최대 5km', '배터리 최장 2년 저전력', '내장 3축 가속도계 + 온도', 'ISO-20816 기준 진동 판정', 'IP66 · 동작온도 -20~85℃'],
    },
    related: { label: '예지보전은 무엇을 예측하는가', href: '/blog/predictive-maintenance' },
    seo: {
      title: '예지보전 · 무선 진동 모니터링(WISE-2410) | Refinery',
      description: 'WISE-2410 무선 진동센서(LoRaWAN)로 배선 없이 3축 진동을 측정하고, ISO-20816 기준으로 모터 상태를 판정합니다. 전조를 일찍 잡아 다운타임을 줄이는 예지보전.',
    },
  },
  {
    slug: 'sensor-monitoring',
    ctaTitle: '센서 모니터링, 우리 현장에 어떻게 적용될지<br>Refinery와 함께 확인해보세요.',
    cardDesc: '진동 · 온도 · 전력 · 환경까지 흩어진 센서를<br>한 구조로 모아 감시합니다.',
    name: '센서 모니터링',
    cardImage: {
      src: '/use-cases/cards/sensor-monitoring.webp',
      alt: '',
      width: 854,
      height: 480,
    },
    tagline: '진동·온도·전력·환경까지, 흩어진 센서를 한 구조로 모아 감시합니다.',
    problem:
      '설비마다 다른 센서와 프로토콜이 섞여 있어, 데이터가 한곳에서 읽히지 않습니다. 신호가 흩어져 있으면 이상을 종합해 판단하기 어렵습니다.',
    how: [
      { title: '다중 센서 수집', desc: 'IoT 센서부터 기존 계측기까지 다양한 소스를 표준화해 한곳에 모읍니다.' },
      { title: '온톨로지로 연결', desc: '각 신호가 어느 설비의 무엇인지 의미를 부여해 함께 해석합니다.' },
      { title: '실시간 이상 감시', desc: '여러 신호를 한 화면에서 보고, 평소와 다른 조합을 잡아냅니다.' },
    ],
    signals: ['진동', '온도', '습도', '전력', '압력', '유량'],
    related: { label: '산업 데이터를 자산으로 만드는 5가지 원칙', href: '/blog/industrial-data-best-practices' },
    seo: {
      title: '센서 모니터링(IoT) | Refinery',
      description: 'IoT 센서부터 기존 계측기까지 흩어진 다중 센서를 표준화해 모으고, 온톨로지로 연결해 실시간으로 감시합니다.',
    },
  },
  {
    slug: 'power-management',
    ctaTitle: '전력관리, 우리 현장에 어떻게 적용될지<br>Refinery와 함께 확인해보세요.',
    cardDesc: '언제 어디서 얼마나 쓰는지 데이터로 파악해<br>전력 비용과 리스크를 줄입니다.',
    name: '전력관리',
    cardImage: {
      src: '/use-cases/cards/power-management.webp',
      alt: '',
      width: 854,
      height: 480,
    },
    tagline: '언제 어디서 얼마나 쓰는지 데이터로 파악해, 전력 비용과 리스크를 줄입니다.',
    problem:
      '전기 요금 고지서에는 총액과 피크 몇 가지만 찍혀 나옵니다. 정작 그 전력을 어느 설비가, 어느 시간대에, 왜 그만큼 썼는지는 거기 없습니다. 설비마다 계량이 따로 놀고 기록도 흩어져 있으니, 요금이 오르면 원인을 찾기보다 그냥 아껴 쓰라는 지시로 끝나기 쉽습니다. 계약전력을 넘겨 피크 요금을 무는 일도 지나고 나서야 고지서를 보고 아는 경우가 많습니다.',
    how: [
      { title: '사용 가시화', desc: '설비와 구역, 시간대를 함께 놓고 전력을 봅니다. 어느 설비가 언제 얼마나 쓰는지가 한 화면에 모이면, 막연하던 소비가 눈에 잡히기 시작합니다.' },
      { title: '피크 관리', desc: '여러 설비가 동시에 돌아 피크를 만드는 순간을 찾습니다. 가동 시점을 조금씩 어긋나게 하거나 부하를 나누면, 계약전력과 피크 요금이 함께 내려갑니다.' },
      { title: '이상 사용 감지', desc: '평소 패턴에서 벗어난 소비를 잡아냅니다. 꺼져 있어야 할 시간에 도는 설비나 슬그머니 늘어난 대기 전력이 여기서 드러납니다.' },
      { title: '역률 · 부하 점검', desc: '역률이 떨어지거나 부하가 한쪽으로 쏠리면 요금과 설비 수명에 영향을 줍니다. 그런 부분을 짚어 개선할 여지를 알려줍니다.' },
    ],
    template: {
      title: '전력관리 템플릿으로 시작',
      desc: '전력을 처음 들여다보는 현장이라면 무엇부터 재고 어떻게 봐야 할지 막막합니다. 그동안 여러 현장을 거치며 정리해 둔 전력관리 템플릿에는 설비별 계량을 어떻게 잡고 피크와 역률을 어떤 기준으로 볼지가 이미 담겨 있습니다. 우리 설비 목록과 계약 조건만 맞춰 넣으면 구조를 처음부터 짤 필요 없이 바로 보기 시작할 수 있습니다.',
      includes: ['설비·구역별 전력 계량 구조', '피크 · 계약전력 관리 기준', '역률 · 부하율 대시보드', '이상 사용 알람 규칙'],
    },
    signals: ['유효/무효 전력', '역률', '부하율', '시간대별 소비', '피크'],
    related: { label: '낭비는 어디에 숨어 있나: 에너지 최적화의 시작', href: '/blog/energy-optimization' },
    seo: {
      title: '전력관리 | Refinery',
      description: '설비·구역·시간대별 전력 사용을 가시화하고, 피크를 관리하며, 이상 사용을 조기에 감지해 전력 비용과 리스크를 줄입니다.',
    },
  },
  {
    slug: 'power-quality',
    ctaTitle: '전력품질, 우리 현장에 어떻게 적용될지<br>Refinery와 함께 확인해보세요.',
    cardDesc: '전압 변동 · 고조파 · 순간 정전 같은 품질 이상을<br>실시간으로 감시합니다.',
    name: '전력품질',
    cardImage: {
      src: '/use-cases/cards/power-quality.webp',
      alt: '',
      width: 854,
      height: 480,
    },
    tagline: '전압 변동·고조파·순간 정전 같은 품질 이상을 실시간으로 감시합니다.',
    problem:
      '설비가 이유 없이 멈추거나 멀쩡하던 라인에서 불량이 늘 때가 있습니다. 원인을 한참 찾다 보면 전력품질이 범인인 경우가 적지 않습니다. 순간적인 전압 강하나 고조파는 눈에 보이지도 오래 남지도 않아서, 상시로 지켜보지 않으면 지나간 뒤엔 흔적을 잡기 어렵습니다. 그래서 "왜 하필 그때 멈췄는지"가 끝내 미제로 남곤 합니다.',
    how: [
      { title: '품질 지표 감시', desc: '전압과 주파수, 고조파, 불평형 같은 지표를 실시간으로 지켜봅니다. 기준을 벗어나는 순간을 놓치지 않습니다.' },
      { title: '이벤트 자동 기록', desc: '순간 전압 강하(sag)나 상승(swell), 짧은 정전처럼 스쳐 지나가는 사건을 자동으로 기록해 둡니다. 나중에 되짚어 볼 근거가 남습니다.' },
      { title: '원인 연결', desc: '품질 이상이 언제 어느 설비 근처에서 있었는지를 가동·고장 이력과 겹쳐 봅니다. 멈춤이나 불량과 시점이 맞는지 확인하면, 막연한 의심이 근거로 바뀝니다.' },
      { title: '영향 구분', desc: '어느 이상이 실제로 문제를 일으켰고 어느 것은 그냥 지나갔는지 나눠, 먼저 손봐야 할 순서를 정합니다.' },
    ],
    template: {
      title: '전력품질 감시 템플릿으로 시작',
      desc: '무엇을 어느 기준으로 감시할지는 현장마다 조금씩 다르지만 큰 틀은 비슷합니다. 여러 현장에서 쓰던 전력품질 감시 템플릿에는 주요 지표와 판단 기준, 자주 문제가 되는 이벤트 유형이 미리 정리돼 있습니다. 계측 지점과 설비만 연결하면, 어디를 어떻게 볼지 고민하는 단계를 건너뛰고 감시부터 시작할 수 있습니다.',
      includes: ['전압·주파수·고조파 감시 항목', 'sag/swell · 정전 이벤트 기준', '설비 이력 연계 뷰', '품질 이상 알람 규칙'],
    },
    signals: ['전압', '주파수', '고조파(THD)', '불평형', 'sag/swell'],
    related: { label: '산업 데이터를 자산으로 만드는 5가지 원칙', href: '/blog/industrial-data-best-practices' },
    seo: {
      title: '전력품질 감시 | Refinery',
      description: '전압·주파수·고조파·불평형 등 전력품질 지표를 실시간 감시하고, 순간 이벤트를 자동 기록해 설비 고장·불량의 숨은 원인을 짚습니다.',
    },
  },
  {
    slug: 'factory-energy',
    ctaTitle: '공장 에너지관리, 우리 현장에 어떻게 적용될지<br>Refinery와 함께 확인해보세요.',
    cardDesc: '공장 전체의 에너지 흐름을 한곳에서 보고<br>낭비와 배출을 함께 줄입니다.',
    cardImage: {
      src: '/use-cases/cards/factory-energy.webp',
      alt: '',
      width: 854,
      height: 480,
    },
    name: '공장 에너지관리',
    tagline: '공장 전체의 에너지 흐름을 한곳에서 보고, 낭비와 배출을 함께 줄입니다.',
    problem:
      '공장은 전기·가스·스팀·용수 등 여러 에너지를 함께 씁니다. 그런데 이 소비가 부서별·설비별·시간대별로 흩어져 기록되어, 어디서 얼마나 왜 쓰는지가 한눈에 보이지 않습니다. 전체 흐름이 안 보이니 어디를 줄여야 할지 근거를 잡기 어렵고, 절감은 감에 의존하게 됩니다. ESG 보고를 위한 집계도 매번 수작업으로 반복됩니다.',
    how: [
      { title: '통합 계량', desc: '전기·가스·스팀·용수와 설비별 소비를 한 구조로 모아, 공장 전체의 에너지 흐름을 하나의 화면에서 봅니다.' },
      { title: '원단위 분석', desc: '생산량 대비 에너지 사용(원단위)을 비교해, 같은 일을 하는데 더 많이 쓰는 구간과 시점을 찾아냅니다.' },
      { title: '피크 · 부하 관리', desc: '여러 설비가 몰려 피크를 만드는 시점을 파악해 부하를 분산하고, 계약전력과 요금 피크를 낮춥니다.' },
      { title: 'ESG 자동 집계', desc: '소비와 배출을 출처와 함께 자동 집계해, 리포트를 수작업 없이 만들고 근거를 추적합니다.' },
    ],
    template: {
      title: '에너지경영시스템 템플릿으로 빠르게 시작',
      desc: '새로 시작하는 현장도 구조를 처음부터 설계할 필요가 없습니다. 30년간 여러 현장에서 다져 온 에너지경영시스템(EnMS) 템플릿에는 계량 구조부터 원단위 KPI, ESG 리포트 양식, 이상·피크 알람 규칙까지 이미 들어 있습니다. 현장의 설비와 목표에 맞게 조정만 하면, 검증된 구조 위에서 곧바로 운영을 시작할 수 있습니다.',
      includes: ['에너지원·설비 계량 구조', '원단위 KPI · 대시보드', 'ESG 리포트 양식', '이상 소비 · 피크 알람 규칙'],
    },
    signals: ['전기·가스·스팀·용수', '생산량', '배출량', '원단위', '피크'],
    related: { label: '낭비는 어디에 숨어 있나: 에너지 최적화의 시작', href: '/blog/energy-optimization' },
    seo: {
      title: '공장 에너지관리(FEMS) | Refinery',
      description: '공장 전체의 전기·가스·스팀·용수 흐름을 통합 계량하고 원단위로 분석해 낭비를 찾고, ESG 리포트를 자동으로 집계합니다.',
    },
  },
  {
    slug: 'energy-optimization',
    ctaTitle: '에너지 최적화, 우리 현장에 어떻게 적용될지<br>Refinery와 함께 확인해보세요.',
    cardDesc: '숨은 낭비와 피크를 데이터로 찾아 같은 일을<br>더 적은 비용으로 합니다.',
    cardImage: {
      src: '/use-cases/cards/energy-optimization.webp',
      alt: '',
      width: 854,
      height: 480,
    },
    name: '에너지 최적화',
    tagline: '숨은 낭비와 피크를 데이터로 찾아, 같은 일을 더 적은 비용으로 합니다.',
    problem:
      '낭비는 큰 설비보다 눈에 잘 띄지 않는 곳에 흩어져 있습니다. 총량만 봐서는 어디를 손봐야 할지 보이지 않습니다.',
    how: [
      { title: '낭비 발굴', desc: '소비 패턴을 작업 맥락에 겹쳐 비효율을 찾습니다.' },
      { title: '피크 저감', desc: '피크가 생기는 시점을 파악해 부하를 분산합니다.' },
      { title: '지속 관리', desc: '개선 효과를 추적해 다시 새지 않게 관리합니다.' },
    ],
    signals: ['시간대별 소비', '피크', '원단위'],
    related: { label: '낭비는 어디에 숨어 있나: 에너지 최적화의 시작', href: '/blog/energy-optimization' },
    seo: {
      title: '에너지 최적화 | Refinery',
      description: '숨은 낭비와 피크를 데이터로 찾아 에너지 비용을 줄입니다. 소비 패턴을 작업 맥락과 겹쳐 비효율을 발굴하는 유즈케이스.',
    },
  },
  {
    slug: 'quality-prediction',
    ctaTitle: '품질 예측, 우리 현장에 어떻게 적용될지<br>Refinery와 함께 확인해보세요.',
    cardDesc: '공정 데이터에서 불량의 전조를 읽어<br>완성 전에 잡습니다.',
    cardImage: {
      src: '/use-cases/cards/quality-prediction.webp',
      alt: '',
      width: 854,
      height: 480,
    },
    name: '품질 예측',
    tagline: '공정 데이터에서 불량의 전조를 읽어, 완성 전에 잡습니다.',
    problem:
      '완성품 검사에서 불량을 찾으면 이미 자재와 시간이 들어간 뒤입니다. 완성품만 봐서는 원인도 알기 어렵습니다.',
    how: [
      { title: '공정-품질 연결', desc: '공정 조건과 검사 결과를 이어, 어떤 조건이 불량과 상관 있는지 봅니다.' },
      { title: '전조 감지', desc: '온도·압력·원료 특성의 미세 변화에서 불량 전조를 읽습니다.' },
      { title: '사전 경고', desc: '위험 구간에 들어서면 근거와 함께 조치를 안내합니다.' },
    ],
    signals: ['온도', '압력', '원료 로트', '공정 조건', '검사 결과'],
    related: { label: '불량이 나오기 전에: 품질 예측의 현실', href: '/blog/quality-prediction' },
    seo: {
      title: '품질 예측 | Refinery',
      description: '공정 데이터에서 불량의 전조를 읽어 완성 전에 잡습니다. 공정과 검사 결과를 연결해 원인을 짚는 품질 예측 유즈케이스.',
    },
  },
];

export const findUseCase = (slug: string) => useCases.find((u) => u.slug === slug);
