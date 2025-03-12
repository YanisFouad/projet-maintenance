export default function Input({ type = 'text', placeHolder}) {
    return (
        <>
            <input type={ type } placeholder={ placeHolder } />
        </>
    );
}
