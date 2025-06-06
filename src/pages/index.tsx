import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Button from "@/components/Button";
import Link from "next/link";
import Head from "next/head";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleDown,
  faArrowRight,
  faArrowRotateRight,
  faArrowUpRightFromSquare,
  faCircleQuestion,
  faDeleteLeft,
  faFaceSurprise,
  faShareNodes,
} from "@fortawesome/free-solid-svg-icons";

import fullWordsFile from "@/words/words567.json";
import words4File from "@/words/words4.json";
import words5File from "@/words/words5.json";
import words6File from "@/words/words6.json";
import words7File from "@/words/words7.json";
import words8File from "@/words/words8.json";

export default function Home() {
  <Head>
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>Linked</title>

    <meta property="og:title" content="Linked" />
    <meta
      property="og:description"
      content="Link five words together in a fun and simple word game."
    />
    <meta name="theme-color" content="#3b82f6" />
    <meta property="og:image" content="icon-transparent.png" />
  </Head>;

  const fullWordsArray = fullWordsFile;
  const words4Array = words4File;
  const words5Array = words5File;
  const words6Array = words6File;
  const words7Array = words7File;
  const words8Array = words8File;

  const [lettersArray, setLettersArray] = useState<string[]>([] as string[]);
  const [solvedWordsArray, setSolvedWordsArray] = useState<string[]>([] as string[]);
  const [changingSolvedWordsArray, setChangingSolvedWordsArray] = useState<string[]>(
    [] as string[]
  );
  const [currentI, setCurrentI] = useState(1);
  const [startLetter, setStartLetter] = useState("error");

  const [inputValue, setInputValue] = useState("");
  const [enteredWords, setEnteredWords] = useState<string[]>([] as string[]);

  const [warnText, setWarnText] = useState("error");
  const [warnVisible, setWarnVisible] = useState("fadeIn");

  const [shareText, setShareText] = useState("");

  const [word4Text, setWord4Text] = useState("");
  const [word5Text, setWord5Text] = useState("");
  const [word6Text, setWord6Text] = useState("");
  const [word7Text, setWord7Text] = useState("");
  const [word8Text, setWord8Text] = useState("");

  /* const [randomWord4, setRandomWord4] = useState(words4Array[Math.floor(Math.random() * words4Array.length)]);
  const [randomWord5, setRandomWord5] = useState(words5Array[Math.floor(Math.random() * words5Array.length)]);
  while (randomWord5.charAt(0) != randomWord4.charAt(randomWord4.length - 1)) setRandomWord5(words5Array[Math.floor(Math.random() * words5Array.length)]);
  const [randomWord6, setRandomWord6] = useState(words6Array[Math.floor(Math.random() * words6Array.length)]);
  while (randomWord6.charAt(0) != randomWord5.charAt(randomWord5.length - 1)) setRandomWord6(words6Array[Math.floor(Math.random() * words6Array.length)]);
  const [randomWord7, setRandomWord7] = useState(words7Array[Math.floor(Math.random() * words7Array.length)]);
  while (randomWord7.charAt(0) != randomWord6.charAt(randomWord6.length - 1)) setRandomWord7(words7Array[Math.floor(Math.random() * words7Array.length)]);
  const [randomWord8, setRandomWord8] = useState(words8Array[Math.floor(Math.random() * words8Array.length)]);
  while (randomWord8.charAt(0) != randomWord7.charAt(randomWord7.length - 1)) setRandomWord8(words8Array[Math.floor(Math.random() * words8Array.length)]); */

  useEffect(() => {
    let randomWord4 = words4Array[Math.floor(Math.random() * words4Array.length)];
    let randomWord5 = words5Array[Math.floor(Math.random() * words5Array.length)];
    while (randomWord5.charAt(0) != randomWord4.charAt(randomWord4.length - 1))
      randomWord5 = words5Array[Math.floor(Math.random() * words5Array.length)];
    let randomWord6 = words6Array[Math.floor(Math.random() * words6Array.length)];
    while (randomWord6.charAt(0) != randomWord5.charAt(randomWord5.length - 1))
      randomWord6 = words6Array[Math.floor(Math.random() * words6Array.length)];
    let randomWord7 = words7Array[Math.floor(Math.random() * words7Array.length)];
    while (randomWord7.charAt(0) != randomWord6.charAt(randomWord6.length - 1))
      randomWord7 = words7Array[Math.floor(Math.random() * words7Array.length)];
    let randomWord8 = words8Array[Math.floor(Math.random() * words8Array.length)];
    while (randomWord8.charAt(0) != randomWord7.charAt(randomWord7.length - 1))
      randomWord8 = words8Array[Math.floor(Math.random() * words8Array.length)];

    /* const randomWord4 = 'talc';
    const randomWord5 = 'caddy';
    const randomWord6 = 'yorker';
    const randomWord7 = 'revived';
    const randomWord8 = 'darkroom'; */

    setWord4Text(randomWord4);
    setWord5Text("_ _ _ _ _");
    setWord6Text("_ _ _ _ _ _");
    setWord7Text("_ _ _ _ _ _ _");
    setWord8Text(randomWord8);

    setSolvedWordsArray([randomWord4, randomWord5, randomWord6, randomWord7, randomWord8]);
    setChangingSolvedWordsArray([randomWord4, randomWord5, randomWord6, randomWord7, randomWord8]);
    const allWords =
      randomWord4.charAt(randomWord4.length - 1) +
      randomWord5 +
      randomWord6 +
      randomWord7 +
      randomWord8.charAt(0);

    setLettersArray(shuffle(removeDuplicates(allWords.split(""))));

    setStartLetter(randomWord5.charAt(0));

    //alert('answer!!!!!: ' + solvedWordsArray);
  }, []);

  function removeDuplicates(array: string[]) {
    // https://stackoverflow.com/a/9229821
    return [...new Set(array)];
  }

  function shuffle(array: string[]) {
    let tempArray = array.slice();
    let finalArray = [];

    for (let i = 0; i < array.length; i++) {
      let itemNow = tempArray[Math.floor(Math.random() * tempArray.length)];
      finalArray.push(itemNow);
      tempArray.splice(tempArray.indexOf(itemNow), 1);
    }

    return finalArray;
  }

  function isThisInGivenLetters(l: string) {
    for (let i = 0; i < lettersArray.length; i++) {
      if (l == lettersArray[i]) return true;
    }
    return false;
  }

  function setTimedWarn(text: string, time: number) {
    setWarnText(text);
    setWarnVisible("fadeOut");
    setTimedWarnTime(time);
    setTimedWarnRunning(true);
  }

  const [timedWarnRunning, setTimedWarnRunning] = useState(false);
  const [timedWarnTime, setTimedWarnTime] = useState(3500);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timedWarnRunning) {
      timer = setTimeout(() => {
        setTimedWarnRunning(false);
        setWarnVisible("fadeIn");
      }, timedWarnTime);
    }
    return () => clearTimeout(timer);
  }, [timedWarnRunning]);

  const enterRef = useRef<HTMLButtonElement>(null);
  const backspaceRef = useRef<HTMLButtonElement>(null);
  // when enter key is clicked, click enter button
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter" && enterRef.current) {
      enterRef.current.click();
    } else if (event.key === "Backspace" && backspaceRef.current) {
      backspaceRef.current.click();
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
  }, []);

  function addWord() {
    let trueInput = startLetter + inputValue;

    /* if (solvedWordsArray[currentI].length == 4) wordsArray = words4Array;
    else if (solvedWordsArray[currentI].length == 5) wordsArray = words5Array;
    else if (solvedWordsArray[currentI].length == 6) wordsArray = words6Array;
    else if (solvedWordsArray[currentI].length == 7) wordsArray = words7Array;
    else if (solvedWordsArray[currentI].length == 8) wordsArray = words8Array; */
    let wordsArray = fullWordsArray;

    let inWordList = false;
    for (let i = 0; i < wordsArray.length; i++) {
      if (wordsArray[i] == trueInput) {
        inWordList = true;
        break;
      }
    }

    let containsUnallowedLetters = false;
    for (let i = 1; i < trueInput.length; i++) {
      for (let j = 0; j < lettersArray.length; j++) {
        if (trueInput[i] == lettersArray[j]) {
          break;
        }
        if (j == lettersArray.length - 1) {
          containsUnallowedLetters = true;
          break;
        }
      }
    }

    if (trueInput.charAt(0) != startLetter) {
      setTimedWarn("Word must begin with the letter " + startLetter.toUpperCase(), 3500);
    } else if (trueInput.length != solvedWordsArray[currentI].length) {
      setTimedWarn("Word must be " + solvedWordsArray[currentI].length + " letters long", 3500);
    } else if (!inWordList) {
      setTimedWarn("Not in word list", 3500);
    } else if (currentI >= 3 && trueInput.charAt(trueInput.length - 1) != word8Text.charAt(0)) {
      setTimedWarn("Word must end with the letter " + word8Text.charAt(0).toUpperCase(), 3500);
    } else if (containsUnallowedLetters) {
      setTimedWarn("Word contains letters that are not allowed", 3500);
    } else {
      enteredWords.push(trueInput);

      setTimedWarnRunning(false);
      setWarnVisible("fadeIn");

      changingSolvedWordsArray.splice(0, 1);

      if (currentI == 0) setWord4Text(trueInput);
      else if (currentI == 1) setWord5Text(trueInput);
      else if (currentI == 2) setWord6Text(trueInput);
      else if (currentI == 3) setWord7Text(trueInput);
      else if (currentI == 4) setWord8Text(trueInput);

      if (currentI < 3) {
        setCurrentI(currentI + 1);
        setStartLetter(trueInput.charAt(trueInput.length - 1));

        setInputValue("");
      } else {
        enteredWords.unshift(solvedWordsArray[0]);
        enteredWords.push(solvedWordsArray[solvedWordsArray.length - 1]);
        setShareText("Linked Word Game\nhttps://linked.jakeo.dev\n" + enteredWords.join(" ➡️ "));
        setSolvedVisible("fadeOut");
        setShareBtnVisible("");
        setKeyboardVisible("hidden");
        setPlayAgainVisible("");
      }
    }
  }

  function clickHowPlay() {
    setHowPlayVisible("fadeOut");
  }

  function clickShare() {
    navigator.clipboard.writeText(shareText);
    alert("Copied to clipboard!");
  }

  const [howPlayVisible, setHowPlayVisible] = useState("fadeIn");
  const [solvedVisible, setSolvedVisible] = useState("fadeIn");
  const [shareBtnVisible, setShareBtnVisible] = useState("hidden");
  const [keyboardVisible, setKeyboardVisible] = useState("");
  const [playAgainVisible, setPlayAgainVisible] = useState("hidden");

  const inputRef = useRef<HTMLInputElement>(null);

  function handleInputBlur(event: any) {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      inputRef.current.focus(); // Focus back on the input
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleInputBlur);
    return () => document.removeEventListener("click", handleInputBlur); // cleanup: remove event listener when component unmounts
  }, []);

  return (
    <>
      <div
        className={`bg-black/50 flex items-center justify-center absolute top-0 left-0 h-screen w-full z-10 px-6 ${howPlayVisible}`}
      >
        <div className="bg-gray-100 w-[36rem] rounded-lg px-10 py-8">
          <h1 className="text-2xl font-semibold">About</h1>

          <h2 className="text-xl font-medium mt-5">How to Play</h2>
          <p className="text-lg mt-3">• Link five words together by their first and last letter.</p>
          <p className="text-lg mt-1.5">
            • Come up with three words, increasing in length, with the given letters.
          </p>
          <p className="text-lg mt-1.5">
            • Any word can be used, as long as it fits the length and begins with the last letter of
            the previous word.
          </p>
          <p className="text-lg mt-1.5">
            • The last letter of the last word that you enter must be the first letter of the last
            given word.
          </p>
          <p className="text-lg mt-1.5">
            • There will always be at least one possible solved state.
          </p>
          <p className="text-lg mt-1.5">• Once you link all the words, you've solved the puzzle!</p>

          <h2 className="text-xl font-medium mt-5">More</h2>
          <div className="flex text-center mt-3">
            <a
              className="hover:drop-shadow-md active:drop-shadow-none transition"
              href="https://jakeo.dev"
              target="_blank"
            >
              <img src="https://www.jakeo.dev/logos/bunny-jakeo-wordmark.png" className="w-20" />
            </a>
            <span className="mx-2">•</span>
            <a
              className="hover:text-blue-600 underline hover:decoration-wavy hover:decoration-1 transition-all"
              href="https://github.com/jakeo-dev/linked-web"
              target="_blank"
            >
              GitHub
              <FontAwesomeIcon className="text-sm ml-1.5" icon={faArrowUpRightFromSquare} />
            </a>
          </div>

          <div className="flex mt-6">
            <Button
              className="w-full"
              onClick={() => {
                setHowPlayVisible("fadeIn");
              }}
            >
              <span className="text-lg text-center px-1.5 py-1">Close</span>
            </Button>
          </div>
        </div>
      </div>

      <div
        className={`bg-black/50 flex items-center justify-center absolute top-0 left-0 h-screen w-full z-10 px-6 ${solvedVisible}`}
      >
        <div className="bg-gray-100 w-[36rem] rounded-lg px-10 py-8">
          <h1 className="text-2xl">You've linked all the words!</h1>
          <p className="text-lg whitespace-pre-wrap mt-3">{shareText}</p>
          <div className="flex gap-4 mt-6">
            <Button
              className="w-full"
              onClick={() => {
                clickShare();
              }}
            >
              <span className="text-lg text-center px-1.5 py-1">Copy results</span>
            </Button>
            <Button
              className="w-full"
              onClick={() => {
                setSolvedVisible("fadeIn");
              }}
            >
              <span className="text-lg text-center px-1.5 py-1">Close</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <div className="flex border-b-2 border-gray-300 w-full md:w-[44rem] px-2 md:px-4 pb-6 md:pb-8 mb-10 md:mb-12">
          <div className="flex">
            <Image
              className="mr-1"
              src="/images/icon-colorless-transparent.png"
              alt="Linked icon"
              width={40}
              height={40}
            />
            <h1 className="text-3xl text-white font-semibold pt-1">Linked</h1>
          </div>
          <div className="flex gap-4 justify-center items-center ml-auto">
            <button
              onClick={() => {
                alert("answer!!!!!: " + solvedWordsArray);
              }}
              className="hidden text-2xl bg-transparent text-blue-100 hover:text-blue-200 transition-all"
            >
              <FontAwesomeIcon icon={faFaceSurprise} aria-label="Reveal answers" />
            </button>
            <Link
              href="/mobile"
              target="_blank"
              className="text-2xl bg-transparent text-blue-100 hover:text-blue-200 transition-all"
            >
              <FontAwesomeIcon icon={faArrowCircleDown} aria-label="Download app on Android" />
            </Link>
            <button
              onClick={clickHowPlay}
              className="text-2xl bg-transparent text-blue-100 hover:text-blue-200 transition-all"
            >
              <FontAwesomeIcon icon={faCircleQuestion} aria-label="How to play" />
            </button>
            <button
              onClick={clickShare}
              className={`${shareBtnVisible} text-2xl bg-transparent text-blue-100 hover:text-blue-200 transition-all`}
            >
              <FontAwesomeIcon icon={faShareNodes} aria-label="Share game" />
            </button>
          </div>
        </div>
      </div>

      <div>
        <span className="block text-3xl md:text-4xl text-white text-center tracking-widest mb-8 md:mb-10">
          {word4Text}
        </span>
        <span className="block text-3xl md:text-4xl text-white text-center tracking-widest mb-8 md:mb-10">
          {word5Text}
        </span>
        <span className="block text-3xl md:text-4xl text-white text-center tracking-widest mb-8 md:mb-10">
          {word6Text}
        </span>
        <span className="block text-3xl md:text-4xl text-white text-center tracking-widest mb-8 md:mb-10">
          {word7Text}
        </span>
        <span className="block text-3xl md:text-4xl text-white text-center tracking-widest mb-8 md:mb-10">
          {word8Text}
        </span>
      </div>

      <div className="absolute left-0 bottom-8 w-full">
        <Button
          onClick={() => {
            setEnteredWords([]);
            setShareText("");
            setCurrentI(1);

            let randomWord4 = words4Array[Math.floor(Math.random() * words4Array.length)];
            let randomWord5 = words5Array[Math.floor(Math.random() * words5Array.length)];
            while (randomWord5.charAt(0) != randomWord4.charAt(randomWord4.length - 1))
              randomWord5 = words5Array[Math.floor(Math.random() * words5Array.length)];
            let randomWord6 = words6Array[Math.floor(Math.random() * words6Array.length)];
            while (randomWord6.charAt(0) != randomWord5.charAt(randomWord5.length - 1))
              randomWord6 = words6Array[Math.floor(Math.random() * words6Array.length)];
            let randomWord7 = words7Array[Math.floor(Math.random() * words7Array.length)];
            while (randomWord7.charAt(0) != randomWord6.charAt(randomWord6.length - 1))
              randomWord7 = words7Array[Math.floor(Math.random() * words7Array.length)];
            let randomWord8 = words8Array[Math.floor(Math.random() * words8Array.length)];
            while (randomWord8.charAt(0) != randomWord7.charAt(randomWord7.length - 1))
              randomWord8 = words8Array[Math.floor(Math.random() * words8Array.length)];

            setWord4Text(randomWord4);
            setWord5Text("_ _ _ _ _");
            setWord6Text("_ _ _ _ _ _");
            setWord7Text("_ _ _ _ _ _ _");
            setWord8Text(randomWord8);

            setSolvedWordsArray([randomWord4, randomWord5, randomWord6, randomWord7, randomWord8]);
            setChangingSolvedWordsArray([
              randomWord4,
              randomWord5,
              randomWord6,
              randomWord7,
              randomWord8,
            ]);
            let allWords =
              randomWord4.charAt(randomWord4.length - 1) +
              randomWord5 +
              randomWord6 +
              randomWord7 +
              randomWord8.charAt(0);

            setLettersArray(shuffle(removeDuplicates(allWords.split(""))));

            setStartLetter(randomWord5.charAt(0));
            setInputValue("");

            setShareBtnVisible("hidden");
            setKeyboardVisible("");
            setPlayAgainVisible("hidden");
          }}
          className={`${playAgainVisible} mx-auto items-center w-full md:w-[44rem] px-4 py-3`}
        >
          <FontAwesomeIcon icon={faArrowRotateRight} className="mr-2" />
          <span className="text-xl text-center">Play again</span>
        </Button>
      </div>

      <div className={`${keyboardVisible} absolute bottom-0 left-0 right-0`}>
        {/* warning */}
        <div className={`${warnVisible} flex justify-center items-center px-4 py-6 mx-auto`}>
          <span className="w-full md:w-[24rem] text-base text-center bg-gray-200 text-black rounded-lg shadow-sm px-6 py-3">
            {warnText}
          </span>
        </div>
        {/* bottom half */}
        <div className="bg-gray-100 shadow-xl rounded-t-xl w-full md:w-[44rem] mx-auto p-4">
          {/* input */}
          <div className="flex justify-center border-b-2 border-gray-300 mb-4 pt-1 pb-4 md:pt-2 md:pb-6">
            <span className="text-3xl md:text-4xl text-gray-600 tracking-wider leading-10">
              {startLetter}
            </span>
            <input
              className="hidden md:block text-3xl md:text-4xl tracking-widest bg-transparent caret-transparent outline-none leading-10 ml-2.5"
              onChange={(e) => {
                if (e.target.value > inputValue) setInputValue(e.target.value);
              }}
              value={inputValue}
              type="text"
              size={inputValue !== "" ? inputValue.length + 1 : 1}
              maxLength={7}
              autoComplete="off"
              spellCheck="false"
              ref={inputRef}
              autoFocus
            />
            <span className="md:hidden text-3xl md:text-4xl tracking-widest bg-transparent caret-transparent outline-none leading-10 ml-2.5">
              {inputValue}
            </span>
          </div>
          {/* keyboard */}
          <div className="flex flex-wrap justify-center items-center gap-2">
            <Button
              onClick={() => {
                setInputValue(inputValue + "a");
              }}
              className={`${isThisInGivenLetters("a") ? "" : "hidden"} w-9 h-11 pt-1.5`}
            >
              <span className={`text-2xl`}>a</span>
            </Button>
            <Button
              onClick={() => {
                setInputValue(inputValue + "b");
              }}
              className={`${isThisInGivenLetters("b") ? "" : "hidden"} w-9 h-11 pt-1.5`}
            >
              <span className={`text-2xl`}>b</span>
            </Button>
            <Button
              onClick={() => {
                setInputValue(inputValue + "c");
              }}
              className={`${isThisInGivenLetters("c") ? "" : "hidden"} w-9 h-11 pt-1.5`}
            >
              <span className={`text-2xl`}>c</span>
            </Button>
            <Button
              onClick={() => {
                setInputValue(inputValue + "d");
              }}
              className={`${isThisInGivenLetters("d") ? "" : "hidden"} w-9 h-11 pt-1.5`}
            >
              <span className={`text-2xl`}>d</span>
            </Button>
            <Button
              onClick={() => {
                setInputValue(inputValue + "e");
              }}
              className={`${isThisInGivenLetters("e") ? "" : "hidden"} w-9 h-11 pt-1.5`}
            >
              <span className={`text-2xl`}>e</span>
            </Button>
            <Button
              onClick={() => {
                setInputValue(inputValue + "f");
              }}
              className={`${isThisInGivenLetters("f") ? "" : "hidden"} w-9 h-11 pt-1.5`}
            >
              <span className={`text-2xl`}>f</span>
            </Button>
            <Button
              onClick={() => {
                setInputValue(inputValue + "g");
              }}
              className={`${isThisInGivenLetters("g") ? "" : "hidden"} w-9 h-11 pt-1.5`}
            >
              <span className={`text-2xl`}>g</span>
            </Button>
            <Button
              onClick={() => {
                setInputValue(inputValue + "h");
              }}
              className={`${isThisInGivenLetters("h") ? "" : "hidden"} w-9 h-11 pt-1.5`}
            >
              <span className={`text-2xl`}>h</span>
            </Button>
            <Button
              onClick={() => {
                setInputValue(inputValue + "i");
              }}
              className={`${isThisInGivenLetters("i") ? "" : "hidden"} w-9 h-11 pt-1.5`}
            >
              <span className={`text-2xl`}>i</span>
            </Button>
            <Button
              onClick={() => {
                setInputValue(inputValue + "j");
              }}
              className={`${isThisInGivenLetters("j") ? "" : "hidden"} w-9 h-11 pt-1.5`}
            >
              <span className={`text-2xl`}>j</span>
            </Button>
            <Button
              onClick={() => {
                setInputValue(inputValue + "k");
              }}
              className={`${isThisInGivenLetters("k") ? "" : "hidden"} w-9 h-11 pt-1.5`}
            >
              <span className={`text-2xl`}>k</span>
            </Button>
            <Button
              onClick={() => {
                setInputValue(inputValue + "l");
              }}
              className={`${isThisInGivenLetters("l") ? "" : "hidden"} w-9 h-11 pt-1.5`}
            >
              <span className={`text-2xl`}>l</span>
            </Button>
            <Button
              onClick={() => {
                setInputValue(inputValue + "m");
              }}
              className={`${isThisInGivenLetters("m") ? "" : "hidden"} w-9 h-11 pt-1.5`}
            >
              <span className={`text-2xl`}>m</span>
            </Button>
            <Button
              onClick={() => {
                setInputValue(inputValue + "n");
              }}
              className={`${isThisInGivenLetters("n") ? "" : "hidden"} w-9 h-11 pt-1.5`}
            >
              <span className={`text-2xl`}>n</span>
            </Button>
            <Button
              onClick={() => {
                setInputValue(inputValue + "o");
              }}
              className={`${isThisInGivenLetters("o") ? "" : "hidden"} w-9 h-11 pt-1.5`}
            >
              <span className={`text-2xl`}>o</span>
            </Button>
            <Button
              onClick={() => {
                setInputValue(inputValue + "p");
              }}
              className={`${isThisInGivenLetters("p") ? "" : "hidden"} w-9 h-11 pt-1.5`}
            >
              <span className={`text-2xl`}>p</span>
            </Button>
            <Button
              onClick={() => {
                setInputValue(inputValue + "q");
              }}
              className={`${isThisInGivenLetters("q") ? "" : "hidden"} w-9 h-11 pt-1.5`}
            >
              <span className={`text-2xl`}>q</span>
            </Button>
            <Button
              onClick={() => {
                setInputValue(inputValue + "r");
              }}
              className={`${isThisInGivenLetters("r") ? "" : "hidden"} w-9 h-11 pt-1.5`}
            >
              <span className={`text-2xl`}>r</span>
            </Button>
            <Button
              onClick={() => {
                setInputValue(inputValue + "s");
              }}
              className={`${isThisInGivenLetters("s") ? "" : "hidden"} w-9 h-11 pt-1.5`}
            >
              <span className={`text-2xl`}>s</span>
            </Button>
            <Button
              onClick={() => {
                setInputValue(inputValue + "t");
              }}
              className={`${isThisInGivenLetters("t") ? "" : "hidden"} w-9 h-11 pt-1.5`}
            >
              <span className={`text-2xl`}>t</span>
            </Button>
            <Button
              onClick={() => {
                setInputValue(inputValue + "u");
              }}
              className={`${isThisInGivenLetters("u") ? "" : "hidden"} w-9 h-11 pt-1.5`}
            >
              <span className={`text-2xl`}>u</span>
            </Button>
            <Button
              onClick={() => {
                setInputValue(inputValue + "v");
              }}
              className={`${isThisInGivenLetters("v") ? "" : "hidden"} w-9 h-11 pt-1.5`}
            >
              <span className={`text-2xl`}>v</span>
            </Button>
            <Button
              onClick={() => {
                setInputValue(inputValue + "w");
              }}
              className={`${isThisInGivenLetters("w") ? "" : "hidden"} w-9 h-11 pt-1.5`}
            >
              <span className={`text-2xl`}>w</span>
            </Button>
            <Button
              onClick={() => {
                setInputValue(inputValue + "x");
              }}
              className={`${isThisInGivenLetters("x") ? "" : "hidden"} w-9 h-11 pt-1.5`}
            >
              <span className={`text-2xl`}>x</span>
            </Button>
            <Button
              onClick={() => {
                setInputValue(inputValue + "y");
              }}
              className={`${isThisInGivenLetters("y") ? "" : "hidden"} w-9 h-11 pt-1.5`}
            >
              <span className={`text-2xl`}>y</span>
            </Button>
            <Button
              onClick={() => {
                setInputValue(inputValue + "z");
              }}
              className={`${isThisInGivenLetters("z") ? "" : "hidden"} w-9 h-11 pt-1.5`}
            >
              <span className="text-2xl">z</span>
            </Button>
          </div>
          <div className="flex gap-2 mt-4">
            <Button
              onClick={() => {
                if (inputValue.length < 1 && currentI != 1) {
                  setCurrentI(currentI - 1);
                  setStartLetter(enteredWords[currentI - 2].charAt(0));
                  setInputValue(enteredWords[currentI - 2].substring(1));
                  if (currentI - 2 == 0) setWord5Text("_ _ _ _ _");
                  else if (currentI - 2 == 1) setWord6Text("_ _ _ _ _ _");
                  else if (currentI - 2 == 2) setWord7Text("_ _ _ _ _ _ _");
                  enteredWords.splice(currentI - 2, 1);
                } else {
                  setInputValue(inputValue.substring(0, inputValue.length - 1));
                }
              }}
              className="items-center w-full"
              ref={backspaceRef}
            >
              <FontAwesomeIcon icon={faDeleteLeft} className="mr-2" />
              <span className="text-lg">
                {inputValue.length < 1 && (currentI == 2 || currentI == 3 || currentI == 4)
                  ? "Previous word"
                  : "Backspace"}
              </span>
            </Button>
            <Button onClick={addWord} className="items-center w-full" ref={enterRef}>
              <span className="text-lg">Enter</span>
              <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
