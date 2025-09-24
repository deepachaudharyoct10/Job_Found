import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useData } from "../contexts/DataContext";
import { registerCompany } from "../services/companyService";
import {
  Plus,
  Search,
  Building2,
  Eye,
  Edit2,
  Users,
  Briefcase,
  Star,
  TrendingUp,
  CheckCircle,
  XCircle,
  Mail,
  Award,
} from "lucide-react";

const RecruiterDashboard = () => {
  const { user } = useAuth();
  const {
    companies,
    jobs,
    applications,
    addCompany,
    addJob,
    updateApplicationStatus,
    getJobsByRecruiter,
    getApplicationsByJob,
  } = useData();

  const [activeTab, setActiveTab] = useState("companies");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddCompany, setShowAddCompany] = useState(false);
  const [showAddJob, setShowAddJob] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const [companyForm, setCompanyForm] = useState({
    companyName: "",
    description: "",
    location: "",
    website: "",
  });

  const [jobForm, setJobForm] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    position: "",
    experienceRequired: "",
    description: "",
    skills: "",
  });

  const recruiterJobs = getJobsByRecruiter(user?.id || "");
  const totalApplications = recruiterJobs.reduce(
    (sum, job) => sum + job.totalApplicants,
    0
  );
  const allApplications = applications.filter((app) =>
    recruiterJobs.some((job) => job.id === app.jobId)
  );
  const acceptedApplications = allApplications.filter(
    (app) => app.status === "accepted"
  );
  const pendingApplications = allApplications.filter(
    (app) => app.status === "applied"
  );

  const stats = [
    {
      label: "Active Jobs",
      value: recruiterJobs.length,
      icon: Briefcase,
      color: "from-blue-500 to-blue-600",
    },
    {
      label: "Total Applications",
      value: totalApplications,
      icon: Users,
      color: "from-purple-500 to-purple-600",
    },
    {
      label: "Accepted Candidates",
      value: acceptedApplications.length,
      icon: Star,
      color: "from-green-500 to-green-600",
    },
    {
      label: "Pending Reviews",
      value: pendingApplications.length,
      icon: TrendingUp,
      color: "from-yellow-500 to-yellow-600",
    },
  ];

  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCompany = async (e) => {
    e.preventDefault();
    setShowAddCompany(false);
    try {
      const response = await registerCompany(companyForm);
      console.log("response", response.data);
      if(response.status === '200'){
        setCompanyForm(response);
      
      }
      
    } catch (error) {
      console.error(error);
      console.log("error", error);
    }
  };

  const handleAddJob = (e) => {
    e.preventDefault();
    const newJob = {
      ...jobForm,
      recruiterId: user?.id || "",
      skills: jobForm.skills.split(",").map((skill) => skill.trim()),
    };
    addJob(newJob);
    setJobForm({
      title: "",
      company: "",
      location: "",
      salary: "",
      position: "",
      experienceRequired: "",
      description: "",
      skills: "",
    });
    setShowAddJob(false);
  };

  const handleStatusUpdate = (applicationId, status) => {
    updateApplicationStatus(applicationId, status);
  };

  const renderCompaniesTab = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search companies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button
          onClick={() => setShowAddCompany(true)}
          className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md"
        >
          <Plus className="h-4 w-4" />
          <span>Add Company</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCompanies.map((company) => (
          <div
            key={company.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {company.name}
                  </h3>
                  <p className="text-sm text-gray-500">{company.industry}</p>
                </div>
              </div>
            </div>
            <p className="text-gray-600 mb-4 text-sm">{company.description}</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Location:</span>
                <span className="text-gray-900">{company.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Size:</span>
                <span className="text-gray-900">{company.size}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderJobsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">My Job Postings</h2>
        <button
          onClick={() => setShowAddJob(true)}
          className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md"
        >
          <Plus className="h-4 w-4" />
          <span>Add New Job</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {recruiterJobs.map((job) => (
          <div
            key={job.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {job.title}
                </h3>
                <p className="text-gray-600">{job.company}</p>
              </div>
              <button
                onClick={() => setSelectedJob(job.id)}
                className="flex items-center space-x-2 bg-blue-50 text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <Eye className="h-4 w-4" />
                <span>View Applications</span>
              </button>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Location:</span>
                <span className="text-gray-900">{job.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Salary:</span>
                <span className="text-gray-900">{job.salary}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Applications:</span>
                <span className="text-gray-900">{job.totalApplicants}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderApplicationsModal = () => {
    if (!selectedJob) return null;

    const job = jobs.find((j) => j.id === selectedJob);
    const jobApplications = getApplicationsByJob(selectedJob);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-900">
                Applications for {job?.title}
              </h3>
              <button
                onClick={() => setSelectedJob(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="h-6 w-6" />
              </button>
            </div>
          </div>

          <div className="p-6">
            {jobApplications.length > 0 ? (
              <div className="space-y-4">
                {jobApplications.map((application) => (
                  <div
                    key={application.id}
                    className="bg-gray-50 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">
                          {application.studentName}
                        </h4>
                        <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
                          <Mail className="h-4 w-4" />
                          <span>{application.studentEmail}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
                          <Award className="h-4 w-4" />
                          <span>{application.studentSkills.join(", ")}</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                          Applied on{" "}
                          {new Date(
                            application.appliedDate
                          ).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            application.status === "accepted"
                              ? "bg-green-100 text-green-800"
                              : application.status === "rejected"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {application.status.charAt(0).toUpperCase() +
                            application.status.slice(1)}
                        </span>
                        {application.status === "applied" && (
                          <div className="flex space-x-2">
                            <button
                              onClick={() =>
                                handleStatusUpdate(application.id, "accepted")
                              }
                              className="flex items-center space-x-1 bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition-colors"
                            >
                              <CheckCircle className="h-4 w-4" />
                              <span>Accept</span>
                            </button>
                            <button
                              onClick={() =>
                                handleStatusUpdate(application.id, "rejected")
                              }
                              className="flex items-center space-x-1 bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition-colors"
                            >
                              <XCircle className="h-4 w-4" />
                              <span>Reject</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No applications yet
                </h3>
                <p className="text-gray-500">
                  Applications will appear here when candidates apply.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Recruiter Dashboard
          </h1>
          <p className="text-gray-600 mt-2">Welcome back, {user?.name}!</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}
                >
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab("companies")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "companies"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Companies
              </button>
              <button
                onClick={() => setActiveTab("jobs")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "jobs"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Jobs
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === "companies" ? renderCompaniesTab() : renderJobsTab()}
          </div>
        </div>

        {/* Add Company Modal */}
        {showAddCompany && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <h3 className="text-lg font-semibold mb-4">Add New Company</h3>
              <form onSubmit={handleAddCompany} className="space-y-4">
                <input
                  type="text"
                  placeholder="Company Name"
                  value={companyForm.companyName}
                  onChange={(e) =>
                    setCompanyForm({ ...companyForm, companyName: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <textarea
                  placeholder="Description"
                  value={companyForm.description}
                  onChange={(e) =>
                    setCompanyForm({
                      ...companyForm,
                      description: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  required
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={companyForm.location}
                  onChange={(e) =>
                    setCompanyForm({ ...companyForm, location: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <input
                  type="link"
                  placeholder="website"
                  value={companyForm.website}
                  onChange={(e) =>
                    setCompanyForm({ ...companyForm, website: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />

                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add Company
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddCompany(false)}
                    className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Add Job Modal */}
        {showAddJob && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
              <h3 className="text-lg font-semibold mb-4">Add New Job</h3>
              <form onSubmit={handleAddJob} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Job Title"
                    value={jobForm.title}
                    onChange={(e) =>
                      setJobForm({ ...jobForm, title: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Company"
                    value={jobForm.company}
                    onChange={(e) =>
                      setJobForm({ ...jobForm, company: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Location"
                    value={jobForm.location}
                    onChange={(e) =>
                      setJobForm({ ...jobForm, location: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Salary Range"
                    value={jobForm.salary}
                    onChange={(e) =>
                      setJobForm({ ...jobForm, salary: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Position Type"
                    value={jobForm.position}
                    onChange={(e) =>
                      setJobForm({ ...jobForm, position: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Experience Required"
                    value={jobForm.experienceRequired}
                    onChange={(e) =>
                      setJobForm({
                        ...jobForm,
                        experienceRequired: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <input
                  type="text"
                  placeholder="Skills (comma separated)"
                  value={jobForm.skills}
                  onChange={(e) =>
                    setJobForm({ ...jobForm, skills: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <textarea
                  placeholder="Job Description"
                  value={jobForm.description}
                  onChange={(e) =>
                    setJobForm({ ...jobForm, description: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={4}
                  required
                />
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add Job
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddJob(false)}
                    className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Applications Modal */}
        {renderApplicationsModal()}
      </div>
    </div>
  );
};

export default RecruiterDashboard;
