import { useState } from 'react';
import { useLocation } from '@tanstack/react-location';
import { 
    useCharactersQuery, 
    useEpisodesQuery, 
    useLocationsQuery, 
    useCharacterQuery 
} from '../state/queriesSelector';
import Graphql from '../assets/Graphql';
import styled from 'styled-components';

function QueryPanel() {
    const [open, setOpen] = useState(false);
    const location = useLocation()

    const query = {
        characters: useCharactersQuery(),
        locations: useLocationsQuery(),
        episodes: useEpisodesQuery(),
        character: useCharacterQuery(),
    }

    const HTMLquery = query[location.current.href.split('/')[1]]
    const openQueryPanel = () => setOpen(!open);

    return ( 
        <Container>

            <Panel onClick={openQueryPanel} isOpen={open} >
                { open 
                    ? <Query><code>{ HTMLquery }</code></Query>
                    : <Graphql />
                }
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
    border: 3px solid #50FF00;
    box-shadow: 0px 0px 20px 3px #005200;
    overflow: hidden;
    color: #50FF00;
    font-size: 16px;
    font-weight: 700;
    background-color: #003300;
    
    padding: ${porps => porps.isOpen ? '25px': '7px'};
    width: ${props => props.isOpen ? 'fit-content' : '75px'};
    height: ${props => props.isOpen ? 'fit-content' : '75px'};
    max-height: ${props => props.isOpen ? '95vh' : '75px'};;
    max-width: ${props => props.isOpen ? '85vw' : '75px'};;
    border-radius: ${props => props.isOpen ? '25px' : '50%'};
    transition-property: max-height, max-width;
    transition-duration: 0.7s, 1.5s;
    ${props => props.isOpen ? `
        padding-right: 50px;
        ` : ''
    }
`;

const Query = styled.pre`
    overflow: auto;

    &::-webkit-scrollbar {
        display: none;
    }
`;

const Container = styled.div`
    position: fixed;
    z-index: 10000;
    bottom: 0;
    right: 0;
    margin-right: 3.5vw;
    margin-bottom: 5vh;
`;
