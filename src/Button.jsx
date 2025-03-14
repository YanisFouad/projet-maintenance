export default function Button({ type , text, click}) {
    return (
        <>
            <button className={ type } onClick={click}>{ text }</button>
        </>
    );
}
