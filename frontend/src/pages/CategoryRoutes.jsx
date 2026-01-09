import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  getRoutesByCategory,
  updateLastVisited,
} from "../services/routeService";

import AddLocationModal from "../components/AddLocationModal";
import EnableMapModal from "../components/EnableMapModal";
import MapView from "../components/MapView";
import LiveTracker from "../components/LiveTracker";
import Toast from "../components/Toast";

export default function CategoryRoutes() {
  const { category } = useParams();
  const { currentUser } = useAuth();

  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [enableMapRoute, setEnableMapRoute] = useState(null);
  const [toast, setToast] = useState("");
  const [stats, setStats] = useState(null);
  const [tracking, setTracking] = useState(false);

  /* Fetch routes */
  const fetchRoutes = async () => {
    if (!currentUser) return;
    const data = await getRoutesByCategory(
      currentUser.uid,
      category
    );
    setRoutes(data);
  };

  useEffect(() => {
    fetchRoutes();
  }, [currentUser, category]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  return (
    <div className="relative h-full">
      <h1 className="text-2xl font-bold mb-6 capitalize">
        {category} Routes
      </h1>

      <div className="flex flex-col lg:flex-row gap-6">

        {/* ROUTES LIST */}
        <div className="lg:w-1/3 bg-white border rounded-xl p-4">
          {routes.length === 0 && (
            <p className="text-gray-500 text-center">
              No routes in this category
            </p>
          )}

          {routes.map((route) => (
            <div
              key={route.id}
              onClick={() => {
                setSelectedRoute(route);
                updateLastVisited(route.id);
                setStats(null);
                setTracking(false);
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

        {/* MAP / ACTION AREA */}
        <div className="flex-1 bg-white border rounded-xl p-4">

          {!selectedRoute && (
            <p className="text-gray-500 text-center">
              Select a route to view
            </p>
          )}

          {/* IN-APP MAP */}
          {selectedRoute?.latitude && (
            <>
              {/* STATS */}
              {stats && (
                <div className="flex gap-6 mb-3 text-sm text-gray-700">
                  <span>📏 {stats.distance} km</span>
                  <span>⏱ {stats.eta} min</span>
                </div>
              )}

              {/* TRACK CONTROLS */}
              <div className="flex gap-3 mb-3 flex-wrap">
                {!tracking ? (
                  <button
                    onClick={() => setTracking(true)}
                    className="px-4 py-2 rounded-xl bg-green-500 text-white hover:bg-green-600"
                  >
                    ▶ Start Tracking
                  </button>
                ) : (
                  <button
                    onClick={() => setTracking(false)}
                    className="px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600"
                  >
                    ⏹ Stop Tracking
                  </button>
                )}

                <button
                  onClick={() => setEnableMapRoute(selectedRoute)}
                  className="px-4 py-2 rounded-xl border border-brand text-brand hover:bg-brand-light"
                >
                  📍 Change location
                </button>

                {selectedRoute.mapLink && (
                  <a
                    href={selectedRoute.mapLink}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl bg-brand text-white hover:bg-brand-dark"
                  >
                    🗺 Open in Google Maps
                  </a>
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

          {/* LINK-FIRST FLOW */}
          {selectedRoute && !selectedRoute.latitude && (
            <div className="flex flex-col items-center gap-3">
              <a
                href={selectedRoute.mapLink}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand text-white hover:bg-brand-dark"
              >
                <img
                  src="https://www.gstatic.com/images/branding/product/1x/maps_48dp.png"
                  className="w-5 h-5"
                  alt="Google Maps"
                />
                Open in Google Maps
              </a>

              <button
                onClick={() => setEnableMapRoute(selectedRoute)}
                className="px-4 py-2 rounded-xl border border-brand text-brand hover:bg-brand-light"
              >
                🗺 Enable in-app map
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ADD ROUTE */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-brand text-white text-3xl flex items-center justify-center z-50"
      >
        +
      </button>

      <AddLocationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultCategory={category}
      />

      {/* ENABLE MAP MODAL */}
      {enableMapRoute && (
        <EnableMapModal
          isOpen
          route={enableMapRoute}
          onClose={() => setEnableMapRoute(null)}
          onSuccess={() => {
            fetchRoutes();
            showToast("In-app map enabled");
          }}
        />
      )}

      <Toast message={toast} />
    </div>
  );
}
