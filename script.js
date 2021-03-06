/*
 * 
 *  Présentation :
 *	Fenêtre sur image sous le curseur. 
 *  Permet de rajouter un carre qui affiche une autre image à l'intérieur
 * 
 *  Crédits :
 * 	Développement par Emilien BARDE (https://twitter.com/emilien_barde)
 * 	Sur la base d'un code de Amirouche HALFAOUI (https://github.com/amihalfa)
 * 	
 * 	Configuration :
 *	id>   Identifiant de l'image a laquelle la fenêtre est affecteé
 *	path> Chemin de l'image à l'intérieur de la fenêtre
 *	size> Taille en pixels que doit prendre la fenêtre en hauteur et largeur
 */
function WindowOnImage(id, path, size){
		
		// Élément auquel ajouter la fenêtre 
		var _id = id;
		
		// Référence vers l'image à laquelle est attachée la fenêtre 
		var _image = document.getElementById(_id);
			
		var _path = path;

		// Dimensions de la fenêtre 
		var _size = size;
		
		var _area = "" ;
		
		var _areaimg = "" ;
		
		// Ajout d'evenements à un objet (Multiplateforme) 
		addEvent = function(element, event, func) {
			if (element.addEventListener)
				element.addEventListener(event, func, false);
			else 
				element.attachEvent('on' + event, func);
		}
		
		// Calcul de la position d'un élement par rapport à la gauche de l'écran 
		calculateOffsetLeft = function(element){
			return calculateOffset(element,"offsetLeft")
		}
		
		// Calcul de la position d'un élement par rapport au haut de l'écran 		
		calculateOffsetTop = function(element){
			return calculateOffset(element,"offsetTop")
		}
		 
		// Calcul de la position d'une image 
		calculateOffset = function(element,attr){
			var offset=0;
			while(element){
				offset+=element[attr];
				element=element.offsetParent
			}
			return offset;
		}
		
		// Création de la zone qui sert de fenêtre 
		createWindowsArea = function(name){
			
			// Fenêtre en elle-même (DIV conteneur)
			_area = document.createElement("div");
			_area.id 	    	    	= name;
			_area.style.width          	= _size + "px";
			_area.style.height 		    = _size + "px";
			_area.style.position 	    = "absolute";
			_area.style.display		    = "none";
			_area.style.overflow    	= "hidden";
			_area.style.border          = "3px solid white"; 
			
			// Image interne
			_areaimg = document.createElement("img");
			_areaimg.id 			= "ImageInWindow";
			_areaimg.src 			= path;
			 
			
			// Dès que l'image est chargée, on lui donne la bonne taille
			_areaimg.onload 		= function(){
				_areaimg.style.width	= _image.width;
				_areaimg.style.height	= _image.height;
		  		_areaimg.style.border="7px solid white";
				
			}
			_areaimg.style.position	= "absolute";
			
			// On ajoute le tout à la page
			_area.appendChild(_areaimg); 
			document.body.appendChild(_area);
		}
		
		// Fonction qui réagit lors du mouvement de la souris sur l'image 
		handleMouseMove = function(event){
			
			// Récupération de la position du curseur
			var x, y;
			var ie = false;
			if (ie) {
				x=event.x+document.body.scrollLeft;
				y=event.y+document.body.scrollTop;
			} else {
				x=event.pageX;
				y=event.pageY;
			}

			
			// On affiche la fenêtre
			_area.style.display = "block";
			
			// Position du curseur sur l'image
			xPos = x - calculateOffsetLeft(_image);
			yPos = y - calculateOffsetTop(_image);
			
			// On met à jour uniquement si le curseur est sur l'image
			if(	xPos >= 0 && yPos >= 0 
					&& xPos <= _image.width && yPos <= _image.height){
				_area.style.left 		= x - (_size/2) + "px";
				_area.style.top 		= y - (_size/2) + "px";
				_areaimg.style.left 	= (-(xPos))+(_size/2) + "px";
				_areaimg.style.top 		= (-(yPos))+(_size/2) + "px";
			} else {
				// Sinon, on cache la fenêtre
				_area.style.display = "none";
			}
			
		};
		
		// Partie constructeur :

		// Création de la zone
		createWindowsArea("ma" + _id);
		
		// Ajout des évènements
		addEvent(_image, "mouseover", handleMouseMove);
		addEvent(_area, "mousemove", handleMouseMove);
		
		
	};