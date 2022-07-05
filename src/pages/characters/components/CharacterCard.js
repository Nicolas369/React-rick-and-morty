import { Link } from "@tanstack/react-location";
import styled from "styled-components";

function CharacterCard({ character }) {
    return ( 
        <Card to={`/character/${character.id}`} >
            <CardImage src={character.image}/>
            <CardFooter>
                <p>{character.name}</p> <p>{character.species}</p>
            </CardFooter>
        </Card> 
    );
}

export default CharacterCard;


const Card = styled(Link)`
    height: fit-content;
    width: 250px;
    background-color: #003300;
    border-radius: 15px;
    border: 3px solid #008F11;
    box-shadow: 5px 5px 22px 2px #005200;    
    text-decoration: none;
`;

const CardImage = styled.img`
    height: 250px;
    width: 250px;
    border-radius: 15px 15px 0px 0px;
    border: solid #008F11;
    border-width: 0px 0px 3px 0px;
`;

const CardFooter = styled.footer`
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 10px;
    color:#50FF00;
    font-family: monospace;
    font-size: 16px;
    font-weight: 600;
`;
