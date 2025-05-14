
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { HelpCircle, ArrowDown, ArrowUp } from "lucide-react";

interface QuestionProps {
  questionNumber: number;
  totalQuestions: number;
  question: string;
  options: string[];
  onAnswer: (selectedOption: string) => void;
  onPrevious: () => void;
}

const Question: React.FC<QuestionProps> = ({
  questionNumber,
  totalQuestions,
  question,
  options,
  onAnswer,
  onPrevious
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSubmit = () => {
    if (selectedOption) {
      onAnswer(selectedOption);
      setSelectedOption(null);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in">
      <Card className="glass-card overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-theme-blue via-theme-purple to-theme-pink" />
        <CardHeader className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <HelpCircle className="h-6 w-6 text-primary" />
              <CardTitle className="text-xl font-bold">Questão {questionNumber} de {totalQuestions}</CardTitle>
            </div>
            <div className="bg-secondary px-3 py-1 rounded-full text-sm font-medium">
              {Math.round((questionNumber / totalQuestions) * 100)}%
            </div>
          </div>
          <CardDescription>
            Selecione a alternativa que melhor representa sua opinião
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">{question}</h3>
            
            <RadioGroup value={selectedOption || ""} onValueChange={setSelectedOption} className="space-y-3">
              {options.map((option, index) => (
                <div key={index} className="flex items-start space-x-2 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                  <RadioGroupItem value={option} id={`option-${index}`} className="mt-1" />
                  <Label htmlFor={`option-${index}`} className="text-gray-700 cursor-pointer flex-1">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between pb-6">
          {questionNumber > 1 ? (
            <Button
              variant="outline"
              onClick={onPrevious}
              className="group"
            >
              <ArrowUp className="mr-2 h-4 w-4 group-hover:-translate-y-1 transition-transform" />
              Voltar
            </Button>
          ) : (
            <div></div>
          )}
          <Button
            onClick={handleSubmit}
            disabled={!selectedOption}
            className="bg-gradient-to-r from-theme-blue to-theme-purple hover:opacity-90 transition-opacity group"
          >
            {questionNumber === totalQuestions ? 'Finalizar' : 'Próxima'}
            <ArrowDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Question;
