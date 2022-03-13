import React from "react";
import {
  TableWrapper,
  THead,
  TFoot,
  TBody,
  TR,
  TH,
  TD,
} from "../../styles/Table.style";
import "bootstrap/dist/css/bootstrap.css";
import { tableData } from "../../dummy_data/dummyData";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";

//TESTY JEDNOSTKOWE

const client = new ApolloClient({
  uri: "https://http://localhost:8000",
  cache: new InMemoryCache(),
});

console.log(client);

export const Table = () => {
  return (
    <TableWrapper>
      <THead>
        <TR>
          <TH>Tytuł</TH>
          <TH>Autor</TH>
          <TH>Język</TH>
          <TH>Dodano</TH>
        </TR>
      </THead>
      <TBody>
        {tableData.map((id) => (
          <TR>
            <TD>{id.title}</TD>
            <TD>{id.author}</TD>
            <TD>{id.lang}</TD>
            <TD>{id.date}</TD>
          </TR>
        ))}
      </TBody>
    </TableWrapper>
  );
};
