import { url } from "../constants/constants";
export const getAllSurveys = async (name, client, apiKey) => {
  return await client.request.get(`${url}/v3/surveys`, {
    options: {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    },
  });
};
