import axios from 'axios';
 
import { getLeaderboardData, parseData, postData } from '../API/Leaderboard';
 
jest.mock('axios');
 
describe('getLeaderboardData', () => {
  it('fetches successfully data from an API', async () => {
    const data = {
      data: {
        hits: [
          {
            objectID: '1',
            title: 'a',
          },
          {
            objectID: '2',
            title: 'b',
          },
        ],
      },
    };
 
    axios.get.mockImplementationOnce(() => Promise.resolve(data));
  });
 
  it('fetches erroneously data from an API', async () => {
    const errorMessage = 'Network Error';
 
    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage)),
    );
  });
});

describe('getLeaderboardData', () => {
  it('fails to fetch unmatched data', async () => {
    const data = undefined;
 
    axios.get.mockImplementationOnce(() => Promise.resolve(data));
 
    await expect(getLeaderboardData()).resolves.toEqual(data);
  });
 
});




