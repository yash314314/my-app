export function Inputbox({ label, placeholder, value, onChange ,type }) {
  return (
    <div className="mb-4">
      <label className="block mb-2 font-bold">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}  // Bind value to the input field
        onChange={onChange}  // Bind onChange to the input field
        className="border p-2 w-full bg-zinc-200 rounded-xl"
      />
    </div>
  );
}
