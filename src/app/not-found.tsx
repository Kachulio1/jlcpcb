import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20">
      <h1 className="text-4xl font-bold text-blue-700 mb-4">404 - Page Not Found</h1>
      <p className="text-xl mb-8">
        Sorry, the content you are looking for could not be found.
      </p>
      <p className="mb-8">
        It might have been moved or is still being developed.
      </p>
      <Link 
        href="/" 
        className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors"
      >
        Return to Home Page
      </Link>
    </div>
  );
}
