import axios from 'axios';

const http = axios.create({
  baseURL: 'https://rickandmortyapi.com/api',
  timeout: 10000,
});

export async function getItems({ name = '', page = 1 } = {}) {
  try {
    const { data } = await http.get('/character', {
      params: { name: name || undefined, page },
    });
    return data; // { info: { count, pages }, results: [...] }
  } catch (error) {
    if (error.response?.status === 404) {
      return { info: { count: 0, pages: 0 }, results: [] };
    }
    throw error;
  }
}

export async function getItemById(id) {
  if (!/^\d+$/.test(String(id))) return null; // ids inválidos: "abc", "-1"
  try {
    const { data } = await http.get(`/character/${id}`);
    return data && data.id ? data : null;
  } catch (error) {
    if (error.response?.status === 404) return null;
    throw error;
  }
}