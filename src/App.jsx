import { useState, useEffect } from 'react';
import Dexie from 'dexie';
import Recette from './Recette';
import Form from './Form';

const db = new Dexie('TableRecette');
db.version(1).stores({ recettes: '++id, titre, ingredients, temps, methode' });

function App() {
    const [recettes, setRecettes] = useState([]);

    const [form, setForm] = useState({
        id: '',
        titre: '',
        ingredients: '',
        temps: '',
        methode: '',
    });

    useEffect(() => {
        chargerRecettes();
    }, []);

    // Fonction pour récupérer toutes les recettes depuis IndexedDB
    const chargerRecettes = async () => {
        db.recettes
            .toArray()
            .then((liste) => setRecettes(liste))
            .catch((error) => {
                console.error('Erreur lors du chargement', error);
            });
    };

    // Gestion des changements dans le formulaire
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    // Fonction pour ajouter ou modifier une recette dans la base de données
    const ajouterRecette = async (e) => {
        e.preventDefault();
        try {
            if (form.id) {
                // Vérification si la recette existe avant de la mettre à jour
                const recette = await db.recettes.get(form.id);
                if (!recette) {
                    console.error('Recette non trouvée');
                    return;
                }

                // Mise à jour uniquement si des modifications ont été faites
                if (form.titre !== recette.titre || form.ingredients !== recette.ingredients || form.temps !== recette.temps || form.methode !== recette.methode) {
                    await db.recettes.update(form.id, {
                        titre: form.titre,
                        ingredients: form.ingredients,
                        temps: form.temps,
                        methode: form.methode,
                    });
                }
            } else {
                // Ajout d'une nouvelle recette
                await db.recettes.add({
                    titre: form.titre,
                    ingredients: form.ingredients,
                    temps: form.temps,
                    methode: form.methode,
                });
            }

            // Réinitialisation du formulaire
            setForm({
                id: '',
                titre: '',
                ingredients: '',
                temps: '',
                methode: '',
            });
            e.target.reset();
            await chargerRecettes(); // Rechargement de la liste après l'ajout/modification
        } catch (error) {
            console.error("Erreur lors de l'opération sur la recette", error);
        }
    };

    // Suppression d'une recette par son ID
    const supprimerRecette = async (id) => {
        try {
            await db.recettes.delete(id);
            await chargerRecettes(); // Rechargement de la liste après suppression
        } catch (error) {
            console.error('Erreur lors de la suppression', error);
        }
    };

    // Remplissage du formulaire avec les données d'une recette existante pour modification
    const fillForm = async (id) => {
        const recette = await db.recettes.get(id);

        setForm({
            id: recette.id,
            titre: recette.titre,
            ingredients: recette.ingredients,
            temps: recette.temps,
            methode: recette.methode,
        });
    };

    // Ajout de données initiales à la base de données si elle est vide
    const ajouterDonneesInitiales = async () => {
        const count = await db.recettes.count();
        if (count === 0) {
            await db.recettes.bulkAdd([
                {
                    titre: 'Pâtes Carbonara',
                    ingredients: 'Pâtes, œufs, pancetta, parmesan',
                    temps: '20 min',
                    methode: 'Faire cuire les pâtes, préparer la sauce, mélanger.',
                },
                {
                    titre: 'Salade César',
                    ingredients: 'Laitue, poulet, croûtons, sauce César',
                    temps: '15 min',
                    methode: 'Mélanger les ingrédients et servir.',
                },
                {
                    titre: 'Gâteau au Chocolat',
                    ingredients: 'Chocolat, farine, œufs, sucre',
                    temps: '45 min',
                    methode: 'Mélanger et cuire au four.',
                },
            ]);
        }
    };

    ajouterDonneesInitiales();

    return (
        <div>
            <Form form={form} ajouterRecette={ajouterRecette} handleChange={handleChange} />

            <h1>Liste des Recettes</h1>
            <div id="recettes">
                {recettes.map((recette) => (
                    <Recette key={recette.id} id={recette.id} titre={recette.titre} ingredients={recette.ingredients} temps={recette.temps} methode={recette.methode} modifierRecette={fillForm} supprimerRecette={supprimerRecette} />
                ))}
            </div>
        </div>
    );
}

export default App;
