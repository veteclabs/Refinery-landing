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
  /** 2026-08 개편 디자인을 적용한다(어두운 해법 섹션·큰 제목·넉넉한 섹션 여백 등).
   *  켜면 <main>에 uc-redesigned 클래스가 붙고 그 스코프의 스타일이 전부 걸린다.
   *  끄면(기본) 기존 유즈케이스 디자인 그대로다.
   *  히어로 배경·신호 카드·다른 과제 목록 같은 개별 요소는 아래 각 필드로 따로 켠다. */
  redesigned?: boolean;
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
  /** 위 problem을 유즈케이스 페이지 폭에 맞춰 <br>로 줄을 끊은 판.
   *  미지정 시 problem을 그대로 쓰고 자동 줄바꿈된다.
   *  problem과 따로 두는 이유: 산업별 페이지(/industries/[slug])에서도 쓰이는데
   *  거기는 폭이 좁아 여기 줄바꿈을 그대로 넣으면 엉뚱하게 끊긴다. */
  problemHtml?: string;
  how: HowPoint[];       // 어떻게 해결하나(3~4개)
  template?: {           // 강조 밴드(템플릿/솔루션 하이라이트). badge 미지정 시 '템플릿으로 시작'
    title: string;
    desc: string;
    includes?: string[];
    badge?: string;
    image?: UseCaseImage; // 있으면 밴드가 2컬럼(설명 + 이미지)이 된다.
    /** 밴드 우측 상단에 얹는 장식 이미지(선택). 글 뒤에 깔리는 배경 요소라
     *  내용을 담지 않는다(alt 없음, aria-hidden). image와 달리 레이아웃을 바꾸지 않는다. */
    decoImage?: string;
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
  /** CTA 제목. 과제명을 넣어 페이지마다 다르게 쓴다(<br>로 줄바꿈 지정).
   *  미지정 시 공통 문구 '우리 현장에 어떻게 적용될지 함께 살펴봐요.'를 쓴다. */
  ctaTitle?: string;
  /** 히어로 위계를 뒤집는다. 켜면 과제명이 제목 위 작은 태그라인으로 가고
   *  tagline 문장이 h1(대제목)이 된다. 아래 설명 문단은 중복이라 렌더하지 않는다.
   *  기본 false — 과제명이 h1, tagline이 설명 문단. */
  heroTaglineAsTitle?: boolean;
  /** 히어로 대제목. heroTaglineAsTitle을 켠 경우 tagline 대신 이 문구를 쓴다.
   *  히어로 폭에 맞춰 <br>로 줄을 직접 끊은 판이다(tagline은 유즈케이스 목록·
   *  다른 과제 카드에도 쓰여 폭이 달라, 거기에 <br>이 들어가면 엉뚱하게 끊긴다). */
  heroTitle?: string;
  /** '다른 과제' 카드의 배경 이미지. 넣으면 카드를 꽉 채우고 제목이 흰색이 된다.
   *  없으면 기존 흰 카드 그대로. 표시 381x240이므로 854x480(2배) 권장. */
  cardImage?: UseCaseImage;
  /** '다른 과제' 카드 설명. 카드 폭에 맞춰 <br>로 줄을 직접 끊은 판이다.
   *  미지정 시 tagline을 그대로 쓰고 자동 줄바꿈된다.
   *  tagline과 따로 두는 이유: tagline은 히어로(.ind-lede)와 유즈케이스 목록에도
   *  쓰이는데, 그쪽은 폭이 달라 여기 줄바꿈을 그대로 넣으면 엉뚱하게 끊긴다. */
  cardDesc?: string;
  related?: { label: string; href: string }; // 관련 글/페이지
  seo: { title: string; description: string };
};
