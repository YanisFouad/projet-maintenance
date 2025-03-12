export default function Button({ type , text}) {
    return (
        <>
            <button className={ type }>{ text }</button>
        </>
    );
}
