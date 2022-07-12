import { useState } from 'react';
import { useLocation } from '@tanstack/react-location';
import {
  useCharactersQuery,
  useEpisodesQuery,
  useLocationsQuery,
  useCharacterQuery,
} from '../state/queriesSelector';
import Graphql from '../assets/Graphql';
import styled from 'styled-components';

function QueryPanel() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const query = {
    characters: useCharactersQuery(),
    locations: useLocationsQuery(),
    episodes: useEpisodesQuery(),
    character: useCharacterQuery(),
  };

  const currentQuery = query[location.current.href.split('/')[1]];
  let HTMLquery = currentQuery.query;
  let variables = currentQuery.variables;

  const HTMLvariables = (variablesObject) => {
    let variableObj = '{\n';
    let attributes = '';

    for (let key in variablesObject) {
      if (Array.isArray(variablesObject[key])) {
        const array = variablesObject[key].map((val) => '\n' + val);
        attributes += `${key}: [${array}\n]\n`;
      } else if (typeof variablesObject[key] === 'object') {
        let attributesSubObj = '{ \n';
        let object = variablesObject[key];
        for (let keyWord in object) {
          attributesSubObj += `${keyWord}: ${object[keyWord]}\n`;
        }
        attributesSubObj += '}';
        attributes += `${key}: ${attributesSubObj}\n`;
      } else {
        attributes += `${key}: ${variablesObject[key]} \n`;
      }
    }

    variableObj += attributes;
    variableObj += '}';

    let variables = variableObj.split('\n');
    let tabulators = 0;
    let space = '   ';

    variables = variables.map((line) => {
      let beginning = '';

      if (line.includes('}') || line.includes(']')) {
        tabulators--;
      }

      for (let n = 0; n <= tabulators; n++) {
        beginning += space;
      }

      if (line.includes('{') || line.includes('[')) {
        tabulators++;
      }

      return (beginning += line);
    });

    return variables.join('\n');
  };

  const openQueryPanel = () => setOpen(!open);

  return (
    <Container>
      <Panel onClick={openQueryPanel} isOpen={open}>
        {open ? (
          <>
            <pre>
              <code>{HTMLquery}</code>
            </pre>
            <VariablesContainer>
              <h1>Variables:</h1>
              <pre>
                <code>{HTMLvariables(variables)}</code>
              </pre>
            </VariablesContainer>
          </>
        ) : (
          <Graphql />
        )}
      </Panel>
    </Container>
  );
}

export default QueryPanel;

const Panel = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid #50ff00;
  box-shadow: 0px 0px 20px 3px #005200;
  overflow: hidden;
  color: #50ff00;
  font-size: 16px;
  font-weight: 700;
  background-color: #003300;

  padding: ${(porps) => (porps.isOpen ? '25px' : '7px')};
  width: ${(props) => (props.isOpen ? 'fit-content' : '75px')};
  height: ${(props) => (props.isOpen ? 'fit-content' : '75px')};
  max-height: ${(props) => (props.isOpen ? '95vh' : '75px')};
  max-width: ${(props) => (props.isOpen ? '85vw' : '75px')};
  border-radius: ${(props) => (props.isOpen ? '25px' : '50%')};
  transition-property: max-height, max-width;
  transition-duration: 0.7s, 1.5s;
  ${(props) =>
    props.isOpen
      ? `
        padding-right: 50px;
        `
      : ''}
`;

const Container = styled.div`
  position: fixed;
  z-index: 10000;
  bottom: 0;
  right: 0;
  margin-right: 3.5vw;
  margin-bottom: 5vh;
`;

const VariablesContainer = styled.div`
  padding: 15px;
  margin: 20px;
  border: 3px solid #008f11;
  max-height: 50vh;
  height: auto;
  overflow-y: scroll;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #008f11;
  }
`;
