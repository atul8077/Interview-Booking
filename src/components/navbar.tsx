"use client";

import Link from 'next/link';
import { useMockDb } from '@/hooks/useMockDb';
import { LogOut, User } from 'lucide-react';

export function Navbar() {
  const { currentUser, logoutUser, isLoaded } = useMockDb();

  return (
    <nav className="border-b bg-white dark:bg-zinc-950 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
              InterviewBook
            </Link>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link href="/dashboard" className="text-sm sm:text-base text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium">
              Dashboard
            </Link>
            
            {isLoaded && currentUser ? (
              <div className="flex items-center ml-2 sm:ml-4 pl-2 sm:pl-4 border-l dark:border-zinc-700">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300 mr-4 flex items-center hidden sm:flex">
                  <User className="w-4 h-4 mr-1" /> Hi, {currentUser.name.split(' ')[0]}
                </span>
                <button 
                  onClick={logoutUser}
                  className="flex items-center text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-1.5 rounded-md transition-colors"
                >
                  <LogOut className="w-4 h-4 sm:mr-1" /> <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : isLoaded ? (
              <div className="flex items-center space-x-2 sm:space-x-3 ml-2 sm:ml-4">
                <Link href="/login" className="text-sm sm:text-base text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium px-2 py-1">
                  Login
                </Link>
                <Link href="/signup" className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base rounded-md font-medium transition-colors shadow-sm">
                  Sign Up
                </Link>
              </div>
            ) : null}
          </div>

        </div>
      </div>
    </nav>
  );
}
