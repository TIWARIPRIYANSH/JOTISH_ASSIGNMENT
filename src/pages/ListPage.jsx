import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import MainLayout from '../components/MainLayout';
import { BarChart3, Map, DollarSign, Briefcase, User } from 'lucide-react';

const ListPage = () => {
  const { employeeData, loading, fetchEmployeeData } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (employeeData.length === 0) {
      fetchEmployeeData();
    }
  }, []);

  if (loading) {
    return (
      <MainLayout title="Employee Directory">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mb-4"></div>
            <p className="text-slate-600 text-lg">Loading employee data...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Employee Directory">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => navigate('/graph')}
            className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors shadow-md hover:shadow-lg"
          >
            <BarChart3 size={20} />
            <span>View Salary Graph</span>
          </button>
          <button
            onClick={() => navigate('/map')}
            className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-md hover:shadow-lg"
          >
            <Map size={20} />
            <span>View City Map</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {employeeData.map((employee) => (
            <Link
              key={employee.id}
              to={`/details/${employee.id}`}
              className="block bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-200 hover:border-blue-400 transform hover:-translate-y-1"
            >
              <div className="p-6">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mb-4 mx-auto">
                  <User className="text-white" size={28} />
                </div>

                <h3 className="text-lg font-bold text-slate-800 text-center mb-3">
                  {employee.name}
                </h3>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Briefcase size={16} className="text-blue-500" />
                    <span className="text-sm">{employee.role}</span>
                  </div>

                  <div className="flex items-center gap-2 text-slate-600">
                    <DollarSign size={16} className="text-green-500" />
                    <span className="text-sm font-semibold">
                      ${employee.salary.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {employeeData.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-slate-500 text-lg">No employee data available</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ListPage;
