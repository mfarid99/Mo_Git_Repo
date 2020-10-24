import React from "react"
import {GlobalCtx} from "../App"

const Dashboard = (props) => {

    const {gState, setGState} = React.useContext(GlobalCtx)
    const {url, token} = gState;
    const [notes, setNotes] = React.useState(null)


        const getNotes = async () => {
            const response = await fetch (url + "/note/", {
            method: "get",
            headers: {
                Authorization: "bearer " + token
            }
        })
        const json = await response.json()
        setNotes(json)
    }
     
    React.useEffect(()=> {
        getNotes()}, [])

    return (
        <div>
            <h1>Dashboard</h1>
            <h2>New Note</h2>
            <input type = "text" name = "note" ref = {}/>
            <button>Create Note</button>
            <h2>Notes</h2>
            <ul>
                {notes.map((note)=> <li key = {note._id} >{note.note}</li>)}
            </ul>
        </div>
    );
    }

    

export default Dashboard 