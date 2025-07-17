'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Contact as ContactType } from '@/types/portfolio';

interface ContactProps {
  contact: ContactType;
}

const Contact: React.FC<ContactProps> = ({ contact }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const contactItems = [
    {
      icon: Mail,
      label: 'Email',
      value: contact.email,
      href: `mailto:${contact.email}`,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: contact.phone,
      href: `tel:${contact.phone}`,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: contact.address,
      href: `https://maps.google.com/?q=${encodeURIComponent(contact.address)}`,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
  ];

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
          <p className="text-lg text-gray-600 mt-6 max-w-2xl mx-auto">
            Ready to start a conversation? I'd love to hear from you. Let's discuss how we can work together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {contactItems.map((item, index) => (
            <motion.a
              key={index}
              href={item.href}
              target={item.label === 'Location' ? '_blank' : undefined}
              rel={item.label === 'Location' ? 'noopener noreferrer' : undefined}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className="flex flex-col items-center text-center">
                  <div className={`w-16 h-16 ${item.bgColor} rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon size={24} className={item.color} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {item.label}
                  </h3>
                  <p className={`${item.color} font-medium hover:underline`}>
                    {item.value}
                  </p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-12"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Ready to Work Together?
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            I'm always open to discussing new opportunities, creative projects, or just having a friendly chat about technology and innovation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`mailto:${contact.email}`}
              className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <Send size={20} className="mr-2" />
              Send Email
            </a>
            <a
              href={`tel:${contact.phone}`}
              className="inline-flex items-center justify-center border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-600 hover:text-white transition-colors duration-200"
            >
              <Phone size={20} className="mr-2" />
              Call Now
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact; 