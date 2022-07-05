import { useDispatch } from "react-redux/es/exports";
import { useQuery, gql } from "@apollo/client";
import styled, { keyframes } from "styled-components";
import { useLocationsQuery } from "../../state/queriesSelector";
import { goToLocationsPage } from "../../state/queriesSlice";
import LocationCard from './components/LocationCard';


function Locations() {
    const query = useLocationsQuery();
    const dispatch = useDispatch()

    const { error, loading, data } = useQuery(gql`${query}`);

    
    if (loading) return <Message> Loading...<Loading>▮</Loading></Message>

    if (error) return <Message> Error...<Loading>▮</Loading></Message>

    const locations = data.locations.results;
    const pages = data.locations.info.pages;
    const nextPage = data.locations.info.next;
    const prevPage = data.locations.info.prev;

    const goToPage = (page) => {
        const payload = { page: page };
        dispatch(goToLocationsPage(payload));
    }

    return ( 
        <>
            <PageGanger>
                <PageBtn 
                    disabled={!prevPage} 
                    onClick={() => goToPage(prevPage)}> 
                    { prevPage ? '⫷' : '✖'}
                </PageBtn>
                <PagesCount isPages={pages}>
                    <span> 
                        page: { nextPage ? nextPage - 1 : pages} of { pages }
                    </span>
                </PagesCount>
                <PageBtn 
                    disabled={!nextPage} 
                    onClick={() => goToPage(nextPage)}>
                    {nextPage ? '⫸' : '✖'}
                </PageBtn>
            </PageGanger>

            <LocationList >
                {
                    locations.map( (location, i) => <LocationCard key={i} location={location} /> )
                }        
            </LocationList>
        </> 
    );
}

export default Locations;


const LocationList = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 50px 50px;
    justify-content: center;
    margin-bottom: 50px;
    margin-top: 50px;
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

const PageGanger = styled.div`
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: end;
`;

const PageBtn = styled.button`
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

