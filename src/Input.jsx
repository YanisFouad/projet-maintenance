export default function Input({ type = 'text', placeHolder, value, handleChange, name }) {
    return (
        <>
            <input type={type} placeholder={placeHolder} value={value} onChange={(e) => handleChange(e)} name={name} />
        </>
    );
}