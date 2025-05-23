import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/Card';

const cardImages = [
  { "src": "/img/helmet-1.png", matched: false },
  { "src": "/img/potion-1.png", matched: false },
  { "src": "/img/ring-1.png", matched: false },
  { "src": "/img/scroll-1.png", matched: false },
  { "src": "/img/shield-1.png", matched: false },
  { "src": "/img/sword-1.png", matched: false }
]

function App() {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const [showAll, setShowAll] = useState(true)


  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))


    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
    // flip cards after 1 second
    setTimeout(() => setShowAll(false), 500)
  }

  // handle choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  // compare 2 Selected Cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)

      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true }
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 500)
      }
    }
  }, [choiceOne, choiceTwo])

  // reset choices and increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurn => prevTurn + 1)
    setDisabled(false)
  }

  useEffect(() => {
    shuffleCards()
  }, [])






  // Prevent inspect element(Ctrl + Shift + i , Ctrl + Shift + v , F12 , RightClick)
  document.addEventListener('keydown', function (event) {
    if (event.keyCode === 123 ||
      (event.ctrlKey && event.shiftKey && (event.keyCode === 73 || event.keyCode === 67))) {
      event.preventDefault();
    }
  });
  document.addEventListener('contextmenu', function (event) {
    event.preventDefault();
  });


  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={shuffleCards} >New Game</button>

      <div className='card-grid'>
        {cards.map(card => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={showAll || card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
      {
        cards.length > 0 && cards.every(card => card.matched) && (
          <div className="congrats">
            You Win!🎉
          </div>
        )
      }
    </div>
  );
}

export default App;