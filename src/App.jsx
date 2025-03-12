import { useState, useEffect } from "react";
import Dexie from "dexie";
const db = new Dexie('Tablerecette');
db.version(1).stores({recettes:"++int, titre, ingredients, temps, methode"})

function App() {
  const [recettes, setrecettes] = useState([]);
  const [form, setForm] = useState({ titre: "", ingredients: "", temps: "", methode: "" });

  // Charger les recettes
  useEffect(() => {
    chargerRecettes();
  }, []);


  const chargerRecettes = () => {
    db.recettes.toArray().then(liste=>setrecettes(liste))
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
  return (
    <div>
      
    </div>
  );
}

export default App;

