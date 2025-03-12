import Button from "./Button";

export default function Recette({ id, titre, temps, ingredients, methode, modifierRecette, supprimerRecette }) {
    return (
        <div>
            <h3>{ titre }</h3>
            <p>Temps de cuisson : { temps } minutes</p>
            <h4>Ingrédients :</h4>
            <ul>
                {ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>
            <h4>Méthode :</h4>
            <p>{ methode }</p>
            <div>
                <Button type='primary' text='Modifier' onClick={() => modifierRecette(id)} />
                <Button type='danger' text='Supprimer' onClick={() => supprimerRecette(id)} />
            </div>
        </div>
    );
}
