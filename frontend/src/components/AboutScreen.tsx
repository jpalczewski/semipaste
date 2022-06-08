import React from "react";
import { Wrapper } from "../styles/Components.style";
import {Container} from "react-bootstrap";

import {
  Box
} from '@chakra-ui/react'

export const About = () => {
  return (
      <>
        <Wrapper>
          <div className="py-4">
            <Container className="bg-white p-3">
              <Box className="my-3">Creators</Box>
              <Box>
                <Box>Jacek Palczewski - Team Leader | DevOps</Box>
                <Box>Michał Sulikowski - Frontend</Box>
                <Box>Feliks Olszewski - Backend</Box>
                <Box>Zalewski Adam - Tester</Box>
                <Box>Marek Stefański - Backend | Frontend</Box>
              </Box>
            </Container>
          </div>
        </Wrapper>
      </>
  );
};
