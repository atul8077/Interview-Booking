import Link from 'next/link';
import { ArrowRight, CalendarCheck, Users, Video } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-full">
      {/* Hero Section */}
      <section className="flex-grow flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-zinc-900 dark:to-zinc-950 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6">
            Master Your Next <span className="text-blue-600 dark:text-blue-500">Tech Interview</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-10 max-w-2xl mx-auto">
            Schedule 1-on-1 mock interviews with industry experts. Get real-time feedback and boost your confidence.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link 
              href="/dashboard" 
              className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold text-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center"
            >
              Book an Interview
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link 
              href="/admin" 
              className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-700 text-slate-900 dark:text-white border border-slate-200 dark:border-zinc-700 rounded-full font-semibold text-lg transition-all shadow-sm"
            >
              I am an Admin
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-zinc-950 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-16">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-12">
            
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900/30 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">1. Choose an Interview</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Browse our selection of specialized interview categories like Java, React, or System Design.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900/30 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <CalendarCheck className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">2. Schedule a Time</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Pick a date and time that works best for you from our real-time availability calendar.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900/30 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Video className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">3. Join via Zoom</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Get your personalized Zoom link and connect face-to-face with your interviewer.
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
