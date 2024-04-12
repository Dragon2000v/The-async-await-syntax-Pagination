const KEY = '43342378-f760c13e6ac2de41c368148af';
const BASE_URL = 'https://pixabay.com/api/';

export function getImage(imgSearch) {
  return fetch(
    `${BASE_URL}?key=${KEY}&q=${imgSearch}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
