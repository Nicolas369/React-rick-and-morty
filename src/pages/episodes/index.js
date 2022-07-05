import { useEpisodesQuery } from "../../state/queriesSelector";
import { goToEpisodesPage, getCharactersById } from "../../state/queriesSlice";
import styled, { keyframes } from "styled-components";
import { useQuery, gql } from "@apollo/client";
import { useDispatch } from 'react-redux'
import { Link } from "@tanstack/react-location";

function Episodes() {
    const query = useEpisodesQuery();
    const dispatch = useDispatch();

    const { error, loading, data } = useQuery(gql`${query}`);

     
    if (loading) return <Message> Loading...<Loading>▮</Loading></Message>

    if (error) return <Message> Error...<Loading>▮</Loading></Message>

    const episodes = data.episodes.results;
    const pages = data.episodes.info.pages;
    const nextPage = data.episodes.info.next;
    const prevPage = data.episodes.info.prev;

    const goToPage = (page) => {
        const payload = { page: page };
        dispatch(goToEpisodesPage(payload));    
    }

    const getCharacters = (ids) => {
        dispatch(getCharactersById({ ids: ids.map(character => character.id) }));
    }

    return ( 
        <div>
            <PageChanger>
                <PageChangerBtn 
                    disabled={!prevPage} 
                    onClick={() => goToPage(prevPage)}
                    >{ prevPage ? '⫷' : '✖'}
                </PageChangerBtn>
                <PagesCount isPages={pages}>
                    <span> 
                        { nextPage ? nextPage - 1 : pages } of { pages }
                    </span>
                </PagesCount>
                <PageChangerBtn 
                    disabled={!nextPage} 
                    onClick={() => goToPage(nextPage)}
                    >{nextPage ? '⫸' : '✖'}
                </PageChangerBtn>
            </PageChanger>
            <div>
                <ul>
                    { episodes.map( episode => {
                        return (
                            <EpisodeListItem key={episode.id}>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Episode name</th>
                                            <th>Episode number</th>
                                            <th>Episode release</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{episode.name}</td>
                                            <td>{episode.episode}</td>
                                            <td>{episode.air_date}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <ShowCahracters 
                                    to={'/characters'} 
                                    onClick={() => getCharacters(episode.characters)} 
                                    > Characters ⫸ 
                                </ShowCahracters>
                            </EpisodeListItem>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

export default Episodes;



const EpisodeListItem = styled.li`
    width: 65vw;
    margin: 50px;
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 3px solid #008F11;
    background-color: #003300;
    box-shadow: 0px 0px 20px 3px #005200; 
    
    table, th, td {
        border: 1px solid #008F11;
        border-collapse: collapse;
        width: 50vw;
        height: 50px;
        text-align: center;
        font-size: 18px;
    }
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

const PageChanger = styled.div`
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: end;
`;

const PageChangerBtn = styled.button`
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

const ShowCahracters = styled(Link)`
    width: fit-content;
    height: fit-content;
    font-size: 18px;
    font-weight: 700;
    padding: 7px;
    border: 2px solid #008F11;
    color:#50FF00;
    text-decoration: none;

    &:hover {
        background-color: #3bb403;
        color: #000000;
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

