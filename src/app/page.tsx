import Link from 'next/link';
import { ArrowRight, BookOpen, Briefcase, GraduationCap, Users, Landmark } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-full">
      {/* Hero Section */}
      <section className="flex-grow flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-zinc-900 dark:to-zinc-950 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4 md:mb-6 leading-tight">
            The Ultimate <span className="text-blue-600 dark:text-blue-500">Mock Interview</span> Platform
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-slate-600 dark:text-slate-300 mb-8 md:mb-10 max-w-3xl mx-auto px-2">
            Practice with top industry experts. Whether you are preparing for a Tech role, UPSC Civil Services, or HR rounds, we have the right mentors for you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link 
              href="#categories" 
              className="w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold text-base md:text-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center"
            >
              Explore Categories
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-20 bg-white dark:bg-zinc-950 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-4">Choose Your Field</h2>
          <p className="text-center text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto">Select a category below to see available mock interviews and mentors.</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Technical */}
            <Link href="/category/technical" className="group">
              <div className="h-full bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 md:p-8 transition-all hover:shadow-xl hover:border-blue-500">
                <div className="bg-blue-100 dark:bg-blue-900/30 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <BookOpen className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Technical & IT</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Practice coding, system design, Java, PHP, React, and more with top engineers.
                </p>
              </div>
            </Link>

            {/* UPSC */}
            <Link href="/category/upsc" className="group">
              <div className="h-full bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 md:p-8 transition-all hover:shadow-xl hover:border-purple-500">
                <div className="bg-purple-100 dark:bg-purple-900/30 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Landmark className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">UPSC & Civil Services</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Mock personality tests with retired IAS officers and subject matter experts.
                </p>
              </div>
            </Link>

            {/* HR / Behavioral */}
            <Link href="/category/hr" className="group">
              <div className="h-full bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 md:p-8 transition-all hover:shadow-xl hover:border-green-500">
                <div className="bg-green-100 dark:bg-green-900/30 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Users className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">HR & Behavioral</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Perfect your soft skills, leadership principles, and cultural fit interviews.
                </p>
              </div>
            </Link>

            {/* Teaching */}
            <Link href="/category/teaching" className="group">
              <div className="h-full bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 md:p-8 transition-all hover:shadow-xl hover:border-orange-500">
                <div className="bg-orange-100 dark:bg-orange-900/30 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <GraduationCap className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Teaching & Academia</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Demo lectures and academic interview prep with experienced professors.
                </p>
              </div>
            </Link>

            {/* Management */}
            <Link href="/category/management" className="group">
              <div className="h-full bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 md:p-8 transition-all hover:shadow-xl hover:border-red-500">
                <div className="bg-red-100 dark:bg-red-900/30 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Briefcase className="h-8 w-8 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Management & MBA</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Case study practice and product management interviews with top PMs.
                </p>
              </div>
            </Link>

          </div>
        </div>
      </section>
    </div>
  );
}
