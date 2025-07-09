import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { Link } from 'react-router-dom';
import JobCard from '../components/JobCard';
import { 
  Search, 
  ArrowRight, 
  TrendingUp, 
  Users, 
  Building2, 
  Star,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const HomePage = () => {
  const { user } = useAuth();
  const { jobs, applications } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentJobIndex, setCurrentJobIndex] = useState(0);

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const latestJobs = jobs.slice(0, 6);
  const jobsPerView = 2;
  const totalViews = Math.ceil(latestJobs.length / jobsPerView);

  const nextJobs = () => {
    setCurrentJobIndex((prev) => (prev + 1) % totalViews);
  };

  const prevJobs = () => {
    setCurrentJobIndex((prev) => (prev - 1 + totalViews) % totalViews);
  };

  const getCurrentJobs = () => {
    const start = currentJobIndex * jobsPerView;
    return latestJobs.slice(start, start + jobsPerView);
  };

  const getAppliedJobIds = () => {
    if (!user) return [];
    return applications
      .filter(app => app.studentId === user.id)
      .map(app => app.jobId);
  };

  const stats = [
    { label: 'Active Jobs', value: jobs.length, icon: TrendingUp, color: 'from-blue-500 to-blue-600' },
    { label: 'Companies', value: '50+', icon: Building2, color: 'from-purple-500 to-purple-600' },
    { label: 'Job Seekers', value: '1,000+', icon: Users, color: 'from-green-500 to-green-600' },
    { label: 'Success Rate', value: '85%', icon: Star, color: 'from-orange-500 to-orange-600' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Find Your{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Dream Job
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Connect with top companies and discover opportunities that match your skills and aspirations.
            </p>

            {/* Search Bar - Only for Students */}
            {user?.role === 'student' && (
              <div className="max-w-2xl mx-auto mb-8">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search jobs by title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                  />
                </div>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!user ? (
                <>
                  <Link
                    to="/signup"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-8 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    Get Started
                  </Link>
                  <Link
                    to="/login"
                    className="bg-white text-gray-700 font-semibold py-3 px-8 rounded-xl border-2 border-gray-300 hover:border-blue-500 hover:text-blue-600 transition-all duration-200"
                  >
                    Sign In
                  </Link>
                </>
              ) : (
                <Link
                  to={user.role === 'student' ? '/student' : '/recruiter'}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-8 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 inline-flex items-center space-x-2"
                >
                  <span>Go to Dashboard</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Jobs Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Latest Opportunities</h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={prevJobs}
                className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-200"
              >
                <ChevronLeft className="h-5 w-5 text-gray-600" />
              </button>
              <button
                onClick={nextJobs}
                className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-200"
              >
                <ChevronRight className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {getCurrentJobs().map((job) => (
              <JobCard 
                key={job.id} 
                job={job} 
                showApplyButton={user?.role === 'student'}
                isApplied={getAppliedJobIds().includes(job.id)}
              />
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to={user?.role === 'student' ? '/student' : '/login'}
              className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <span>View All Jobs</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Search Results - Only for Students */}
      {user?.role === 'student' && searchTerm && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Search Results for "{searchTerm}"
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredJobs.map((job) => (
                <JobCard 
                  key={job.id} 
                  job={job} 
                  showApplyButton={true}
                  isApplied={getAppliedJobIds().includes(job.id)}
                />
              ))}
            </div>
            {filteredJobs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No jobs found matching your search.</p>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default HomePage;