import axios from "axios"
import { serverUrl } from "../App"
import { setUserData } from "../redux/userSlice"

export const getCurrentUser = async (dispatch) => {
    try {
        const result = await axios.get(serverUrl + "/api/user/currentuser", { withCredentials: true })
        
        dispatch(setUserData(result.data))
    } catch (error) {
        console.log("Error fetching current user:", error)
    }
}

export const generateNotes = async (payload) => {
    try {
        const result = await axios.post(serverUrl + "/api/notes/generate-notes", payload, { withCredentials: true })
        console.log(result)
        return result.data
    } catch (error) {
        console.log("Error generating notes:", error)
    }
    
}