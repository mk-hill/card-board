import React from 'react';
// todo merge into single formatter
const ItalicFormatter = ({ text, ...props }) => {
  let str = Array.isArray(text) ? text[0] : text; // grab string out of text prop is array was passed in

  const italicPattern = /\*(\w|\s)+\*/g; // pattern to match *italic* format

  // Match strings and parse them into objects: { text, url }, map objects into links array
  // (empty array if none were found)
  const italicStrings = (str.match(italicPattern) || []).map(string => ({
    text: string.slice(1, -1),
  }));

  let splitText; // Will become array of strings split at link points if italicStrings exist

  // Marker to prevent formatting for tutorial purposes
  const tutorialText = "Please don't format me!";
  if (str.endsWith(tutorialText)) {
    str = str.slice(0, str.length - tutorialText.length);
  } else if (italicStrings.length) {
    // Could probably come up with a more unique identifier in case users type '%ITALICTEXTHERE%'
    str = str.replace(italicPattern, '%ITALICTEXTHERE%');
    splitText = str.split('%ITALICTEXTHERE%');
  }

  return (
    <>
      {splitText
        ? splitText.map((text, i) => (
            <span key={text}>
              {text}
              {italicStrings[i] ? <strong>{italicStrings[i].text}</strong> : null}
            </span>
          ))
        : str}
    </>
  );
};

export default ItalicFormatter;
