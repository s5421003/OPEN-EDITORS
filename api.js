export async function fetchImages(breed) {
    const response = await fetch(
      `http://shibe.online/api/${breed}?count=10&urls=true&httpsUrls=true`
    );
    const data = await response.json();
    return data;
  }
