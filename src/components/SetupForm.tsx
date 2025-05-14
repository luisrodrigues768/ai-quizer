
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { FormEventHandler } from 'react';
import { BookOpen, Settings, HelpCircle } from "lucide-react";

interface SetupFormProps {
  onSubmit: (theme: string, pages: number, options: number) => void;
}

const SetupForm: React.FC<SetupFormProps> = ({ onSubmit }) => {
  const [theme, setTheme] = useState('');
  const [pages, setPages] = useState(3);
  const [options, setOptions] = useState(4);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate loading for better UX
    setTimeout(() => {
      onSubmit(theme, pages, options);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="w-full max-w-md mx-auto animate-fade-in">
      <Card className="glass-card overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-theme-blue via-theme-purple to-theme-pink" />
        <CardHeader className="space-y-1">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <CardTitle className="text-2xl font-bold">Questionário Inteligente</CardTitle>
          </div>
          <CardDescription>
            Configure seu questionário personalizado gerado por IA
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="theme" className="flex items-center space-x-1">
                <HelpCircle className="h-4 w-4" />
                <span>Tema do questionário</span>
              </Label>
              <Input
                id="theme"
                placeholder="Ex: Inteligência Artificial, Mudanças climáticas, etc."
                required
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="border-input focus:ring-primary"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="pages" className="flex items-center space-x-1">
                  <Settings className="h-4 w-4" />
                  <span>Quantidade de questões</span>
                </Label>
                <span className="bg-secondary px-2 py-1 rounded-md text-sm">{pages}</span>
              </div>
              <Slider
                id="pages"
                value={[pages]}
                min={1}
                max={10}
                step={1}
                onValueChange={(value) => setPages(value[0])}
                className="py-4"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="options" className="flex items-center space-x-1">
                  <Settings className="h-4 w-4" />
                  <span>Alternativas por questão</span>
                </Label>
                <span className="bg-secondary px-2 py-1 rounded-md text-sm">{options}</span>
              </div>
              <Slider
                id="options"
                value={[options]}
                min={2}
                max={6}
                step={1}
                onValueChange={(value) => setOptions(value[0])}
                className="py-4"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-theme-blue to-theme-purple hover:opacity-90 transition-opacity"
              disabled={!theme || isLoading}
            >
              {isLoading ? 'Gerando questionário...' : 'Gerar Questionário'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SetupForm;
