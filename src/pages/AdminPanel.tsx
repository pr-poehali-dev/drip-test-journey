
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResultType } from "@/lib/test-questions";

type Submission = {
  id: number;
  date: string;
  result: ResultType;
  contactInfo: {
    firstName: string;
    middleName: string;
    phone: string;
  };
};

const AdminPanel = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [password, setPassword] = useState("");
  
  useEffect(() => {
    if (isAuthorized) {
      // In a real app, this would be fetched from a secure API
      const savedSubmissions = JSON.parse(localStorage.getItem("testSubmissions") || "[]");
      setSubmissions(savedSubmissions);
    }
  }, [isAuthorized]);
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would validate against a secure backend
    // This is just a demo - NEVER do authentication like this in production
    if (password === "admin123") {
      setIsAuthorized(true);
    } else {
      alert("Неверный пароль");
    }
  };
  
  const filteredSubmissions = submissions.filter((submission) => {
    const searchString = searchTerm.toLowerCase();
    return (
      submission.contactInfo.firstName.toLowerCase().includes(searchString) ||
      submission.contactInfo.middleName.toLowerCase().includes(searchString) ||
      submission.contactInfo.phone.includes(searchTerm) ||
      submission.result.toLowerCase().includes(searchString)
    );
  });
  
  // Login form
  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Панель администратора
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Пароль</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Введите пароль"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
              >
                Войти
              </button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Панель администратора - Результаты тестов
            </CardTitle>
            <div className="mt-4">
              <Label htmlFor="search">Поиск</Label>
              <Input
                id="search"
                placeholder="Поиск по имени, телефону или результату..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-md"
              />
            </div>
          </CardHeader>
          <CardContent>
            {submissions.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                Нет данных о прохождении теста
              </div>
            ) : (
              <div className="border rounded-md overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Дата</TableHead>
                      <TableHead>Имя</TableHead>
                      <TableHead>Отчество</TableHead>
                      <TableHead>Телефон</TableHead>
                      <TableHead>Результат</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSubmissions.map((submission) => (
                      <TableRow key={submission.id}>
                        <TableCell>
                          {new Date(submission.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{submission.contactInfo.firstName}</TableCell>
                        <TableCell>{submission.contactInfo.middleName || "-"}</TableCell>
                        <TableCell>{submission.contactInfo.phone}</TableCell>
                        <TableCell>
                          <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                            submission.result === "ДЕТОКС" 
                              ? "bg-green-100 text-green-800" 
                              : submission.result === "СНИЖЕНИЕ ВЕСА"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-purple-100 text-purple-800"
                          }`}>
                            {submission.result}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminPanel;
