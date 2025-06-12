'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavItemProps = {
  href: string;
  title: string;
  isActive: boolean;
};

const NavItem = ({ href, title, isActive }: NavItemProps) => {
  return (
    <li>
      <Link 
        href={href} 
        className={`px-4 py-2 transition-colors duration-200 ${
          isActive 
            ? 'text-blue-700 font-medium border-b-2 border-blue-700' 
            : 'text-gray-700 hover:text-blue-700'
        }`}
      >
        {title}
      </Link>
    </li>
  );
};

type NavigationProps = {
  items: Array<{ slug: string; title: string }>;
};

export default function Navigation({ items }: NavigationProps) {
  const pathname = usePathname();
  
  return (
    <nav className="my-8 border-b border-gray-200">
      <ul className="flex flex-wrap gap-2 pb-1">
        {items.map((item) => {
          const href = item.slug === 'introduction' ? '/' : `/${item.slug}`;
          const isActive = 
            (item.slug === 'introduction' && pathname === '/') || 
            (pathname === `/${item.slug}`);
            
          return (
            <NavItem 
              key={item.slug} 
              href={href} 
              title={item.title} 
              isActive={isActive} 
            />
          );
        })}
      </ul>
    </nav>
  );
}
