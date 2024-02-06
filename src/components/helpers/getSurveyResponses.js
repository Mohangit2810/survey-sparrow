import { url } from "../constants/constants";
export const getSurveyResponses = async (name, client, surveyId) => {
  return await client.request.get(`${url}/v3/responses?survey_id=${surveyId}`, {
    options: {
      headers: {
        Authorization: "Bearer <%=iparams.surveysparrow_api_key%>",
      },
    },
  });
};
