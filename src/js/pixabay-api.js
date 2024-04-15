// pixabay-api.js

import axios from 'axios';

const KEY = '43342378-f760c13e6ac2de41c368148af';
const BASE_URL = 'https://pixabay.com/api/';

export async function getImage(imgSearch, page) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: KEY,
        q: imgSearch,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: 15,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
}
