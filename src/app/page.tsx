'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { PortfolioData } from '@/types/portfolio';
import { fetchPortfolioById } from '@/lib/api';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Expertise from '@/components/Expertise';
import Projects from '@/components/Projects';
import SocialLinks from '@/components/SocialLinks';
import Contact from '@/components/Contact';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = searchParams.get('id');
        if (!id) {
          throw new Error('Portfolio ID is required');
        }

        const response = await fetchPortfolioById(id);
        if (response.success) {
          setPortfolioData(response.data);
        } else {
          throw new Error(response.message || 'Failed to fetch portfolio');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-lg text-gray-600">Loading portfolio...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-100">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center bg-white p-8 rounded-xl shadow-lg max-w-md mx-4"
        >
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-2xl">⚠️</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Oops!</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Try Again
          </button>
        </motion.div>
      </div>
    );
  }

  if (!portfolioData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero
        name={portfolioData.name}
        profilePic={portfolioData.profile_pic}
        expertiseRoles={portfolioData.expertise_roles}
      />
      <About aboutMe={portfolioData.about_me} />
      <Expertise expertise={portfolioData.expertise} />
      <Projects projects={portfolioData.projects} />
      <SocialLinks socialLinks={portfolioData.social_links} />
      <Contact contact={portfolioData.contact} />
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-gray-400"
          >
            © {new Date().getFullYear()} {portfolioData.name}. All rights reserved.
          </motion.p>
        </div>
      </footer>
    </div>
  );
}
