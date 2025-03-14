import Button from "./Button";

export default function Recette({ id, titre, temps, ingredients, methode, modifierRecette, supprimerRecette }) {
    let ingredientsTab = ingredients.split(",");    
    return (
        <div className="recette">
            <h3>{id} , { titre }</h3>
            <p>Temps de cuisson : { temps } minutes</p>
            <h4>Ingrédients :</h4>
            <ul>
                {ingredientsTab.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>
            <h4>Méthode :</h4>
            <p>{ methode }</p>
            <div>
                <Button type='primary' text='Modifier' click={() => modifierRecette(id)} />
                <Button type='danger' text='Supprimer' click={() => supprimerRecette(id)} />
            </div>
        </div>
    );
}
