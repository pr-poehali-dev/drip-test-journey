
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTestContext } from "@/lib/context";
import { resultData } from "@/lib/test-questions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Results = () => {
  const navigate = useNavigate();
  const { result, answers } = useTestContext();
  
  // Redirect to test if no result
  useEffect(() => {
    if (!result || answers.length === 0) {
      navigate("/test");
    }
  }, [result, answers, navigate]);
  
  if (!result) {
    return null;
  }
  
  const resultInfo = resultData[result];
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-purple-50 p-4">
      <Card className="w-full max-w-3xl shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center mb-4">
            <span className="text-3xl">✨</span>
          </div>
          <CardTitle className="text-3xl font-bold text-purple-800">
            Ваш результат
          </CardTitle>
          <p className="text-lg font-medium mt-2 text-purple-600">
            Мы подобрали для Вас оптимальный курс капельниц
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="bg-purple-50 rounded-lg p-6 text-center">
            <h3 className="text-2xl font-bold text-purple-800 mb-2">{resultInfo.title}</h3>
            <p className="text-gray-700">{resultInfo.description}</p>
          </div>
          
          <div className="flex justify-center">
            <img 
              src={resultInfo.imageUrl}
              alt={resultInfo.title}
              className="rounded-lg w-full max-w-md h-64 object-cover"
            />
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 mb-2">Рекомендуемые анализы</h4>
            <p className="text-gray-700 text-sm">{resultInfo.analyses}</p>
          </div>
          
          <Separator />
          
          <div className="text-center text-gray-700">
            <p>
              Для получения подробной консультации и записи на курс капельниц,
              пожалуйста, оставьте свои контактные данные.
            </p>
            <p className="text-sm mt-2">
              Наш специалист свяжется с Вами в ближайшее время.
            </p>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-center">
          <Button 
            onClick={() => navigate("/contact")}
            className="px-8 bg-purple-600 hover:bg-purple-700"
          >
            Оставить контактные данные
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Results;
