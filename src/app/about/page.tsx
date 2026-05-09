import Link from 'next/link';

export const metadata = {
  title: 'About Us - InterviewBook',
  description: 'Learn more about the team and mission behind InterviewBook.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-6">About InterviewBook</h1>
      
      <div className="prose prose-blue dark:prose-invert max-w-none space-y-6 text-lg text-slate-600 dark:text-slate-300">
        <p>
          InterviewBook was founded with a single mission: to bridge the gap between talented candidates and their dream opportunities. We believe that everyone deserves a fair chance to showcase their true potential, and the best way to prepare is through realistic, expert-guided mock interviews.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-10">Our Vision</h2>
        <p>
          We envision a world where interview anxiety is a thing of the past. By connecting candidates with industry leaders—from FAANG engineers to retired IAS officers and senior HR professionals—we provide a safe space to practice, fail, learn, and ultimately succeed.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-10">Why Choose Us?</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Expert Mentors:</strong> All our interviewers are carefully vetted professionals with years of experience.</li>
          <li><strong>Diverse Categories:</strong> We cover everything from Technical and IT to UPSC, Management, and Teaching.</li>
          <li><strong>Actionable Feedback:</strong> You don't just get a score; you receive detailed, constructive feedback to improve your weak areas.</li>
          <li><strong>Flexible Scheduling:</strong> Book interviews at times that work for you, directly from our seamless dashboard.</li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-10">Join Our Journey</h2>
        <p>
          Whether you're a college student preparing for your first job or a seasoned professional looking to pivot, InterviewBook is here to support you every step of the way. 
        </p>
      </div>

      <div className="mt-12">
        <Link 
          href="/#categories" 
          className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition-colors shadow-md"
        >
          Start Practicing Today
        </Link>
      </div>
    </div>
  );
}
