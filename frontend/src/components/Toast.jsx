export default function Toast({ message }) {
  if (!message) return null;

  return (
    <div
      className="
        fixed bottom-6 left-1/2 -translate-x-1/2
        bg-green-600 text-white
        px-4 py-2 rounded-xl
        shadow-lg z-50
        animate-fade-in
      "
    >
      {message}
    </div>
  );
}
