import { useState } from "react";
import DOMPurify from "dompurify";
import "./textSearch.css";

export const TextSearch = () => {
  const [sourceString, setSourceString] = useState("");
  const [queryString, setQueryString] = useState("");
  const [output, setOutput] = useState("output would show here");

  const findQueryString = (e) => {
    e.preventDefault();
    if (sourceString.trim() === "" || queryString.trim() === "") {
      return;
    }

    // to implement the search feature for search string independent of order and spaces
    // uncomment queryWords and for of loop and replace queryString with word

    // const queryWords = queryString.split(" ");

    const markBold = new Array(sourceString.length).fill(0);

    // for (const word of queryWords) {
    //   if (word.trim() === "") return;

    for (let i = 0; i < sourceString.length; ) {
      const subString = sourceString.slice(i, i + queryString.length);

      if (subString.toLowerCase() === queryString.toLowerCase()) {
        markBold.fill(1, i, i + queryString.length);
        i += queryString.length;
      } else {
        i++;
      }
    }
    // }
    let highlightedString = "";
    for (let i = 0; i < sourceString.length; i++) {
      const currentChar = sourceString[i];
      if (markBold[i] === 1 && markBold[i - 1] !== 1) {
        highlightedString += "<b>" + currentChar;
        continue;
      }

      if (markBold[i] === 1 && markBold[i + 1] !== 1) {
        highlightedString += currentChar + "</b>";
        continue;
      }

      highlightedString += currentChar;
    }

    setOutput(DOMPurify.sanitize(highlightedString));
  };

  return (
    <form>
      <div>
        <div>
          <label htmlFor="sourceString">Source String</label>
          <input
            id="sourceString"
            className="inputClass"
            type="text"
            value={sourceString}
            onChange={(e) => setSourceString(e.target.value)}
            maxLength={350}
          />
        </div>
        <div>
          <label htmlFor="queryString">Query String</label>
          <input
            id="queryString"
            className="inputClass"
            type="text"
            value={queryString}
            onChange={(e) => setQueryString(e.target.value)}
            maxLength={350}
          />
        </div>
        <div>
          <button className="buttonClass" onClick={findQueryString}>
            find query string
          </button>
        </div>

        <div>
          Output: <p dangerouslySetInnerHTML={{ __html: output }}></p>
        </div>
      </div>
    </form>
  );
};
