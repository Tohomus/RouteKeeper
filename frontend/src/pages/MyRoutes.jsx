import { useNavigate } from "react-router-dom";

export default function MyRoutes() {
  const navigate = useNavigate();

  const folders = [
    { name: "Family Routes", category: "family" },
    { name: "Friends Routes", category: "friends" },
    { name: "Work Routes", category: "work" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Routes</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {folders.map((folder) => (
          <div
            key={folder.category}
            onClick={() => navigate(`/my-routes/${folder.category}`)}
            className="
              cursor-pointer bg-white p-6 rounded-xl
              border border-slate-300 shadow-sm
              transition-all duration-200
              hover:-translate-y-1 hover:shadow-md
            "
          >
            <p className="text-3xl mb-2">📁</p>
            <p className="font-semibold">{folder.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
