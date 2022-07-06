import styled from "styled-components";
import { useDispatch } from "react-redux";
import { getCharactersById } from "../../../state/queriesSlice";
import { Link } from "@tanstack/react-location";

function LocationCard({ location }) {
  const dispatch = useDispatch();

  const redirectToCharacters = (ids) => {
    dispatch(getCharactersById({ ids: ids.map((resident) => resident.id) }));
  };

  const getDate = () => {
    const date = new Date(location.created);

    const year = date.getFullYear();

    const month =
      date.getMonth().toString().length < 2
        ? `0${date.getMonth()}`
        : date.getMonth()
    ;

    const day =
      date.getDay().toString().length < 2 
        ? `0${date.getDay()}` 
        : date.getDay()
    ;

    return `${year}/${month}/${day}`;
  };

  return (
    <Card>
      <CardTitle>
        <h2>{location.name}</h2>
      </CardTitle>

      <CardContent>
        <ul>
          <li>
            <h3>Type: {location.type}</h3>
          </li>
          <li>
            <h3>
              Dimension: <br />
              {location.dimension}
            </h3>
          </li>
          <li>
            <h3>Created: {getDate()}</h3>
          </li>
          <li>
            <LinkToCharacters
              onClick={() => redirectToCharacters(location.residents)}
              to={"/characters"}
            >
              residents ⫸
            </LinkToCharacters>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}

export default LocationCard;

const Card = styled.div`
  height: fit-content;
  width: 350px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  margin: 25px;
  border: 3px solid #008f11;
  box-shadow: 0px 0px 20px 3px #005200;
  background-color: #003300;
`;

const CardTitle = styled.div`
  height: 100px;
  width: 100%;
  padding: 15px;
  box-sizing: border-box;
  border: solid #008f11;
  border-width: 0px 0px 3px 0px;
  font-size: 20px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CardContent = styled.div`
  font-size: 18px;
  line-height: 30px;
  margin: 10px;
`;

const LinkToCharacters = styled(Link)`
  width: fit-content;
  height: fit-content;
  font-size: 18px;
  font-weight: 700;
  padding: 7px;
  border: 2px solid #50ff00;
  text-decoration: none;
  color: #50ff00;

  &:hover {
    background-color: #50ff00;
    color: #000000;
  }
`;
