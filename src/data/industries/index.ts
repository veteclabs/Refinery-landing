import type { IndustryData } from './types';
import { energy } from './energy';

// 산업 레지스트리. 새 산업 = 데이터 파일 추가 후 여기에 등록하면 /industries/<slug> 자동 생성.
export const industries: IndustryData[] = [energy];

export const industriesBySlug: Record<string, IndustryData> = Object.fromEntries(
  industries.map((i) => [i.slug, i])
);
