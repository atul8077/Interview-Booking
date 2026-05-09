"use client";

import { useState, Suspense } from "react";
import { Calendar as CalendarIcon, Clock, CheckCircle2, ChevronRight, Video } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

// Mock database
const categoryData: Record<string, { title: string; description: string; subs: { id: string, title: string, icon: string, desc: string }[] }> = {
  technical: {
    title: "Technical & IT",
    description: "",
    subs: [
      { id: "java", title: "Java Backend", icon: "☕", desc: "Spring Boot, Microservices, Core Java." },
      { id: "php", title: "PHP Developer", icon: "🐘", desc: "Laravel, CodeIgniter, Core PHP." },
      { id: "react", title: "Frontend React", icon: "⚛️", desc: "Next.js, Redux, Tailwind CSS." },
      { id: "system-design", title: "System Design", icon: "🏗️", desc: "Scalability, DB Architecture." },
    ]
  },
  upsc: {
    title: "UPSC & Civil Services",
    description: "",
    subs: [
      { id: "ias", title: "IAS Mock Interview", icon: "🏛️", desc: "Comprehensive UPSC Board mock." },
      { id: "state-pcs", title: "State PCS", icon: "📝", desc: "State-specific administrative mock." },
      { id: "daf", title: "DAF Analysis", icon: "📄", desc: "Detailed Application Form discussion." },
    ]
  },
  hr: {
    title: "HR & Behavioral",
    description: "",
    subs: [
      { id: "behavioral", title: "Behavioral Round", icon: "🤝", desc: "STAR method, leadership principles." },
      { id: "managerial", title: "Managerial Fit", icon: "👔", desc: "Conflict resolution, team management." },
    ]
  },
  teaching: {
    title: "Teaching & Academia",
    description: "",
    subs: [
      { id: "demo-class", title: "Demo Class Mock", icon: "🏫", desc: "Present a topic to a mock student panel." },
      { id: "academic-panel", title: "Academic Panel", icon: "🎓", desc: "Research discussion, teaching philosophy." },
    ]
  },
  management: {
    title: "Management & MBA",
    description: "",
    subs: [
      { id: "product-management", title: "Product Management", icon: "📱", desc: "Product design, metrics, strategy." },
      { id: "consulting", title: "Consulting Case", icon: "📊", desc: "Business case studies, guesstimates." },
    ]
  }
};

function DashboardContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const subParam = searchParams.get('sub');

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [isBooked, setIsBooked] = useState(false);

  const [myBookings, setMyBookings] = useState([
    { id: 201, title: "Java Backend Developer", date: "2026-05-15", time: "10:00 AM", zoomLink: "https://zoom.us/j/987654321" }
  ]);

  let selectedSub = null;
  if (categoryParam && subParam && categoryData[categoryParam]) {
    selectedSub = categoryData[categoryParam].subs.find(s => s.id === subParam);
  }

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSub || !selectedDate || !selectedTime) return;
    
    setMyBookings([{
      id: Date.now(),
      title: selectedSub.title,
      date: selectedDate,
      time: selectedTime,
      zoomLink: "" // Pending admin
    }, ...myBookings]);
    
    setIsBooked(true);
    setTimeout(() => {
      setIsBooked(false);
      setSelectedDate("");
      setSelectedTime("");
    }, 3000);
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
              <Link href="/" className="mt-6 inline-block text-blue-600 hover:underline">
                Return to Home
              </Link>
            </div>
          ) : (
            <div className="bg-white dark:bg-zinc-900 shadow rounded-xl p-6 border border-slate-200 dark:border-zinc-800">
              {!selectedSub ? (
                <div className="text-center py-10">
                  <h2 className="text-xl font-bold mb-4">No Interview Selected</h2>
                  <p className="mb-6 text-slate-600 dark:text-slate-400">Please go back and select a specific interview category.</p>
                  <Link href="/#categories" className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium">
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
                    </div>
                  </div>

                  <h3 className="text-lg font-bold mb-6">Select Date & Time</h3>
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

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
