'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { ExternalLink, Github } from 'lucide-react';
import { Project } from '@/types/portfolio';

interface ProjectsProps {
  projects: Project[];
}

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            My Projects
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
          <p className="text-lg text-gray-600 mt-6 max-w-2xl mx-auto">
            Here are some of the projects I've worked on that showcase my skills and experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50">
                  <Image
                    src={project.img}
                    alt={project.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                    {project.name}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Project Link */}
                  <div className="flex items-center justify-between">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                    >
                      <span className="mr-2">View Project</span>
                      {project.link.includes('github') ? (
                        <Github size={16} />
                      ) : (
                        <ExternalLink size={16} />
                      )}
                    </a>
                    
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ExternalLink size={16} className="text-blue-600" />
                    </div>
                  </div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Show more projects button if there are many projects */}
        {projects.length > 6 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-12"
          >
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl">
              View All Projects
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects; 