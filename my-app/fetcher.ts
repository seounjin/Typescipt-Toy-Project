import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000'


enum METHOD {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    DELETE = 'delete'
}

interface rest {
    [key:string]: any
}


const fetcher = async(method:METHOD, url:string, ...rest:rest[]) => {
    const res = await axios[method](url, ...rest)
    return res.data
}

export default fetcher