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
        tmpPossibleAnswerLettersWords.words.push(word);
        this.possibleAnswerLettersWords[tmpIndexKey] = tmpPossibleAnswerLettersWords;
      }
    }
    for (var key in this.possibleAnswerLettersWords) {
      var letterWord = this.possibleAnswerLettersWords[key];
      for (var word of letterWord.words) {
        var tmpWordPoint: FallouthackcrackerWordPoints = this.wordsPoints[word.word];
        if (typeof tmpWordPoint == 'undefined') {
          tmpWordPoint = {
            word: word.word,
            points: 0
          }
        }
        tmpWordPoint.points += letterWord.words.length;
        this.wordsPoints[word.word] = tmpWordPoint;
      }
    }
    var tmpWordsPoints: FallouthackcrackerWordPoints[] = [];
    for (var key in this.wordsPoints) {
      tmpWordsPoints.push(this.wordsPoints[key]);
    }
    tmpWordsPoints.sort((n1:FallouthackcrackerWordPoints, n2:FallouthackcrackerWordPoints) => {
      if (n1.points > n2.points) {
        return -1;
      }
      if (n1.points < n2.points) {
        return 1;
      }

      return 0;
    });
    this.wordsPoints = tmpWordsPoints.slice(0, 4);
  };

  constructor() { }

  ngOnInit() {
  }

}
