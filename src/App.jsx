import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import ListPage from './pages/ListPage';
import DetailsPage from './pages/DetailsPage';
import PhotoResultPage from './pages/PhotoResultPage';
import BarGraphPage from './pages/BarGraphPage';
import MapPage from './pages/MapPage';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/list"
            element={
              <ProtectedRoute>
                <ListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/details/:employeeId"
            element={
              <ProtectedRoute>
                <DetailsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/photo-result"
            element={
              <ProtectedRoute>
                <PhotoResultPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/graph"
            element={
              <ProtectedRoute>
                <BarGraphPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/map"
            element={
              <ProtectedRoute>
                <MapPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
