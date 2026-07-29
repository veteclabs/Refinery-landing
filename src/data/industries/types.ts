// 산업 페이지 데이터 스키마 (ThingsBoard의 데이터 주도 유즈케이스 패턴 참고)
// 새 산업 = 이 타입에 맞는 데이터 파일 1개 추가 + index.ts 등록.

export interface Challenge {
  title: string;
  description: string;
}

export interface UseCase {
  title: string;
  problem: string;   // 산업 현장의 문제
  approach: string;  // Refinery의 접근
  outcome: string;   // 기대 성과
}

export interface Benefit {
  title: string;
  description: string;
}

export interface FlowStep {
  label: string;
  detail: string;
}

export interface IndustryData {
  slug: string;            // URL: /industries/<slug>
  name: string;            // 예: 에너지 · 유틸리티
  pageTitle: string;       // <title> (SEO)
  description: string;     // meta description (SEO)
  hero: {
    eyebrow: string;
    title: string;
    lede: string;
  };
  challenges: {
    title: string;
    subtitle?: string;
    items: Challenge[];
  };
  useCases: {
    title: string;
    subtitle?: string;
    items: UseCase[];
  };
  architecture: {
    title: string;
    subtitle?: string;
    steps: FlowStep[];   // 현장 → 연동 → Refinery → 활용 흐름
    note?: string;
  };
  benefits: {
    title: string;
    subtitle?: string;
    items: Benefit[];
  };
  integrations: {
    title: string;
    subtitle?: string;
    systems: string[];   // 해당 산업의 연동 시스템/프로토콜
    note?: string;
  };
  cta: {
    title: string;
    buttonLabel: string;
  };
}
