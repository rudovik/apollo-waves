export default function RadioButton({ label, name, onChange, value }) {
  return (
    <div className="radioButton">
      <input
        type="radio"
        className="radioButton__input"
        id={label}
        name={name}
        onChange={onChange}
        value={value}
        defaultChecked={!value.length}
      />
      <label htmlFor={label} className={"radioButton__label"}>
        {/* <span className="radioButton__labelButton"></span> */}
        <span className="radioButton__label__text">{label}</span>
      </label>
    </div>
  )
}
