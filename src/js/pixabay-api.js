export function fetchImagesFromPixabay() {
  const valueFromInput = inputSearch.value.trim().split(',').join('+');
  const searchParams = new URLSearchParams({
    key: '42959666-b225ac6c9c40b570269fe0b4e',
    q: [valueFromInput],
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  return fetch(`https://pixabay.com/api/?${searchParams}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
