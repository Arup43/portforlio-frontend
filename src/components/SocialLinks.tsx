'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { SocialLink } from '@/types/portfolio';

interface SocialLinksProps {
  socialLinks: SocialLink[];
}

const SocialLinks: React.FC<SocialLinksProps> = ({ socialLinks }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  if (!socialLinks || socialLinks.length === 0) {
    return null;
  }

  return (
    <section id="social" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Connect With Me
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
          <p className="text-lg text-gray-600 mt-6 max-w-2xl mx-auto">
            Let&apos;s stay connected! Follow me on these platforms for updates and insights
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-8">
          {socialLinks.map((social, index) => (
            <motion.a
              key={index}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 mb-4 relative overflow-hidden rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 p-2 group-hover:scale-110 transition-transform duration-300">
                    <div className="w-full h-full relative rounded-full overflow-hidden">
                      <Image
                        src={social.logo}
                        alt={`${social.name} logo`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {social.name}
                  </h3>
                  <div className="flex items-center text-blue-600 font-medium text-sm group-hover:text-blue-700 transition-colors duration-200">
                    <span className="mr-1">Follow</span>
                    <ExternalLink size={14} />
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Decorative elements */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex justify-center mt-12"
        >
          <div className="flex space-x-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              ></div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialLinks; 