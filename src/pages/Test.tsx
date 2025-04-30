
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { questions } from "@/lib/test-questions";
import { useTestContext } from "@/lib/context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

const Test = () => {
  const navigate = useNavigate();
  const { answers, setAnswer, setResult } = useTestContext();
  const [currentStep, setCurrentStep] = useState(-1); // -1 for consent, 0+ for questions
  const [consentChecked, setConsentChecked] = useState(false);
  
  const handleNext = () => {
    if (currentStep === questions.length - 1) {
      // Calculate results
      const optionCounts = [0, 0, 0]; // Count for each option type
      
      answers.forEach(answer => {
        if (answer >= 0 && answer < 3) {
          optionCounts[answer]++;
        }
      });
      
      // Find the most selected option
      let maxCount = 0;
      let maxIndex = 0;
      
      optionCounts.forEach((count, index) => {
        if (count > maxCount) {
          maxCount = count;
          maxIndex = index;
        }
      });
      
      // Set result based on the most selected option
      if (maxIndex === 0) {
        setResult("ДЕТОКС");
      } else if (maxIndex === 1) {
        setResult("СНИЖЕНИЕ ВЕСА");
      } else {
        setResult("ЭНЕРГИЯ");
      }
      
      navigate("/results");
    } else {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > -1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleOptionSelect = (optionIndex: number) => {
    setAnswer(currentStep, optionIndex);
  };
  
  // Calculate progress percentage
  const progress = currentStep === -1 ? 0 : ((currentStep + 1) / questions.length) * 100;
  
  // Consent screen
  if (currentStep === -1) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-purple-50 p-4">
        <Card className="w-full max-w-2xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-purple-800">
              Согласие на обработку персональных данных
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-md text-sm">
              <p className="mb-2">
                Нажимая кнопку "Я согласен", вы соглашаетесь с обработкой ваших персональных данных
                в соответствии с Федеральным законом от 27.07.2006 N 152-ФЗ "О персональных данных".
              </p>
              <p>
                Мы обрабатываем ваши данные с целью подбора оптимального курса капельниц и для связи с вами.
                Ваши данные не будут переданы третьим лицам без вашего согласия.
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="consent" 
                checked={consentChecked} 
                onCheckedChange={(checked) => setConsentChecked(checked as boolean)} 
              />
              <Label htmlFor="consent" className="text-base">
                Я согласен на обработку моих персональных данных
              </Label>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button 
              onClick={handleNext} 
              disabled={!consentChecked}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Продолжить
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
  
  // Current question
  const question = questions[currentStep];
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-purple-50 p-4">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader>
          <div className="mb-4">
            <Progress value={progress} className="h-2" />
            <p className="text-right text-sm text-gray-500 mt-1">
              Вопрос {currentStep + 1} из {questions.length}
            </p>
          </div>
          <CardTitle className="text-2xl font-bold text-purple-800">
            {question.text}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup 
            value={answers[currentStep]?.toString()} 
            onValueChange={(value) => handleOptionSelect(parseInt(value))}
            className="space-y-4"
          >
            {question.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-50">
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="text-base cursor-pointer flex-grow">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            onClick={handlePrevious} 
            variant="outline"
          >
            Назад
          </Button>
          <Button 
            onClick={handleNext} 
            disabled={answers[currentStep] === undefined}
            className="bg-purple-600 hover:bg-purple-700"
          >
            {currentStep === questions.length - 1 ? "Завершить" : "Далее"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Test;
