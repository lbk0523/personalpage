import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async (context) => {
  const entries = (await getCollection('writing', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf(),
  );

  return rss({
    title: '이병관 — Writing',
    description: '게임과 일, 시스템, 개인 프로젝트와 삶에서 생긴 질문과 생각을 기록합니다.',
    site: context.site ?? new URL('https://personalpage.example'),
    customData: '<language>ko</language>',
    items: entries.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      pubDate: entry.data.publishedAt,
      link: `/writing/${entry.id}/`,
      categories: entry.data.topics,
    })),
  });
};
