export default function Input({
  label = null,
  name,
  onChange: updateField,
  type,
  placeholder = "",
  value = "",
}) {
  function onChange(e: React.FormEvent<HTMLInputElement>) {
    const stringValue = e.currentTarget.value
    if (stringValue.length === 0) {
      updateField(name, "")
    }
    if (type === "number" && /^\d+$/.test(stringValue)) {
      // console.log(value)
      const numberValue = parseInt(stringValue, 10)
      updateField(name, numberValue)
    } else if (type === "text") {
      updateField(name, stringValue)
    }
  }
  return (
    <div className="form__block">
      {label && (
        <label className="form__label" htmlFor={name}>
          {label}
        </label>
      )}
      <input
        className="form__input"
        type={"text"}
        placeholder={placeholder}
        onChange={onChange}
        name={name}
        value={value}
        id={name}
      />
    </div>
  )
}
