"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMockDb, User } from '@/hooks/useMockDb';
import { UserPlus, Mail, Lock, User as UserIcon } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const { users, saveUsers, loginUser, isLoaded } = useMockDb();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!isLoaded) return null;

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (users.find(u => u.email === email)) {
      setError("An account with this email already exists.");
      return;
    }

    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      password
    };

    saveUsers([...users, newUser]);
    loginUser(newUser); // Auto login
    router.push('/dashboard');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="bg-blue-100 dark:bg-blue-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserPlus className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Create an Account</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">Join InterviewBook to practice with experts.</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800/50 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 flex items-center">
              <UserIcon className="w-4 h-4 mr-2" /> Full Name
            </label>
            <input 
              type="text" 
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 dark:border-zinc-700 dark:bg-zinc-800 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
              placeholder="John Doe"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 flex items-center">
              <Mail className="w-4 h-4 mr-2" /> Email Address
            </label>
            <input 
              type="email" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 dark:border-zinc-700 dark:bg-zinc-800 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 flex items-center">
              <Lock className="w-4 h-4 mr-2" /> Password
            </label>
            <input 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 dark:border-zinc-700 dark:bg-zinc-800 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
              placeholder="••••••••"
              required
              minLength={6}
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition-colors shadow-md mt-4"
          >
            Create Account
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-600 dark:text-slate-400">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
}
