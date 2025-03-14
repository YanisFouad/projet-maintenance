import { useState, useEffect } from "react";
import Dexie from "dexie";
import Recette from "./Recette";
const db = new Dexie('TableRecette');
db.version(1).stores({recettes:"++id, titre, ingredients, temps, methode"})

function App() {
  const [recettes, setRecettes] = useState([]);
  const [form, setForm] = useState({ titre: "", ingredients: "", temps: "", methode: "" });

  // Charger les recettes
  useEffect(() => {
    chargerRecettes();
  }, []);


  const chargerRecettes = () => {
    db.recettes.toArray().then(liste=>setRecettes(liste))
      .catch((error)=>{console.log("erreur de chargement",error)});
    console.log(recettes);
    
  };


  // Gestion des changements dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Ajouter un recette
  const ajouterRecette = (e) => {
    e.preventDefault();
    db.recettes.add({titre:form.titre, ingredients:form.ingredients, temps:form.temps, methode:form.methode})
    .then(()=>{console.log('Recette ajouté');})
    .catch((error)=>{console.error("Erreur lors de l'ajout d'une recette",error);});
    e.target.reset();
  };

  // Supprimer un recette
  const supprimerRecette = (id) => {
    console.log(id);
    
    db.recettes.delete(id).then(()=> console.log("Recette supprimée"))
  };

  // Mettre à jour un recette
  const mettreAJourRecette = (e,id) => {
    const recette = db.recettes.get(id);
    if (form.titre != recette.titre || form.ingredients != recette.ingredients || form.temps != recette.temps || form.methode != recette.methode ) {
      db.recettes.update(id,{titre: form.titre , ingredients: form.ingredients, temps: form.temps, methode: form.methode}).then((updated)=>{
        if(updated){console.log("recette mise à jour");}
        else{console.log("recette non trouvée");
        }
      })
    }
    chargerRecettes();
  };

  const ajouterDonneesInitiales = async () => {
    const count = await db.recettes.count();
    if (count === 0) {
      await db.recettes.bulkAdd([
        { titre: "Pâtes Carbonara", ingredients: "Pâtes, œufs, pancetta, parmesan", temps: "20 min", methode: "Faire cuire les pâtes, préparer la sauce, mélanger." },
        { titre: "Salade César", ingredients: "Laitue, poulet, croûtons, sauce César", temps: "15 min", methode: "Mélanger les ingrédients et servir." },
        { titre: "Gâteau au Chocolat", ingredients: "Chocolat, farine, œufs, sucre", temps: "45 min", methode: "Mélanger et cuire au four." }
      ]);
      console.log("Données initiales ajoutées");
    }
  };
  ajouterDonneesInitiales();
  return (
    <div>
      <h1>Liste des Recettes</h1>
        {recettes.map((recette) => (
          <Recette key={recette.id} id={recette.id} titre={recette.titre} ingredients={recette.ingredients} temps={recette.temps} methode={recette.methode} modifierRecette ={mettreAJourRecette} supprimerRecette={supprimerRecette}></Recette>
        ))}
    </div>
  );
}

export default App;

