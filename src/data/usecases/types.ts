// 유즈케이스(use case) 데이터 스키마. 페이지 템플릿(/use-cases/[slug])이 이 구조를 렌더한다.
export type HowPoint = { title: string; desc: string };

export type UseCase = {
  slug: string;
  name: string;          // 예: 예지보전
  eyebrow?: string;      // 상단 소제목(기본 USE CASE)
  tagline: string;       // 히어로 리드
  problem: string;       // 왜 필요한가(배경/문제)
  how: HowPoint[];       // 어떻게 해결하나(3~4개)
  signals: string[];     // 다루는 데이터·신호(칩)
  related?: { label: string; href: string }; // 관련 글/페이지
  seo: { title: string; description: string };
};
