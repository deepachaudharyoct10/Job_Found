import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { 
  MapPin, 
  DollarSign, 
  Calendar, 
  Users, 
  Clock, 
  Star,
  CheckCircle,
  Building2
} from 'lucide-react';

const JobCard = ({ job, showApplyButton = true, isApplied = false }) => {
  const { user } = useAuth();
  const { applyToJob } = useData();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [hasApplied, setHasApplied] = useState(isApplied);

  const handleApply = () => {
    setShowConfirmation(true);
  };

  const confirmApply = () => {
    if (user) {
      applyToJob(job.id, user.id, user);
      setHasApplied(true);
      setShowConfirmation(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden group">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {job.title}
              </h3>
              <div className="flex items-center text-gray-600 mb-2">
                <Building2 className="h-4 w-4 mr-2" />
                <span className="font-medium">{job.company}</span>
              </div>
            </div>
            <div className="flex items-center space-x-1 bg-blue-50 px-3 py-1 rounded-full">
              <Star className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-600">{job.position}</span>
            </div>
          </div>

          {/* Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <div className="flex items-center text-gray-600">
              <MapPin className="h-4 w-4 mr-2 text-gray-400" />
              <span className="text-sm">{job.location}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <DollarSign className="h-4 w-4 mr-2 text-gray-400" />
              <span className="text-sm font-medium">{job.salary}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Calendar className="h-4 w-4 mr-2 text-gray-400" />
              <span className="text-sm">{formatDate(job.datePosted)}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Users className="h-4 w-4 mr-2 text-gray-400" />
              <span className="text-sm">{job.totalApplicants} applicants</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Clock className="h-4 w-4 mr-2 text-gray-400" />
              <span className="text-sm">{job.experienceRequired}</span>
            </div>
          </div>

          {/* Skills */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {job.skills.slice(0, 3).map((skill, index) => (
                <span 
                  key={index}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
              {job.skills.length > 3 && (
                <span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-sm">
                  +{job.skills.length - 3} more
                </span>
              )}
            </div>
          </div>

          {/* Apply Button */}
          {showApplyButton && user?.role === 'student' && (
            <div className="pt-4 border-t border-gray-100">
              {hasApplied ? (
                <div className="flex items-center justify-center space-x-2 bg-green-50 text-green-600 px-4 py-2 rounded-lg">
                  <CheckCircle className="h-4 w-4" />
                  <span className="font-medium">Applied</span>
                </div>
              ) : (
                <button
                  onClick={handleApply}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium py-2 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Apply Now
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Confirm Application</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to apply for <strong>{job.title}</strong> at <strong>{job.company}</strong>?
            </p>
            <div className="flex space-x-4">
              <button
                onClick={confirmApply}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium py-2 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
              >
                Yes, Apply
              </button>
              <button
                onClick={() => setShowConfirmation(false)}
                className="flex-1 bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default JobCard;