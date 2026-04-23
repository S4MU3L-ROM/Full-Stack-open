const Part = (props) => {
    return (
        <p>
            {props.name} {props.exercises}
        </p>
    )
}
const Content = (props) => {
    const parts = props.parts
    return (
        <div>
            {parts.map((part, i) => (
                <li key={i}>
                    <Part name={part.name} exercises={part.exercises} />
                </li>
            ))}
        </div>
    )
}

export default Content