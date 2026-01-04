import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getRecentRoutes,
  updateLastVisited,
} from "../services/routeService";

import AddLocationModal from "../components/AddLocationModal";
import EnableMapModal from "../components/EnableMapModal";
import MapView from "../components/MapView";
import LiveTracker from "../components/LiveTracker";
import Toast from "../components/Toast";

export default function Dashboard() {
  const { currentUser } = useAuth();

  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [enableMapRoute, setEnableMapRoute] = useState(null);
  const [toast, setToast] = useState("");
  const [stats, setStats] = useState(null);
  const [tracking, setTracking] = useState(false);

  const fetchRoutes = async () => {
    if (!currentUser) return;
    const data = await getRecentRoutes(currentUser.uid);
    setRoutes(data);
  };

  useEffect(() => {
    fetchRoutes();
  }, [currentUser]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  return (
    <div className="relative h-full">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="flex flex-col lg:flex-row gap-6">

        {/* ROUTES LIST */}
        <div className="lg:w-1/3 bg-white border rounded-xl p-4">
          {routes.length === 0 && (
            <p className="text-gray-500 text-center">
              No recent routes
            </p>
          )}

          {routes.map((route) => (
            <div
              key={route.id}
              onClick={() => {
                setSelectedRoute(route);
                updateLastVisited(route.id);
                setTracking(false);
                setStats(null);
              }}
              className="cursor-pointer p-3 mb-3 rounded-xl border hover:bg-gray-50"
            >
              <p className="font-medium">📁 {route.name}</p>
              <p className="text-sm text-gray-500 truncate">
                {route.notes}
              </p>
            </div>
          ))}
        </div>

        {/* MAP AREA */}
        <div className="flex-1 bg-white border rounded-xl p-4">

          {!selectedRoute && (
            <p className="text-gray-500 text-center">
              Select a route to view
            </p>
          )}

          {selectedRoute?.latitude && (
            <>
              {stats && (
                <div className="flex gap-6 mb-3 text-sm">
                  <span>📏 {stats.distance} km</span>
                  <span>⏱ {stats.eta} min</span>
                </div>
              )}

              <div className="flex gap-3 mb-3">
                {!tracking ? (
                  <button
                    onClick={() => setTracking(true)}
                    className="px-4 py-2 rounded-xl bg-green-500 text-white"
                  >
                    ▶ Start Tracking
                  </button>
                ) : (
                  <button
                    onClick={() => setTracking(false)}
                    className="px-4 py-2 rounded-xl bg-red-500 text-white"
                  >
                    ⏹ Stop Tracking
                  </button>
                )}
              </div>

              <MapView
                latitude={selectedRoute.latitude}
                longitude={selectedRoute.longitude}
              >
                {tracking && (
                  <LiveTracker
                    destination={[
                      selectedRoute.latitude,
                      selectedRoute.longitude,
                    ]}
                    onStats={setStats}
                  />
                )}
              </MapView>
            </>
          )}

          {selectedRoute && !selectedRoute.latitude && (
            <div className="flex flex-col items-center gap-3">
              <a
                href={selectedRoute.mapLink}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-brand text-white"
              >
                Open in Google Maps
              </a>

              <button
                onClick={() => setEnableMapRoute(selectedRoute)}
                className="px-4 py-2 rounded-xl border border-brand text-brand"
              >
                Enable in-app map
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ADD ROUTE */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-brand text-white text-3xl"
      >
        +
      </button>

      <AddLocationModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          fetchRoutes(); // ✅ instant refresh
        }}
      />

      {enableMapRoute && (
        <EnableMapModal
          isOpen
          route={enableMapRoute}
          onClose={() => setEnableMapRoute(null)}
          onSuccess={() => {
            showToast("In-app map enabled");
            fetchRoutes(); // ✅ refresh
          }}
        />
      )}

      <Toast message={toast} />
    </div>
  );
}
