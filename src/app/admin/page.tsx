"use client";

import { useState } from "react";
import { Plus, Trash2, Calendar as CalendarIcon, Link as LinkIcon, Users } from "lucide-react";

export default function AdminPage() {
  const [interviews, setInterviews] = useState([
    { id: 1, title: "Java Backend Developer", duration: 60, description: "Core Java, Spring Boot, Microservices." },
    { id: 2, title: "React Frontend Developer", duration: 45, description: "React, Next.js, Tailwind CSS." }
  ]);

  const [bookings, setBookings] = useState([
    { id: 101, candidateName: "Rahul Sharma", interviewTitle: "Java Backend Developer", date: "2026-05-10", time: "10:00 AM", zoomLink: "https://zoom.us/j/123456789" },
    { id: 102, candidateName: "Priya Singh", interviewTitle: "React Frontend Developer", date: "2026-05-11", time: "02:00 PM", zoomLink: "" }
  ]);

  const [newTitle, setNewTitle] = useState("");
  const [newDuration, setNewDuration] = useState("60");
  const [newDescription, setNewDescription] = useState("");

  const handleAddInterview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;
    setInterviews([...interviews, { 
      id: Date.now(), 
      title: newTitle, 
      duration: parseInt(newDuration), 
      description: newDescription 
    }]);
    setNewTitle("");
    setNewDescription("");
  };

  const handleDeleteInterview = (id: number) => {
    setInterviews(interviews.filter(i => i.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Create & List Interviews */}
        <div className="lg:col-span-1 space-y-8">
          
          <div className="bg-white dark:bg-zinc-900 shadow rounded-xl p-6 border border-slate-200 dark:border-zinc-800">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Plus className="mr-2 h-5 w-5 text-blue-600" />
              Create Interview
            </h2>
            <form onSubmit={handleAddInterview} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title (e.g. Java Interview)</label>
                <input 
                  type="text" 
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md dark:bg-zinc-800 dark:border-zinc-700" 
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Duration (minutes)</label>
                <input 
                  type="number" 
                  value={newDuration}
                  onChange={(e) => setNewDuration(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md dark:bg-zinc-800 dark:border-zinc-700" 
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea 
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md dark:bg-zinc-800 dark:border-zinc-700" 
                  rows={3}
                ></textarea>
              </div>
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium transition-colors">
                Add Interview Card
              </button>
            </form>
          </div>

          <div className="bg-white dark:bg-zinc-900 shadow rounded-xl p-6 border border-slate-200 dark:border-zinc-800">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <CalendarIcon className="mr-2 h-5 w-5 text-blue-600" />
              Active Interviews
            </h2>
            <div className="space-y-4">
              {interviews.length === 0 ? (
                <p className="text-sm text-gray-500">No interviews created yet.</p>
              ) : (
                interviews.map(interview => (
                  <div key={interview.id} className="p-4 border rounded-lg dark:border-zinc-700 flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg">{interview.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{interview.duration} mins</p>
                      <p className="text-sm">{interview.description}</p>
                    </div>
                    <button onClick={() => handleDeleteInterview(interview.id)} className="text-red-500 hover:text-red-700 p-1">
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Candidates & Bookings */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-zinc-900 shadow rounded-xl p-6 border border-slate-200 dark:border-zinc-800">
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <Users className="mr-2 h-5 w-5 text-blue-600" />
              Upcoming Candidate Bookings
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b dark:border-zinc-700">
                    <th className="pb-3 font-medium">Candidate</th>
                    <th className="pb-3 font-medium">Interview</th>
                    <th className="pb-3 font-medium">Date & Time</th>
                    <th className="pb-3 font-medium">Zoom Link</th>
                    <th className="pb-3 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map(booking => (
                    <tr key={booking.id} className="border-b dark:border-zinc-800 last:border-0">
                      <td className="py-4 font-medium">{booking.candidateName}</td>
                      <td className="py-4">{booking.interviewTitle}</td>
                      <td className="py-4">
                        <div className="flex flex-col">
                          <span>{booking.date}</span>
                          <span className="text-sm text-gray-500">{booking.time}</span>
                        </div>
                      </td>
                      <td className="py-4">
                        {booking.zoomLink ? (
                          <a href={booking.zoomLink} target="_blank" rel="noreferrer" className="text-blue-500 flex items-center text-sm hover:underline">
                            <LinkIcon className="h-3 w-3 mr-1" /> Join
                          </a>
                        ) : (
                          <span className="text-yellow-600 text-sm bg-yellow-100 dark:bg-yellow-900/30 px-2 py-1 rounded">Pending</span>
                        )}
                      </td>
                      <td className="py-4">
                        {!booking.zoomLink && (
                          <button className="text-sm bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 px-3 py-1 rounded border dark:border-zinc-700">
                            Add Link
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
