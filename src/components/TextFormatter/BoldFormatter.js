import React from 'react';
// todo merge into single formatter
const BoldFormatter = ({ text, ...props }) => {
  let str = Array.isArray(text) ? text[0] : text; // grab string out of text prop is array was passed in

  const boldPattern = /\*\*(\w|\s)+\*\*/g; // pattern to match **bold** format

  // Match strings and parse them into objects: { text, url }, map objects into links array
  // (empty array if none were found)
  const boldStrings = (str.match(boldPattern) || []).map(string => ({
    text: string.slice(2, -2),
  }));

  let splitText; // Will become array of strings split at link points if boldStrings exist

  // Marker to prevent formatting for tutorial purposes
  const tutorialText = "Please don't format me!";
  if (str.endsWith(tutorialText)) {
    str = str.slice(0, str.length - tutorialText.length);
  } else if (boldStrings.length) {
    // Could probably come up with a more unique identifier in case users type '%BOLDTEXTHERE%'
    str = str.replace(boldPattern, '%BOLDTEXTHERE%');
    splitText = str.split('%BOLDTEXTHERE%');
  }

  return (
    <>
      {splitText
        ? splitText.map((text, i) => (
            <span key={text}>
              {text}
              {boldStrings[i] ? <strong>{boldStrings[i].text}</strong> : null}
            </span>
          ))
        : str}
    </>
  );
};

export default BoldFormatter;
