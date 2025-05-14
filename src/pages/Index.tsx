
import React, { useState, useEffect } from 'react';
import SetupForm from '@/components/SetupForm';
import Introduction from '@/components/Introduction';
import Question from '@/components/Question';
import Summary from '@/components/Summary';
import { toast } from 'sonner';

// Mock API for generating questionnaire content (simulating AI responses)
const generateIntroduction = (theme: string): string => {
  // In a real app, this would be an API call to an AI service
  const introductions: Record<string, string> = {
    default: `O tema "${theme}" é fascinante e tem ganhado cada vez mais relevância no mundo contemporâneo. 

Ao explorarmos este assunto, encontramos diversas perspectivas e opiniões que revelam sua complexidade e importância para nossa sociedade.

Este questionário foi desenvolvido para avaliar seu conhecimento e opinião sobre diferentes aspectos relacionados a este tema. Através de perguntas cuidadosamente elaboradas, poderemos identificar tendências de pensamento e oferecer uma análise personalizada ao final.

Prepare-se para refletir sobre questões importantes e, talvez, descobrir novos ângulos sobre o tema que você ainda não havia considerado.`,

    "Inteligência Artificial": `A Inteligência Artificial (IA) representa uma das maiores revoluções tecnológicas da história humana, transformando profundamente como vivemos, trabalhamos e nos relacionamos.

Desde assistentes virtuais até sistemas complexos de tomada de decisão, a IA está se tornando onipresente em nosso cotidiano, muitas vezes de formas que sequer percebemos.

Este questionário foi desenvolvido para explorar sua compreensão e opiniões sobre os diversos aspectos da IA - desde suas aplicações práticas até as implicações éticas e sociais que surgem com seu avanço.

Ao responder às questões a seguir, você terá a oportunidade de refletir sobre como a inteligência artificial está moldando nosso presente e como poderá definir nosso futuro coletivo.`,

    "Mudanças climáticas": `As mudanças climáticas representam um dos maiores desafios da nossa era, afetando ecossistemas, economias e sociedades em todo o planeta.

Evidências científicas indicam que a atividade humana, principalmente através da emissão de gases de efeito estufa, tem acelerado as alterações no clima global de forma sem precedentes.

Este questionário foi elaborado para explorar seu entendimento e perspectivas sobre diversos aspectos das mudanças climáticas - desde as causas e efeitos até as possíveis soluções e responsabilidades individuais e coletivas.

Ao responder às questões a seguir, você poderá refletir sobre como as mudanças climáticas estão transformando nosso mundo e qual o papel que cada um de nós pode desempenhar nesse contexto crucial para o futuro da humanidade.`,
  };

  // Try to match exactly, then fallback to default
  return introductions[theme] || introductions.default;
};

