import { Component, OnInit, Input } from '@angular/core';
import { FallouthackcrackerWord } from './fallouthackcracker-word';
import { FallouthackcrackerWordChar } from './fallouthackcracker-word-char';

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
  onLikenessUpdate() {
    this.wordsWithLikeness = [];
    this.possibleAnswerLetters = [];
    var highestWordLikeness: FallouthackcrackerWord = {
      word: 'temp',
      likeness: 0
    };
    for (var key in this.wordsArr) {
      var word = this.wordsArr[key];
      if (word.likeness > 0 && word.likeness > highestWordLikeness.likeness) {
        highestWordLikeness = word;
        this.wordsWithLikeness.push(word);
        this.possibleAnswerLetters = [];
        for (var i = 0, len = word.word.length; i < len; i++) {
          var tmpLetter: FallouthackcrackerWordChar = {
            char: word.word[i],
            position: i + 1
          };
          if (this.possibleAnswerLetters.indexOf(tmpLetter) < 0) {
            this.possibleAnswerLetters.push(tmpLetter);
          }
        }
      }
    }

    this.possibleAnswers = [];
    for (var word of this.wordsArr) {
      if (word.likeness <= 0 && this.wordsWithLikeness.indexOf(word) < 0) {
        var thisWordLikeness = 0;
        for (var letter of this.possibleAnswerLetters) {
          if (word.word[letter.position - 1] == letter.char) {
            thisWordLikeness++;
          }
        }
        var wordLikenessOk = true;
        if (!(Number(highestWordLikeness.likeness) <= thisWordLikeness)) {
          wordLikenessOk = false;
        }

        if (wordLikenessOk) {
          this.possibleAnswers.push(word);
        }
      }
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
