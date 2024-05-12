export default function Select({
  label = null,
  name,
  onChange: updateField,
  options,
  value = "",
  type = "text",
}) {
  function onChange(e: React.FormEvent<HTMLSelectElement>) {
    let newValue: string | boolean | number = e.currentTarget.value

    if (type === "boolean") {
      if (newValue === "false") newValue = false
      else if (newValue === "true") newValue = true
      else newValue = ""
    } else if (type === "number") {
      if (/^\d+$/.test(newValue)) {
        newValue = parseInt(newValue, 10)
      } else newValue = ""
    }

    updateField(name, newValue)
  }
  return (
    <div className="form__block">
      {label && (
        <label className="form__label" htmlFor={name}>
          {label}
        </label>
      )}
      <select
        name={name}
        value={value}
        onChange={onChange}
        id={name}
        className="form__select"
      >
        <option key={name}></option>
        {options.map((option) => (
          <option
            value={option._id ?? option.value}
            key={option._id ?? `${name}${option.value}`}
          >
            {option.text ?? option.name}
          </option>
        ))}
      </select>
    </div>
  )
}
