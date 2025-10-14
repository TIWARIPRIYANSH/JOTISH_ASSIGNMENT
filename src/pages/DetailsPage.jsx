import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import MainLayout from '../components/MainLayout';
import CameraCapture from '../components/CameraCapture';
import { Camera, User, Briefcase, MapPin, Calendar, DollarSign, ArrowLeft } from 'lucide-react';

const DetailsPage = () => {
  const { employeeId } = useParams();
  const { employeeData } = useAuth();
  const navigate = useNavigate();
  const [showCamera, setShowCamera] = useState(false);

  const employee = employeeData.find(emp => emp.id === parseInt(employeeId));

  const handleCapture = (imageData) => {
    setShowCamera(false);
    navigate('/photo-result', { state: { imageData } });
  };

  if (!employee) {
    return (
      <MainLayout title="Employee Details">
        <div className="text-center py-12">
          <p className="text-slate-500 text-lg">Employee not found</p>
          <button
            onClick={() => navigate('/list')}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Back to List
          </button>
        </div>
      </MainLayout>
    );
  }

  return (
    <>
      <MainLayout title="Employee Details">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => navigate('/list')}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-800 mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to List</span>
          </button>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-8 text-white">
              <div className="flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full mb-4 mx-auto">
                <User size={48} />
              </div>
              <h2 className="text-3xl font-bold text-center">{employee.name}</h2>
            </div>

            <div className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
                    <Briefcase className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Role</p>
                    <p className="text-lg font-semibold text-slate-800">{employee.role}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg">
                    <DollarSign className="text-green-600" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Salary</p>
                    <p className="text-lg font-semibold text-slate-800">
                      ${employee.salary.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg">
                    <MapPin className="text-orange-600" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1">City</p>
                    <p className="text-lg font-semibold text-slate-800">{employee.city}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg">
                    <Calendar className="text-purple-600" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Joining Date</p>
                    <p className="text-lg font-semibold text-slate-800">{employee.joiningDate}</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-200">
                <button
                  onClick={() => setShowCamera(true)}
                  className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl text-lg font-medium"
                >
                  <Camera size={24} />
                  <span>Capture a Photo</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>

      {showCamera && (
        <CameraCapture
          onCapture={handleCapture}
          onCancel={() => setShowCamera(false)}
        />
      )}
    </>
  );
};

export default DetailsPage;
