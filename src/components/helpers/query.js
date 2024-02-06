export const query = (content) => {
  return {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `Please generate an overview of this ${content}, in the form of an json with the following structure: {question1: "overview of question 1",question2: "overview of question 2",..}. In that overview, based on all the answers give an overview after analysing the answers. And I don't want anyother things than the structure I mentioned, only the questions and overview no other garbage should be in the structure like undefined, dates, etc.. only the structure I mentioned.`,
      },
    ],
  };
};
