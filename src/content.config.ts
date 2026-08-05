import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 블로그 컬렉션: src/content/blog/*.md(x)
const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Refinery'),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    // 로케일. 영어 글은 src/content/blog/en/ 아래에 두고 lang: 'en'을 지정한다.
    // 한국어는 기본값이라 기존 글은 손대지 않아도 된다.
    lang: z.enum(['ko', 'en']).default('ko'),
    // 글별 OG 이미지(public 경로). 미지정 시 기본 og-image.png 사용.
    ogImage: z.string().optional(),
  }),
});

export const collections = { blog };
