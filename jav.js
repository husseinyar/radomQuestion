const game = document.querySelector('#game')
const scoreDisplay = document.querySelector('#score')
let score = 0;
const genres=[
    {
        name: "Film",
        id:11
    },
    {
        name: "Books",
        id:10
    },
    {
        name: "music",
        id:12
    },
    {
        name: "video gams",
        id:15
    }
]


const levels =['easy','medium', 'hard']
function addGenre(genres){
            const column = document.createElement('div')
        column.classList.add('genre-column')
        column.innerHTML= genres.name;
        game.append(column)
        levels.forEach( level => {
            const card = document.createElement('div')
                        card.classList.add('card')
                        if(level === 'easy'){
                            card.innerHTML =100;

                        }
                        if(level === 'medium'){
                            card.innerHTML =200;
                            
                        }
                        if(level === 'hard'){
                            card.innerHTML =300;
                            
                        }
                        column.append(card)
                        fetch(`https://opentdb.com/api.php?amount=1&category=${genres.id}&difficulty=${level}&type=boolean`)
                        .then(resposon => resposon.json())
                        .then(data => {
                            console.log(data)
                            card.setAttribute('data-question', data.results[0].question)
                            card.setAttribute('data-answer', data.results[0].correct_answer)
                            card.setAttribute('data-value', card.getInnerHTML())
                        })
                        
                        .then( done =>  card.addEventListener('click', flipCard))
                       
  })
}
genres.forEach(i=> addGenre(i))




function flipCard(){
 
    
   
        this.style.fontSize='15px'
              
            
                const texDisplay = document.createElement('div')
                const turButten = document.createElement('button')
                const FalaseButten = document.createElement('button')

                turButten.classList.add('turButten')
                FalaseButten.classList.add('FalaseButten')
            
                turButten.innerHTML='True'
                FalaseButten.innerHTML='"False"'
                turButten.addEventListener('click', getresult)
                FalaseButten.addEventListener('click', getresult)
                 texDisplay.innerHTML= this.getAttribute('data-question')
                this.append(texDisplay,turButten, FalaseButten);
            
                const allcard = Array.from(document.querySelectorAll('.card'))
                allcard.forEach(card=> card.removeEventListener('click', flipCard))
            
     
     

}

function getresult(){
                    const allcards = Array.from( document.querySelectorAll('.card'))
                    allcards.forEach(card => card.addEventListener('click',flipCard))
                    const cardofbutton = this.parentElement
                

                    
                    if(cardofbutton.getAttribute('data-answer') === this.innerHTML ){
                    
                    score = score + parseInt( cardofbutton.getAttribute('data-value'))
                    scoreDisplay.innerHTML = score
                
                    scoreDisplay.innerHTML= score
                    cardofbutton.classList.add("correct-answer")
                    setTimeout(()=>{
                        while(cardofbutton.firstChild){
                            cardofbutton.removeChild(cardofbutton.lastChild)

                        }
                        cardofbutton.innerHTML=  cardofbutton.getAttribute('data-value')
                            
                    },100)
                        
                    }
                    else{
                        cardofbutton.classList.add("Incorrect-answer")
                        setTimeout(()=>{
                            while(cardofbutton.firstChild){
                            cardofbutton.removeChild(cardofbutton.lastChild)
                
                            }
                           

                            cardofbutton.innerHTML = 'Not correct Answer <br> please try again '
                                
                        },100)
                    }
                
                cardofbutton.removeEventListener('click', flipCard)
                    
}