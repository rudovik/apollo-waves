export default function TextArea({
  label = null,
  name,
  onChange,
  placeholder = "",
  value,
}) {
  return (
    <div className="form__block">
      {label && (
        <label htmlFor={name} className="form__label">
          {label}
        </label>
      )}
      <textarea
        className="form__textarea"
        onChange={(e) => onChange(name, e.currentTarget.value)}
        placeholder={placeholder}
        value={value}
      ></textarea>
    </div>
  )
}
