'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Loader2, Plus, Trash2, AlertCircle, CheckCircle } from 'lucide-react';
import { PortfolioData } from '@/types/portfolio';
import { updatePortfolio, UpdatePortfolioRequest } from '@/lib/api';
import { getAuthToken } from '@/lib/auth';
import ImageUpload from './ImageUpload';

interface EditPortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  portfolioData: PortfolioData;
  onSuccess: () => void;
  onShowToast: (type: 'success' | 'error', message: string) => void;
}

const EditPortfolioModal: React.FC<EditPortfolioModalProps> = ({
  isOpen,
  onClose,
  portfolioData,
  onSuccess,
  onShowToast,
}) => {
  const [formData, setFormData] = useState<UpdatePortfolioRequest>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (portfolioData) {
      setFormData({
        name: portfolioData.name,
        profile_pic: portfolioData.profile_pic,
        about_me: portfolioData.about_me,
        expertise_roles: [...portfolioData.expertise_roles],
        expertise: portfolioData.expertise.map(item => ({ ...item })),
        projects: portfolioData.projects.map(item => ({ ...item })),
        social_links: portfolioData.social_links.map(item => ({ ...item })),
        contact: { ...portfolioData.contact },
      });
    }
  }, [portfolioData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const response = await updatePortfolio(portfolioData.id, formData, token);

      if (response.success) {
        onShowToast('success', 'Portfolio updated successfully!');
        setTimeout(() => {
          onSuccess();
          onClose();
        }, 1000);
      } else {
        setError(response.message || 'Failed to update portfolio');
        onShowToast('error', response.message || 'Failed to update portfolio');
      }
    } catch (error) {
      const errorMessage = 'Network error. Please try again.';
      setError(errorMessage);
      onShowToast('error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setError(null);
    onClose();
  };

  // Helper functions for array fields
  const addExpertiseRole = () => {
    setFormData(prev => ({
      ...prev,
      expertise_roles: [...(prev.expertise_roles || []), '']
    }));
  };

  const removeExpertiseRole = (index: number) => {
    setFormData(prev => ({
      ...prev,
      expertise_roles: prev.expertise_roles?.filter((_, i) => i !== index)
    }));
  };

  const updateExpertiseRole = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      expertise_roles: prev.expertise_roles?.map((item, i) => i === index ? value : item)
    }));
  };

  const addExpertise = () => {
    setFormData(prev => ({
      ...prev,
      expertise: [...(prev.expertise || []), { name: '', img: '' }]
    }));
  };

  const removeExpertise = (index: number) => {
    setFormData(prev => ({
      ...prev,
      expertise: prev.expertise?.filter((_, i) => i !== index)
    }));
  };

  const updateExpertise = (index: number, field: 'name' | 'img', value: string) => {
    setFormData(prev => ({
      ...prev,
      expertise: prev.expertise?.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const addProject = () => {
    setFormData(prev => ({
      ...prev,
      projects: [...(prev.projects || []), { name: '', img: '', description: '', link: '' }]
    }));
  };

  const removeProject = (index: number) => {
    setFormData(prev => ({
      ...prev,
      projects: prev.projects?.filter((_, i) => i !== index)
    }));
  };

  const updateProject = (index: number, field: 'name' | 'img' | 'description' | 'link', value: string) => {
    setFormData(prev => ({
      ...prev,
      projects: prev.projects?.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const addSocialLink = () => {
    setFormData(prev => ({
      ...prev,
      social_links: [...(prev.social_links || []), { name: '', logo: '', link: '' }]
    }));
  };

  const removeSocialLink = (index: number) => {
    setFormData(prev => ({
      ...prev,
      social_links: prev.social_links?.filter((_, i) => i !== index)
    }));
  };

  const updateSocialLink = (index: number, field: 'name' | 'logo' | 'link', value: string) => {
    setFormData(prev => ({
      ...prev,
      social_links: prev.social_links?.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  // Common input styles
  const inputStyles = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-500";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
              <h2 className="text-2xl font-semibold text-gray-900">
                Edit Portfolio
              </h2>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                disabled={loading}
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Form - Scrollable Content */}
            <div className="flex-1 overflow-y-auto">
              <form onSubmit={handleSubmit}>
                <div className="p-6 space-y-6">
                  {/* Basic Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        value={formData.name || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className={inputStyles}
                        disabled={loading}
                        placeholder="Enter your name"
                      />
                    </div>

                    {/* Profile Picture Upload */}
                    <ImageUpload
                      currentImage={formData.profile_pic}
                      onImageUpload={(url) => setFormData(prev => ({ ...prev, profile_pic: url }))}
                      onShowToast={onShowToast}
                      label="Profile Picture"
                      placeholder="Upload your profile picture"
                    />

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        About Me
                      </label>
                      <textarea
                        value={formData.about_me || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, about_me: e.target.value }))}
                        rows={4}
                        className={inputStyles}
                        disabled={loading}
                        placeholder="Tell us about yourself..."
                      />
                    </div>
                  </div>

                  {/* Expertise Roles */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">Expertise Roles</h3>
                      <button
                        type="button"
                        onClick={addExpertiseRole}
                        className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
                        disabled={loading}
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Role</span>
                      </button>
                    </div>
                    
                    {formData.expertise_roles?.map((role, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={role}
                          onChange={(e) => updateExpertiseRole(index, e.target.value)}
                          className={inputStyles}
                          placeholder="Role name"
                          disabled={loading}
                        />
                        <button
                          type="button"
                          onClick={() => removeExpertiseRole(index)}
                          className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                          disabled={loading}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Expertise */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">Expertise</h3>
                      <button
                        type="button"
                        onClick={addExpertise}
                        className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
                        disabled={loading}
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Expertise</span>
                      </button>
                    </div>
                    
                    {formData.expertise?.map((expertise, index) => (
                      <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-4 bg-gray-50">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">Expertise {index + 1}</span>
                          <button
                            type="button"
                            onClick={() => removeExpertise(index)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 p-1 rounded transition-colors"
                            disabled={loading}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <input
                          type="text"
                          value={expertise.name}
                          onChange={(e) => updateExpertise(index, 'name', e.target.value)}
                          className={inputStyles}
                          placeholder="Expertise name"
                          disabled={loading}
                        />
                        
                        <ImageUpload
                          currentImage={expertise.img}
                          onImageUpload={(url) => updateExpertise(index, 'img', url)}
                          onShowToast={onShowToast}
                          label="Expertise Image"
                          placeholder="Upload expertise image"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Projects */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">Projects</h3>
                      <button
                        type="button"
                        onClick={addProject}
                        className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
                        disabled={loading}
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Project</span>
                      </button>
                    </div>
                    
                    {formData.projects?.map((project, index) => (
                      <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-4 bg-gray-50">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">Project {index + 1}</span>
                          <button
                            type="button"
                            onClick={() => removeProject(index)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 p-1 rounded transition-colors"
                            disabled={loading}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <input
                          type="text"
                          value={project.name}
                          onChange={(e) => updateProject(index, 'name', e.target.value)}
                          className={inputStyles}
                          placeholder="Project name"
                          disabled={loading}
                        />
                        
                        <ImageUpload
                          currentImage={project.img}
                          onImageUpload={(url) => updateProject(index, 'img', url)}
                          onShowToast={onShowToast}
                          label="Project Image"
                          placeholder="Upload project image"
                        />
                        
                        <textarea
                          value={project.description}
                          onChange={(e) => updateProject(index, 'description', e.target.value)}
                          rows={2}
                          className={inputStyles}
                          placeholder="Project description"
                          disabled={loading}
                        />
                        
                        <input
                          type="url"
                          value={project.link}
                          onChange={(e) => updateProject(index, 'link', e.target.value)}
                          className={inputStyles}
                          placeholder="Project link"
                          disabled={loading}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Social Links */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">Social Links</h3>
                      <button
                        type="button"
                        onClick={addSocialLink}
                        className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
                        disabled={loading}
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Social Link</span>
                      </button>
                    </div>
                    
                    {formData.social_links?.map((social, index) => (
                      <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-4 bg-gray-50">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">Social Link {index + 1}</span>
                          <button
                            type="button"
                            onClick={() => removeSocialLink(index)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 p-1 rounded transition-colors"
                            disabled={loading}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <input
                          type="text"
                          value={social.name}
                          onChange={(e) => updateSocialLink(index, 'name', e.target.value)}
                          className={inputStyles}
                          placeholder="Platform name"
                          disabled={loading}
                        />
                        
                        <ImageUpload
                          currentImage={social.logo}
                          onImageUpload={(url) => updateSocialLink(index, 'logo', url)}
                          onShowToast={onShowToast}
                          label="Social Logo"
                          placeholder="Upload platform logo"
                        />
                        
                        <input
                          type="url"
                          value={social.link}
                          onChange={(e) => updateSocialLink(index, 'link', e.target.value)}
                          className={inputStyles}
                          placeholder="Profile link"
                          disabled={loading}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">Contact Information</h3>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={formData.contact?.email || ''}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          contact: { ...prev.contact!, email: e.target.value }
                        }))}
                        className={inputStyles}
                        disabled={loading}
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={formData.contact?.phone || ''}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          contact: { ...prev.contact!, phone: e.target.value }
                        }))}
                        className={inputStyles}
                        disabled={loading}
                        placeholder="+1234567890"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address
                      </label>
                      <input
                        type="text"
                        value={formData.contact?.address || ''}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          contact: { ...prev.contact!, address: e.target.value }
                        }))}
                        className={inputStyles}
                        disabled={loading}
                        placeholder="City, Country"
                      />
                    </div>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2"
                    >
                      <AlertCircle className="w-5 h-5 text-red-600" />
                      <span className="text-sm text-red-700">{error}</span>
                    </motion.div>
                  )}

                  {/* Add some padding at the bottom */}
                  <div className="pb-4"></div>
                </div>
              </form>
            </div>

            {/* Footer - Fixed at bottom */}
            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 bg-white flex-shrink-0">
              <button
                type="button"
                onClick={handleClose}
                className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default EditPortfolioModal; 