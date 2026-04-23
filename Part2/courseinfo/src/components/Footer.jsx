const Total = (props) => {
    const parts = props.parts

    const sum = parts.reduce(
        (acc, part) => acc + part.exercises,0
    );

    return <p>Number of exercises {sum}</p>
}

export default Total