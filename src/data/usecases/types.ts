// 유즈케이스(use case) 데이터 스키마. 페이지 템플릿(/use-cases/[slug])이 이 구조를 렌더한다.
// 아래 선택 필드(icon·heroImage·template.image)는 넣은 유즈케이스에서만 렌더된다.
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

/** 다루는 데이터·신호 항목.
 *  문자열이면 아이콘 없이 라벨만, 객체면 아이콘을 함께 렌더한다.
 *  icon 값:
 *   - 'ph-'로 시작하면 Phosphor 아이콘 폰트(예: 'ph-waveform')
 *   - 그 외에는 src/icons/signals/<name>.svg (예: 'vibration')
 *  (아이콘은 signalsAsCards를 켠 유즈케이스에서만 보인다 — 칩 형태에는 표시하지 않는다) */
export type UseCaseSignal = string | { label: string; icon?: string };

export type HowPoint = {
  title: string;
  desc: string;
  /** Phosphor 아이콘 클래스(예: 'ph-broadcast'). BaseLayout에서 이미 로드된 폰트를 쓴다. */
  icon?: string;
};

export type UseCase = {
  slug: string;
  name: string;          // 예: 예지보전
  eyebrow?: string;      // 상단 소제목(기본 USE CASE)
  showBreadcrumb?: boolean; // 히어로 상단 위치 표시(Home › 유즈케이스 › ...). 기본 true
  showEyebrow?: boolean;    // 히어로 eyebrow(USE CASE) 노출. 기본 true
  /** 히어로 좌측을 헤더 로고 선에 맞춘다(nav와 동일한 1280/48 박스). 기본 false */
  heroAlignsWithNav?: boolean;
  /** 히어로 보조 버튼. 기본값은 '플랫폼 개요 →' / /why-refinery */
  heroSecondaryAction?: { label: string; href: string };
  tagline: string;       // 히어로 리드
  heroImage?: UseCaseImage; // 히어로 우측 시각 자료(선택). 있으면 히어로가 2컬럼이 된다.
  /** heroImage를 우측 컬럼 대신 히어로 배경으로 꽉 채운다(어두운 스크림 + 흰 글씨). 기본 false */
  heroImageAsBackground?: boolean;
  problem: string;       // 왜 필요한가(배경/문제)
  how: HowPoint[];       // 어떻게 해결하나(3~4개)
  template?: {           // 강조 밴드(템플릿/솔루션 하이라이트). badge 미지정 시 '템플릿으로 시작'
    title: string;
    desc: string;
    includes?: string[];
    badge?: string;
    image?: UseCaseImage; // 있으면 밴드가 2컬럼(설명 + 이미지)이 된다.
  };
  signals: UseCaseSignal[];  // 다루는 데이터·신호
  /** related 링크를 신호 섹션 제목 오른쪽 끝에 배치한다(홈 히어로의 '데모 신청하기'와 같은 형태). 기본 false */
  relatedAsHeaderLink?: boolean;
  /** 신호를 칩 대신 카드(원형 아이콘 자리 + 아래 텍스트)로 렌더한다. 기본 false */
  signalsAsCards?: boolean;
  /** '다른 과제' 목록을 신호 섹션과 CTA 사이에 노출한다(자기 자신 제외). 기본 false */
  showRelatedUseCases?: boolean;
  /** CTA 배경 이미지(public 기준 절대 경로). 지정하면 랜딩 CTA와 같은 형태
   *  (이미지 위 흰 글자 · 좌측 정렬)가 된다. 미지정 시 기존 흰 배경 CTA. */
  ctaBackgroundImage?: string;
  related?: { label: string; href: string }; // 관련 글/페이지
  seo: { title: string; description: string };
};
