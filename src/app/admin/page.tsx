"use client";

import { useState } from "react";
import { Plus, Trash2, Calendar as CalendarIcon, Link as LinkIcon, Users, Edit } from "lucide-react";
import { useMockDb, Booking } from "@/hooks/useMockDb";

export default function AdminPage() {
  const { isLoaded, categories, bookings, addInterview, deleteInterview, updateBooking } = useMockDb();

  const [newTitle, setNewTitle] = useState("");
  const [newDuration, setNewDuration] = useState("60");
  const [newDescription, setNewDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("technical");

  const [editingBookingId, setEditingBookingId] = useState<number | null>(null);
  const [editDate, setEditDate] = useState("");
  const [editTime, setEditTime] = useState("");
  const [editLink, setEditLink] = useState("");

  if (!isLoaded) return <div className="p-10 text-center">Loading Admin Panel...</div>;

  const handleAddInterview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !selectedCategory) return;
    
    addInterview(selectedCategory, {
      id: newTitle.toLowerCase().replace(/\s+/g, '-'),
      title: newTitle,
      duration: parseInt(newDuration),
      desc: newDescription,
      icon: "✨" // Generic icon for new additions
    });
    
    setNewTitle("");
    setNewDescription("");
  };

  const startEditing = (booking: Booking) => {
    setEditingBookingId(booking.id);
    setEditDate(booking.date);
    setEditTime(booking.time);
    setEditLink(booking.zoomLink || "");
  };

  const saveEditing = (booking: Booking) => {
    updateBooking({
      ...booking,
      date: editDate,
      time: editTime,
      zoomLink: editLink
    });
    setEditingBookingId(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8 border-b dark:border-zinc-800 pb-4">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Admin Control Panel</h1>
        <p className="text-gray-500 mt-2">Manage categories, interviews, and user bookings.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Create Interview */}
        <div className="lg:col-span-1 space-y-8">
          
          <div className="bg-white dark:bg-zinc-900 shadow rounded-xl p-6 border border-slate-200 dark:border-zinc-800">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Plus className="mr-2 h-5 w-5 text-blue-600" />
              Add New Interview
            </h2>
            <form onSubmit={handleAddInterview} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md dark:bg-zinc-800 dark:border-zinc-700"
                >
                  {Object.entries(categories).map(([key, cat]) => (
                    <option key={key} value={key}>{cat.title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input 
                  type="text" 
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md dark:bg-zinc-800 dark:border-zinc-700" 
                  placeholder="e.g. Python Developer"
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
                  placeholder="What will this mock interview cover?"
                  required
                ></textarea>
              </div>
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium transition-colors">
                Publish Interview
              </button>
            </form>
          </div>

          <div className="bg-white dark:bg-zinc-900 shadow rounded-xl p-6 border border-slate-200 dark:border-zinc-800">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <CalendarIcon className="mr-2 h-5 w-5 text-blue-600" />
              Manage Existing Interviews
            </h2>
            <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2">
              {Object.entries(categories).map(([catKey, cat]) => (
                <div key={catKey} className="border-b dark:border-zinc-800 pb-4 last:border-0">
                  <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-3">{cat.title}</h3>
                  {cat.subs.length === 0 ? (
                    <p className="text-xs text-gray-500">No interviews.</p>
                  ) : (
                    <div className="space-y-2">
                      {cat.subs.map(sub => (
                        <div key={sub.id} className="p-3 border rounded-lg dark:border-zinc-700 flex justify-between items-center bg-slate-50 dark:bg-zinc-800/50">
                          <div>
                            <p className="font-medium text-sm">{sub.title}</p>
                            <p className="text-xs text-gray-500">{sub.duration || 60} mins</p>
                          </div>
                          <button onClick={() => deleteInterview(catKey, sub.id)} className="text-red-500 hover:text-red-700 p-1 bg-white dark:bg-zinc-900 rounded shadow-sm border dark:border-zinc-700">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Manage Bookings */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-zinc-900 shadow rounded-xl p-6 border border-slate-200 dark:border-zinc-800">
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <Users className="mr-2 h-5 w-5 text-blue-600" />
              Candidate Bookings
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b dark:border-zinc-700 text-sm text-gray-500">
                    <th className="pb-3 font-medium">Candidate</th>
                    <th className="pb-3 font-medium">Interview Type</th>
                    <th className="pb-3 font-medium">Schedule</th>
                    <th className="pb-3 font-medium">Zoom Link</th>
                    <th className="pb-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.length === 0 && (
                    <tr><td colSpan={5} className="py-8 text-center text-gray-500">No bookings found.</td></tr>
                  )}
                  {bookings.map(booking => (
                    <tr key={booking.id} className="border-b dark:border-zinc-800 last:border-0 hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-colors">
                      <td className="py-4">
                        <p className="font-medium text-sm">{booking.candidateName}</p>
                        <p className="text-xs text-gray-500">{booking.candidateEmail}</p>
                      </td>
                      <td className="py-4 text-sm font-medium">{booking.interviewTitle}</td>
                      
                      {editingBookingId === booking.id ? (
                        <td className="py-4 col-span-2" colSpan={2}>
                          <div className="flex flex-col space-y-2 max-w-[200px]">
                            <input type="date" value={editDate} onChange={e => setEditDate(e.target.value)} className="px-2 py-1 border rounded text-xs dark:bg-zinc-800" />
                            <input type="time" value={editTime} onChange={e => setEditTime(e.target.value)} className="px-2 py-1 border rounded text-xs dark:bg-zinc-800" />
                            <input type="url" value={editLink} onChange={e => setEditLink(e.target.value)} placeholder="https://zoom.us/j/..." className="px-2 py-1 border rounded text-xs dark:bg-zinc-800" />
                          </div>
                        </td>
                      ) : (
                        <>
                          <td className="py-4">
                            <span className="text-sm block">{booking.date}</span>
                            <span className="text-xs text-gray-500 block">{booking.time}</span>
                          </td>
                          <td className="py-4">
                            {booking.zoomLink ? (
                              <a href={booking.zoomLink} target="_blank" rel="noreferrer" className="text-blue-500 text-xs hover:underline flex items-center">
                                <LinkIcon className="h-3 w-3 mr-1" /> Open Link
                              </a>
                            ) : (
                              <span className="text-xs bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-500 px-2 py-1 rounded">Pending</span>
                            )}
                          </td>
                        </>
                      )}

                      <td className="py-4">
                        {editingBookingId === booking.id ? (
                          <div className="flex space-x-2">
                            <button onClick={() => saveEditing(booking)} className="text-xs bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded">Save</button>
                            <button onClick={() => setEditingBookingId(null)} className="text-xs bg-gray-200 hover:bg-gray-300 dark:bg-zinc-700 text-black dark:text-white px-3 py-1 rounded">Cancel</button>
                          </div>
                        ) : (
                          <button onClick={() => startEditing(booking)} className="text-xs flex items-center text-blue-600 border border-blue-200 dark:border-blue-900/50 bg-blue-50 dark:bg-blue-900/20 px-3 py-1.5 rounded hover:bg-blue-100 dark:hover:bg-blue-900/40">
                            <Edit className="w-3 h-3 mr-1" /> Edit / Add Link
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
