import { useState } from 'react'

const Button = (props) => {
  return(
    <button onClick = {props.handleClick}>{props.name}</button>
  )
}

const StaticLine = (props) => {
  return (
        <tr>
            <th>{props.text} </th>
            <th>{props.static} {props.text === "positive" ?  "%" : ""} </th>
        </tr>
  )
}
const Statistics = (props) => {
  const total = props.good + props.neutral + props.bad
  const average = total === 0 ? 0 : (props.good - props.bad) / total
  const positive = total === 0 ? 0 : (props.good / total)*100
  if (total > 0){
    return (
        <table>
          <StaticLine text={"good"} static = {props.good}/>
          <StaticLine text={"neutral"} static = {props.neutral}/>
          <StaticLine text={"bad"} static = {props.bad}/>
          <StaticLine text={"all"} static = {total}/>
          <StaticLine text={"average"} static = {average}/>
          <StaticLine text={"positive"} static = {positive}> % </StaticLine>
        </table>
    )}
  else {
    return (
        <p>No feedback give</p>
    )
  }
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClickGood = () => {
    setGood(good + 1)
  }

  const handleClickNeutral = () => {
    setNeutral(neutral + 1)
  }

  const handleClickBad = () => {
    setBad(bad + 1)
  }

  return (
      <div>
      <h1>give feedback</h1>
      <Button handleClick = {handleClickGood} name = {"good"} />
      <Button handleClick = {handleClickNeutral} name = {"neutral"} />
      <Button handleClick = {handleClickBad} name = {"bad"} />
      <h1>statics</h1>
      <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          handleClickGood = {handleClickGood}
          handleClickNeutral = {handleClickNeutral}
          handleClickBad = {handleClickBad}
      />
      </div>
  )
}

export default App
