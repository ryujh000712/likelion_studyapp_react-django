import axios from "axios"

axios.defaults.baseURL = "http://127.0.0.1:8000/api"

export default {
    getAllPosts() {
        return axios.get('/posts/')
    },

    createPost(data) {
        return axios.post('/posts/', data)
    },

    updatePost(data, id) {
        return axios.put('/posts/' + String(id), data)
    },

    async changingLikes(data, id) {
        let curr_likes = await axios.get('/posts' + String(id), )
        return axios.put('/posts/', + String(id), {})
    },

    deletePost(id) {
        return axios.delete('/posts/' + String(id))
    },
    
}