const generateQuestions = (theme: string, count: number, optionsCount: number): Array<{question: string, options: string[]}> => {
  // In a real app, this would be an API call to an AI service
  const themes: Record<string, Array<{question: string, options: string[]}>> = {
    default: Array(count).fill(null).map((_, i) => ({
      question: `Qual sua opinião sobre o aspecto ${i+1} relacionado a "${theme}"?`,
      options: Array(optionsCount).fill(null).map((_, j) => {
        if (j === 0) return `Considero extremamente importante e relevante.`;
        if (j === optionsCount-1) return `Não vejo relevância significativa neste aspecto.`;
        return `Tenho uma opinião neutra ou parcialmente favorável sobre este aspecto.`;
      })
    })),

    "Inteligência Artificial": [
      {
        question: "Como você avalia o impacto da IA no mercado de trabalho?",
        options: [
          "A IA criará mais empregos do que eliminará, gerando novas oportunidades.",
          "O impacto será equilibrado, com perdas em alguns setores e ganhos em outros.",
          "A IA eliminará significativamente postos de trabalho, exigindo transformações sociais.",
          "A automação por IA representa uma ameaça crítica à empregabilidade humana."
        ]
      },
      {
        question: "Qual sua posição sobre o uso de IA em decisões que afetam diretamente a vida das pessoas?",
        options: [
          "Sistemas de IA são mais imparciais e eficientes que humanos em tomadas de decisão.",
          "A IA deve apoiar decisões humanas, mas a palavra final deve ser de especialistas.",
          "Algoritmos podem reforçar preconceitos existentes e devem ser usados com cautela.",
          "Decisões críticas sobre vidas humanas nunca devem ser delegadas a sistemas automatizados."
        ]
      },
      {
        question: "Como você vê a evolução da IA nos próximos 10 anos?",
        options: [
          "Alcançaremos uma inteligência artificial geral que superará a humana em diversos aspectos.",
          "Veremos avanços significativos, mas limitados a aplicações específicas.",
          "O desenvolvimento será mais lento do que o previsto devido a barreiras técnicas.",
          "Surgirão limitações éticas e regulatórias que reduzirão o ritmo de evolução."
        ]
      },
      {
        question: "Qual sua opinião sobre a privacidade de dados no contexto da IA?",
        options: [
          "A coleta de dados é necessária e benéfica para o desenvolvimento de melhores tecnologias.",
          "É aceitável ceder alguns dados em troca de benefícios, desde que haja transparência.",
          "O uso de dados pessoais deve ser minimizado e estritamente controlado.",
          "A privacidade é um direito fundamental que está sendo seriamente ameaçado pela IA."
        ]
      },
      {
        question: "Como você avalia a necessidade de regulamentação para a IA?",
        options: [
          "A inovação deve ocorrer livremente, com mínima interferência regulatória.",
          "Autorregulação pela indústria é suficiente para garantir desenvolvimento ético.",
          "São necessárias regulamentações específicas, mas sem impedir a inovação.",
          "É urgente criar um robusto marco regulatório internacional para a IA."
        ]
      }
    ],

    "Mudanças climáticas": [
      {
        question: "Qual sua percepção sobre a urgência da crise climática?",
        options: [
          "É o problema mais urgente da humanidade, exigindo ação imediata e radical.",
          "É um problema sério que requer atenção, mas deve ser equilibrado com outras prioridades.",
          "As preocupações são exageradas pela mídia e por certos grupos de interesse.",
          "Não existem evidências conclusivas sobre a influência humana no clima."
        ]
      },
      {
        question: "Como você avalia a responsabilidade individual vs. corporativa nas mudanças climáticas?",
        options: [
          "A mudança deve começar com ações individuais e escolhas de consumo consciente.",
          "Tanto indivíduos quanto empresas têm responsabilidades proporcionais.",
          "As grandes corporações são as principais responsáveis e devem liderar as mudanças.",
          "Governos e acordos internacionais são os únicos capazes de gerar impacto significativo."
        ]
      },
      {
        question: "Qual sua opinião sobre o uso de energias renováveis?",
        options: [
          "Devemos transicionar completamente para renováveis o mais rápido possível, independente do custo.",
          "A transição para renováveis deve ser gradual e economicamente viável.",
          "Devemos manter um mix energético, incluindo combustíveis fósseis mais limpos como transição.",
          "As energias renováveis atuais não são suficientemente eficientes para substituir fontes tradicionais."
        ]
      },
      {
        question: "Como você vê o papel da tecnologia na mitigação das mudanças climáticas?",
        options: [
          "A inovação tecnológica será suficiente para resolver a crise climática.",
          "A tecnologia é parte importante da solução, mas precisamos também de mudanças comportamentais.",
          "Confiar demais em soluções tecnológicas futuras impede ações necessárias no presente.",
          "Precisamos reduzir o consumo e retornar a estilos de vida menos dependentes de tecnologia."
        ]
      },
      {
        question: "Como você avalia os esforços internacionais atuais contra as mudanças climáticas?",
        options: [
          "Os acordos atuais são ambiciosos e estão no caminho certo para resolver a crise.",
          "Os esforços são importantes, mas ainda insuficientes para evitar consequências graves.",
          "A cooperação internacional tem sido ineficaz devido a interesses econômicos conflitantes.",
          "Os acordos climáticos representam uma transferência injusta de responsabilidade entre nações."
        ]
      }
    ]
  };

  // Try to match the theme exactly, otherwise use default questions but customized with theme name
  let questions = themes[theme] || themes.default;
  
  // If we have more than requested count, trim the array
  if (questions.length > count) {
    questions = questions.slice(0, count);
  }
  
  // If we have fewer than requested count, add generic questions
  while (questions.length < count) {
    const index = questions.length + 1;
    questions.push({
      question: `Qual seu posicionamento sobre o aspecto ${index} relacionado a "${theme}"?`,
      options: Array(optionsCount).fill(null).map((_, j) => {
        if (j === 0) return `Considero extremamente importante e relevante.`;
        if (j === optionsCount-1) return `Não vejo relevância significativa neste aspecto.`;
        return `Tenho uma opinião neutra ou parcialmente favorável sobre este aspecto.`;
      })
    });
  }
  
  // Adjust options count for each question if needed
  questions = questions.map(q => {
    let options = [...q.options];
    
    // If we have more than requested options, trim the array
    if (options.length > optionsCount) {
      options = options.slice(0, optionsCount);
    }
    
    // If we have fewer than requested options, add generic options
    while (options.length < optionsCount) {
      options.push(`Esta é uma alternativa adicional para complementar as opções existentes.`);
    }
    
    return {
      question: q.question,
      options: options
    };
  });
  
  return questions;
};

