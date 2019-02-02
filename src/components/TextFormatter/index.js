/**
 * Only link formatter exists for now. If bold/italic etc. formatters are added,
 * split each into separate component, export final TextFormatter from here
 */

import React from 'react';
import styled from 'styled-components';

import { card as c } from '../../theme';

const ItemLink = styled.a`
  color: ${c.titleIconHover};
  text-decoration: underline;
  text-decoration-color: ${c.titleIconHover};
  font-weight: 600;
  transition: color ${c.transition}, text-decoration-color ${c.transition};

  &:hover,
  &:hover:visited {
    color: ${c.brColorDrag};
    text-decoration-color: ${c.brColorDrag};
  }

  &:visited {
    color: ${c.colorDark};
    text-decoration-color: ${c.colorDark};
  }
`;

const LinkFormatter = ({ text, isTitle = false, ...props }) => {
  let str = Array.isArray(text) ? text[0] : text; // grab string out of text prop is array was passed in

  const urlPattern = /\[([^[\]]+)\]\(([^)]+)\)/g; // pattern to match [markdown](url) format

  // Match strings and parse them into objects: { text, url }, map objects into links array
  // (empty array if none were found)
  const links = (str.match(urlPattern) || []).map(string => ({
    text: string.slice(1, string.indexOf(']')),
    url: string.slice(string.indexOf('(') + 1, -1),
  }));

  let splitText; // Will become array of strings split at link points if links exist

  // Marker to prevent formatting for tutorial purposes
  const tutorialText = "Please don't format me!";
  if (str.endsWith(tutorialText)) {
    str = str.slice(0, str.length - tutorialText.length);
  } else if (links.length) {
    // Could probably come up with a more unique identifier in case users type '**linkwashere**'
    str = str.replace(urlPattern, '**linkwashere**');
    splitText = str.split('**linkwashere**');
  }

  return (
    <p style={{ margin: 0 }} {...props}>
      {splitText
        ? splitText.map((text, i) => (
            <span key={text}>
              {text}
              {links[i] ? (
                <ItemLink href={links[i].url} target="_blank" rel="noopener noreferrer">
                  {links[i].text}
                </ItemLink>
              ) : null}
            </span>
          ))
        : str}
    </p>
  );
};

export default LinkFormatter;
