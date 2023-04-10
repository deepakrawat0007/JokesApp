
const BookMarkPrompt = ({ HidePrompt, BookMarked, handleDelete }) => {
    return (
        <>
            <div className="innerBox">
                <table class="table" style={{ color: "white" }}>
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Joke-Id</th>
                            <th scope="col">Joke-Type</th>
                            <th scope="col">Joke-PunchLine</th>
                            <th scope="col">Action</th>
                            <span scope="col" style={{ cursor: "pointer" }} onClick={() => HidePrompt("bookmark")}>Close</span>
                        </tr>
                    </thead>
                    <tbody>
                        {BookMarked?.map((items, idx) => (
                            <tr>
                                <th scope="row">{idx + 1}</th>
                                <td>{items.id}</td>
                                <td>{items.type}</td>
                                <td>{items.punchline}</td>
                                <td><button onClick={() => handleDelete("bookmark", items.id)}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
export default BookMarkPrompt
