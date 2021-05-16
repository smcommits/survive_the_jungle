import axios from 'axios';

const postData = async (data) => {
  await axios.post('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/WV10lUazjzNF0libG6nq/scores/', data)
    .then((response) => response.data).catch((error) => error);
  return data.result;
};

const getLeaderboardData = async () => {
  const response = await axios.get('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/WV10lUazjzNF0libG6nq/scores/')
    .then((response) => response.data.result).catch((error) => error);
  return response;
};

const parseData = async () => {
  const data = await getLeaderboardData();
  return data
    .sort((a, b) => (a.score > b.score ? -1 : 1))
    .slice(0, 5);
};

export { postData, getLeaderboardData, parseData };
