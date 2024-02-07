export const query = (content) => {
  return {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `Please generate an overview of this survey data, in the form of a JSON with the following structure: {question1: "overview of question 1", question2: "overview of question 2", ... "Overall Overview of the survey": "an analyzed overview of all responses of all questions and end it with whether the survey had positive feedback or negative one"}. Ensure that the overview is generated by analyzing all the responses and providing insights. Remove any unwanted elements such as undefined values, dates, etc. from the structure.`,
      },
    ],
  };
};