const generateSummary = (theme: string, answers: string[]): string => {
  // In a real app, this would be an API call to an AI service
  if (answers.length === 0) return "Não foi possível gerar uma análise sem respostas.";
  
  const summaries: Record<string, string> = {
    default: `Com base em suas respostas sobre "${theme}", percebemos que você tem uma visão equilibrada e nuançada sobre o assunto.

Você demonstra compreender a complexidade do tema e consegue enxergar diferentes perspectivas, o que é fundamental para uma análise crítica e construtiva.

Suas escolhas sugerem um interesse genuíno em explorar mais sobre este tema, o que o coloca em uma posição privilegiada para acompanhar os desenvolvimentos futuros nesta área.

Recomendamos continuar se informando através de fontes variadas e confiáveis, participando de discussões construtivas que possam enriquecer ainda mais seu entendimento sobre "${theme}".`,
  
    "Inteligência Artificial": `Com base em suas respostas sobre Inteligência Artificial, você demonstra uma visão ${answers.some(a => a.includes("ameaça") || a.includes("nunca devem")) ? "cautelosa" : "otimista"} quanto ao futuro desta tecnologia.

${answers.some(a => a.includes("imparciais") || a.includes("eficientes")) ? "Você tende a valorizar os benefícios potenciais da IA, reconhecendo seu papel transformador na sociedade e na economia." : "Você demonstra preocupação com os impactos da IA, especialmente em relação à autonomia humana e às implicações éticas."}

${answers.some(a => a.includes("privacidade")) ? "A questão da privacidade aparece como um tema importante em suas considerações, refletindo uma consciência sobre os desafios contemporâneos relacionados aos dados." : "Seu foco parece estar mais nas aplicações práticas e nos impactos sistêmicos da IA do que em questões de dados e privacidade."}

Para alguém com seu perfil de pensamento, recomendamos explorar mais sobre ${answers.some(a => a.includes("regulatória") || a.includes("ético")) ? "casos de sucesso de implementação de IA ética e responsável" : "os desafios éticos e sociais emergentes das novas tecnologias de IA"}, o que complementaria sua perspectiva atual.`,
  
    "Mudanças climáticas": `Sua visão sobre as mudanças climáticas revela uma abordagem ${answers.some(a => a.includes("urgente") || a.includes("radical")) ? "mais alinhada com a urgência da crise" : "ponderada que equilibra preocupações ambientais com outros fatores"}.

${answers.some(a => a.includes("individual")) ? "Você valoriza o papel das ações individuais, reconhecendo que mudanças pessoais podem ter impacto coletivo significativo." : "Sua perspectiva enfatiza a responsabilidade de atores institucionais maiores, como empresas e governos, na condução de mudanças sistêmicas."}

${answers.some(a => a.includes("renováveis")) ? "A transição energética figura como um elemento importante em sua visão sobre as soluções climáticas, demonstrando entendimento técnico do desafio." : "Você parece considerar fatores além da simples mudança tecnológica, reconhecendo a complexidade social e política das mudanças necessárias."}

Com base em seu perfil de respostas, sugerimos explorar mais sobre ${answers.some(a => a.includes("tecnologia")) ? "abordagens sociais e comportamentais para a sustentabilidade" : "inovações tecnológicas emergentes para a mitigação climática"}, o que poderia enriquecer sua perspectiva atual sobre este tema crucial.`,
  };
  
  // Try to match exactly, then fallback to default
  return summaries[theme] || summaries.default;
};

