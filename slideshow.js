


let slideIndex = 0;
let tabImg=['./image/slide1.png','./image/slide2.png','./image/slide3.png'];
let tabTitle=['SPOTS PUBLICITAIRES ANIMÉS SUR ÉCRANS URBAINS (1)',
              'SPOTS PUBLICITAIRES ANIMÉS SUR ÉCRANS URBAINS (2)',
              'SPOTS PUBLICITAIRES ANIMÉS SUR ÉCRANS URBAINS (3)'];
let tabText=['LE NOUVEL AFFICHAGE DYNAMIQUE GRAND FORMAT <br> <span>Réseau Centre France</span>',
              'LE NOUVEL AFFICHAGE DYNAMIQUE GRAND FORMAT <br> <span>Réseau Centre France</span>',
              'LE NOUVEL AFFICHAGE DYNAMIQUE GRAND FORMAT <br> <span>Réseau Centre France</span>'];

'use strict';

let containerr = document.getElementById("slides");

let prevBtn = document.getElementById("prev") ;
let nextBtn = document.getElementById("next") ;

let width = 100;
let animationSpeed = 1500;
let pause = 3500;

let allerAuSlide = n => {
  slideIndex = n;
  containerr.animate({ 'left': '-'+(n*width) +'%' },2000);
  currentDot(); 
};



$(() => {

  /** Menu responsive transition **/
  $('#icon').click(()=>{
    $('ul').toggleClass('show');
  });
  

  
 

  /** creation des images**/
  
  let slider = $('#slider');
  let container = $('#slides');
  let dots = $('#dots');

  function createImages(){
    let i = 0 ; 
    tabImg.forEach( img => {
      container.append(`<div class="slide">
                          <img src="${img}" style="width:100%;height:100%;">
                          <div class="wrap">
                            <p class="titre1" id="title${i}" >  </p>
                            <p class="titre2"> ${tabText[i]}</p>
                            <span class="blinking-cursor"></span>
                            <p class="lien"><a href="#" target="_blank" title="Pour plus d'informarions ..">Savoir Plus</a></p>
                          </div>
                        </div>
                      `);
      
      dots.append(`<span class="dot" onclick="allerAuSlide(${i})"></span> `);
      i++;
    });
    $("#dots > span:first").addClass("active");
  }
  createImages();
 
 
/**  Affichage de texte **/
  
let title= null
let text = ''
 

function updateNode () {
  title.innerText = text;

}

function pushCharacter (character) {
  text += character
  updateNode()
} 

function clearText () {
  text = ''
  updateNode()
}


function wait (time) {
  if (time === undefined) {
    const randomMsInterval = 100 * Math.random()
    time = randomMsInterval < 50 ? 10 : randomMsInterval
  }
  
  return new Promise(resolve => {
    setTimeout(() => {
      requestAnimationFrame(resolve)
    }, time)
  })
}

function typeCharacter (character) {
  
  return new Promise(resolve => {
    pushCharacter(character)
    wait().then(resolve)
  })
}
 
function typeText(text) {

  return new Promise(resolve => {
    
    function type ([ character, ...text ]) {
      typeCharacter(character)
        .then(() => {
          if (text.length){
            type(text) 
          }
              
          else resolve()
        })
    }
    
    
    type(text)
  
  })
}

function blink() {
  title = document.getElementById(`title${slideIndex}`);
  wait(1000).then(() => {
    clearText()
    typeText(tabTitle[slideIndex])
  })
}


  

  /**  animations automatique **/ 
  
 

  let interval;
  
  function startSlider() {

    
      interval = setInterval(() => {
                  
          if ( ++slideIndex=== slide.length) {
            
            container.animate({'left':'0%'}, animationSpeed);
            slideIndex = 0;
           
          }else
            container.animate({'left': "-=" + width+'%'}, animationSpeed);

          currentDot();  
            
            
                
      },pause);

      
      
  }

  function currentDot(){
    $("#dots  span").removeClass("active");
    $(`#dots  span:eq(${slideIndex})`).addClass("active");
  }

  let slide= $('.slide');
  


  
  
  function pauseSlider(){
    
    clearInterval(interval);
  }
  startSlider();
  
  
  dots
    .on("mouseleave",startSlider)
    .on("mouseenter",pauseSlider);
  container
    .on("mouseleave",startSlider)
    .on("mouseenter",pauseSlider)
    .on("mouseenter",blink);


  nextBtn.addEventListener("mouseleave",()=>{
    startSlider();
  });
  nextBtn.addEventListener("mouseenter",() =>{ 
    pauseSlider();
    nextBtn.addEventListener("click",() =>{
      if ( slideIndex++ === slide.length-1) {
                  
        container.animate({'left':  '0%'}, animationSpeed);
        slideIndex = 0;
    
        
      }else
        container.animate({'left': "-=" + width+'%'}, animationSpeed);
      currentDot();  
      
        
    });
  });

  prevBtn.addEventListener("mouseleave",()=>{
    startSlider();
  });
  prevBtn.addEventListener("mouseenter",() =>{ 
    pauseSlider();
    prevBtn.addEventListener("click",() =>{
      if ( slideIndex-- <= 0) {
                  
        container.animate({'left':'-200%'}, animationSpeed);
        slideIndex = slide.length-1;
  
      }else
        container.animate({'left': "+=" + width+'%'}, animationSpeed);
      currentDot();  
      
        
    });
  });
    
  

    
});

/**  Animation btn 

let containerr = document.getElementById("slides");

let prevBtn = document.getElementById("prev") ;
let nextBtn = document.getElementById("next") ;
let dot = document.getElementsByClassName("dot");

nextBtn.addEventListener('click', ()=>{
  containerr.style.transition = "transform 0.4s ease-in-out";
  if(slideIndex++ >=tabImg.length-1){
    slideIndex = 0 ; 
    containerr.style.transform = " translateX(0%)";
  }else{
    containerr.style.transform = " translateX(" +(-33.33*slideIndex) + "%)";
  }    

});
prevBtn.addEventListener('click', ()=>{
  containerr.style.transition = "transform 0.4s ease-in-out";
  if (slideIndex-- <=0){
    slideIndex = tabImg.length-1;
    containerr.style.transform = " translateX(" +(-33.33*slideIndex) + "%";
  }else
  containerr.style.transform = " translateX(" +(-33.33*slideIndex) + "%";

    

});

**/


 
