"use client";

import { useState } from "react";
import { Calendar as CalendarIcon, Clock, CheckCircle2, ChevronRight, Video } from "lucide-react";

export default function DashboardPage() {
  const [interviews] = useState([
    { id: 1, title: "Java Backend Developer", duration: 60, description: "Core Java, Spring Boot, Microservices.", icon: "☕" },
    { id: 2, title: "React Frontend Developer", duration: 45, description: "React, Next.js, Tailwind CSS.", icon: "⚛️" },
    { id: 3, title: "System Design", duration: 90, description: "Scalability, Database Design, Architecture.", icon: "🏗️" }
  ]);

  const [selectedInterview, setSelectedInterview] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [isBooked, setIsBooked] = useState(false);

  const [myBookings, setMyBookings] = useState([
    { id: 201, title: "Java Backend Developer", date: "2026-05-15", time: "10:00 AM", zoomLink: "https://zoom.us/j/987654321" }
  ]);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInterview || !selectedDate || !selectedTime) return;
    
    const interview = interviews.find(i => i.id === selectedInterview);
    if (interview) {
      setMyBookings([{
        id: Date.now(),
        title: interview.title,
        date: selectedDate,
        time: selectedTime,
        zoomLink: "" // Pending admin
      }, ...myBookings]);
      setIsBooked(true);
      setTimeout(() => {
        setIsBooked(false);
        setSelectedInterview(null);
        setSelectedDate("");
        setSelectedTime("");
      }, 3000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Welcome Back, Candidate!</h1>
        <p className="text-slate-600 dark:text-slate-400">Ready for your next mock interview? Schedule one below.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left/Main Column: Booking Flow */}
        <div className="lg:col-span-2 space-y-8">
          
          {isBooked ? (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-8 text-center animate-in fade-in zoom-in duration-300">
              <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-green-800 dark:text-green-400 mb-2">Booking Confirmed!</h2>
              <p className="text-green-700 dark:text-green-500">
                Your interview has been scheduled. The admin will attach a Zoom link soon.
              </p>
            </div>
          ) : (
            <div className="bg-white dark:bg-zinc-900 shadow rounded-xl p-6 border border-slate-200 dark:border-zinc-800">
              <h2 className="text-xl font-bold mb-6">1. Select an Interview</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {interviews.map(interview => (
                  <div 
                    key={interview.id} 
                    onClick={() => setSelectedInterview(interview.id)}
                    className={`cursor-pointer border-2 rounded-xl p-4 transition-all ${
                      selectedInterview === interview.id 
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20' 
                      : 'border-slate-200 dark:border-zinc-700 hover:border-blue-300'
                    }`}
                  >
                    <div className="text-3xl mb-2">{interview.icon}</div>
                    <h3 className="font-bold text-lg">{interview.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{interview.duration} mins</p>
                    <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2">{interview.description}</p>
                  </div>
                ))}
              </div>

              {selectedInterview && (
                <div className="animate-in slide-in-from-top-4 duration-300">
                  <h2 className="text-xl font-bold mb-6 pt-6 border-t dark:border-zinc-800">2. Select Date & Time</h2>
                  <form onSubmit={handleBooking} className="space-y-6">
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
                      className="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition-colors flex items-center justify-center"
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
            <h2 className="text-xl font-bold mb-6">My Upcoming Interviews</h2>
            
            <div className="space-y-4">
              {myBookings.length === 0 ? (
                <p className="text-gray-500 text-sm">No upcoming interviews.</p>
              ) : (
                myBookings.map(booking => (
                  <div key={booking.id} className="bg-white dark:bg-zinc-900 border dark:border-zinc-700 rounded-lg p-4 shadow-sm">
                    <h3 className="font-bold text-slate-900 dark:text-white mb-2">{booking.title}</h3>
                    <div className="text-sm text-slate-600 dark:text-slate-400 space-y-1 mb-4">
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
