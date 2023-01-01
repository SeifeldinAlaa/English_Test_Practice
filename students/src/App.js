import { FormGroup, Label, Input } from "reactstrap";
import Progressbar from './Component/Progress_bar';
import React, { useEffect, useState } from 'react';
import './App.css';


function App() {

  //  define state variables
  const [score, setScore] = useState(0);
  const [data, setData] = useState();
  function getData(val) {
    setData(val.target.value)
  }

  const [testScreenFlag, setTestScreenFlag] = useState(true)
  // fetching the 10 word list from backend
  const [backendData, setBackendData] = useState([{}])
  useEffect(() => {

    fetch("/api/wordlist").then(response => response.json()).then(data => { setBackendData(data) })
  }, [])

  const [answer, setAnswer] = useState(null)
  const [wrongAnswer, setWrongAnswer] = useState(null)

  const [count, setCount] = useState(0)
  // looping over the questions list and saving score of the student answer
  function indexCount() {
    if (count <= 8) {
      if (backendData[count].pos === data) {
        setAnswer(true)
        setScore(score + 1)
        setWrongAnswer(false)
        console.log(score)
      } else {
        setAnswer(false)
        setWrongAnswer(true)
        console.log('wrong')
      }
      setCount(count + 1)
    } else {
      setCount(9)
      setTestScreenFlag(false)
      if (backendData[count].pos === data) {
        setScore(score + 1)

      }

    }

  }
  return (
    <React.Fragment>

      <h1 className='headline'>
        Excercises
      </h1>
      {testScreenFlag && (

        <div className="testscreen">
          <br />
          <div className="App">
            <p>{backendData[count].word}</p>
          </div>


          <br />
          <br />
          <FormGroup className="formGroupRadios">
            <FormGroup>

              <Input id="radio1" type="radio" value="verb" name="adjective" onChange={getData} />
              <Label for="radio1">
                verb
              </Label>
            </FormGroup>
            <FormGroup>

              <Input id="radio2" type="radio" value="noun" name="adjective" onChange={getData} />
              <Label for="radio2">
                noun
              </Label>
            </FormGroup>
            <FormGroup>

              <Input id="radio3" type="radio" value="adverb" name="adjective" onChange={getData} />
              <Label for="radio3">
                adverb
              </Label>
            </FormGroup>
            <FormGroup>

              <Input id="radio4" type="radio" value="adjective" name="adjective" onChange={getData} />
              <Label for="radio4">
                adjective
              </Label>
            </FormGroup>

          </FormGroup>


          <div>
            {answer && (<p className="right-answer">Right</p>)}
            {wrongAnswer && (<p className="wrong-answer">Wrong</p>)}

            <div className="Progressbar">
              <Progressbar bgcolor="blue" progress={(count + 1) * 10} height={30} />
            </div>

          </div>


          <br />
          <br />

          <center>
            <button onClick={indexCount} className="btn btn-primary " type="submit" name="submit"  >Next</button>
            <br />
            <br />

            <br />
            <br />
          </center>

          <br />
          <br />
          <br />
          <br />


        </div>
      )}


      {!testScreenFlag && (
        <center>
          <div className="finishscreen">
            <p className="paragraph">You have successfully finished the test</p>
            <p className="paragraph">Score: {Math.floor((score / 10) * 100)}</p>
            <button id="reset" className="btn btn-primary" onClick={() => window.location.reload(false)}>Try Again</button>
          </div>
        </center>
      )}

    </React.Fragment>

  )



}

export default App;
