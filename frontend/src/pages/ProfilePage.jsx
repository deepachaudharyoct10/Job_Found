import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { Edit2, Save, X, User, Mail, FileText, Award, Building2 } from 'lucide-react';

const ProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const { applications, jobs } = useData();
  const [editingField, setEditingField] = useState(null);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    skills: user?.skills?.join(', ') || '',
    bio: user?.bio || '',
    resume: user?.resume || '',
    company: user?.company || ''
  });

  const handleEdit = (field) => {
    setEditingField(field);
  };

  const handleSave = (field) => {
    const updates = {};
    
    if (field === 'skills') {
      updates.skills = formData.skills.split(',').map(skill => skill.trim()).filter(skill => skill);
    } else {
      updates[field] = formData[field];
    }
    
    updateProfile(updates);
    setEditingField(null);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      skills: user?.skills?.join(', ') || '',
      bio: user?.bio || '',
      resume: user?.resume || '',
      company: user?.company || ''
    });
    setEditingField(null);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const getUserApplications = () => {
    if (!user) return [];
    return applications.filter(app => app.studentId === user.id);
  };

  const getJobTitle = (jobId) => {
    const job = jobs.find(j => j.id === jobId);
    return job?.title || 'Unknown Job';
  };

  const getJobCompany = (jobId) => {
    const job = jobs.find(j => j.id === jobId);
    return job?.company || 'Unknown Company';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const renderField = (field, label, icon, isTextArea = false) => {
    const isEditing = editingField === field;
    const value = formData[field];

    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            {icon}
            <h3 className="text-lg font-semibold text-gray-900">{label}</h3>
          </div>
          {!isEditing && (
            <button
              onClick={() => handleEdit(field)}
              className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
            >
              <Edit2 className="h-4 w-4" />
            </button>
          )}
        </div>

        {isEditing ? (
          <div className="space-y-4">
            {isTextArea ? (
              <textarea
                name={field}
                value={value}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={`Enter your ${label.toLowerCase()}`}
              />
            ) : (
              <input
                type="text"
                name={field}
                value={value}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={`Enter your ${label.toLowerCase()}`}
              />
            )}
            <div className="flex space-x-2">
              <button
                onClick={() => handleSave(field)}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save className="h-4 w-4" />
                <span>Save</span>
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center space-x-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                <X className="h-4 w-4" />
                <span>Cancel</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="text-gray-700">
            {field === 'skills' ? (
              <div className="flex flex-wrap gap-2">
                {user?.skills?.map((skill, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                )) || <span className="text-gray-500">No skills added</span>}
              </div>
            ) : field === 'resume' ? (
              value ? (
                <a href="#" className="text-blue-600 hover:text-blue-700 underline">
                  {value}
                </a>
              ) : (
                <span className="text-gray-500">No resume uploaded</span>
              )
            ) : (
              <p>{value || `No ${label.toLowerCase()} provided`}</p>
            )}
          </div>
        )}
      </div>
    );
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
          <p className="text-gray-600 mt-2">Manage your profile information</p>
        </div>

        <div className="space-y-6">
          {renderField('name', 'Full Name', <User className="h-5 w-5 text-gray-400" />)}
          {renderField('email', 'Email Address', <Mail className="h-5 w-5 text-gray-400" />)}
          {renderField('skills', 'Skills', <Award className="h-5 w-5 text-gray-400" />)}
          {renderField('bio', 'Bio', <FileText className="h-5 w-5 text-gray-400" />, true)}
          {renderField('resume', 'Resume', <FileText className="h-5 w-5 text-gray-400" />)}
          {user.role === 'recruiter' && renderField('company', 'Company', <Building2 className="h-5 w-5 text-gray-400" />)}

          {/* Applied Jobs - Only for Students */}
          {user.role === 'student' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Applied Jobs</h3>
              {getUserApplications().length > 0 ? (
                <div className="space-y-4">
                  {getUserApplications().map((application) => (
                    <div key={application.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">{getJobTitle(application.jobId)}</h4>
                        <p className="text-sm text-gray-600">{getJobCompany(application.jobId)}</p>
                        <p className="text-sm text-gray-500">Applied on {new Date(application.appliedDate).toLocaleDateString()}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}>
                        {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No job applications yet</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;