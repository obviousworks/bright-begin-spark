
import React, { useState } from 'react';
import { User, Code, Target, FileText, Monitor, Settings, CheckCircle } from 'lucide-react';

interface Answer {
  id: string;
  text: string;
  points: number;
}

interface Question {
  id: string;
  text: string;
  answers: Answer[];
}

interface Role {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  questions: Question[];
}

const RoleQuiz = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const roles: Role[] = [
    {
      id: 'product-owner',
      title: 'Product Owner',
      icon: <Target className="w-12 h-12" />,
      color: 'from-green-500 to-emerald-500',
      questions: [
        {
          id: 'po-1',
          text: 'Während du noch Excel-Sheets wälzt - erstellt dein Konkurrent bereits User Stories per KI in 30 Sekunden. Fühlst du den Rückstand?',
          answers: [
            { id: 'a', text: 'Excel ist bewährt, warum wechseln?', points: 1 },
            { id: 'b', text: 'KI ist mir zu riskant für kritische Tasks', points: 2 },
            { id: 'c', text: 'VERDAMMT JA! Ich brauche diese KI-Power SOFORT!', points: 3 }
          ]
        },
        {
          id: 'po-2',
          text: 'Hand aufs Herz: Wie viele Stunden verschwendest du wöchentlich mit repetitiven Backlog-Tasks, die eine KI in Minuten erledigen könnte?',
          answers: [
            { id: 'a', text: '2-5 Stunden - geht schon', points: 1 },
            { id: 'b', text: '10-15 Stunden - aber das gehört dazu', points: 2 },
            { id: 'c', text: '20+ Stunden - das ist WAHNSINN! KI muss her!', points: 3 }
          ]
        },
        {
          id: 'po-3',
          text: 'Deine Roadmap-Planung dauert Tage. Mit KI wären es Stunden. Willst du weiter im Steinzeitalter arbeiten?',
          answers: [
            { id: 'a', text: 'Gründlichkeit braucht Zeit', points: 1 },
            { id: 'b', text: 'KI kann keine strategischen Entscheidungen treffen', points: 2 },
            { id: 'c', text: 'NEIN! Ich will die KI-Geschwindigkeit JETZT!', points: 3 }
          ]
        }
      ]
    },
    {
      id: 'requirements',
      title: 'Requirements Engineer',
      icon: <FileText className="w-12 h-12" />,
      color: 'from-blue-500 to-cyan-500',
      questions: [
        {
          id: 're-1',
          text: 'Schreibst du noch manuell Requirements, während andere ihre Spezifikationen von KI generieren lassen? Ernsthaft?',
          answers: [
            { id: 'a', text: 'Manuelle Arbeit ist präziser', points: 1 },
            { id: 'b', text: 'KI versteht Kontext nicht richtig', points: 2 },
            { id: 'c', text: 'SCHLUSS mit Steinzeit! Zeig mir die KI-Tools!', points: 3 }
          ]
        },
        {
          id: 're-2',
          text: 'Wie oft übersetzt du dieselben Anforderungen in verschiedene Formate? KI macht das parallel. Du nicht. Problem erkannt?',
          answers: [
            { id: 'a', text: '2-3 mal pro Projekt', points: 1 },
            { id: 'b', text: 'Ständig, aber Qualität geht vor', points: 2 },
            { id: 'c', text: 'EVERY DAMN TIME! Das muss automatisiert werden!', points: 3 }
          ]
        },
        {
          id: 're-3',
          text: 'Stakeholder-Interviews auswerten: 8 Stunden Arbeit oder 20 Minuten mit KI-Unterstützung. Was wählst du?',
          answers: [
            { id: 'a', text: '8 Stunden für gründliche Analyse', points: 1 },
            { id: 'b', text: 'Lieber sicher als schnell', points: 2 },
            { id: 'c', text: '20 MINUTEN! Wo kann ich das lernen?', points: 3 }
          ]
        }
      ]
    },
    {
      id: 'developer',
      title: 'Developer',
      icon: <Code className="w-12 h-12" />,
      color: 'from-purple-500 to-pink-500',
      questions: [
        {
          id: 'dev-1',
          text: 'Code-Reviews, die Stunden dauern vs. KI-beschleunigte Reviews in Minuten. Merkst du was?',
          answers: [
            { id: 'a', text: 'Gründliche Reviews brauchen Zeit', points: 1 },
            { id: 'b', text: 'KI übersieht kritische Bugs', points: 2 },
            { id: 'c', text: 'GAME CHANGER! Ich will diese Speed!', points: 3 }
          ]
        },
        {
          id: 'dev-2',
          text: 'Debugging ohne KI-Assistent? Das ist wie Autofahren mit angezogener Handbremse. Warum quälst du dich?',
          answers: [
            { id: 'a', text: 'Ich kenne meinen Code am besten', points: 1 },
            { id: 'b', text: 'Debugging schult das Verständnis', points: 2 },
            { id: 'c', text: 'Du hast RECHT! Handbremse lösen - KI an!', points: 3 }
          ]
        },
        {
          id: 'dev-3',
          text: 'Deine Kollegen shippen bereits 3x schneller mit KI-Tools. Und du? Immer noch Team Oldschool?',
          answers: [
            { id: 'a', text: 'Qualität vor Geschwindigkeit', points: 1 },
            { id: 'b', text: 'Ich bin noch skeptisch', points: 2 },
            { id: 'c', text: 'FUCK! Ich hänge hinterher - KI TRAINING NOW!', points: 3 }
          ]
        }
      ]
    },
    {
      id: 'cto',
      title: 'CTO',
      icon: <Monitor className="w-12 h-12" />,
      color: 'from-yellow-500 to-orange-500',
      questions: [
        {
          id: 'cto-1',
          text: 'Dein Tech-Stack von 2020? VERALTET! Während du zögerst, bauen Startups KI-first Architekturen. Wann holst DU auf?',
          answers: [
            { id: 'a', text: 'Bewährte Technologien sind stabiler', points: 1 },
            { id: 'b', text: 'Migration ist zu riskant', points: 2 },
            { id: 'c', text: 'SOFORT! Mein Team braucht KI-Skills!', points: 3 }
          ]
        },
        {
          id: 'cto-2',
          text: '40% weniger Development-Zeit mit KI-Tools. Dein Team arbeitet noch old-school? Das ist GELDVERBRENNUNG!',
          answers: [
            { id: 'a', text: 'ROI ist noch nicht bewiesen', points: 1 },
            { id: 'b', text: 'Security-Risiken sind zu hoch', points: 2 },
            { id: 'c', text: 'VERDAMMT! Das ist pure Verschwendung!', points: 3 }
          ]
        },
        {
          id: 'cto-3',
          text: 'Deine Konkurrenz deployt bereits mit AI-Assistants. Du diskutierst noch über Budgets. Merkst du den GAP?',
          answers: [
            { id: 'a', text: 'Budgets müssen stimmen', points: 1 },
            { id: 'b', text: 'Wir evaluieren noch', points: 2 },
            { id: 'c', text: 'ALARM! Wir verlieren den Anschluss!', points: 3 }
          ]
        }
      ]
    },
    {
      id: 'c-level',
      title: 'C-Level',
      icon: <Settings className="w-12 h-12" />,
      color: 'from-red-500 to-pink-500',
      questions: [
        {
          id: 'cl-1',
          text: 'Return on Investment: KI-Training kostet 10.000€, Digitale Transformation ohne KI-Skills kostet 1 Million. Rechnung aufgegangen?',
          answers: [
            { id: 'a', text: '10.000€ ist viel Geld', points: 1 },
            { id: 'b', text: 'ROI ist schwer messbar', points: 2 },
            { id: 'c', text: 'CRYSTAL CLEAR! Investition läuft!', points: 3 }
          ]
        },
        {
          id: 'cl-2',
          text: 'Deine Mitarbeiter googeln KI-Hacks in der Mittagspause, während du KI-Weiterbildung ablehnst. IRONIE erkannt?',
          answers: [
            { id: 'a', text: 'Eigeninitiative ist gut', points: 1 },
            { id: 'b', text: 'Wildwuchs ist gefährlich', points: 2 },
            { id: 'c', text: 'ABSURD! Professionelles Training muss her!', points: 3 }
          ]
        },
        {
          id: 'cl-3',
          text: 'Talente kündigen für KI-affine Unternehmen. Dein Retention-Problem hat einen Namen: TECHNOLOGIE-RÜCKSTAND!',
          answers: [
            { id: 'a', text: 'Gute Leute gehen immer', points: 1 },
            { id: 'b', text: 'Wir bieten andere Benefits', points: 2 },
            { id: 'c', text: 'WAKE-UP CALL! KI-Skills sind RETENTION!', points: 3 }
          ]
        }
      ]
    },
    {
      id: 'project-manager',
      title: 'Projektmanager',
      icon: <User className="w-12 h-12" />,
      color: 'from-indigo-500 to-purple-500',
      questions: [
        {
          id: 'pm-1',
          text: 'Deadlines reißen, weil manuelle Prozesse ewig dauern? KI macht deine Timelines BULLETPROOF!',
          answers: [
            { id: 'a', text: 'Puffer sind eingeplant', points: 1 },
            { id: 'b', text: 'Manuelle Kontrolle ist wichtig', points: 2 },
            { id: 'c', text: 'EXACTLY! Bulletproof Timelines - I\'M IN!', points: 3 }
          ]
        },
        {
          id: 'pm-2',
          text: 'Ressourcenplanung ohne KI-Support? Das ist wie Navigation ohne GPS - pure ZEITVERSCHWENDUNG!',
          answers: [
            { id: 'a', text: 'Erfahrung schlägt Technologie', points: 1 },
            { id: 'b', text: 'Excel reicht für Planung', points: 2 },
            { id: 'c', text: 'GPS-Vergleich trifft zu 100%! KI her!', points: 3 }
          ]
        },
        {
          id: 'pm-3',
          text: 'Status-Reports, die Stunden kosten vs. KI-generierte Insights in Sekunden. Wo steuerst DU hin?',
          answers: [
            { id: 'a', text: 'Detaillierte Reports brauchen Zeit', points: 1 },
            { id: 'b', text: 'KI kann Nuancen nicht erfassen', points: 2 },
            { id: 'c', text: 'INSIGHTS in SEKUNDEN! Das ist die Zukunft!', points: 3 }
          ]
        }
      ]
    }
  ];

  const selectedRoleData = roles.find(role => role.id === selectedRole);

  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId);
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };

  const handleAnswer = (questionId: string, answerId: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerId
    }));
  };

  const nextQuestion = () => {
    if (selectedRoleData && currentQuestion < selectedRoleData.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Final question for all roles
      if (currentQuestion === (selectedRoleData?.questions.length || 0)) {
        setShowResults(true);
      } else {
        setCurrentQuestion(prev => prev + 1);
      }
    }
  };

  const calculateScore = () => {
    let totalScore = 0;
    if (selectedRoleData) {
      selectedRoleData.questions.forEach(question => {
        const selectedAnswer = answers[question.id];
        if (selectedAnswer) {
          const answer = question.answers.find(a => a.id === selectedAnswer);
          if (answer) {
            totalScore += answer.points;
          }
        }
      });
    }
    
    // Add final question score
    const finalAnswer = answers['final'];
    if (finalAnswer === 'c') {
      totalScore += 3;
    } else if (finalAnswer === 'b') {
      totalScore += 2;
    } else if (finalAnswer === 'a') {
      totalScore += 1;
    }

    return totalScore;
  };

  const getScoreMessage = (score: number) => {
    const maxScore = selectedRoleData ? (selectedRoleData.questions.length + 1) * 3 : 12;
    const percentage = (score / maxScore) * 100;

    if (percentage >= 80) {
      return {
        title: "🔥 KI-REVOLUTION READY!",
        message: "Du bist BEREIT für die totale KI-Transformation! Zeit für Action!",
        color: "text-green-400"
      };
    } else if (percentage >= 60) {
      return {
        title: "⚡ FAST BEREIT!",
        message: "Du spürst bereits die KI-Power! Ein kleiner Schub und du dominierst!",
        color: "text-yellow-400"
      };
    } else {
      return {
        title: "⚠️ AUFWACHEN!",
        message: "Die KI-Revolution läuft! Zeit aufzuholen, bevor es zu spät ist!",
        color: "text-red-400"
      };
    }
  };

  const finalQuestion = {
    id: 'final',
    text: 'FINALE MACHTFRAGE FÜR ALLE: In 18 Monaten führen KI-trainierte Teams den Markt an. Dein Team? Kämpft noch mit Grundlagen. AUFWACHEN oder ABDANKEN?',
    answers: [
      { id: 'a', text: '18 Monate sind lange hin', points: 1 },
      { id: 'b', text: 'Abwarten und beobachten', points: 2 },
      { id: 'c', text: 'AUFWACHEN! Revolution starts NOW!', points: 3 }
    ]
  };

  if (showResults) {
    const score = calculateScore();
    const result = getScoreMessage(score);

    return (
      <section className="section min-h-screen bg-gradient-to-br from-black via-purple-900 to-black py-20">
        <div className="max-w-4xl mx-auto px-8">
          <div className="text-center">
            <div className={`text-6xl md:text-8xl font-bold mb-8 ${result.color} animate-pulse`}>
              {result.title}
            </div>
            
            <div className="text-2xl md:text-3xl text-white mb-8">
              {result.message}
            </div>

            <div className="text-lg text-cyan-400 mb-12">
              Dein Score: {score} von {selectedRoleData ? (selectedRoleData.questions.length + 1) * 3 : 12} Punkten
            </div>

            <button
              onClick={() => {
                setSelectedRole(null);
                setCurrentQuestion(0);
                setAnswers({});
                setShowResults(false);
              }}
              className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-8 py-4 rounded-lg font-bold text-xl hover:from-yellow-300 hover:to-orange-300 transition-all transform hover:scale-105 mr-4"
            >
              NOCHMAL SPIELEN
            </button>

            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-cyan-400 to-blue-400 text-black px-8 py-4 rounded-lg font-bold text-xl hover:from-cyan-300 hover:to-blue-300 transition-all transform hover:scale-105"
            >
              KI-TRAINING STARTEN!
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Role selection screen
  if (!selectedRole) {
    return (
      <section className="section min-h-screen bg-gradient-to-br from-black via-red-900 to-black py-20">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-bold text-yellow-400 mb-8 animate-pulse">
              🔥 KI-REVOLUTION QUIZ
            </h2>
            <p className="text-xl md:text-2xl text-cyan-400">
              BIST DU BEREIT ODER WIRST DU ABGEHÄNGT?
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {roles.map((role) => (
              <div
                key={role.id}
                onClick={() => handleRoleSelect(role.id)}
                className={`bg-gradient-to-r ${role.color} p-1 rounded-2xl cursor-pointer transform transition-all duration-300 hover:scale-105 hover:rotate-2`}
              >
                <div className="bg-black rounded-xl p-8 text-center h-full">
                  <div className="text-cyan-400 mb-6">
                    {role.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-yellow-400 mb-4">
                    {role.title}
                  </h3>
                  <div className="text-white">
                    Klicken für dein persönliches KI-Assessment
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Quiz questions screen
  const currentQuestionData = currentQuestion < (selectedRoleData?.questions.length || 0) 
    ? selectedRoleData?.questions[currentQuestion]
    : finalQuestion;

  const isAnswered = currentQuestionData ? answers[currentQuestionData.id] : false;

  return (
    <section className="section min-h-screen bg-gradient-to-br from-black via-red-900 to-black py-20">
      <div className="max-w-4xl mx-auto px-8">
        <div className="text-center mb-8">
          <div className={`bg-gradient-to-r ${selectedRoleData?.color} p-1 rounded-lg inline-block mb-4`}>
            <div className="bg-black px-6 py-2 rounded-md">
              <span className="text-white font-bold">{selectedRoleData?.title}</span>
            </div>
          </div>
          
          <div className="text-cyan-400 text-lg">
            Frage {currentQuestion + 1} von {(selectedRoleData?.questions.length || 0) + 1}
          </div>
        </div>

        {currentQuestionData && (
          <div className="border-2 border-yellow-400 rounded-2xl p-8 bg-black bg-opacity-70">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-400 mb-8 text-center">
              {currentQuestionData.text}
            </h3>

            <div className="space-y-4">
              {currentQuestionData.answers.map((answer) => (
                <button
                  key={answer.id}
                  onClick={() => handleAnswer(currentQuestionData.id, answer.id)}
                  className={`w-full p-6 rounded-lg border-2 transition-all text-left ${
                    answers[currentQuestionData.id] === answer.id
                      ? 'border-yellow-400 bg-yellow-400 bg-opacity-20 text-yellow-400'
                      : 'border-cyan-400 bg-gray-900 text-white hover:border-yellow-400 hover:bg-yellow-400 hover:bg-opacity-10'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="text-2xl font-bold mr-4">
                      {answer.id.toUpperCase()})
                    </span>
                    <span className="text-lg">
                      {answer.text}
                    </span>
                    {answers[currentQuestionData.id] === answer.id && (
                      <CheckCircle className="w-6 h-6 ml-auto text-yellow-400" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {isAnswered && (
              <div className="text-center mt-8">
                <button
                  onClick={nextQuestion}
                  className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-12 py-4 rounded-lg font-bold text-xl hover:from-yellow-300 hover:to-orange-300 transition-all transform hover:scale-105"
                >
                  {currentQuestion === (selectedRoleData?.questions.length || 0) ? 'ERGEBNISSE ZEIGEN!' : 'NÄCHSTE FRAGE'}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Progress Bar */}
        <div className="mt-8">
          <div className="bg-gray-700 rounded-full h-4">
            <div
              className="bg-gradient-to-r from-yellow-400 to-orange-400 h-4 rounded-full transition-all duration-500"
              style={{
                width: `${((currentQuestion + 1) / ((selectedRoleData?.questions.length || 0) + 1)) * 100}%`
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoleQuiz;
