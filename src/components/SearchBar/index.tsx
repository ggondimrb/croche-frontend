import React, { useState } from 'react';
import { KeyboardEvent } from "react";

import { useHistory } from 'react-router-dom';
import { MdSearch } from "react-icons/md";

import { Container,
         SearchButton,
         SearchInput } from './styles';

const SearchBar: React.FC = () => {
  const [search, setSearch] = useState<string>('');
  const history = useHistory();

  function handleKeywordKeypress(e: KeyboardEvent) {
    if(e.key === 'Enter') {
      history.push(`/search/${search}`);
    }
};  

  return (
    <Container>
      <SearchInput 
        type="text" 
        placeholder="O que você está procurando?"
        value={search}
        onKeyPress={(e) => {handleKeywordKeypress(e)}}
        onChange={(e) => {
          setSearch(e.target.value);
        }}/>
      <SearchButton to={`/search/${search}`}>
        <MdSearch size={20} style={{marginTop:10,marginLeft:10}}/>
      </SearchButton>
    </Container>
  );
};

export default SearchBar;
