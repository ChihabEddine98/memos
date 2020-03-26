# DM Programmation WEB Université De Paris 2019/2020

## Réalisé Par : Benamara Abdelkader Chihab ( L3 MI )
Numéro Etudiant : **`21808027`**
Email : ga_benamara@esi.dz
# Prise en main pour la première fois !
Les modules utilisés sont tous installable en tapant la commande 
> **npm** install --save

Ou plus simplement !
> **npm** i

NB :  les modules sont aussi dans le répertoire ! si vous préférez ne pas avoir npm :D 

Pour la configuration de la connexion à la base de donnée se trouve dans :
`src/common/database.js` ou vous trouverez DB_NAME/DB_PWD/DB_USER tous à 
**`etu21808027`** et le host à **`lampe`** vous pouvez donc les modifier selon les besoin et selon vos configurations !

Exécutons le code ! ( supposons qu'on est dans le `/` du projet !)
> **node** main.js

 
Apres la première exécution vous aurez automatiquement un utilisateur crée du rôle **ADMIN** avec les informations suivants : 
> **email :  admin@esi.dz**
> **password :  admin**

Alors l'admin a accès à des pages spécifiques dont par exemple **`Stats`** & **`Users`** ( la création de l'admin ce fait dans le fichier `common/common.js`

Pour pouvoir remarquer les statistiques vous pouvez faire des insertions des mémos et d'utilisateurs !

J'ai utilisé l’architecture **MVC** pour bien organiser le code et donc dans le dossier 
``src/`` vous trouverez  ``models`` ,``views`` et ``controllers`` 

Pour les models j'ai utilisé le module ``Sequelize`` qui permet de travailler en **ORM** sans avoir recours à écrire du **SQL** mais vous remarquerez que dans le fichier ``/controllers/admin.js`` j'ai utilisé du **SQL** puisque dans les fonctions des statistiques j'ai eu du mal à exprimer mes requetes en **ORM**

Pour les views j'ai utilisé le template engine :  **EJS** qui me permet de faire le binding de mes données en html !

Pour les controllers ils mettent la relation entre notre vue et model et donc pour bien donner chaque controller  à son route spécifique le répertoire `routes` est met en place pour servir à ça 

Vous remarquerez aussi la présence de répertoire `static` et `uploaded_images`
ces deux dossiers contiennent les fichiers soit statiques `css,images,js` ou bien 
les images qu'on upload à la base de donnée ( par exemple photo de profile ou photo dans un mémo ! )

# Modules Utilisés ! 

|     Module           |Utilisation|
|-------------------|-------------------------------|
| bcryptjs	|`cryptage de mot de passe !`            |
|chart.js|`Statistiques coté Admin `            |           |
|express-validator|`Validation des formulaires en cas d'erreur ! `|
|multer|`Pour le upload des images au server !`|
|sequelize-paginate|` Pour l'affichage en pages des listes ( utilisateur / mémos `|
