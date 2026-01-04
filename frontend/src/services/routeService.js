import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  serverTimestamp,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";

/* Add new route */
export const addRoute = async (routeData) => {
  await addDoc(collection(db, "routes"), {
    ...routeData,
    createdAt: serverTimestamp(),
    lastVisitedAt: serverTimestamp(),
  });
};

/* Fetch recent routes */
export const getRecentRoutes = async (userId, count = 5) => {
  const q = query(
    collection(db, "routes"),
    where("userId", "==", userId),
    orderBy("lastVisitedAt", "desc"),
    limit(count)
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
};

/* Fetch routes by category */
export const getRoutesByCategory = async (userId, category) => {
  const q = query(
    collection(db, "routes"),
    where("userId", "==", userId),
    where("category", "==", category),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
};

/* Update last visited */
export const updateLastVisited = async (routeId) => {
  await updateDoc(doc(db, "routes", routeId), {
    lastVisitedAt: serverTimestamp(),
  });
};

/* Set coordinates after map pick */
export const setRouteCoordinates = async (routeId, lat, lng) => {
  await updateDoc(doc(db, "routes", routeId), {
    latitude: lat,
    longitude: lng,
  });
};
