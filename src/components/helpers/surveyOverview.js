import React from "react";
import {
  Button,
  Flex,
  Heading,
  Text,
  FormInput,
  FormLabel,
  Select,
} from "@sparrowengg/twigs-react";

function SurveyOverview({ questionsArray }) {
  if (!questionsArray || questionsArray.length === 0) {
    return <div></div>;
  }

  const joinedString = questionsArray.join("");

  // Remove "{" and "}" characters from the beginning and end of the string
  const sanitizedString = joinedString.replace(/^{+|}+$/g, "");
  console.log("sanitized", sanitizedString);

  // // Split the sanitized string into an array of lines
  const linesArray = sanitizedString.split(",  ");
  console.log("linesArray", linesArray);

  // Create an object to store questions and overviews
  const obj = {};

  linesArray.forEach((line) => {
    // Split each line into question and overview
    const [question, overview] = line.split('": "');

    // Remove remaining quotes and comma from the overview
    const sanitizedOverview = overview.replace(/\"+|,+/g, "");

    // Add question and overview to the object
    obj[question] = sanitizedOverview;
  });

  // console.log("obj", obj);

  return (
    <div id="survey-overview">
      <Heading
        css={{
          textTransform: "uppercase",
          textAlign: "center",
          color: "$black800",
          letterSpacing: "1.5px",
          marginBottom: "$8",
          marginTop: "$16",
          borderBottom: "2px solid $black700",
        }}
        size="h4"
        weight="bold"
      >
        Survey Overview
      </Heading>
      <Flex flexDirection="column" gap={"20px"}>
        {Object.entries(obj).map(([question, answer]) => (
          <Flex flexDirection="column" gap={"15px"} key={question}>
            <Heading size={"h5"} weight={"bold"}>
              {question}
            </Heading>
            <Text
              size={"md"}
              css={{
                marginBottom: "$6",
                maxWidth: 850,
                textAlign: "justify",
                color: "$neutral800",
              }}
            >
              {answer}
            </Text>
          </Flex>
        ))}
      </Flex>
    </div>
  );
}

export default SurveyOverview;
