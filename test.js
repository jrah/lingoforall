function Quiz(questions) {
  this.questions = questions;
  this.score = 0;
  this.currentQuestionIndex = 0;
}

Quiz.prototype.grabQuestion = function() {
  return this.questions[this.currentQuestionIndex];
}

Quiz.prototype.checkAnswer = function(answer) {
  if(this.grabQuestion().isCorrectAnswer(answer)) {
    this.score++;
    console.log(this.score);
  }
  this.currentQuestionIndex++;
}

Quiz.prototype.hasEnded = function() {
  return this.currentQuestionIndex >= this.questions.length;
}

function Question(title,choices,answer) {
  this.title = title;
  this.choices = choices;
  this.answer = answer;
}

Question.prototype.isCorrectAnswer = function(choice) {
  return this.answer === choice;
}

var quizInterface = {
  displayNext: function() {
    if(quiz.hasEnded()) {
      this.displayScore();
    }
    else {
    this.displayQuestion();
    this.displayChoices();
    this.displayProgress();
    }
  },

  displayScore: function() {
    var scoreDisplay = 'your score is ' + quiz.score;
    this.populateIdWithHTML("quiz",scoreDisplay)
  },
  displayQuestion: function() {
    this.populateIdWithHTML("question",quiz.grabQuestion().title);
  },

  displayChoices: function() {
    var choices = quiz.grabQuestion().choices;
    for (var i = 0; i < choices.length; i++) {
      this.populateIdWithHTML("choice" + i, choices[i]);
      this.checkingHandler("guess" + i, choices[i]);
    }
  },

  displayProgress: function() {
    var currentQuestionNum = quiz.currentQuestionIndex + 1;
    this.populateIdWithHTML("progress","Question " + currentQuestionNum + " of " + quiz.questions.length)
  },

  checkingHandler: function(id,checking) {
    var btn = document.getElementById(id);

    /* The addEventListener function throws an error for some reason */

      btn.addEventListener('click',function(e){
        e.preventDefault();
        quiz.checkAnswer();
        quizInterface.displayNext();
      },false)

      //The onclick function works though normally though...
    btn.onclick = function() {
        quiz.checkAnswer(checking);
        quizInterface.displayNext();
      }
  },

  populateIdWithHTML: function(id,theHTML) {
    var elem = document.getElementById(id);
    elem.innerHTML = theHTML;
  }
}

var questionOne = new Question('What is the whole area of Egypt?',['1MKM','2MKM'],'1MKM');
var questionTwo = new Question('What is the currency of Egypt?',['EGP','USD'],'EGP');
var questionThree = new Question('What is the capital of Egypt?',['cairo','baghdad'],'cairo');
var questionFour = new Question('What is the latest Battlefield game?',['BF4','BF1'],'BF1');
var questionFive = new Question('What is the OS of Mac laptops?',['Mac IOS','Mac OS'],'Mac OS');

var questions = [questionOne,questionTwo,questionThree,questionFour,questionFive];

var quiz = new Quiz(questions);


quizInterface.displayNext();
