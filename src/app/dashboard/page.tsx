"use client";

import { useState, Suspense, useEffect } from "react";
import { Calendar as CalendarIcon, Clock, CheckCircle2, ChevronRight, Video, Mail, User } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useMockDb } from "@/hooks/useMockDb";

function DashboardContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const subParam = searchParams.get('sub');

  const { isLoaded, categories, bookings, addBooking, currentUser } = useMockDb();

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [candidateName, setCandidateName] = useState("");
  const [candidateEmail, setCandidateEmail] = useState("");
  const [isBooked, setIsBooked] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setCandidateName(currentUser.name);
      setCandidateEmail(currentUser.email);
    }
  }, [currentUser]);

  if (!isLoaded) return <div className="p-10 text-center">Loading...</div>;

  let selectedSub = null;
  if (categoryParam && subParam && categories[categoryParam]) {
    selectedSub = categories[categoryParam].subs.find(s => s.id === subParam);
  }

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSub || !selectedDate || !selectedTime || !candidateName || !candidateEmail) return;
    
    addBooking({
      id: Date.now(),
      candidateName,
      candidateEmail,
      interviewTitle: selectedSub.title,
      date: selectedDate,
      time: selectedTime,
      zoomLink: "" // Pending admin
    });
    
    setIsBooked(true);
    setTimeout(() => {
      setIsBooked(false);
      setSelectedDate("");
      setSelectedTime("");
      setCandidateName("");
      setCandidateEmail("");
    }, 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Book Your Interview</h1>
        <p className="text-slate-600 dark:text-slate-400">Select an available time slot below to practice with experts.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left/Main Column: Booking Flow */}
        <div className="lg:col-span-2 space-y-8">
          
          {isBooked ? (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-8 text-center animate-in fade-in zoom-in duration-300">
              <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-green-800 dark:text-green-400 mb-2">Booking Confirmed!</h2>
              <p className="text-green-700 dark:text-green-500">
                Your mock interview for <b>{selectedSub?.title}</b> has been scheduled. The expert will attach a Zoom link soon.
              </p>
              <Link href="/#categories" className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Return to Categories
              </Link>
            </div>
          ) : (
            <div className="bg-white dark:bg-zinc-900 shadow rounded-xl p-6 border border-slate-200 dark:border-zinc-800">
              {!selectedSub ? (
                <div className="text-center py-10">
                  <h2 className="text-xl font-bold mb-4">No Interview Selected</h2>
                  <p className="mb-6 text-slate-600 dark:text-slate-400">Please go back and select a specific interview category.</p>
                  <Link href="/#categories" className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
                    Browse Categories
                  </Link>
                </div>
              ) : (
                <div className="animate-in slide-in-from-top-4 duration-300">
                  <div className="mb-8 flex items-center border-b dark:border-zinc-800 pb-6">
                    <div className="text-5xl mr-4">{selectedSub.icon}</div>
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{selectedSub.title}</h2>
                      <p className="text-slate-600 dark:text-slate-400">{selectedSub.desc}</p>
                      <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mt-2">Duration: {selectedSub.duration || 60} minutes</p>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold mb-6">Enter Your Details & Select Date/Time</h3>
                  
                  {!currentUser && (
                    <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800/50 rounded-lg flex items-center justify-between">
                      <p className="text-sm text-yellow-800 dark:text-yellow-500 font-medium">You must be logged in to book an interview.</p>
                      <Link href="/login" className="text-sm bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md font-bold transition-colors">
                        Log In
                      </Link>
                    </div>
                  )}

                  <form onSubmit={handleBooking} className="space-y-6">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2 flex items-center">
                          <User className="w-4 h-4 mr-2" /> Full Name
                        </label>
                        <input 
                          type="text" 
                          value={candidateName}
                          onChange={(e) => setCandidateName(e.target.value)}
                          className="w-full px-4 py-3 border rounded-lg dark:bg-zinc-800 dark:border-zinc-700" 
                          placeholder="John Doe"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 flex items-center">
                          <Mail className="w-4 h-4 mr-2" /> Email
                        </label>
                        <input 
                          type="email" 
                          value={candidateEmail}
                          onChange={(e) => setCandidateEmail(e.target.value)}
                          className="w-full px-4 py-3 border rounded-lg dark:bg-zinc-800 dark:border-zinc-700" 
                          placeholder="john@example.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2 flex items-center">
                          <CalendarIcon className="w-4 h-4 mr-2" /> Date
                        </label>
                        <input 
                          type="date" 
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          className="w-full px-4 py-3 border rounded-lg dark:bg-zinc-800 dark:border-zinc-700" 
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 flex items-center">
                          <Clock className="w-4 h-4 mr-2" /> Time
                        </label>
                        <input 
                          type="time" 
                          value={selectedTime}
                          onChange={(e) => setSelectedTime(e.target.value)}
                          className="w-full px-4 py-3 border rounded-lg dark:bg-zinc-800 dark:border-zinc-700" 
                          required
                        />
                      </div>
                    </div>
                    
                    <button 
                      type="submit" 
                      disabled={!currentUser}
                      className={`w-full sm:w-auto px-8 py-3 text-white rounded-lg font-bold transition-colors flex items-center justify-center ${currentUser ? 'bg-blue-600 hover:bg-blue-700' : 'bg-slate-400 dark:bg-zinc-700 cursor-not-allowed'}`}
                    >
                      Confirm Booking <ChevronRight className="ml-2 w-5 h-5" />
                    </button>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Column: My Upcoming Bookings */}
        <div className="lg:col-span-1">
          <div className="bg-slate-50 dark:bg-zinc-800/50 rounded-xl p-6 border border-slate-200 dark:border-zinc-700 sticky top-6">
            <h2 className="text-xl font-bold mb-6">All Bookings (Demo)</h2>
            <p className="text-xs text-gray-500 mb-4">In a real app, this would only show the logged-in user's bookings. Since this is a demo, all bookings are shown.</p>
            
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {bookings.length === 0 ? (
                <p className="text-gray-500 text-sm">No upcoming interviews.</p>
              ) : (
                bookings.map(booking => (
                  <div key={booking.id} className="bg-white dark:bg-zinc-900 border dark:border-zinc-700 rounded-lg p-4 shadow-sm">
                    <h3 className="font-bold text-slate-900 dark:text-white mb-1">{booking.interviewTitle}</h3>
                    <p className="text-xs font-medium text-blue-600 mb-3">{booking.candidateName}</p>
                    
                    <div className="text-sm text-slate-600 dark:text-slate-400 space-y-1 mb-4 bg-slate-50 dark:bg-zinc-800/50 p-2 rounded">
                      <p className="flex items-center"><CalendarIcon className="w-3 h-3 mr-2" /> {booking.date}</p>
                      <p className="flex items-center"><Clock className="w-3 h-3 mr-2" /> {booking.time}</p>
                    </div>
                    
                    {booking.zoomLink ? (
                      <a 
                        href={booking.zoomLink} 
                        target="_blank" 
                        rel="noreferrer"
                        className="w-full bg-blue-100 hover:bg-blue-200 text-blue-700 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 dark:text-blue-400 py-2 rounded-md text-sm font-medium flex items-center justify-center transition-colors"
                      >
                        <Video className="w-4 h-4 mr-2" /> Join Zoom Meeting
                      </a>
                    ) : (
                      <div className="w-full bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-slate-400 py-2 rounded-md text-sm font-medium text-center">
                        Link Pending from Admin
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
