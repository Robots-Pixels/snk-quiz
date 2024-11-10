import { useState } from 'react';
import './App.css';
import { data } from './data.jsx';

function OptionButton({ children, index, setIndex, setComment, setbuttonContent, setbuttonDisplay, setnextAction, setIsOptionClicked, isOptionClicked, score, setScore }) {
  const [color, setColor] = useState('');

  // Fonction pour passer à la question suivante
  function goNext() {
    setIndex(index + 1);
    setColor('');
    setComment('');
    setbuttonDisplay('none');
    setIsOptionClicked(false);
  }

  // Fonction pour réessayer la même question
  function restart() {
    setColor('');
    setComment('');
    setbuttonDisplay('none');
    setIsOptionClicked(false);
  }

  // Gestion du clic sur une option
  function handleOptionClick() {
    if (isOptionClicked) return;
    setIsOptionClicked(true);

    if (children === data[index].answer) {
      setColor('green');
      setComment('Bonne réponse');
      setbuttonContent(index === data.length - 1 ? 'Voir le score' : 'Suivant');
      setScore(score + 1);
      setnextAction(() => goNext);
    } else {
      setColor('red');
      setComment('Mauvaise réponse');
      setbuttonContent('Reprendre');
      setScore(score - 1);
      setnextAction(() => restart);
    }
    setbuttonDisplay('block'); // Affiche le bouton de l’action suivante
  }

  return (
    <button 
      className='optionButton' 
      style={{ backgroundColor: color }} 
      onClick={handleOptionClick}
      disabled={isOptionClicked} // Désactive le bouton après un clic
    >
      {children}
    </button>
  );
}

function NextActionButton({ children, buttonDisplay, onClick }) {
  return (
    <button className='nextActionButton' style={{ display: buttonDisplay }} onClick={onClick}>
      {children}
    </button>
  );
}

function QuestionNumber({index}){
  return(
    <h2>
      {index +1} / 100
    </h2>
  )
}

function App() {
  const [index, setIndex] = useState(0);
  const [comment, setComment] = useState('');
  const [buttonContent, setbuttonContent] = useState('');
  const [buttonDisplay, setbuttonDisplay] = useState('none');
  const [nextAction, setnextAction] = useState(null);
  const [isOptionClicked, setIsOptionClicked] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  function handleNextAction() {
    if (index === data.length - 1) {
      setQuizFinished(true); // Marque la fin du quiz
    } else {
      nextAction(); // Exécute `goNext` ou `restart`
    }
  }

  return (
    <>
      <h1>Quiz <span className='impossible'>IMPOSSIBLE</span> spécial SNK</h1>
      
      <QuestionNumber index={index}/>

      {quizFinished ? (
        <h2>Votre score final : {score} / {data.length}</h2>
      ) : (
        <>
          <h2>{data[index].question}</h2>

          <div className='optionList'>

            {data[index].options.map((option, idx) => (
              <OptionButton 
                key={idx}
                index={index}
                setIndex={setIndex}
                setComment={setComment}
                setbuttonContent={setbuttonContent}
                setbuttonDisplay={setbuttonDisplay}
                setnextAction={setnextAction}
                setIsOptionClicked={setIsOptionClicked}
                isOptionClicked={isOptionClicked}
                score={score}
                setScore={setScore}
              >
                {option}
              </OptionButton>
            ))}

          </div>

          <h2>{comment}</h2>

          <NextActionButton buttonDisplay={buttonDisplay} onClick={handleNextAction}>
            {buttonContent}
          </NextActionButton>
        </>
      )}
    </>
  );
}

export default App;