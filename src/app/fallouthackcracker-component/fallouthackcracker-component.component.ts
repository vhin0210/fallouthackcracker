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
    for (var key in this.possibleAnswerLettersWords) {
      var letterWord = this.possibleAnswerLettersWords[key];
      for (var keyWords in letterWord.words) {
        var word: FallouthackcrackerWord = letterWord.words[keyWords];
        var tmpWordPoint: FallouthackcrackerWordPoints = this.wordsPoints[word.word];
        if (typeof tmpWordPoint == 'undefined') {
          tmpWordPoint = {
            word: word.word,
            points: 0,
            likeness: null
          }
        }
        tmpWordPoint.points += Object.keys(letterWord.words).length;
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
    this.wordsPoints = tmpWordsPoints;
  };
  onCheckLikeness() {
    var tmpWordsPoints: FallouthackcrackerWordPoints[] = [];
    var tmpPossibleAnswerLettersWordsArr: FallouthackcrackerWordCharWords[] = [];
    var tmpPossibleAnswerLettersWordsArr2: FallouthackcrackerWordCharWords[] = [];
    for (var wordsPoint of this.wordsPoints) {
      if (wordsPoint.likeness !== null || wordsPoint.likeness > 0) {
        for (var i = 0, len = wordsPoint.word.length; i < len; i++) {
          var tmpChar = wordsPoint.word[i];
          var tmpIndexKey = i + ':' + tmpChar;
          var tmpPossibleAnswerLettersWords: FallouthackcrackerWordCharWords = tmpPossibleAnswerLettersWordsArr[tmpIndexKey];
          if (typeof tmpPossibleAnswerLettersWords == 'undefined') {
            tmpPossibleAnswerLettersWords = {
              char: tmpChar,
              position: i + 1,
              words: []
            };
          }
          var tmpWord: FallouthackcrackerWord = {
            word: wordsPoint.word,
            likeness: wordsPoint.likeness
          };
          tmpPossibleAnswerLettersWords.words[tmpWord.word] = tmpWord;
          tmpPossibleAnswerLettersWordsArr[tmpIndexKey] = tmpPossibleAnswerLettersWords;
        }
      }
    }
    for (var key in tmpPossibleAnswerLettersWordsArr) {
      var letterWord: FallouthackcrackerWordCharWords = tmpPossibleAnswerLettersWordsArr[key];
      for (var wordsPoint of this.wordsPoints) {
        if (wordsPoint.likeness === null) {
          for (var i = 0, len = wordsPoint.word.length; i < len; i++) {
            var tmpChar = wordsPoint.word[i];
            var tmpIndexKey = i + ':' + tmpChar;
            var tmpPossibleAnswerLettersWords: FallouthackcrackerWordCharWords = tmpPossibleAnswerLettersWordsArr[tmpIndexKey];
            if (typeof tmpPossibleAnswerLettersWords == 'undefined') {
              tmpPossibleAnswerLettersWords = {
                char: tmpChar,
                position: i + 1,
                words: []
              };
            }
            var tmpWord: FallouthackcrackerWord = {
              word: wordsPoint.word,
              likeness: wordsPoint.likeness
            };
            tmpPossibleAnswerLettersWords.words[tmpWord.word] = tmpWord;
            tmpPossibleAnswerLettersWordsArr[tmpIndexKey] = tmpPossibleAnswerLettersWords;
          }
        }
      }
    }
    console.log(this.wordsPoints);
    console.log(tmpPossibleAnswerLettersWordsArr);
    // for (var key in tmpPossibleAnswerLettersWordsArr) {
    //   var letterWord: FallouthackcrackerWordCharWords = tmpPossibleAnswerLettersWordsArr[key];
    //   for (var keyWords in letterWord.words) {
    //     var word: FallouthackcrackerWord = letterWord.words[keyWords];
    //     var tmpWordPoint: FallouthackcrackerWordPoints = tmpPossibleAnswerLettersWordsArr[word.word];
    //     if (typeof tmpWordPoint == 'undefined') {
    //       tmpWordPoint = {
    //         word: word.word,
    //         points: 0,
    //         likeness: word.likeness
    //       }
    //     }
    //     if (word.likeness !== null) {
    //       tmpWordPoint.points = 0;
    //       for (var keyWords2 in letterWord.words) {
    //         var word2: FallouthackcrackerWord = letterWord.words[keyWords2];
    //         var tmpWordPoint2: FallouthackcrackerWordPoints = tmpPossibleAnswerLettersWordsArr[word2.word];
    //         if (typeof tmpWordPoint2 == 'undefined') {
    //           tmpWordPoint2 = {
    //             word: word2.word,
    //             points: 0,
    //             likeness: word2.likeness
    //           }
    //         }
    //         console.log(tmpWordPoint2, tmpWordPoint2.points);
    //         tmpWordPoint2.points -= 1;
    //         if (word2.word != word.word) {
    //           console.log(tmpWordPoint2, tmpWordPoint2.points);
    //           tmpWordsPoints[word2.word] = tmpWordPoint2;
    //         }
    //       }
    //       tmpWordsPoints[word.word] = tmpWordPoint;
    //     } else {
    //       tmpWordPoint.points += 1;
    //       tmpWordsPoints[word.word] = tmpWordPoint;
    //     }
    //   }
    // }
    for (var key in this.wordsPoints) {
      var wordsPoint1: FallouthackcrackerWordPoints = this.wordsPoints[key];
      if (wordsPoint1.likeness !== null) {
        wordsPoint1.points = -99999999;
      } else {
        for (var i = 0, len = wordsPoint1.word.length; i < len; i++) {
          var tmpChar = wordsPoint.word[i];
          var tmpIndexKey = i + ':' + tmpChar;
          var tmpPossibleAnswerLettersWords: FallouthackcrackerWordCharWords = tmpPossibleAnswerLettersWordsArr[tmpIndexKey];
          for (var key2 in this.wordsPoints) {
            var wordsPoint2: FallouthackcrackerWordPoints = this.wordsPoints[key2];
            if (wordsPoint2.likeness !== null && typeof tmpPossibleAnswerLettersWords.words[wordsPoint2.word] != 'undefined') {
              console.log(wordsPoint1.word, wordsPoint1.points, wordsPoint2.word);
              wordsPoint1.points -= 1;
              console.log(wordsPoint1.word, wordsPoint1.points, wordsPoint2.word);
            }
          }
        }
      }
      tmpWordsPoints[wordsPoint1.word] = wordsPoint1;
    }

    var tmpWordsPoints2: FallouthackcrackerWordPoints[] = [];
    for (var key in tmpWordsPoints) {
      tmpWordsPoints2.push(tmpWordsPoints[key]);
    }
    tmpWordsPoints2.sort((n1:FallouthackcrackerWordPoints, n2:FallouthackcrackerWordPoints) => {
      if (n1.points > n2.points) {
        // if (n2.points == 0) {
        //   return -1;
        // }
        return -1;
      }
      if (n1.points < n2.points) {
        // if (n1.points == 0) {
        //   return 1;
        // }
        return 1;
      }

      return 0;
    });
    if (tmpWordsPoints2.length > 0) {
      this.wordsPoints = tmpWordsPoints2;
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
