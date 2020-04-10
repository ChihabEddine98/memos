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

# Some Screenshots ( quelques captures !)
![welcome](https://user-images.githubusercontent.com/38104305/79007424-6ed64d00-7b5b-11ea-91e7-31a707afb501.JPG)
------------
![register](https://user-images.githubusercontent.com/38104305/79007381-5cf4aa00-7b5b-11ea-9955-dc255fdb666f.JPG)
------------
![register_error](https://user-images.githubusercontent.com/38104305/79007401-65e57b80-7b5b-11ea-9e5a-f8fca55ab16f.JPG)
------------
![login](https://user-images.githubusercontent.com/38104305/79007412-6a119900-7b5b-11ea-8de4-93659b096a2f.JPG)
------------
![welcome_admin](https://user-images.githubusercontent.com/38104305/79007446-7ac20f00-7b5b-11ea-8c61-e3ee67e5d1aa.JPG)
------------
![users](https://user-images.githubusercontent.com/38104305/79007457-7f86c300-7b5b-11ea-9fe0-4cce746f3e8a.JPG)
------------
![edit_profile](https://user-images.githubusercontent.com/38104305/79007463-8281b380-7b5b-11ea-9d43-a23d0f0b5261.JPG)
------------
![memos](https://user-images.githubusercontent.com/38104305/79007465-84e40d80-7b5b-11ea-9dae-394b456c4639.JPG)
------------
![memo](https://user-images.githubusercontent.com/38104305/79007473-87defe00-7b5b-11ea-956b-4aca708194c1.JPG)
------------
![memo_share](https://user-images.githubusercontent.com/38104305/79007478-89a8c180-7b5b-11ea-8e22-6ffca3d41db8.JPG)
------------
![edit_profile](https://user-images.githubusercontent.com/38104305/79007492-90373900-7b5b-11ea-9da4-734f43a9f406.JPG)
------------
![stats_1](https://user-images.githubusercontent.com/38104305/79007499-93322980-7b5b-11ea-8234-197eb82c10f6.JPG)
------------
![stats_2](https://user-images.githubusercontent.com/38104305/79007506-94fbed00-7b5b-11ea-9313-b8080cc38da8.JPG)




