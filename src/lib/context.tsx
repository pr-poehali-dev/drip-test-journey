
import { createContext, useContext, useState, ReactNode } from "react";
import { ResultType } from "./test-questions";

type TestContextType = {
  answers: number[];
  result: ResultType | null;
  contactInfo: {
    firstName: string;
    middleName: string;
    phone: string;
  };
  setAnswer: (questionIndex: number, answerValue: number) => void;
  setResult: (result: ResultType) => void;
  setContactInfo: (info: { firstName: string; middleName: string; phone: string }) => void;
  resetTest: () => void;
};

const defaultContextValue: TestContextType = {
  answers: [],
  result: null,
  contactInfo: {
    firstName: "",
    middleName: "",
    phone: ""
  },
  setAnswer: () => {},
  setResult: () => {},
  setContactInfo: () => {},
  resetTest: () => {}
};

const TestContext = createContext<TestContextType>(defaultContextValue);

export const useTestContext = () => useContext(TestContext);

export const TestProvider = ({ children }: { children: ReactNode }) => {
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<ResultType | null>(null);
  const [contactInfo, setContactInfo] = useState({
    firstName: "",
    middleName: "",
    phone: ""
  });

  const setAnswer = (questionIndex: number, answerValue: number) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = answerValue;
    setAnswers(newAnswers);
  };

  const resetTest = () => {
    setAnswers([]);
    setResult(null);
    setContactInfo({
      firstName: "",
      middleName: "",
      phone: ""
    });
  };

  return (
    <TestContext.Provider
      value={{
        answers,
        result,
        contactInfo,
        setAnswer,
        setResult,
        setContactInfo,
        resetTest
      }}
    >
      {children}
    </TestContext.Provider>
  );
};
