import { useRef, useState, useEffect } from "react";
import { searchCharacters, getCharacters } from "../state/queriesSlice";
import { setFilterForSearchCharacters, resetCharactersVariables } from "../state/variablesSlice";
import { useDispatch } from "react-redux/es/exports";
import styled from "styled-components";
import ExpansionPanel from "./ExpansionPanel";
import SearchInput from "./SearchInput";
import { useLocation } from '@tanstack/react-location';

function CleanInput() {
  this.handlers = [];
}

CleanInput.prototype = {
  subscribe: function (fn) {
    this.handlers.push(fn);
  },

  unsubscribe: function (fn) {
    this.handlers = this.handlers.filter(function (item) {
      if (item !== fn) {
        return item;
      }
    });
  },

  unsubscribeAll: function () {
    this.handlers = [];
  },

  next: function (o, thisObj) {
    var scope = thisObj || window;
    this.handlers.forEach(function (item) {
      item.call(o, scope);
    });
  },
};

function Search() {
    const [filter, setFilter] = useState({});
    const statusForm = useRef();
    const genderForm = useRef();
    const speciesForm = useRef();
    const location = useLocation();
    const dispatch = useDispatch();
    const cleanInput = new CleanInput();

  const search = () => {
    dispatch(setFilterForSearchCharacters({ filter: filter }));
    dispatch(searchCharacters());
    location.history.push('/characters');
  };

    useEffect(()=>{
      return () => {
        cleanInput.unsubscribeAll();
      }
    }, []);

  const removeSearch = () => {
    setFilter({});
    cleanInput.next();
    dispatch(getCharacters());
    dispatch(resetCharactersVariables());
    [statusForm, speciesForm, genderForm].forEach((form) => {
      [...form.current.children].forEach(
        (val) => (val.firstChild.checked = false)
      );
    });
  };

  const addName = (name) => {
    setFilter({
      ...filter,
      name: name,
    });
  };

  const addCheckValue = (e, form, key) => {
    let newFilter = filter;

    if (e.target.checked) {
      newFilter = {
        ...filter,
        [key]: e.target.value,
      };
    } else {
      delete newFilter[key];
    }

    setFilter(newFilter);

    [...form.current.children].forEach((val) => {
      if (val.firstChild.value !== e.target.value) {
        val.firstChild.checked = false;
      }
    });
  };

  return (
    <div style={{ width: "45%", height: "100%" }}>
      <Container>
        <SearchButton onClick={search}> Search </SearchButton>
        <SearchInput emitValue={addName} cleaner={cleanInput} />
        <ExpansionPanel>
          <div style={{ padding: "15px" }}>
            <RadioForm ref={statusForm}>
              <h2> STATUS </h2>
              <RadioOption>
                <Checkbox
                  type="checkbox"
                  value="alive"
                  onChange={(e) => addCheckValue(e, statusForm, "status")}
                />
                <label>Alive</label>
              </RadioOption>
              <RadioOption>
                <Checkbox
                  type="checkbox"
                  value="dead"
                  onChange={(e) => addCheckValue(e, statusForm, "status")}
                />
                <label>Dead</label>
              </RadioOption>
              <RadioOption>
                <Checkbox
                  type="checkbox"
                  value="unknown"
                  onChange={(e) => addCheckValue(e, statusForm, "status")}
                />
                <label>Unknown</label>
              </RadioOption>
            </RadioForm>

            <RadioForm ref={genderForm}>
              <h2> GENDER </h2>
              <RadioOption>
                <Checkbox
                  type="checkbox"
                  value="male"
                  onChange={(e) => addCheckValue(e, genderForm, "gender")}
                />
                <label>Male</label>
              </RadioOption>
              <RadioOption>
                <Checkbox
                  type="checkbox"
                  value="female"
                  onChange={(e) => addCheckValue(e, genderForm, "gender")}
                />
                <label>Female</label>
              </RadioOption>
              <RadioOption>
                <Checkbox
                  type="checkbox"
                  value="unknown"
                  onChange={(e) => addCheckValue(e, genderForm, "gender")}
                />
                <label>Unknown</label>
              </RadioOption>
            </RadioForm>

            <RadioForm ref={speciesForm}>
              <h2> SPECIES </h2>
              <RadioOption>
                <Checkbox
                  type="checkbox"
                  value="Human"
                  onChange={(e) => addCheckValue(e, speciesForm, "species")}
                />
                <label>Human</label>
              </RadioOption>
              <RadioOption>
                <Checkbox
                  type="checkbox"
                  value="Humanoid"
                  onChange={(e) => addCheckValue(e, speciesForm, "species")}
                />
                <label>Humanoid</label>
              </RadioOption>
              <RadioOption>
                <Checkbox
                  type="checkbox"
                  value="alien"
                  onChange={(e) => addCheckValue(e, speciesForm, "species")}
                />
                <label>Alien</label>
              </RadioOption>
              <RadioOption>
                <Checkbox
                  type="checkbox"
                  value="poopybutthole"
                  onChange={(e) => addCheckValue(e, speciesForm, "species")}
                />
                <label>Poopybutthole</label>
              </RadioOption>
              <RadioOption>
                <Checkbox
                  type="checkbox"
                  value="mythological creature"
                  onChange={(e) => addCheckValue(e, speciesForm, "species")}
                />
                <label>Mythological Creature</label>
              </RadioOption>
              <RadioOption>
                <Checkbox
                  type="checkbox"
                  value="robot"
                  onChange={(e) => addCheckValue(e, speciesForm, "species")}
                />
                <label>Robot</label>
              </RadioOption>
              <RadioOption>
                <Checkbox
                  type="checkbox"
                  value="cronenberg"
                  onChange={(e) => addCheckValue(e, speciesForm, "species")}
                />
                <label>Cronenberg</label>
              </RadioOption>
              <RadioOption>
                <Checkbox
                  type="checkbox"
                  value="disease"
                  onChange={(e) => addCheckValue(e, speciesForm, "species")}
                />
                <label>Disease</label>
              </RadioOption>
              <RadioOption>
                <Checkbox
                  type="checkbox"
                  value="unknown"
                  onChange={(e) => addCheckValue(e, speciesForm, "species")}
                />
                <label>Unknown</label>
              </RadioOption>
            </RadioForm>
          </div>
        </ExpansionPanel>
        <SearchButton onClick={removeSearch}> Clear </SearchButton>
      </Container>
    </div>
  );
}

export default Search;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  input:checked ~ span {
    background-color: #2196f3;
  }
`;

const SearchButton = styled.button`
  border: 3px solid #008f11;
  border-radius: 7px;
  background-color: #003300;
  color: #50ff00;
  width: 100px;
  height: 40px;
  cursor: pointer;
`;

const RadioForm = styled.span`
  display: flex;
  flex-direction: column;
`;

const RadioOption = styled.div`
  height: 1.3em;
  display: flex;
  align-items: center;
  font-size: 18px;
  line-height: 0px;
`;

const Checkbox = styled.input`
  appearance: none;
  width: 1.3em;
  height: 1.3em;
  border: 3px solid #008f11;
  border-radius: 0.25em;
  margin-right: 10px;

  &:checked {
    background-color: #50ff00;
  }
`;
