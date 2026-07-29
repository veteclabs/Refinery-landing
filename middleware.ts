import { next } from '@vercel/edge';

// 홈(/)에서만 실행. 대상 /en 은 매처에 없으므로 리다이렉트 루프 없음.
export const config = {
  matcher: '/',
};

// 검색봇·프리뷰봇·성능측정 도구는 리다이렉트하지 않는다(SEO는 hreflang로 처리, PageSpeed는 KO 홈 측정).
const BOT_RE =
  /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|embedly|quora|pinterest|redditbot|whatsapp|telegram|discordbot|googlebot|bingbot|yandex|duckduck|baidu|lighthouse|headless|vercel|slackbot|linkedinbot|twitterbot/i;

export default function middleware(request: Request) {
  const url = new URL(request.url);
  if (url.pathname !== '/') return next();

  // 1) 봇 제외
  const ua = request.headers.get('user-agent') || '';
  if (BOT_RE.test(ua)) return next();

  // 2) 사용자가 스위처로 명시 선택한 언어(쿠키) 존중
  const cookie = request.headers.get('cookie') || '';
  const chosen = cookie.match(/(?:^|;\s*)lang=(ko|en)/);
  if (chosen) {
    return chosen[1] === 'en' ? Response.redirect(new URL('/en', url), 302) : next();
  }

  // 3) 쿠키 없으면 브라우저 최우선 언어로 판단. ko* 이면 한국어(그대로), 아니면 /en.
  const primary = (request.headers.get('accept-language') || '')
    .split(',')[0]
    .trim()
    .toLowerCase();
  const isKorean = primary.startsWith('ko');
  return isKorean ? next() : Response.redirect(new URL('/en', url), 302);
}
