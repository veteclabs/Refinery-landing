// 블로그 예상 읽는 시간(분) 추정.
// 이 프로젝트의 Astro 버전은 entry.body가 본문을 온전히 반환하지 않아,
// 원본 마크다운을 ?raw로 직접 읽어 글자 수를 센다. 한국어 기준 약 500자/분.
const raw = import.meta.glob('../content/blog/*.{md,mdx}', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const bySlug: Record<string, string> = {};
for (const [path, content] of Object.entries(raw)) {
  const slug = path.split('/').pop()!.replace(/\.(md|mdx)$/, '');
  bySlug[slug] = content;
}

function computeMinutes(md: string): number {
  const text = md
    .replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '') // 프런트매터 제거
    .replace(/```[\s\S]*?```/g, '')                 // 코드 블록
    .replace(/`[^`]*`/g, '')                        // 인라인 코드
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')           // 이미지
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')        // 링크 → 텍스트만
    .replace(/[#>*_~`|-]/g, '')                     // 마크다운 기호
    .replace(/\s+/g, '');                           // 공백 제거(한국어는 글자 수 기준)
  return Math.max(1, Math.ceil(text.length / 500));
}

export function readingMinutesForSlug(slug: string): number {
  return computeMinutes(bySlug[slug] ?? '');
}
