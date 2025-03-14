import Button from "./Button"
import Input from "./Input"
import TextArea from "./TextArea"

export default function Form({ form, ajouterRecette, handleChange }) {
    return (
        <>
            <form onSubmit={ajouterRecette} id="formulaire">
                <Input type="text" placeHolder="Titre" value={form.titre} handleChange={handleChange} name={"titre"} />
                <Input type="text" placeHolder="Temps de cuisson (minutes)" value={form.temps} handleChange={handleChange} name={"temps"} />
                <Input type="text" placeHolder="Ingrédients (séparés par des virgules)" value={form.ingredients} handleChange={handleChange} name={"ingredients"}/>
                <TextArea placeHolder="Méthode" value={form.methode} handleChange={handleChange} name={"methode"} />
                <Button type="primary" text="Ajouter" />
            </form>
        </>
    )
}