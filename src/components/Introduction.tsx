
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ArrowDown } from "lucide-react";

interface IntroductionProps {
  theme: string;
  introduction: string;
  onContinue: () => void;
}

const Introduction: React.FC<IntroductionProps> = ({ theme, introduction, onContinue }) => {
  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in">
      <Card className="glass-card overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-theme-blue via-theme-purple to-theme-pink" />
        <CardHeader className="space-y-2">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <CardTitle className="text-2xl font-bold gradient-text">{theme}</CardTitle>
          </div>
          <CardDescription>
            Uma breve introdução ao tema antes de começarmos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="prose prose-slate max-w-none">
            {introduction.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center pb-6">
          <Button
            onClick={onContinue}
            className="bg-gradient-to-r from-theme-blue to-theme-purple hover:opacity-90 transition-opacity group"
          >
            Começar Questionário
            <ArrowDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Introduction;
