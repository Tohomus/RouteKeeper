import { NavLink } from "react-router-dom";

export default function Sidebar({ isOpen, onClose }) {
  const linkClasses = ({ isActive }) =>
    `block px-4 py-2 rounded-xl font-medium ${
      isActive
        ? "bg-brand text-white"
        : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <>
      {/* Overlay (mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed md:static z-50
          w-64 bg-white border-r min-h-screen p-5
          transform transition-transform
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <h2 className="text-2xl font-bold text-brand mb-8">
          RouteKeeper
        </h2>

        <nav className="space-y-2">
          <NavLink to="/dashboard" className={linkClasses}>
            Dashboard
          </NavLink>
          <NavLink to="/my-routes" className={linkClasses}>
            My Routes
          </NavLink>
          <NavLink to="/profile" className={linkClasses}>
            Profile
          </NavLink>
        </nav>
      </aside>
    </>
  );
}
