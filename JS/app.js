class Game {
  images = ["image1.JPG","image2.JPG","image1.JPG","image2.JPG","image3.JPG","image4.JPG","image3.JPG","image4.JPG","image5.JPG","image6.JPG","image5.JPG","image6.JPG",];
  

  score = document.getElementById("score");
  imglist = document.querySelectorAll(".accueil");
  collectionButtons = document.getElementsByClassName("arriere");
  collectionimages = document.getElementsByClassName("img");
  minutes = document.getElementById("min");
  seconds = document.getElementById("sec");
  replay = document.getElementById("reset");
  selectedImages;

  constructor(minutes, seconds) {
    this.seconds.innerHTML = seconds;
    this.minutes.innerHTML = minutes;
    this.selectedImages = [];
  }


  shuffle(table){
     let index = 0,jndex=0 ,aux
     while(index < table.length){
       jndex = Math.floor(Math.random() * (table.length))
       aux = table[jndex]
       table[jndex] = table[index]
       table[index] = aux 
       index++
      }
    return table;
  }

  inserer() {
    let table = this.shuffle(this.images)
    for (let i = 0; i < table.length; i++) {
      let box = document.createElement("div");
      box.className = "accueil";
      let txt =
        "<button class='arriere' style='height:90px; width:90px'></button> ";
      txt +=
        "<img src='./image/" +
        table[i] +
        "' class='img' style='height:90px; width:90px'>";
      box.innerHTML = txt;
      document.querySelector(".container").appendChild(box);
      txt = "";
    }
  }

  turn() {
    for (let i = 0; i < this.collectionButtons.length; i++) {
      this.collectionButtons[i].addEventListener("click", () => {
        this.collectionButtons[i].style.animation = "animate 1s ease";
        this.collectionimages[i].style.animation = "animate 1s ease";
        this.collectionButtons[i].style.zIndex = -2;
        this.collectionimages[i].style.zIndex = 2;
        this.selectImages(this.collectionimages[i]);
      });
    }
  }

  selectImages(element) {
    if (this.selectedImages.length < 3) {
      this.selectedImages.push(element);
    }
    this.checkSelectedImages();
  }

  checkSelectedImages() {
    if (this.selectedImages.length !== 2) return;

    const [img1, img2] = this.selectedImages;

    if (img1.getAttribute("src") !== img2.getAttribute("src")) {
      img1.parentNode.childNodes[0].style.zIndex = 2;
      img1.parentNode.childNodes[2].style.zIndex = -2;
      img2.parentNode.childNodes[0].style.zIndex = 2;
      img2.parentNode.childNodes[2].style.zIndex = -2;
    } else {
      var c = parseInt(this.score.innerHTML);
      c += 10;
      this.score.innerHTML = c;
      img1.parentNode.childNodes[0].style.opacity = 0;
      img1.parentNode.childNodes[2].style.opacity = 0;
      img2.parentNode.childNodes[0].style.opacity = 0;
      img2.parentNode.childNodes[2].style.opacity = 0;
    }
    this.selectedImages = [];
  }

  time() {
    let min = this.minutes.innerHTML;
    let sec = this.seconds.innerHTML;
    setInterval(() => {
      if (sec !== 0) {
        sec -= 1;
      }
      if (sec == 0 && min !== 0) {
        min -= 1;
        sec = 59;
      }
      this.seconds.innerHTML = sec;
      this.minutes.innerHTML = min;
      this.verifyTime(this.minutes.innerHTML,this.seconds.innerHTML)
    }, 1000);
    
  }

  verifyTime(minutes,seconds){
    if(minutes === '0' && seconds === '1' && this.score.innerHTML !== '60' && this.score.innerHTML !== ''){
      var x = screen.width/2 - 450/2;
      var y = screen.height/2 - 300/2;
      window.open("perdu.html","", `width=500,height=300,left=${x},top=${y}`)
    } else 
    if(seconds > '0' && this.score.innerHTML === '60'){
        this.openWindow()
        this.score.innerHTML  =''
    }
  }
  

  
  openWindow(){
    var x = screen.width/2 - 450/2;
    var y = screen.height/2 - 300/2;
    window.open("zeus.html","", `width=500,height=300,left=${x},top=${y}`)
  }


  reinitialised(){
    window.addEventListener("load", event => {
      document.getElementById("reset").onclick = function() {
          location.reload(true);
      }
    });
  }

}

let p1 = new Game(1, 5);
p1.inserer();
p1.turn()
p1.time()
p1.verifyTime()
p1.reinitialised()





































































/*Cette variable va nous permettre de savoir a quel niveau nous sommes dans le jeu i.e 
ca va nous permettre de savoir si on a trouver des paires ou non 


let tabjeu =[
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
]

//ce tableau va contenir toutes nos images
let tabResultat = [
    [1,4,3,4],
    [1,2,3,2],
    [7,8,6,5],
    [8,7,5,6]
]

Cette fonction  a pour objectif d'afficher notre tableau de jeu 
function afficherTableau(){
    let txt = ""

    for (let i = 0; i < tabjeu.length; i++) {
        txt += "<div>"
        for (let j = 0; j < tabjeu.length; j++) {
            if(tabjeu[i][j] === 0 ){
                txt += "<button class='btn btn-primary m-2' style='width:100px;height:100px;background-color:gray' onclick='verif(\""+i+"-"+j+"\")'>Afficher</button>"
            }else{
                txt +="<img src='"+getImage(tabjeu[i][j])+"' style='width:100px;height:100px'>"
            }
        }   
        txt += '</div>'
    }
    divResultat.innerHTML = txt
}

function getImage(valeur){
    let imgTxt = "image/"
    switch (valeur) {
        case 1:
            imgTxt +="image1.JPG" 
            break;
        case 2:
            imgTxt +="image2.JPG" 
            break;
        case 3:
            imgTxt +="image3.JPG" 
            break;
        case 4:
            imgTxt +="image4.JPG" 
            break;
        case 5:
            imgTxt +="image5.JPG" 
            break;
        case 6:
            imgTxt +="image6.JPG" 
            break;
        case 7:
            imgTxt +="image7.JPG" 
            break;
        case 8:
            imgTxt +="image8.JPG" 
            break;
        default:
            console.log('Cas non pris en compte')
            break;
    }
    return imgTxt
}



function  verif(button){
    let ligne = button.substr(0,1);
    let colonne = button.substr(2,1)
    tabjeu[ligne][colonne] = tabResultat[ligne][colonne]
    afficherTableau()
}
*/
