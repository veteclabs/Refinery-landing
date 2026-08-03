// 유즈케이스(use case) 데이터 스키마. 페이지 템플릿(/use-cases/[slug])이 이 구조를 렌더한다.
// 아래 선택 필드(icon·heroImage·flow·template.image)는 넣은 유즈케이스에서만 렌더된다.
// 미지정 시 기존과 동일하게 동작하므로 다른 유즈케이스에는 영향이 없다.

/** 이미지 슬롯. CLS 방지를 위해 width/height는 필수. src는 public/ 기준 절대 경로. */
export type UseCaseImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** 캡션(선택). 화면 아래 작은 설명. */
  caption?: string;
};

export type HowPoint = {
  title: string;
  desc: string;
  /** Phosphor 아이콘 클래스(예: 'ph-broadcast'). BaseLayout에서 이미 로드된 폰트를 쓴다. */
  icon?: string;
};

/** 도입·처리 흐름 단계(현장 → 수집 → 판정 → 조치). */
export type FlowStep = { label: string; detail: string };

export type UseCase = {
  slug: string;
  name: string;          // 예: 예지보전
  eyebrow?: string;      // 상단 소제목(기본 USE CASE)
  tagline: string;       // 히어로 리드
  heroImage?: UseCaseImage; // 히어로 우측 시각 자료(선택). 있으면 히어로가 2컬럼이 된다.
  problem: string;       // 왜 필요한가(배경/문제)
  how: HowPoint[];       // 어떻게 해결하나(3~4개)
  flow?: {               // 흐름 섹션(선택). 산업 페이지의 architecture와 같은 표현.
    title: string;
    subtitle?: string;
    steps: FlowStep[];
    note?: string;
  };
  template?: {           // 강조 밴드(템플릿/솔루션 하이라이트). badge 미지정 시 '템플릿으로 시작'
    title: string;
    desc: string;
    includes?: string[];
    badge?: string;
    image?: UseCaseImage; // 있으면 밴드가 2컬럼(설명 + 이미지)이 된다.
  };
  signals: string[];     // 다루는 데이터·신호(칩)
  related?: { label: string; href: string }; // 관련 글/페이지
  seo: { title: string; description: string };
};
