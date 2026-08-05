import type { IndustryData } from './types';
import { energyEn } from './energy.en';

// 영어 산업 레지스트리. 새 영어 산업 = 데이터 파일 추가 후 여기에 등록하면
// /en/industries/<slug>가 자동 생성된다. (한국어는 index.ts)
export const industriesEn: IndustryData[] = [energyEn];
