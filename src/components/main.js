import React, { useState } from "react";
import {
  Button,
  Flex,
  Heading,
  Text,
  FormInput,
  FormLabel,
  Select,
  Box,
  Alert,
} from "@sparrowengg/twigs-react";
import { query } from "./helpers/query";
import { generateQuestion } from "./helpers/generateQuestions";
import { getSurveyResponses } from "./helpers/getSurveyResponses";
import { getAllSurveys } from "./helpers/getAllSurveys";
import SurveyOverview from "./helpers/surveyOverview";

const Main = ({ client }) => {
  const [surveyOverview, setSurveyOverview] = useState([]);
  const [apiKey, setApiKey] = useState("");
  const [displaySurveyOptions, setDisplaySurveyOptions] = useState([]);
  const [selectedSurveyID, setSelectedSurveyID] = useState("");

  async function getSurveyOverview() {
    try {
      // Assuming getSurvey returns a string response
      const responseString = await getSurveyResponses(
        "surveys",
        client,
        selectedSurveyID
      );

      // Parse the response string into a JavaScript object
      const response = JSON.parse(responseString);

      if (response.body && response.body.data) {
        const structuredData = response.body.data.reduce((acc, survey) => {
          survey.answers.forEach((answer) => {
            if (!acc[answer.question]) {
              acc[answer.question] = [];
            }
            acc[answer.question].push(answer.answer);
          });
          return acc;
        }, {});

        // Convert structuredData object to a string
        const structuredDataString = JSON.stringify(structuredData);

        const aioverview = await generateQuestion(
          query(structuredDataString),
          client
        );
        const questionsArray =
          aioverview?.choices[0]?.message?.content.split("\n");

        // console.log(questionsArray);
        setSurveyOverview(questionsArray);
        document.getElementById("survey-overview").scrollIntoView();
      } else {
        console.log("Invalid response format: missing body or data");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getSurveys() {
    // const response = await getAllSurveys(
    //   "surveys",
    //   client,
    //   "proRWJG3C-_AQIxhPwJtt6A1qv1i5ukl5yBg-CTkRmR5wmVaQAKT7sTVrfs_2InVSCzTd5v6va5sUnua8Rn2D3wg"
    // );
    // const allSurveys = JSON.parse(response);
    // const allSurveyData = allSurveys.body.data
    const allSurveyData = [
      {
        id: 1000064374,
        name: "Tourist Feedback Survey",
        archived: false,
        survey_type: "ClassicForm",
        created_at: "2024-02-06T12:00:02.443Z",
        updated_at: "2024-02-06T12:00:35.961Z",
        survey_folder_id: 1000099300,
        survey_folder_name: "General",
      },
      {
        id: 1000063103,
        name: "test survey",
        archived: false,
        survey_type: "ClassicForm",
        created_at: "2024-02-06T05:35:38.715Z",
        updated_at: "2024-02-06T09:05:35.071Z",
        survey_folder_id: 1000099300,
        survey_folder_name: "General",
      },
    ];
    const surveyOptions = allSurveyData.reduce((result, survey) => {
      result[survey.id] = survey.name;
      return result;
    }, {});
    const selectSurveyOptions = Object.entries(surveyOptions).map(
      ([value, label]) => ({
        label,
        value,
      })
    );
    setDisplaySurveyOptions(selectSurveyOptions);
    document.getElementById("select-survey").scrollIntoView();
  }

  return (
    <Flex
      css={{ marginLeft: "30px", marginRight: "30px" }}
      justifyContent="center"
      gap={"40px"}
      alignItems="center"
      flexDirection="column"
    >
      <Box css={{ width: "100%", height: "100vh" }}>
        <Heading
          css={{
            textTransform: "uppercase",
            textAlign: "center",
            color: "#56B0BB",
            letterSpacing: "1.5px",
            marginTop: "24px",
            marginBottom: "$8",
            borderBottom: "2px solid green",
          }}
          size="h4"
          weight="semibold"
        >
          Get an AI Overview of your Survey
        </Heading>
        <Text
          size="md"
          css={{
            marginBottom: "$6",
            maxWidth: 850,
            textAlign: "center",
            color: "$neutral800",
            marginRight: "auto",
            marginLeft: "auto",
          }}
        >
          Enter your API Key and Survey ID to get an AI overview of your survey.
          <br />
          Please enter your SurveySparrow API key. You can find it in Settings
          -&gt; Apps & Integrations -&gt; Custom Apps.
        </Text>
        <Flex
          css={{ alignSelf: "flex-start", marginTop: "60px" }}
          flexDirection="column"
          gap={"12px"}
        >
          <FormLabel
            size={"lg"}
            htmlFor="api-key"
            css={{ marginRight: "$2", fontWeight: "bold" }}
          >
            API Key
          </FormLabel>
          <FormInput
            id="api-key"
            type="text"
            value={apiKey}
            // value={
            //   "proRWJG3C-_AQIxhPwJtt6A1qv1i5ukl5yBg-CTkRmR5wmVaQAKT7sTVrfs_2InVSCzTd5v6va5sUnua8Rn2D3wg"
            // }
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your API Key"
            css={{ marginRight: "$2", width: "800px" }}
          />
        </Flex>

        <Button
          size="xl"
          color="primary"
          css={{
            marginTop: "$10",
          }}
          onClick={getSurveys}
        >
          Get all Surveys
        </Button>
      </Box>
      <Box
        id="select-survey"
        css={{
          width: "100%",
          height: "100vh",
          paddingTop: "80px",
          paddingBottom: "80px",
          transition: "all 0.3s ease ",
        }}
      >
        <Flex
          css={{ alignSelf: "flex-start" }}
          flexDirection="column"
          gap={"12px"}
        >
          <FormLabel
            size={"lg"}
            htmlFor="survey-id"
            css={{ marginRight: "$2", fontWeight: "bold" }}
          >
            Select your Survey
          </FormLabel>
          <Select
            id="survey-id"
            size="lg"
            name="survey-id"
            options={displaySurveyOptions}
            onChange={(e) => setSelectedSurveyID(e.value)}
            css={{ marginRight: "$2", width: "300px" }}
          />
        </Flex>
        <Button
          size="xl"
          color="primary"
          css={{
            marginTop: "$10",
          }}
          onClick={getSurveyOverview}
        >
          Get Survey Overview
        </Button>
      </Box>
      <SurveyOverview questionsArray={surveyOverview} />
    </Flex>
  );
};

export default Main;
