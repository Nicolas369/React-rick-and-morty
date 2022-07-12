export const resetCharacterQuery = () => `
query GetCharacters($page: Int = 1) {
    characters(page: $page) {
        info {
            pages
            next
            prev
        }
        results {
            id
            name
            image
            species
        }
    }
}`;


export const makeQueryForCharactersById = () => {
    return `    
    query GetCharacterListByIds($ids: [ID!]!) {
        charactersByIds(ids: $ids){
            id
            name
            image
            species
        }
    }
  `;
}

export const getCharactersSearchQuery = () => `
query SearchCharacters($page: Int = 1, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
        info {
            pages
            next
            prev
        }
        results {
            id
            name
            image
            species
        }
    }
}
`; 
