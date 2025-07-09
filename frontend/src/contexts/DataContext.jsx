import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [jobs, setJobs] = useState([
    {
      id: '1',
      title: 'Frontend Developer',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      salary: '$80,000 - $120,000',
      datePosted: '2024-01-15',
      totalApplicants: 24,
      position: 'Full-time',
      experienceRequired: '2-4 years',
      description: 'We are looking for a skilled Frontend Developer to join our team...',
      recruiterId: '2',
      skills: ['JavaScript', 'React', 'CSS', 'HTML']
    },
    {
      id: '2',
      title: 'Backend Developer',
      company: 'DataFlow Solutions',
      location: 'New York, NY',
      salary: '$90,000 - $140,000',
      datePosted: '2024-01-14',
      totalApplicants: 18,
      position: 'Full-time',
      experienceRequired: '3-5 years',
      description: 'Join our backend team to build scalable API solutions...',
      recruiterId: '2',
      skills: ['Node.js', 'Python', 'MongoDB', 'AWS']
    },
    {
      id: '3',
      title: 'UI/UX Designer',
      company: 'Creative Studio',
      location: 'Remote',
      salary: '$70,000 - $100,000',
      datePosted: '2024-01-13',
      totalApplicants: 32,
      position: 'Contract',
      experienceRequired: '1-3 years',
      description: 'Design intuitive user experiences for our digital products...',
      recruiterId: '2',
      skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research']
    },
    {
      id: '4',
      title: 'Data Scientist',
      company: 'AI Innovations',
      location: 'Boston, MA',
      salary: '$100,000 - $150,000',
      datePosted: '2024-01-12',
      totalApplicants: 15,
      position: 'Full-time',
      experienceRequired: '2-5 years',
      description: 'Analyze complex datasets to drive business insights...',
      recruiterId: '2',
      skills: ['Python', 'R', 'Machine Learning', 'SQL']
    },
    {
      id: '5',
      title: 'DevOps Engineer',
      company: 'CloudTech Systems',
      location: 'Seattle, WA',
      salary: '$95,000 - $135,000',
      datePosted: '2024-01-11',
      totalApplicants: 21,
      position: 'Full-time',
      experienceRequired: '3-6 years',
      description: 'Maintain and improve our cloud infrastructure...',
      recruiterId: '2',
      skills: ['AWS', 'Docker', 'Kubernetes', 'Jenkins']
    },
    {
      id: '6',
      title: 'Product Manager',
      company: 'StartupXYZ',
      location: 'Austin, TX',
      salary: '$85,000 - $125,000',
      datePosted: '2024-01-10',
      totalApplicants: 28,
      position: 'Full-time',
      experienceRequired: '2-4 years',
      description: 'Lead product development from conception to launch...',
      recruiterId: '2',
      skills: ['Product Strategy', 'Agile', 'Analytics', 'Leadership']
    }
  ]);

  const [companies, setCompanies] = useState([
    {
      id: '1',
      name: 'TechCorp Inc.',
      description: 'Leading technology company specializing in cloud solutions',
      location: 'San Francisco, CA',
      industry: 'Technology',
      size: '500-1000 employees'
    },
    {
      id: '2',
      name: 'DataFlow Solutions',
      description: 'Data analytics and business intelligence platform',
      location: 'New York, NY',
      industry: 'Data & Analytics',
      size: '100-500 employees'
    },
    {
      id: '3',
      name: 'Creative Studio',
      description: 'Digital design and creative agency',
      location: 'Remote',
      industry: 'Design & Creative',
      size: '50-100 employees'
    }
  ]);

  const [applications, setApplications] = useState([
    {
      id: '1',
      jobId: '1',
      studentId: '1',
      status: 'applied',
      appliedDate: '2024-01-16',
      studentName: 'Alex Johnson',
      studentEmail: 'alex@student.com',
      studentSkills: ['JavaScript', 'React', 'Node.js'],
      studentResume: 'alex-resume.pdf'
    }
  ]);

  const addJob = (job) => {
    const newJob = {
      ...job,
      id: Math.random().toString(36).substring(7),
      datePosted: new Date().toISOString().split('T')[0],
      totalApplicants: 0
    };
    setJobs([...jobs, newJob]);
  };

  const addCompany = (company) => {
    const newCompany = {
      ...company,
      id: Math.random().toString(36).substring(7)
    };
    setCompanies([...companies, newCompany]);
  };

  const applyToJob = (jobId, studentId, studentData) => {
    const newApplication = {
      id: Math.random().toString(36).substring(7),
      jobId,
      studentId,
      status: 'applied',
      appliedDate: new Date().toISOString().split('T')[0],
      studentName: studentData.name,
      studentEmail: studentData.email,
      studentSkills: studentData.skills || [],
      studentResume: studentData.resume || ''
    };
    setApplications([...applications, newApplication]);
    
    // Update job applicant count
    setJobs(jobs.map(job => 
      job.id === jobId 
        ? { ...job, totalApplicants: job.totalApplicants + 1 }
        : job
    ));
  };

  const updateApplicationStatus = (applicationId, status) => {
    setApplications(applications.map(app => 
      app.id === applicationId ? { ...app, status } : app
    ));
  };

  const getJobsByRecruiter = (recruiterId) => {
    return jobs.filter(job => job.recruiterId === recruiterId);
  };

  const getApplicationsByJob = (jobId) => {
    return applications.filter(app => app.jobId === jobId);
  };

  return (
    <DataContext.Provider value={{
      jobs,
      companies,
      applications,
      addJob,
      addCompany,
      applyToJob,
      updateApplicationStatus,
      getJobsByRecruiter,
      getApplicationsByJob
    }}>
      {children}
    </DataContext.Provider>
  );
};