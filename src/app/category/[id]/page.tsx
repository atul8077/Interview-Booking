"use client";

import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useMockDb } from '@/hooks/useMockDb';
import { use } from 'react';

export default function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { categories, isLoaded } = useMockDb();

  if (!isLoaded) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  const data = categories[id];

  if (!data) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10 text-center">
        <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
        <Link href="/#categories" className="text-blue-600 hover:underline">Back to Categories</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen">
      <Link href="/#categories" className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 mb-8 font-medium">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Categories
      </Link>
      
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">{data.title}</h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl">{data.description}</p>
      </div>

      <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Select a specific topic to book an interview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.subs.map(sub => (
          <div key={sub.id} className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm flex flex-col h-full hover:border-blue-300 transition-all">
            <div className="text-4xl mb-4">{sub.icon || "📄"}</div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{sub.title}</h3>
            <p className="text-sm text-gray-500 mb-3">{sub.duration || 60} mins</p>
            <p className="text-slate-600 dark:text-slate-400 mb-6 flex-grow">{sub.desc}</p>
            <Link 
              href={`/dashboard?category=${id}&sub=${sub.id}`}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center mt-auto"
            >
              Book {sub.title} Mock <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        ))}
        {data.subs.length === 0 && (
          <p className="text-gray-500 col-span-full">No interviews currently available in this category.</p>
        )}
      </div>
    </div>
  );
}
