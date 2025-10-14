import { useAuth } from '../contexts/AuthContext';
import MainLayout from '../components/MainLayout';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BarGraphPage = () => {
  const { employeeData } = useAuth();
  const navigate = useNavigate();

  const chartData = employeeData.slice(0, 10).map(emp => ({
    name: emp.name,
    salary: emp.salary
  }));

  return (
    <MainLayout title="Salary Analysis">
      <div className="space-y-6">
        <button
          onClick={() => navigate('/list')}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to List</span>
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">
            Top 10 Employees by Salary
          </h2>

          <div className="w-full h-[500px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 100 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="name"
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  tick={{ fill: '#475569', fontSize: 12 }}
                />
                <YAxis
                  tick={{ fill: '#475569' }}
                  label={{ value: 'Salary ($)', angle: -90, position: 'insideLeft', fill: '#475569' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                  formatter={(value) => [`$${value.toLocaleString()}`, 'Salary']}
                />
                <Legend />
                <Bar
                  dataKey="salary"
                  fill="#3b82f6"
                  radius={[8, 8, 0, 0]}
                  name="Salary"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default BarGraphPage;
