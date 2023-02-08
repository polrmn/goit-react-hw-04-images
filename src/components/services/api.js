import axios from "axios";

const API_KEY = '32728166-633f0618a41e9b54facc5024e';

axios.defaults.baseURL = 'https://pixabay.com/api';

export const api = async (query, page) => {
    const response = await axios.get(
      `/?q=${query}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12&page=${page}`
    );
    return response.data.hits;
}