import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useQuery, gql } from "@apollo/client";
import { useCharactersQuery } from "../../state/queriesSelector";
import { goToCharactersPage } from "../../state/queriesSlice";
import styled, { keyframes } from "styled-components";
import CharacterCard from './components/CharacterCard'


const Characters = () => {

    const [characters, setCharacters] = useState([]);
    const [pages, setPages] = useState(undefined);
    const [nextPage, setNextPage] = useState(undefined);
    const [prevPage, setPrevPage] = useState(undefined);

    const query = useCharactersQuery();
    const dispatch = useDispatch(); 

    const {error, loading, data } = useQuery(gql`${query}`);

    useEffect(() => {
        if ( data ) {
            if (data.characters) {
                setCharacters(data.characters.results);
                setPages(data.characters.info.pages);
                setNextPage(data.characters.info.next);
                setPrevPage(data.characters.info.prev);
            } else if (data.charactersByIds) {
                setCharacters(data.charactersByIds);
            }
        }
    }, [data]);

    const goToPage = (page) => {
        dispatch(goToCharactersPage({ page: page }));
    }

    if (loading) return <Message> Loading...<Loading>▮</Loading> </Message>

    if (error) return <Message> Error...<Loading>▮</Loading></Message>

    return (
        <>
            {
                characters.length > 0 
                ?
                <>
                    <PageChanger>
                        <ButtonPage 
                            disabled={!prevPage}
                            onClick={() => goToPage(prevPage)}
                        >
                            { prevPage ? '⫷' : '✖'}
                        </ButtonPage>
                        <PagesCount isPages={pages}>
                            <span>{ pages && `page: ${ nextPage ? nextPage - 1 : pages} of ${ pages }` }</span>
                        </PagesCount>
                        <ButtonPage 
                            disabled={!nextPage}
                            onClick={() => goToPage(nextPage)}
                        >
                            {nextPage ? '⫸' : '✖'}
                        </ButtonPage>
                    </PageChanger>
    
                    <CHaracterList>
                        {
                            characters.map(
                                character => <CharacterCard key={character.id} character={character} />
                            )
                        }
                    </CHaracterList>
                </>
                :
                <Message>Characters Not Found...<Loading>▮</Loading> </Message>
            }
        </>
    )
}

export default Characters;


const CHaracterList = styled.div`
    width: 100%;
    justify-content: center;
    display: flex;
    flex-wrap: wrap;
    gap: 50px 50px;
    margin-bottom: 50px;
    margin-top: 50px;
`;

const PageChanger = styled.div`
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: end;
`;

const PagesCount = styled.div`
    width: fit-content;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: ${props => props.isPages ? 10 : 0 }px;
    margin-right: ${props => props.isPages ? 10 : 0 }px;
`;

const ButtonPage = styled.button`
    width: 100px;
    height: 30px;
    font-weight: 700;
    color: #50FF00;
    border: 2px solid #008F11;
    background-color: transparent;

    &:hover {
        font-weight: 700;
        color: #000000;
        background-color: #50FF00;
    }
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

