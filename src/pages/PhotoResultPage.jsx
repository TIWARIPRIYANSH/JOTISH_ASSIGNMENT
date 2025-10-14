import { useLocation, useNavigate } from 'react-router-dom';
import MainLayout from '../components/MainLayout';
import { ArrowLeft, CheckCircle } from 'lucide-react';

const PhotoResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const imageData = location.state?.imageData;

  if (!imageData) {
    return (
      <MainLayout title="Photo Result">
        <div className="text-center py-12">
          <p className="text-slate-500 text-lg mb-4">No photo available</p>
          <button
            onClick={() => navigate('/list')}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Back to List
          </button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Photo Result">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
          <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 text-white">
            <div className="flex items-center justify-center gap-3">
              <CheckCircle size={32} />
              <h2 className="text-2xl font-bold">Photo Captured Successfully</h2>
            </div>
          </div>

          <div className="p-8">
            <div className="bg-slate-100 rounded-xl overflow-hidden mb-6">
              <img
                src={imageData}
                alt="Captured photo"
                className="w-full h-auto"
              />
            </div>

            <button
              onClick={() => navigate(-1)}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-md"
            >
              <ArrowLeft size={20} />
              <span>Back</span>
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PhotoResultPage;
