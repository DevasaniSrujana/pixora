import axios from "axios";

const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_KEY;
const TENOR_KEY = import.meta.env.VITE_TENOR_KEY;
const PEXELS_KEY = import.meta.env.VITE_PEXELS_KEY;

export async function fetchPhotos(query, page = 1, per_page = 20) {
  const res = await axios.get("https://api.unsplash.com/search/photos", {
    params: { query, page, per_page },
    headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` },
  });
  const data = res.data.results;
  const totalPages = res.data.total_pages || 1;
  const results = data.map((item) => ({
    id: item.id,
    title: item.alt_description,
    type: "Photos",
    thumbnail: item.urls.small,
    src: item.urls.full,
    url: item.links.html,
  }));
  return {
    results,
    hasMore: page < totalPages,
  };
}

export async function fetchGIF(query, limit = 20) {
  const res = await axios.get("https://tenor.googleapis.com/v2/search", {
    params: { q: query, key: TENOR_KEY, limit: limit },
  });
  const data = res.data.results;
  return data.map((item) => ({
    id: item.id,
    title: item.content_description,
    type: "GIFs",
    thumbnail: item.media_formats.gifpreview.url,
    src: item.media_formats.gif.url,
    url: item.url,
  }));
}

export async function fetchVideos(query, per_page = 20) {
  const res = await axios.get("https://api.pexels.com/videos/search", {
    params: { query, per_page },
    headers: { Authorization: PEXELS_KEY },
  });
  const data = res.data.videos;
  return data.map((item) => ({
    id: item.id,
    title: item.user.name,
    type: "Videos",
    thumbnail: item.image,
    src: item.video_files[0].link,
    url: item.url,
  }));
}
