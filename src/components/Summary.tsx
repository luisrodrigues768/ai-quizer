
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, RefreshCw } from "lucide-react";

interface SummaryProps {
  theme: string;
  summary: string;
  onRestart: () => void;
}

const Summary: React.FC<SummaryProps> = ({ theme, summary, onRestart }) => {
  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in">
      <Card className="glass-card overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-theme-blue via-theme-purple to-theme-pink" />
        <CardHeader className="space-y-2">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-6 w-6 text-green-500" />
            <CardTitle className="text-2xl font-bold">Análise Completa</CardTitle>
          </div>
          <CardDescription>
            Interpretação baseada nas suas respostas sobre {theme}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-secondary rounded-lg mb-4">
            <h3 className="text-lg font-semibold mb-2 gradient-text">Seu perfil em relação ao tema</h3>
            <div className="prose prose-slate max-w-none">
              {summary.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center pb-6">
          <Button
            onClick={onRestart}
            variant="outline"
            className="group"
          >
            <RefreshCw className="mr-2 h-4 w-4 group-hover:rotate-180 transition-transform duration-500" />
            Criar novo questionário
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Summary;
