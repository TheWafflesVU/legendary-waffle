import React, { useState, useMemo } from 'react'
import { Text, View, Button } from 'react-native'
import TinderCard from 'react-tinder-card'

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  header: {
    color: '#000',
    fontSize: 30,
    marginBottom: 30,
  },
  cardContainer: {
    width: '70%',
    height: 600,
  },
  card: {
    position: 'absolute',
    backgroundColor: '#fff',
    width: '100%',
    height: 600,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 20,
    borderRadius: 20,
    resizeMode: 'cover',
  },
  cardTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 25
  },
  cardBody: {
    margin: 30
  },
  buttons: {
    margin: 20,
    zIndex: -100,
    flexDirection: 'row',
  },
  button: {
    marginleft: 10
  },
  infoText: {
    height: 28,
    justifyContent: 'center',
    display: 'flex',
    zIndex: -100,
  }
}

// TODO: Reaplace with actual data
// Dummy datda for now
const db = [
  {
    name: 'Richard Hendricks',
    header: 'Test card 1',
    desp: 'This is a test card for card.This is a test card for card.This is a test card for card.This is a test card for card.This is a test card for card.This is a test card for card. ',

  },
  {
    name: 'Erlich Bachman',
    header: 'Test card 2',
    desp: 'This is a test card for card.This is a test card for card.This is a test card for card.This is a test card for card.This is a test card for card.This is a test card for card. ',

  },
]

const alreadyRemoved = []
let charactersState = db // This fixes issues with updating characters state forcing it to use the current state and not the state that was active when the card was created.

const Advanced = () => {
  const [characters, setCharacters] = useState(db)
  const [lastDirection, setLastDirection] = useState()

  const childRefs = useMemo(() => Array(db.length).fill(0).map(i => React.createRef()), [])

  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete + ' to the ' + direction)
    setLastDirection(direction)
    alreadyRemoved.push(nameToDelete)
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
    charactersState = charactersState.filter(character => character.name !== name)
    setCharacters(charactersState)
  }

  const swipe = (dir) => {
    const cardsLeft = characters.filter(person => !alreadyRemoved.includes(person.name))
    if (cardsLeft.length) {
      const toBeRemoved = cardsLeft[cardsLeft.length - 1].name // Find the card object to be removed
      const index = db.map(person => person.name).indexOf(toBeRemoved) // Find the index of which to make the reference to
      alreadyRemoved.push(toBeRemoved) // Make sure the next card gets removed next time if this card do not have time to exit the screen
      childRefs[index].current.swipe(dir) // Swipe the card!
    }
  }

  return (
    <View style={styles.container}>

      <View style={styles.cardContainer}>
        
        {characters.map((character, index) =>
          <TinderCard ref={childRefs[index]} key={character.name} onSwipe={(dir) => swiped(dir, character.name)} onCardLeftScreen={() => outOfFrame(character.name)}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}> { character.header } </Text>
              <br />
              <Text style={styles.cardBody}>{ character.desp }</Text>
            </View>
          </TinderCard>
        )}

      </View>

      <View style={styles.buttons}>

        <Button style={styles.button} onPress={() => swipe('right')} title='I am interested!' />
      </View>

      {lastDirection ? <Text style={styles.infoText} key={lastDirection}>You swiped {lastDirection}</Text> : <Text style={styles.infoText}>Swipe a card or press a button to get started!</Text>}
    
    </View>
  )
}

export default Advanced