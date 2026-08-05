// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import fs from 'node:fs';

/**
 * dev 전용 — Vercel `cleanUrls: true`를 개발 서버에서 흉내낸다.
 *
 * 프로덕션은 확장자 없는 경로(`/agent-replay-demo`)로 `public/*.html`을 서빙하지만,
 * cleanUrls는 Vercel 기능이라 `astro dev`에는 없어 같은 경로가 404가 된다
 * (히어로 데모 iframe이 로컬에서만 빈 화면으로 보이던 원인).
 * 소스에 `.html`을 박으면 프로덕션에서 308 리다이렉트가 붙으므로, 개발 서버 쪽을 맞춘다.
 *
 * `public/<경로>.html`이 실제로 있을 때만 재작성하므로 Astro 라우트와 겹치지 않고,
 * 빌드 산출물·배포 동작에는 아무 영향이 없다.
 * @returns {import('astro').AstroIntegration}
 */
function devCleanUrls() {
  return {
    name: 'refinery-dev-clean-urls',
    hooks: {
      'astro:server:setup': ({ server }) => {
        const publicDir = new URL('./public/', import.meta.url);
        server.middlewares.use((req, _res, next) => {
          const url = req.url;
          if (!url || (req.method !== 'GET' && req.method !== 'HEAD')) return next();
          const [pathname, search] = url.split('?');
          // Astro/Vite 내부 경로·이미 확장자가 있는 요청·상위 경로 참조는 건드리지 않는다.
          if (pathname === '/' || pathname.startsWith('/@') || pathname.startsWith('/_')) return next();
          if (pathname.includes('..') || (pathname.split('/').pop() ?? '').includes('.')) return next();

          if (fs.existsSync(new URL('.' + pathname + '.html', publicDir))) {
            req.url = pathname + '.html' + (search ? '?' + search : '');
          }
          next();
        });
      },
    },
  };
}

// https://astro.build/config
export default defineConfig({
  site: 'https://refinery.kr',
  // 다국어: 한국어 기본(무접두사), 영어 /en/, 일본어 /ja/. 기존 한국어 URL 보존.
  i18n: {
    locales: ['ko', 'en', 'ja'],
    defaultLocale: 'ko',
    routing: { prefixDefaultLocale: false },
  },
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
    devCleanUrls(), // dev 서버에서만 동작(빌드·배포 무영향)
  ],
});
