import "../../App.css";
const JokePrompt = ({ HidePrompt, joke, AddBookMark, NewJoke, RatingData }) => {

    const handleRatingData = (id, type, punchline, rating) => {
        const data = {
            id: id,
            type: type,
            punchline: punchline,
            rating: rating
        }
        RatingData(data)
    }
    return (
        <div className="innerBox">

            <h1>Joke</h1>
            <div className="space">
                {joke.setup}
                {joke.punchline}
            </div>
            <button onClick={NewJoke}>New Joke</button>
            <button id="book" onClick={AddBookMark}>BookMark</button>
            <button onClick={() => HidePrompt("joke")}>Close</button>
            <div className="ratings">
                <h1>Ratings</h1>
                <button onClick={() => handleRatingData(joke.id, joke.type, joke.punchline, 1)}>1</button>
                <button onClick={() => handleRatingData(joke.id, joke.type, joke.punchline, 2)}>2</button>
                <button onClick={() => handleRatingData(joke.id, joke.type, joke.punchline, 3)}>3</button>
                <button onClick={() => handleRatingData(joke.id, joke.type, joke.punchline, 4)}>4</button>
                <button onClick={() => handleRatingData(joke.id, joke.type, joke.punchline, 5)}>5</button>
            </div>

        </div>

    )

}
export default JokePrompt