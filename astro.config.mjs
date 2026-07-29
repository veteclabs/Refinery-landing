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
    // CSS를 <style>로 인라인(외부 CSS 렌더차단 요청 제거) — 원본과 동일한 단일 요청 로딩.
    // 랜딩/마케팅 페이지의 크리티컬 CSS 인라인 정석. (기본 'auto'는 4KB 미만만 인라인)
    inlineStylesheets: 'always',
  },
  integrations: [
    sitemap(), // 모든 라우트를 포함한 sitemap 자동 생성
  ],
});
