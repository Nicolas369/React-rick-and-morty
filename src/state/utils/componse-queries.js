export const resetCharacterQuery = () => `
query {
    characters(
        page: 1
    ) {
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

export const gotToPage = (query, page) => {
    const regex = /\d+/g;
    query = query.replace(regex, page);
    return query;
}

export const changeId = (query, id) => {
    const regex = /\d+/g;
    query = query.replace(regex, id);
    return query;
}

export const applyFilter = (query, filter) => {    
    if (query.includes('charactersByIds')) {
        query = resetCharacterQuery();
    }
    
    const splitQuery = query.split(`\n`);
    const newQuery = removeOldFilter(splitQuery);

    const newFilter = makeFilter(filter);

    return newQuery.map( val => {
        if (val.includes('page:')) {
            val += `
            ${newFilter}`;
            val = gotToPage(val, 1);
        }
        return val
    }).join('\n');
}

const removeOldFilter = (queryArray) => {
    const cleanQuery = [];

    let remove = false;
    for (let i = 0; i < queryArray.length; i++) {

        if (queryArray[i].includes('filter')) {
            remove = true;
        }
        if (queryArray[i].includes(') {')) {
            remove = false
        }

        if (!remove) {
            cleanQuery.push(queryArray[i]);
        }
    }

    return cleanQuery;
}

const makeFilter = (filter) => {
    let queryFilter = `filter: {`;

    for (let key in filter) {
        queryFilter += `
                ${key}: "${filter[key]}"`;
    }

    queryFilter += `
            }`
    ;

    return queryFilter;
}

export const cleanQuery = (query) => {
    query = removeOldFilter(query.split(`\n`)).join('\n');
    query = gotToPage(query, 1);
    return query;
}


export const makeQueryForCharactersById = (id) => {
    return `    
    query {
        charactersByIds(ids: [${[...id]}]){
            id
            name
            image
            species
        }
    }
  `;
}