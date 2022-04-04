import React from "react";
import { AllFooter, Wrapper } from "../styles/Components.style";

export const About = () => {
  return (
    <>
      <Wrapper>
        <div style={{ padding: 50 }}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eu ex
            rutrum, consectetur justo id, dictum elit. Sed justo libero, commodo
            sit amet laoreet a, congue et augue. Mauris purus ipsum, maximus
            quis dapibus ut, iaculis vel magna. Sed cursus ornare arcu at
            sodales. Mauris facilisis purus sed elit venenatis, ac efficitur sem
            tempor. Mauris at diam quis arcu tristique dapibus quis sed massa.
            Phasellus sollicitudin quam sit amet magna euismod, non cursus elit
            maximus. Fusce a leo a metus euismod eleifend eget vitae justo.
            Donec tortor orci, mollis ut tincidunt a, ullamcorper a nunc. Proin
            nec massa purus. Praesent eget sodales magna. Suspendisse potenti.
            Nulla lorem ipsum, accumsan vitae sagittis quis, lobortis non odio.
            Aliquam eu urna sed nibh lacinia lobortis. Morbi aliquet massa id
            pellentesque gravida. Nullam in tortor cursus urna egestas rutrum
            sit amet eget metus.
          </p>
        </div>
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
        </p>{" "}
      </AllFooter>
    </>
  );
};
