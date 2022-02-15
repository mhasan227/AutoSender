import React, { useState, useContext } from "react";
import styled from "styled-components/native";
import { Searchbar } from "react-native-paper";
import { AppsContext } from "../../../services/apps/apps.context";

export const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const { search } = useContext(AppsContext);
  return (
    <Searchbar
      placeholder="Search"
      onChangeText={setSearchValue}
      onSubmitEditing={() => {
        search(searchValue);
      }}
      value={searchValue}
    />
  );
};
