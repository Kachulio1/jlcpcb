import { getContentBySlug, markdownToHtml } from '@/utils/mdx';

export default async function Home() {
  const { content } = getContentBySlug('introduction');
  const contentHtml = await markdownToHtml(content);
  
  return (
    <article className="prose max-w-none">
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </article>
  );
}
