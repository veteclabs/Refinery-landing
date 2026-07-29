// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://refinery-ai-platform.vercel.app',
  // 정적 출력(기본). Vercel이 Astro를 자동 감지하여 dist/를 배포한다.
  integrations: [
    sitemap(), // 모든 라우트를 포함한 sitemap 자동 생성
  ],
});
