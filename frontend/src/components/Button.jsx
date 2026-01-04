export default function Button({
  text,
  type = "button",
  onClick,
  disabled = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="
        w-full py-2 rounded-xl
        bg-brand text-white
        hover:bg-brand-dark
        disabled:opacity-50
        transition
      "
    >
      {text}
    </button>
  );
}
