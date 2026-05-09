import { useState, useEffect } from 'react';

export type SubCategory = {
  id: string;
  title: string;
  icon: string;
  desc: string;
  duration?: number;
};

export type Category = {
  title: string;
  description: string;
  subs: SubCategory[];
};

export type Booking = {
  id: number;
  candidateName: string;
  candidateEmail: string;
  interviewTitle: string;
  date: string;
  time: string;
  zoomLink: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  password?: string;
};

const defaultCategories: Record<string, Category> = {
  technical: {
    title: "Technical & IT",
    description: "Practice with top engineers from FAANG and other leading tech companies.",
    subs: [
      { id: "java", title: "Java Backend", icon: "☕", desc: "Spring Boot, Microservices, Core Java.", duration: 60 },
      { id: "php", title: "PHP Developer", icon: "🐘", desc: "Laravel, CodeIgniter, Core PHP.", duration: 45 },
      { id: "react", title: "Frontend React", icon: "⚛️", desc: "Next.js, Redux, Tailwind CSS.", duration: 45 },
      { id: "system-design", title: "System Design", icon: "🏗️", desc: "Scalability, DB Architecture.", duration: 90 },
    ]
  },
  upsc: {
    title: "UPSC & Civil Services",
    description: "Mock personality tests and interview guidance from retired IAS officers and experts.",
    subs: [
      { id: "ias", title: "IAS Mock Interview", icon: "🏛️", desc: "Comprehensive UPSC Board mock.", duration: 45 },
      { id: "state-pcs", title: "State PCS", icon: "📝", desc: "State-specific administrative mock.", duration: 30 },
      { id: "daf", title: "DAF Analysis", icon: "📄", desc: "Detailed Application Form discussion.", duration: 60 },
    ]
  },
  hr: {
    title: "HR & Behavioral",
    description: "Master your soft skills, leadership principles, and cultural fit rounds.",
    subs: [
      { id: "behavioral", title: "Behavioral Round", icon: "🤝", desc: "STAR method, leadership principles.", duration: 30 },
      { id: "managerial", title: "Managerial Fit", icon: "👔", desc: "Conflict resolution, team management.", duration: 45 },
    ]
  },
  teaching: {
    title: "Teaching & Academia",
    description: "Prepare for professor roles, school teaching, and academic panels.",
    subs: [
      { id: "demo-class", title: "Demo Class Mock", icon: "🏫", desc: "Present a topic to a mock student panel.", duration: 30 },
      { id: "academic-panel", title: "Academic Panel", icon: "🎓", desc: "Research discussion, teaching philosophy.", duration: 60 },
    ]
  },
  management: {
    title: "Management & MBA",
    description: "Case studies, guesstimates, and product management prep.",
    subs: [
      { id: "product-management", title: "Product Management", icon: "📱", desc: "Product design, metrics, strategy.", duration: 60 },
      { id: "consulting", title: "Consulting Case", icon: "📊", desc: "Business case studies, guesstimates.", duration: 60 },
    ]
  }
};

const defaultBookings: Booking[] = [
  { id: 101, candidateName: "Atul Maurya", candidateEmail: "atul@example.com", interviewTitle: "Java Backend Developer", date: "2026-05-15", time: "10:00", zoomLink: "https://zoom.us/j/987654321" }
];

export function useMockDb() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [categories, setCategories] = useState<Record<string, Category>>({});
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const storedCategories = localStorage.getItem('ib_categories');
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    } else {
      setCategories(defaultCategories);
      localStorage.setItem('ib_categories', JSON.stringify(defaultCategories));
    }

    const storedBookings = localStorage.getItem('ib_bookings');
    if (storedBookings) {
      setBookings(JSON.parse(storedBookings));
    } else {
      setBookings(defaultBookings);
      localStorage.setItem('ib_bookings', JSON.stringify(defaultBookings));
    }

    const storedUsers = localStorage.getItem('ib_users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }

    const storedSession = localStorage.getItem('ib_session');
    if (storedSession) {
      setCurrentUser(JSON.parse(storedSession));
    }
    
    setIsLoaded(true);
  }, []);

  const saveCategories = (newCategories: Record<string, Category>) => {
    setCategories(newCategories);
    localStorage.setItem('ib_categories', JSON.stringify(newCategories));
  };

  const saveBookings = (newBookings: Booking[]) => {
    setBookings(newBookings);
    localStorage.setItem('ib_bookings', JSON.stringify(newBookings));
  };

  const saveUsers = (newUsers: User[]) => {
    setUsers(newUsers);
    localStorage.setItem('ib_users', JSON.stringify(newUsers));
  };

  const loginUser = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('ib_session', JSON.stringify(user));
  };

  const logoutUser = () => {
    setCurrentUser(null);
    localStorage.removeItem('ib_session');
  };

  const addBooking = (booking: Booking) => {
    const newBookings = [booking, ...bookings];
    saveBookings(newBookings);
  };

  const updateBooking = (updatedBooking: Booking) => {
    const newBookings = bookings.map(b => b.id === updatedBooking.id ? updatedBooking : b);
    saveBookings(newBookings);
  };

  const addInterview = (parentId: string, sub: SubCategory) => {
    const newCats = { ...categories };
    if (!newCats[parentId]) return;
    newCats[parentId].subs.push(sub);
    saveCategories(newCats);
  };
  
  const deleteInterview = (parentId: string, subId: string) => {
    const newCats = { ...categories };
    if (!newCats[parentId]) return;
    newCats[parentId].subs = newCats[parentId].subs.filter(s => s.id !== subId);
    saveCategories(newCats);
  };

  return {
    isLoaded,
    categories,
    bookings,
    users,
    currentUser,
    saveUsers,
    loginUser,
    logoutUser,
    saveCategories,
    saveBookings,
    addBooking,
    updateBooking,
    addInterview,
    deleteInterview
  };
}
