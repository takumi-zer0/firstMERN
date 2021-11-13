import './App.css';
import {useState, useContext} from 'react'
import React from 'react'
import axios from 'axios'

const ThemeContext = React.createContext()
const baseUrl = 'http://localhost:3001/subs'



function GetButton(props) {

  return (
    <button onClick={() => {
    var lists
    axios.get(baseUrl).then(res => {
      lists = res.data
      lists.forEach(list => {
        console.log(list.name)
      })
    })
  }
    }>get api</button>
  )
}

function SendButton (props) {
  return (
    <button onClick={() => {
      axios.post(baseUrl, {
        name: props.name,
        subsToChannel: "tes"
      }).then((response) => { console.log(response) })
        .catch((err) => console.log(err))
    }}>send</button>
  )
}

function Input () {
  const {name, setName} = useContext(ThemeContext)

  const handleName = (e) => {
    setName(e.target.value)
  }

  return (
    <>
    <p>sending api to /subs</p>
    <input className="this" style={{ margin: '10px !important' }}  onChange={(event) => handleName(event)} type="text" value={name}/>
    </>
  )
}

function Option() {
  const {thisoption, setOption} = useContext(ThemeContext)
  const handleName = (e) => {
    setOption(e.target.value)
  }

  return (
    <>
      <label for="pet-select">Choose a pet:</label>

      <select id="pet-select" onChange={handleName}>
        <option value="">--Please choose an option--</option>
        <option value="GET">GET</option>
        <option value="POST">POST</option>
        <option value="PATCH">PATCH</option>
        <option value="DELETE">DELETE</option>
      </select>
</>
  )
}

function App() {
  const [name, setName] = useState("")
  const [thisoption, setOption] = useState("")

  return (
    <div className="main">
    <ThemeContext.Provider value={{name, setName, thisoption, setOption}}>
      <Option />
      <Input />
      <SendButton name={name} option={thisoption}/>
      <GetButton />
    </ThemeContext.Provider>
    </div>
  );
}

export default App;
