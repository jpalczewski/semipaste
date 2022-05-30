import React, {useEffect, useState} from "react";
import { AllFooter, Wrapper } from "../styles/Components.style";
import { PasteBinForm } from "./form/form";
import {Alert} from "react-bootstrap";

export const Create = () => {
    const [result, setResult] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            setResult("");
        }, 1500);
        return () => clearTimeout(timer);
    }, [result]);

  return (
    <>
      <Wrapper>
          {result &&
                <Alert variant="primary" style={{width: "50vh", margin: "auto"}}>
                    <Alert.Heading>
                        {result}
                    </Alert.Heading>
                </Alert>
            }
        <p style={{ textAlign: "left", paddingLeft: 50, paddingTop: 50 }}>
          UTWÓRZ NOWĄ WKLEJKĘ
        </p>
        <PasteBinForm setResult={setResult} />
      </Wrapper>
      <AllFooter>
        <p
          style={{
            color: "white",
            fontSize: 10,
            textAlign: "left",
            padding: 10,
          }}
        >
          @2022 Średnik - all rights reserved
        </p>
      </AllFooter>
    </>
  );
};
