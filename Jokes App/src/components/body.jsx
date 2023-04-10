import axios from "axios";
import { useState, useEffect } from "react";
import JokePrompt from "./prompts/jokePrompt";
import BookMarkPrompt from "./prompts/bookMarkPrompt";
import Header from "./header";

const Body = () => {

    const [BookMarked, setBookMark] = useState([])
    const [jokePrompt, setJokePrompt] = useState(false)
    const [BookMarkprompt, setBookmarkPrompt] = useState(false)
    const [ratings, setRating] = useState([])
    const [joke, setJoke] = useState({})

    const APICall = async () => {
        await axios.get("https://official-joke-api.appspot.com/random_joke")
            .then((res) => {
                setJoke(res.data)
                setJokePrompt(true)
            })
            .catch((e) => {
                alert(e.message)
            })
    }

    const NewJoke = () => {
        APICall()
    }

    useEffect(() => {
        const storedRatings = localStorage.getItem('ratings');
        const storedBookMarked = localStorage.getItem('bookmarked')
        if (storedRatings) {
            setRating(JSON.parse(storedRatings));
        }
        if (storedBookMarked) {
            setBookMark(JSON.parse(storedBookMarked))
        }
    }, []);

    const HidePrompt = (exp) => {
        switch (exp) {
            case "joke":
                setJokePrompt(false)
                break;
            case "bookmark":
                setBookmarkPrompt(false)
                break;
        }

    }
    const handleDelete = (exp, idx) => {
        switch (exp) {
            case "bookmark":
                const filterlist = BookMarked.filter(items => items.id !== idx)
                setBookMark(filterlist);
                localStorage.setItem("bookmarked", JSON.stringify(filterlist))
                break;
            case "rating":
                const filterList = ratings.filter(items => items.id !== idx)
                setRating(filterList)
                localStorage.setItem("ratings", JSON.stringify(filterList))
                break;
        }

    }

    const AddBookMark = () => {
        setBookMark([...BookMarked, joke]);
        localStorage.setItem('bookmarked', JSON.stringify([...BookMarked, joke]))
    };

    const showBook = () => {
        setBookmarkPrompt(true)
    }

    const RatingData = (data) => {
        setRating([...ratings, data])
        localStorage.setItem('ratings', JSON.stringify([...ratings, data]));
    }
    return (
        <>
            <Header showBook={showBook} />
            <div className="center" style={{ textAlign: "center" }}>
                <button type="button" onClick={NewJoke} class="btn btn-success">Generate Random Jokes</button>
            </div>
            <div>
                {jokePrompt ? <JokePrompt HidePrompt={() => HidePrompt("joke")} joke={joke} AddBookMark={AddBookMark} NewJoke={NewJoke} RatingData={RatingData} /> : ''}
                {BookMarkprompt ? <BookMarkPrompt HidePrompt={HidePrompt} BookMarked={BookMarked} handleDelete={handleDelete} /> : ''}
            </div>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Joke-Id</th>
                        <th scope="col">Joke-Type</th>
                        <th scope="col">Joke-PunchLine</th>
                        <th scope="col">Rating</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {ratings?.map((items, idx) => (
                        <tr>
                            <th scope="row">{idx + 1}</th>
                            <td>{items.id}</td>
                            <td>{items.type}</td>
                            <td>{items.punchline}</td>
                            <td>{items.rating}/5</td>
                            <td><button onClick={() => handleDelete("rating", items.id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>

    )
}

export default Body;