// Main questionnaire application
const Index = () => {
  // State management
  const [stage, setStage] = useState<'setup' | 'intro' | 'questions' | 'summary'>('setup');
  const [theme, setTheme] = useState('');
  const [questionsCount, setQuestionsCount] = useState(3);
  const [optionsCount, setOptionsCount] = useState(4);
  const [introduction, setIntroduction] = useState('');
  const [questions, setQuestions] = useState<Array<{question: string, options: string[]}>>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [summary, setSummary] = useState('');

  // Handle form submission
  const handleSetupSubmit = (theme: string, pages: number, options: number) => {
    setTheme(theme);
    setQuestionsCount(pages);
    setOptionsCount(options);
    
    // Generate introduction
    const generatedIntro = generateIntroduction(theme);
    setIntroduction(generatedIntro);
    
    // Generate questions
    const generatedQuestions = generateQuestions(theme, pages, options);
    setQuestions(generatedQuestions);
    
    // Move to intro stage
    setStage('intro');
    
    toast.success("Questionário gerado com sucesso!");
  };

  // Start the questions after reading the introduction
  const handleStartQuestions = () => {
    setStage('questions');
    setCurrentQuestionIndex(0);
    setAnswers([]);
  };

  // Handle answer selection
  const handleAnswer = (selectedOption: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = selectedOption;
    setAnswers(newAnswers);
    
    if (currentQuestionIndex < questions.length - 1) {
      // Move to next question
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Generate summary and move to summary stage
      const generatedSummary = generateSummary(theme, newAnswers);
      setSummary(generatedSummary);
      setStage('summary');
      
      toast.success("Questionário completo! Análise gerada.");
    }
  };

  // Go back to previous question
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Restart the questionnaire
  const handleRestart = () => {
    setStage('setup');
    setTheme('');
    setQuestionsCount(3);
    setOptionsCount(4);
    setIntroduction('');
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setSummary('');
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center gradient-text">
        Questionário IA Personalizado
      </h1>
      
      {stage === 'setup' && (
        <SetupForm onSubmit={handleSetupSubmit} />
      )}
      
      {stage === 'intro' && (
        <Introduction 
          theme={theme}
          introduction={introduction}
          onContinue={handleStartQuestions}
        />
      )}
      
      {stage === 'questions' && questions.length > 0 && (
        <Question
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={questions.length}
          question={questions[currentQuestionIndex].question}
          options={questions[currentQuestionIndex].options}
          onAnswer={handleAnswer}
          onPrevious={handlePrevious}
        />
      )}
      
      {stage === 'summary' && (
        <Summary
          theme={theme}
          summary={summary}
          onRestart={handleRestart}
        />
      )}
      
      <footer className="mt-12 text-center text-sm text-gray-500">
        <p>Tecnologia de IA para geração de questionários personalizados</p>
      </footer>
    </div>
  );
};

export default Index;
