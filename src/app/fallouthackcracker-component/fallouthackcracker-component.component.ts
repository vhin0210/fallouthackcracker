import { Component, OnInit, Input } from '@angular/core';
import { FallouthackcrackerWord } from './fallouthackcracker-word';
import { FallouthackcrackerWordChar } from './fallouthackcracker-word-char';
import { FallouthackcrackerWordCharWords } from './fallouthackcracker-word-char-words';
import { FallouthackcrackerWordPoints } from './fallouthackcracker-word-points';

// SAMPLE INPUT
// WORDS:
// JUMPIER - 2
// TRAILER - 3
// WIELDER - 2
// RAVELER - 7
// TINKLES - 1
// HEMPIER - 2
// ZIZZLED - 1
// REPUTED - 2
// RUBBLES - 2
// CAVILER - 4
// VAPORER - 3
// WIDENER - 3
// ANSWER: RAVELER

@Component({
  moduleId: module.id,
  selector: 'app-fallouthackcracker-component',
  templateUrl: 'fallouthackcracker-component.component.html',
  styleUrls: ['fallouthackcracker-component.component.css']
})
export class FallouthackcrackerComponentComponent implements OnInit {
  @Input()
  words: string;
  wordsArr: FallouthackcrackerWord[] = [];
  possibleAnswers: FallouthackcrackerWord[] = [];
  possibleAnswerLetters: FallouthackcrackerWordChar[] = [];
  wordsWithLikeness: FallouthackcrackerWord[] = [];
  possibleAnswerLettersWords: FallouthackcrackerWordCharWords[] = [];
  wordsPoints: FallouthackcrackerWordPoints[] = [];
  onChange(words: string) {
    words = words.toUpperCase();
    this.wordsArr = [];
    var wordsArr = words.split("\n");
    for (var key in wordsArr) {
      var word: FallouthackcrackerWord = {
        word: wordsArr[key],
        likeness: 0
      };
      this.wordsArr.push(word);
    }
  };
  onGetAnswer() {
    this.possibleAnswerLettersWords = [];
    this.wordsPoints = [];
    for (var word of this.wordsArr) {
      for (var i = 0, len = word.word.length; i < len; i++) {
        var tmpChar = word.word[i];
        var tmpIndexKey = i + ':' + tmpChar;
        var tmpPossibleAnswerLettersWords: FallouthackcrackerWordCharWords = this.possibleAnswerLettersWords[tmpIndexKey];
        if (typeof tmpPossibleAnswerLettersWords == 'undefined') {
          tmpPossibleAnswerLettersWords = {
            char: tmpChar,
            position: i + 1,
            words: []
          };
        }
        tmpPossibleAnswerLettersWords.words[word.word] = word;
        this.possibleAnswerLettersWords[tmpIndexKey] = tmpPossibleAnswerLettersWords;
      }
    }

    var tmpWordPointsComputeWords: FallouthackcrackerWordPoints[] = [];
    for (var key in this.possibleAnswerLettersWords) {
      var tmpPossibleAnswerLettersWords = this.possibleAnswerLettersWords[key];
      for (var keyWord in tmpPossibleAnswerLettersWords.words) {
        var tmpPoissibleAnswerLettersWordsWord = tmpPossibleAnswerLettersWords.words[keyWord];
        var tmpWordPointsComputeWord: FallouthackcrackerWordPoints = tmpWordPointsComputeWords[tmpPoissibleAnswerLettersWordsWord.word];
        if (typeof tmpWordPointsComputeWord == 'undefined') {
          tmpWordPointsComputeWord = {
            word: tmpPoissibleAnswerLettersWordsWord.word,
            points: 0,
            likeness: null
          };
        }
        tmpWordPointsComputeWord.points += 1;
        tmpWordPointsComputeWords[tmpPoissibleAnswerLettersWordsWord.word] = tmpWordPointsComputeWord;
      }
    }
    this.wordsPoints = [];
    for (var key in tmpWordPointsComputeWords) {
      this.wordsPoints.push(tmpWordPointsComputeWords[key]);
    }
    this.wordsPoints.sort((n1:FallouthackcrackerWordPoints, n2:FallouthackcrackerWordPoints) => {
      if (n1.points > n2.points) {
        return -1;
      }
      if (n1.points < n2.points) {
        return 1;
      }

      return 0;
    });
  };
  onCheckLikeness() {
    var tmpWordPointsWords: FallouthackcrackerWordPoints[] = [];
    for (var tmpWordPoint of this.wordsPoints) {
      tmpWordPointsWords[tmpWordPoint.word] = tmpWordPoint;
      if (tmpWordPoint.likeness === null) {
        tmpWordPoint.points = 0;
      } else {
        tmpWordPoint.points = -9999999;
      }
    }
    for (var wordPoint of this.wordsPoints) {
      for (var i = 0, len = wordPoint.word.length; i < len; i++) {
        var tmpChar = wordPoint.word[i];
        var tmpIndexKey = i + ':' + tmpChar;
        var tmpPossibleAnswerLettersWords = this.possibleAnswerLettersWords[tmpIndexKey];
        for (var keyWord in tmpPossibleAnswerLettersWords.words) {
          var tmpPoissibleAnswerLettersWordsWord = tmpPossibleAnswerLettersWords.words[keyWord];
          var tmpWordPointsWord = tmpWordPointsWords[tmpPoissibleAnswerLettersWordsWord.word];
          if (tmpWordPointsWord.likeness === null) {
            wordPoint.points += 1;
          } else {
            wordPoint.points -= 1;
          }
        }
      }
    }
    this.wordsPoints.sort((n1:FallouthackcrackerWordPoints, n2:FallouthackcrackerWordPoints) => {
      if (n1.points > n2.points) {
        return -1;
      }
      if (n1.points < n2.points) {
        return 1;
      }

      return 0;
    });
  };

  constructor() { }

  ngOnInit() {
  }

}
