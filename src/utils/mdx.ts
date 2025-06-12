import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const contentDirectory = path.join(process.cwd(), 'content');

export function getContentFilePaths() {
  return fs.readdirSync(contentDirectory).filter(file => {
    return file.endsWith('.md') && file !== 'README.md';
  });
}

export function getContentBySlug(slug: string) {
  let filePath;
  
  // Special case for README.md (introduction)
  if (slug === 'introduction') {
    filePath = path.join(contentDirectory, 'README.md');
  } else {
    filePath = path.join(contentDirectory, `${slug}.md`);
  }
  
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);
  
  return {
    slug,
    frontmatter: data,
    content,
  };
}

export async function markdownToHtml(markdown: string) {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}

export function getAllContent() {
  const filePaths = getContentFilePaths();
  
  const allContent = filePaths.map(filePath => {
    const slug = filePath.replace(/\.md$/, '');
    return getContentBySlug(slug);
  });
  
  // Add README.md as "introduction"
  const introduction = getContentBySlug('introduction');
  
  return [introduction, ...allContent];
}

export function getNavigation() {
  const pages = [
    { slug: 'introduction', title: 'Introduction' },
    { slug: 'parts-list', title: 'Parts List' },
    { slug: 'circuit-details', title: 'Circuit Details' },
    { slug: 'arduino-code', title: 'Arduino Code' },
    { slug: 'calibration-guide', title: 'Calibration' },
    { slug: 'inkscape-guide', title: 'Inkscape Guide' },
    { slug: 'ugs-guide', title: 'UGS Guide' },
    { slug: 'troubleshooting', title: 'Troubleshooting' },
    { slug: 'example-gcode', title: 'Example G-code' },
  ];
  
  return pages;
}
