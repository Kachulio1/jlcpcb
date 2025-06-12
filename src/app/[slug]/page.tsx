import { getContentBySlug, markdownToHtml } from '@/utils/mdx';
import { notFound } from 'next/navigation';

export default async function ContentPage({ params }: { params: { slug: string } }) {
  try {
    const { content } = getContentBySlug(params.slug);
    const contentHtml = await markdownToHtml(content);
    
    return (
      <article className="prose max-w-none">
        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </article>
    );
  } catch (error) {
    notFound();
  }
}

// Enable example G-code file listing on that page
export function generateStaticParams() {
  return [
    { slug: 'parts-list' },
    { slug: 'circuit-details' },
    { slug: 'arduino-code' },
    { slug: 'calibration-guide' },
    { slug: 'inkscape-guide' },
    { slug: 'ugs-guide' },
    { slug: 'troubleshooting' },
    { slug: 'example-gcode' },
  ];
}
