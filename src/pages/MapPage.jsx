import { useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import MainLayout from '../components/MainLayout';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';

const cityCoordinates = {
  'New York': [40.7128, -74.0060],
  'London': [51.5074, -0.1278],
  'Tokyo': [35.6762, 139.6503],
  'Paris': [48.8566, 2.3522],
  'Berlin': [52.5200, 13.4050],
  'Sydney': [-33.8688, 151.2093],
  'Mumbai': [19.0760, 72.8777],
  'Singapore': [1.3521, 103.8198],
  'Dubai': [25.2048, 55.2708],
  'Toronto': [43.6532, -79.3832],
  'San Francisco': [37.7749, -122.4194],
  'Los Angeles': [34.0522, -118.2437],
  'Chicago': [41.8781, -87.6298],
  'Boston': [42.3601, -71.0589],
  'Seattle': [47.6062, -122.3321]
};

const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = defaultIcon;

const MapPage = () => {
  const { employeeData } = useAuth();
  const navigate = useNavigate();

  const cityData = useMemo(() => {
    const cityMap = {};

    employeeData.forEach(employee => {
      const city = employee.city;
      if (cityMap[city]) {
        cityMap[city].count += 1;
      } else {
        cityMap[city] = {
          count: 1,
          coordinates: cityCoordinates[city] || null
        };
      }
    });

    return Object.entries(cityMap)
      .filter(([_, data]) => data.coordinates !== null)
      .map(([city, data]) => ({
        city,
        count: data.count,
        coordinates: data.coordinates
      }));
  }, [employeeData]);

  return (
    <MainLayout title="Employee Location Map">
      <div className="space-y-6">
        <button
          onClick={() => navigate('/list')}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to List</span>
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-2xl font-bold text-slate-800">
              Employee Distribution by City
            </h2>
            <p className="text-slate-600 mt-1">
              {cityData.length} cities with employees
            </p>
          </div>

          <div className="h-[600px] relative">
            <MapContainer
              center={[20, 0]}
              zoom={2}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {cityData.map(({ city, count, coordinates }) => (
                <Marker key={city} position={coordinates}>
                  <Popup>
                    <div className="text-center">
                      <h3 className="font-bold text-lg">{city}</h3>
                      <p className="text-slate-600">
                        {count} {count === 1 ? 'employee' : 'employees'}
                      </p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default MapPage;
