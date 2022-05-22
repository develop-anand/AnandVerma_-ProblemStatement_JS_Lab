
 function Question( text, choices, answer ) {
    this.text = text;
    this.choices = choices;
    this.answer = answer; // this shall be one of the choices
  }

  function Quiz( questions ) {
    
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
  }
  
  
  Question.prototype.isCorrectAnswer = function( choice ) {
    return choice === this.answer;
  };  
  
  Quiz.prototype.CurrentQuestion = function() {
    return this.questions[this.questionIndex];
  };
  
  
  Quiz.prototype.checkOptionWithAnswer = function( answer ) {
    if( this.CurrentQuestion().isCorrectAnswer( answer ) ) {
      this.score++;
    }
    this.questionIndex++;
  };
  
  Quiz.prototype.isEnded = function() {
    return this.questions.length === this.questionIndex;
  };
  
  function showScore() {
    let percentage = (quiz.score/quiz.questions.length)*100;
    document.querySelector( '#quiz' ).innerHTML = `
      <h1>Result</h1>
      <div id="score">You scored ${quiz.score} / ${quiz.questions.length} and percentage is ${percentage} %</div>
    `;
  }
  
  function loadQuestion() {
    if( quiz.isEnded() ) {
      showScore();
      return;
    }
  
    let currentQuestion = quiz.CurrentQuestion();
  
    document.querySelector( '#question' ).textContent = currentQuestion.text;
   
    for( let i = 0; i < currentQuestion.choices.length; i++ ) {
      document.getElementById( 'choice' + i ).textContent = currentQuestion.choices[i];
      handleOptionButtonClick( 'btn' + i, currentQuestion.choices[i] );
    }
  
    showProgress();
  }
  
  
  function handleOptionButtonClick( btnId, choice ) {
    let button = document.querySelector( '#' + btnId );
    button.onclick = function() {
      
      quiz.checkOptionWithAnswer( choice );
      loadQuestion();
    };
  }
  
  
  function showProgress() {
    document.querySelector( '#progress' ).textContent = 'Question ' + ( quiz.questionIndex + 1 ) + ' of ' + quiz.questions.length;
  }
  
  // create questions here
  let questions = [
    new Question("Javascript Supports", ["Functions", "XHTML","CSS", "HTML"], "Functions"),
    new Question("Which language is used for styling web pages?", ["HTML", "JQuery", "CSS", "XML"], "CSS"),
    new Question("Which is not a JavaScript Framework?", ["Python Script", "JQuery","Django", "NodeJS"], "Django"),
    new Question("Which is used for Connect To Database?", ["PHP", "HTML", "JS", "All"], "PHP"),
    new Question("JavaScript is a ", ["Language", "Programming Language", "Development", "All"], "Programming Language")
  ];
  
  let quiz = new Quiz( questions );
  loadQuestion();