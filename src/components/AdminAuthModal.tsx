'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Loader2, AlertCircle } from 'lucide-react';
import { authenticateAdmin, storeAuthToken } from '@/lib/auth';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  portfolioId: string;
}

const AdminAuthModal: React.FC<AdminAuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  portfolioId,
}) => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError('Password is required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await authenticateAdmin({
        id: portfolioId,
        password: password.trim(),
      });

      if (response.success && response.data.edit_access && response.data.token) {
        storeAuthToken(response.data.token);
        onSuccess();
        onClose();
        setPassword('');
      } else {
        setError(response.message || 'Authentication failed');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setPassword('');
    setError(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
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
            className="relative bg-white rounded-xl shadow-2xl p-6 w-full max-w-md mx-4"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Lock className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Admin Access
                </h2>
              </div>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                disabled={loading}
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Enter admin password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-500"
                  placeholder="Admin password"
                  disabled={loading}
                />
              </div>

              {/* Error message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2"
                >
                  <AlertCircle className="w-4 h-4 text-red-600" />
                  <span className="text-sm text-red-700">{error}</span>
                </motion.div>
              )}

              {/* Buttons */}
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <span>Authenticate</span>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AdminAuthModal; 