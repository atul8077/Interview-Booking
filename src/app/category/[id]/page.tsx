import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { notFound } from 'next/navigation';

// Mock database for category details and subcategories
const categoryData: Record<string, { title: string; description: string; subs: { id: string, title: string, icon: string, desc: string }[] }> = {
  technical: {
    title: "Technical & IT Interviews",
    description: "Practice with top engineers from FAANG and other leading tech companies.",
    subs: [
      { id: "java", title: "Java Backend", icon: "☕", desc: "Spring Boot, Microservices, Core Java." },
      { id: "php", title: "PHP Developer", icon: "🐘", desc: "Laravel, CodeIgniter, Core PHP." },
      { id: "react", title: "Frontend React", icon: "⚛️", desc: "Next.js, Redux, Tailwind CSS." },
      { id: "system-design", title: "System Design", icon: "🏗️", desc: "Scalability, DB Architecture." },
    ]
  },
  upsc: {
    title: "UPSC & Civil Services",
    description: "Mock personality tests and interview guidance from retired IAS officers and experts.",
    subs: [
      { id: "ias", title: "IAS Mock Interview", icon: "🏛️", desc: "Comprehensive UPSC Board mock." },
      { id: "state-pcs", title: "State PCS", icon: "📝", desc: "State-specific administrative mock." },
      { id: "daf", title: "DAF Analysis", icon: "📄", desc: "Detailed Application Form discussion." },
    ]
  },
  hr: {
    title: "HR & Behavioral",
    description: "Master your soft skills, leadership principles, and cultural fit rounds.",
    subs: [
      { id: "behavioral", title: "Behavioral Round", icon: "🤝", desc: "STAR method, leadership principles." },
      { id: "managerial", title: "Managerial Fit", icon: "👔", desc: "Conflict resolution, team management." },
    ]
  },
  teaching: {
    title: "Teaching & Academia",
    description: "Prepare for professor roles, school teaching, and academic panels.",
    subs: [
      { id: "demo-class", title: "Demo Class Mock", icon: "🏫", desc: "Present a topic to a mock student panel." },
      { id: "academic-panel", title: "Academic Panel", icon: "🎓", desc: "Research discussion, teaching philosophy." },
    ]
  },
  management: {
    title: "Management & MBA",
    description: "Case studies, guesstimates, and product management prep.",
    subs: [
      { id: "product-management", title: "Product Management", icon: "📱", desc: "Product design, metrics, strategy." },
      { id: "consulting", title: "Consulting Case", icon: "📊", desc: "Business case studies, guesstimates." },
    ]
  }
};

export default async function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const data = categoryData[resolvedParams.id];

  if (!data) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen">
      <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 mb-8 font-medium">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Categories
      </Link>
      
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">{data.title}</h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl">{data.description}</p>
      </div>

      <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Select a specific topic to book an interview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.subs.map(sub => (
          <div key={sub.id} className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm flex flex-col h-full">
            <div className="text-4xl mb-4">{sub.icon}</div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{sub.title}</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6 flex-grow">{sub.desc}</p>
            <Link 
              href={`/dashboard?category=${resolvedParams.id}&sub=${sub.id}`}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center mt-auto"
            >
              Book {sub.title} Mock <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
