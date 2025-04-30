
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTestContext } from "@/lib/context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

const ContactForm = () => {
  const navigate = useNavigate();
  const { result, contactInfo, setContactInfo } = useTestContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Redirect to test if no result
  if (!result) {
    navigate("/test");
    return null;
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!contactInfo.firstName || !contactInfo.phone) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, заполните обязательные поля",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, you would send this data to your backend
      // For now, we'll simulate a network request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Save to localStorage for the admin panel demo
      const submissions = JSON.parse(localStorage.getItem("testSubmissions") || "[]");
      submissions.push({
        id: Date.now(),
        date: new Date().toISOString(),
        result,
        contactInfo
      });
      localStorage.setItem("testSubmissions", JSON.stringify(submissions));
      
      toast({
        title: "Успешно отправлено!",
        description: "Ваши данные получены. Мы свяжемся с вами в ближайшее время."
      });
      
      // Redirect back to home
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      toast({
        title: "Ошибка отправки",
        description: "Пожалуйста, попробуйте еще раз позже",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-purple-50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-purple-800">
            Ваши контактные данные
          </CardTitle>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Имя <span className="text-red-500">*</span></Label>
              <Input
                id="firstName"
                placeholder="Введите ваше имя"
                value={contactInfo.firstName}
                onChange={(e) => setContactInfo({...contactInfo, firstName: e.target.value})}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="middleName">Отчество</Label>
              <Input
                id="middleName"
                placeholder="Введите ваше отчество"
                value={contactInfo.middleName}
                onChange={(e) => setContactInfo({...contactInfo, middleName: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Номер телефона <span className="text-red-500">*</span></Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+7 (___) ___-__-__"
                value={contactInfo.phone}
                onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}
                required
              />
              <p className="text-xs text-gray-500">
                Формат: +7 (XXX) XXX-XX-XX
              </p>
            </div>
            
            <p className="text-sm text-gray-500 mt-4">
              Нажимая кнопку "Отправить", вы соглашаетесь с тем, что мы можем связаться с вами по указанному номеру телефона.
            </p>
          </CardContent>
          
          <CardFooter className="flex flex-col gap-4">
            <Button 
              type="submit" 
              className="w-full bg-purple-600 hover:bg-purple-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Отправка..." : "Отправить"}
            </Button>
            
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/results")}
              disabled={isSubmitting}
              className="w-full"
            >
              Вернуться к результатам
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default ContactForm;
