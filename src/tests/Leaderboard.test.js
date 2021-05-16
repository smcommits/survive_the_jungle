import 'axios';
import {postData} from '../API/Leaderboard'

jest.mock('axios');
test('should succesfully send data using post method and record the user score', async () => {
  const responseData = {data: { result: 'Leaderboard score created correctly' }};
  axios.post.mockResolvedValue(returnData);
  const response = await postData('test', 80);
  expect(response).toEqual('Leaderboard score created correctly');
});


