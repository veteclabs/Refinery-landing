// 블로그 예상 읽는 시간(분) 추정.
// 이 프로젝트의 Astro 버전은 entry.body가 본문을 온전히 반환하지 않아,
// 원본 마크다운을 ?raw로 직접 읽어 분량을 센다.
// 하위 폴더(en/)까지 훑고, 키는 blog/ 기준 상대 경로라 'foo'와 'en/foo'가 구분된다.
const raw = import.meta.glob('../content/blog/**/*.{md,mdx}', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const bySlug: Record<string, string> = {};
for (const [path, content] of Object.entries(raw)) {
  const slug = path.replace(/^.*\/content\/blog\//, '').replace(/\.(md|mdx)$/, '');
  bySlug[slug] = content;
}

/** 마크다운에서 본문 텍스트만 남긴다(프런트매터·코드·이미지·기호 제거). */
function plainText(md: string): string {
  return md
    .replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '') // 프런트매터 제거
    .replace(/```[\s\S]*?```/g, '')                 // 코드 블록
    .replace(/`[^`]*`/g, '')                        // 인라인 코드
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')           // 이미지
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')        // 링크 → 텍스트만
    .replace(/[#>*_~`|-]/g, '');                    // 마크다운 기호
}

export function readingMinutesForSlug(slug: string): number {
  const text = plainText(bySlug[slug] ?? '');
  // 한국어는 공백을 뺀 글자 수 기준(약 500자/분), 영어는 단어 수 기준(약 200단어/분).
  // 같은 규칙을 쓰면 영어 글의 읽기 시간이 두 배 넘게 부풀려진다.
  if (slug.startsWith('en/')) {
    const words = text.split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(words / 200));
  }
  return Math.max(1, Math.ceil(text.replace(/\s+/g, '').length / 500));
}
