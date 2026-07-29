// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://refinery-ai-platform.vercel.app',
  // 정적 출력(기본). Vercel이 Astro를 자동 감지하여 dist/를 배포한다.
  build: {
    // 기존 URL 보존: contact.astro → /contact.html (기존 href="contact.html" 링크 유지)
    format: 'file',
  },
  integrations: [
    sitemap(), // 모든 라우트를 포함한 sitemap 자동 생성
  ],
});
