import type { IndustryData } from './types';

export const energy: IndustryData = {
  slug: 'energy',
  name: '에너지 · 유틸리티',
  pageTitle: '에너지·유틸리티를 위한 Refinery — 분산 설비 통합 관제·예지보전·ESG 자동화',
  description:
    'SCADA·EMS·미터에 흩어진 에너지 데이터를 하나로 연결하고, AI 에이전트가 이상을 먼저 감지하며 ESG 리포트를 자동화합니다. 발전·송배전·유틸리티 현장을 위한 Refinery.',
  hero: {
    eyebrow: 'INDUSTRIES · 에너지 · 유틸리티',
    title: '분산된 에너지 현장을\n하나의 지능으로 잇습니다',
    lede: 'SCADA·EMS·스마트미터에 흩어진 데이터를 온톨로지로 연결하고, AI 에이전트가 이상을 먼저 감지하고 원인을 설명합니다. 통합 관제부터 예지보전, ESG 리포트 자동화까지.',
  },
  challenges: {
    title: '에너지 현장의 과제',
    subtitle: '발전·송배전·유틸리티 운영에서 반복적으로 마주치는 문제들입니다.',
    items: [
      {
        title: '데이터가 흩어져 있다',
        description:
          '발전 설비·변전·미터 데이터가 SCADA·EMS·과금 시스템에 분산되어, 전체 현황을 한눈에 보기 어렵습니다.',
      },
      {
        title: '고장을 사후에 안다',
        description:
          '설비 이상이 정지·사고로 이어진 뒤에야 파악되는 경우가 많아, 예방적 대응이 어렵습니다.',
      },
      {
        title: 'ESG·규제 리포트가 수작업',
        description:
          '탄소 배출·에너지 소비 집계와 규제 리포트를 사람이 취합해, 시간이 걸리고 오류 여지가 큽니다.',
      },
      {
        title: '실시간 대응이 늦다',
        description:
          '수요·요금·기상 변동에 맞춰 소비를 조정하려면 여러 화면과 판단이 필요해, 대응이 지연됩니다.',
      },
    ],
  },
  useCases: {
    title: '대표 유즈케이스',
    subtitle: '에너지 현장에서 Refinery가 실제로 하는 일입니다.',
    items: [
      {
        title: '분산 설비 통합 관제',
        problem: 'SCADA·EMS·미터 데이터가 분리되어 통합 현황 파악이 어렵다.',
        approach: '현장 데이터를 온톨로지로 연결해 설비·계통·지점을 하나의 구조로 정의합니다.',
        outcome: '발전·송배전·소비 현황과 알람을 한 화면에서 실시간으로 관제.',
      },
      {
        title: '설비 예지보전',
        problem: '이상이 정지·사고로 번진 뒤에야 대응한다.',
        approach: '시계열 데이터에서 평소와 다른 패턴을 학습해 이상 징후를 조기에 포착합니다.',
        outcome: '고장 전 선제 대응으로 계획 외 정지와 다운타임 감소.',
      },
      {
        title: '에너지 효율 · 피크 최적화',
        problem: '소비 패턴이 보이지 않아 낭비와 피크 요금이 발생한다.',
        approach: '설비·구간별 소비를 분석하고, 요금·수요 신호에 따른 조정안을 제시합니다.',
        outcome: '피크 저감과 효율 개선으로 운영비 절감.',
      },
      {
        title: 'ESG · 탄소 리포트 자동화',
        problem: '배출·소비 집계와 규제 리포트가 수작업이다.',
        approach: '현장 데이터에서 배출·소비 지표를 자동 집계하고 리포트를 생성합니다.',
        outcome: '규제 대응 리포트를 자동으로, 출처까지 추적 가능하게.',
      },
      {
        title: '실시간 이상 감지 · 알람',
        problem: '이상 신호를 놓치거나 뒤늦게 인지한다.',
        approach: 'AI 에이전트가 실시간 데이터에서 이상을 감지하고 원인과 조치를 함께 제안합니다.',
        outcome: '문제를 조기에 인지하고, 근거 있는 다음 조치까지 확보.',
      },
    ],
  },
  architecture: {
    title: '솔루션 구조',
    subtitle: '현장 데이터가 의미를 얻고 의사결정으로 이어지는 흐름입니다.',
    steps: [
      { label: '현장', detail: '발전·변전 설비 · 스마트미터 · 센서' },
      { label: '연동', detail: 'SCADA·EMS · Modbus·OPC-UA·DNP3·IEC 61850' },
      { label: 'Refinery', detail: '온톨로지 · AI 에이전트 · 룰/자동화' },
      { label: '활용', detail: '통합 대시보드 · 알람 · ESG 리포트' },
    ],
    note: '기존 SCADA/EMS가 있으면 걷어내지 않고 그 위에 얹어 양방향 연동하고, 없는 현장은 수집부터 새로 구축합니다.',
  },
  benefits: {
    title: '도입 효과',
    subtitle: '운영·기술·경영 관점 모두에서 얻는 이점입니다.',
    items: [
      {
        title: '이상 조기 감지',
        description: '평소와 다른 신호를 실시간으로 포착해 정지·사고 리스크를 줄입니다.',
      },
      {
        title: '통합 관제',
        description: '분산된 설비·계통을 하나의 화면과 하나의 구조로 관제합니다.',
      },
      {
        title: '에너지 효율',
        description: '소비 패턴을 근거로 낭비와 피크를 찾아 운영비를 절감합니다.',
      },
      {
        title: 'ESG 자동화',
        description: '배출·소비 리포트를 자동 집계하고 출처를 추적합니다.',
      },
      {
        title: '현장 보안',
        description: '온프레미스 배포 시 데이터가 사내를 벗어나지 않고, OT/IT 경계를 보호합니다.',
      },
      {
        title: '통합 또는 신규 구축',
        description: '레거시 SCADA/EMS/ERP가 있으면 그 위에 얹어 양방향 통합하고, 없으면 처음부터 새로 구축합니다.',
      },
    ],
  },
  integrations: {
    title: '연동 시스템',
    subtitle: '에너지 현장에서 흔히 쓰는 시스템·프로토콜과 연결됩니다.',
    systems: ['SCADA', 'EMS', '스마트미터 · AMI', 'Modbus', 'OPC-UA', 'DNP3', 'IEC 61850', 'ERP'],
    note: '목록에 없는 시스템도 표준 프로토콜·API로 연동 가능합니다. 자세한 내용은 문의해 주세요.',
  },
  cta: {
    title: '에너지 현장에 맞는 답을\nRefinery 팀이 함께 찾아드립니다.',
    buttonLabel: '데모 신청하기',
  },
};
