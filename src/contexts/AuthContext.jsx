import { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [employeeData, setEmployeeData] = useState([]);
  const [loading, setLoading] = useState(false);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setEmployeeData([]);
  };

  const fetchEmployeeData = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
       '/backend_dev/gettabledata.php',
        {
          username: 'test',
          password: '123456'
        }
      );
      console.log('Fetched employee data:', response.data);
      const rawData = response.data.TABLE_DATA.data;

      const mappedData = rawData.map((row, index) => ({
        id: index + 1,
        name: row[0] || 'Unknown',
        role: row[1] || 'Not Specified',
        city: row[2] || 'Unknown',
        joiningDate: row[3] || 'N/A',
        salary: parseFloat(row[4]) || 0
      }));

      setEmployeeData(mappedData);
    } catch (error) {
      console.error('Error fetching employee data:', error);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    isAuthenticated,
    employeeData,
    loading,
    login,
    logout,
    fetchEmployeeData
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
