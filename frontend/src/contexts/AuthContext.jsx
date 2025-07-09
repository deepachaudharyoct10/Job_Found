import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Mock users for demonstration
  const mockUsers = [
    {
      id: '1',
      name: 'Alex Johnson',
      email: 'alex@student.com',
      role: 'student',
      skills: ['JavaScript', 'React', 'Node.js'],
      resume: 'alex-resume.pdf',
      bio: 'Passionate full-stack developer with 2 years of experience.',
      password: 'password123'
    },
    {
      id: '2',
      name: 'Sarah Chen',
      email: 'sarah@company.com',
      role: 'recruiter',
      company: 'TechCorp Inc.',
      bio: 'Senior Technical Recruiter specializing in software engineering roles.',
      password: 'password123'
    }
  ];

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email, password) => {
    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  };

  const signup = async (userData) => {
    const newUser = {
      id: Math.random().toString(36).substring(7),
      name: userData.name || '',
      email: userData.email || '',
      role: userData.role || 'student',
      skills: userData.skills || [],
      bio: userData.bio || '',
      company: userData.company || '',
    };
    
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateProfile = (updates) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};