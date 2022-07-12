import { Link } from '@tanstack/react-location';
import styled, { keyframes } from 'styled-components';
import { useQuery, gql } from '@apollo/client';
import { useCharacterQuery } from '../../state/queriesSelector';

function Character() {
  const query = useCharacterQuery();

  const { error, loading, data } = useQuery( gql`${query.query}`,
    { variables: query.variables }
  );

  if (loading) return (
      <Message>
        Loading...<Loading>▮</Loading>
      </Message>
    );

  if (error) return (
      <Message>
        Error.<Loading>▮</Loading>
      </Message>
  );

  const character = data.character;

  return (
    <>
      <CharacterPanel>
        <ImageContainer>
          <CharacterImage src={character.image} />
        </ImageContainer>

        <InfoContainer>
          <CharacterName>
            <span> Name: {character.name} </span>
          </CharacterName>
          <CharacterInfo>
            <div>
              <h3>Status: {character.status}</h3>
              <h3>Species: {character.species}</h3>
              <h3>Type: {character.type}</h3>
              <h3>Gender: {character.gender}</h3>
              <h3>Origin: {character.origin.name}</h3>
              <h3>Current Location: {character.location.name}</h3>
            </div>

            <CharacterEpisodes>
              <EpisodesTitle>
                <span>Episodes:</span>
              </EpisodesTitle>
              <EpisodeContainer>
                {character.episode.map((e) => (
                  <Episode key={e.id}>
                    {'>'} {e.id} {e.name}
                  </Episode>
                ))}
              </EpisodeContainer>
            </CharacterEpisodes>
          </CharacterInfo>
        </InfoContainer>
      </CharacterPanel>
      <div style={{ widht: '100%', display: 'flex', justifyContent: 'center' }}>
        <LinkBack to={'/characters'}> Back </LinkBack>
      </div>
    </>
  );
}

export default Character;

const CharacterPanel = styled.div`
  display: flex;
  align-items: center;
`;

const CharacterImage = styled.img`
  height: 350px;
  width: 350px;
`;

const ImageContainer = styled.div`
  height: 400px;
  width: 400px;
  min-width: 400px;
  margin: 25px;
  border: 5px solid #008f11;
  background-color: #003300;
  box-shadow: 0px 0px 20px 3px #005200;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InfoContainer = styled.div`
  font-size: 18px;
  font-weight: 700;
  margin: 25px;
  width: 100%;
  height: 400px;
  border: 5px solid #008f11;
  background-color: #003300;
  box-shadow: 0px 0px 20px 3px #005200;
`;

const CharacterInfo = styled.div`
  display: flex;
  justify-content: space-around;
  padding-left: 25px;
`;

const CharacterName = styled.div`
  width: 100%;
  height: 10vh;
  box-sizing: border-box;
  border: solid #008f11;
  border-width: 0px 0px 3px 0px;
  padding-left: 25px;
  font-size: 2.2em;
  display: flex;
  align-items: center;
`;

const CharacterEpisodes = styled.div`
  height: 250px;
  width: 400px;
  margin: 25px;
  border: 3px solid #008f11;
`;

const EpisodesTitle = styled.div`
  width: 100%;
  border: solid #008f11;
  border-width: 0px 0px 3px 0px;
  box-sizing: border-box;
`;

const EpisodeContainer = styled.div`
  overflow-y: scroll;
  height: 90%;
  box-sizing: border-box;

  &::-webkit-scrollbar {
    width: 10px;
    border: 3px solid #008f11;
    border-width: 0px 0px 0px 3px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #008f11;
  }
`;

const Episode = styled.p`
  border: 2px solid transparent;
  cursor: default;
  font-size: 14px;
  &:hover {
    border: 2px solid #008f11;
    background-color: #008f11;
    color: #000000;
  }
`;

const LinkBack = styled(Link)`
  width: 75px;
  height: 25px;
  text-decoration: none;
  border: 3px solid #008f11;
  color: #008f11;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 700;
`;

const Message = styled.h1`
  font-size: 20px;
  font-weight: 700;
  margin-top: 50px;
  margin-left: 100px;
`;

const animation = keyframes`
  0% {opacity: 0; }
  100% {opacity: 1;}
`;

const Loading = styled.span`
  font-size: 25px;
  animation: ${animation} 0.5s linear infinite;
`;
