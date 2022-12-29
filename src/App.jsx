import React from 'react'
import './App.css'
import Die from '../components/Die'
import { nanoid } from 'nanoid'
import Confetti from "react-confetti"

function App() {
  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)

  React.useEffect(() => {
    const allHeld = dice.every(item => item.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(item => item.value === firstValue)
    if (allSameValue && allHeld) {
      setTenzies(true)
    }
  }, [dice])
  
  function generateNewDie() {
    return {
      value: (Math.floor(Math.random() * 6) + 1),
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice() {
    const dieArray = []
    for (let i = 0; i < 10; i++) {
      dieArray.push(generateNewDie())
    }
    return dieArray
  }
  
 const dieElements = dice.map(item => (
    <Die 
      key={item.id} 
      value={item.value} 
      holdDice={() => holdDice(item.id)}
      isHeld={item.isHeld}
    />
  ))
  

 function rollDice() {
  if (!tenzies) {
      setDice(oldDice => oldDice.map(item => {
      return item.isHeld ?
        item :
        generateNewDie()
    
    }))
  } else {
      setTenzies(false)
      setDice(allNewDice())
  }
 }

 function holdDice(id){
  setDice(oldDice => oldDice.map(item => {
    return item.id === id ? 
      {...item, isHeld: !item.isHeld} :
      item
  }))
 }
  
  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className='title'>Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {dieElements}
      </div>
      <button onClick={rollDice} className="roll-dice">{tenzies ? "New Game" : "Roll"}</button>
    </main>
  )
}

export default App