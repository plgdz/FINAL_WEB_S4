Projet final web 2 - Paul AGUDZE

Theme : Rayman

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

                                                            LAUNCH WITH LIVESERVER - OPTIMIZE FOR FULL DESKTOP SCRREN

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Description des animations :

	INDEX

	- La boite de login apparait progressivement, gerée en javascript
	- le titre Rayman est creer en javascript est apparait en différé avec la boite de login
	- Sprite sheet de rayman jouable avec les fleches du claviers pour le deplacer, et la barre espace pour simuler une frappe


	LOBBY

	- Affichage de la liste de serveur avec Vue, affiche le nom, le nombre de joueur, le niveau, l'etat (avec affichage conditionnel : vert si libre, rouge si complet)
	- Affichage des caracteristique et de l'évolution de l'experience du joueur connectée sur son niveau actuel

	GAME

	- Les joueurs s'affiche en rang sur la gauche (le premier a droite est le joueur connecté), l'affichage des autres joueurs est géré avec une sprite liste pour pouvoir les 
	  supprimer quand ils quittent la partie
	- Sprite de l'ennemi qui cours pour s'enfuir, son attacque consiste a générer des mini ennemis qui courent vers le joueurs puis l'attacque quand ils s'approchent
	- Attaque 1 : Genere un poing (sprite) qui vole jusque l'ennemi
	- Attaque 2 : Rayman flotte un instant pour se soigner et charger sa frappe qui arrive du ciel sur l'ennemi 
	- Attaque 3 : L'esprit de rayman s'envole et génère plusieures grosses explosions sur l'ennemi
	- Les attaques sont gerer dans une sprite liste independante qui s'actualise a chaque gameloop pour en supprimer les annimations terminee
	- Chaque animation d'attaque est un objet et se genere seule avec un append et se supprime avec un remove une fois la cible atteinte
	- Quand l'ennemi est touché, un sprite rapide apparait pour confirmer que le coup l'a atteint
	- Barre de vie du joueur et de l'ennemi sont mis a jours a chaque appel de gameloop
	- En fin de partie, une box creer sur vue et monté en affichant si la partie et gagnée ou perdu et permet de revenir au lobby
