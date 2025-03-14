export default function TextArea({ placeHolder, value, handleChange, name }) {
    return (
        <>
            <textarea placeholder={placeHolder} value={value} onChange={handleChange} name={name} />
        </>
    );
}