
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-purple-50 p-4">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-purple-800">Тест капельниц</CardTitle>
          <CardDescription className="text-xl mt-2">
            Узнайте, какой курс капельниц Вам подойдет
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-6">
          <img 
            src="https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
            alt="Капельницы для здоровья" 
            className="rounded-lg w-full max-w-md h-64 object-cover"
          />
          <div className="text-center space-y-4">
            <p className="text-gray-700">
              Пройдите короткий тест и получите персональную рекомендацию
            </p>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="font-medium text-purple-800">Наши курсы капельниц:</p>
              <ul className="text-left mt-2 space-y-2">
                <li className="text-gray-700">• <span className="font-medium">Детокс</span> - для очищения организма</li>
                <li className="text-gray-700">• <span className="font-medium">Снижение веса</span> - для поддержки при похудении</li>
                <li className="text-gray-700">• <span className="font-medium">Энергия</span> - для повышения жизненного тонуса</li>
              </ul>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center pb-6">
          <Button 
            onClick={() => navigate("/test")} 
            className="px-8 py-6 text-lg bg-purple-600 hover:bg-purple-700"
          >
            Начать тест
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Index;
