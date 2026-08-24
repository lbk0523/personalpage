import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async (context) => {
  const entries = (await getCollection('writing', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf(),
  );

  return rss({
    title: '이병관 — Writing',
    description: '게임과 일, AI, 만드는 것, 생활과 육아에 관해 씁니다.',
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
