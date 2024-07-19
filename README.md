## Installation de l'api
Tout d'abord rendez vous dans le dossier "**./backend**". Ensuite
pour installer le projet backend,
lancez les commandes suivantes
(Vérifiez d'avoir mis à jour le fichier .env 
avec les données de connexion de votre base de données. Un fichier ".env.example" est disponible à la copie pour gagner du temps)

```bash
$ npm install
$ npx prisma migrate deploy
$ npx prisma db seed
```

## Lancement de l'api

Pour lancer le projet, 
lancez le à partir de cette commande 
(lancement en mode développement)

```bash
$ npm run start
```

## Installation de l'application 

Pour installer le projet frontend, rendez vous dans le dossier "**./frontend**"
lancez la commande suivante :

```bash
$ npm install
```

## Lancement de l'api

Pour lancer le projet,
lancez le à partir de cette commande
(lancement en mode développement)

```bash
$ npm run dev
```