import React, { useState } from "react";
import { FormWrapper } from "../../styles/Components.style";

export const Form = () => {
  const [authorInput, setAuthorInput] = useState("");
  const [titleInput, setTitleInput] = useState("");
  const [textarea, setTextarea] = useState("");
  const [optionInput, setOptionInput] = useState();

  const textHandler = (e: any) => {
    setTextarea(e.target.value);
    console.log(e.target.value);
  };
  const authHandler = (e: any) => {
    setAuthorInput(e.target.value);
    console.log(e.target.value);
  };
  const titleHandler = (e: any) => {
    setTitleInput(e.target.value);
    console.log(e.target.value);
  };
  const optionHandler = (e: any) => {
    setOptionInput(e.target.value);
    console.log(e.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    alert(`
    Autor to: ${authorInput}
    Tytuł to: ${titleInput}
    Opcja: ${optionInput}
    Tekst to: ${textarea}
    `);
  };
  return (
    <FormWrapper>
      <form onSubmit={handleSubmit}>
        <label>
          {"Autor: "}
          <input type="text" value={authorInput} onChange={authHandler} />
        </label>
        <label>
          {"Tytuł: "}
          <input type="text" value={titleInput} onChange={titleHandler} />
        </label>
        <label htmlFor="framework">Kolorowanie: </label>
        <select id="framework" onChange={optionHandler}>
          <option value="1"> opcja 1.</option>
          <option value="2"> opcja 2.</option>
          <option value="3"> opcja 3.</option>
          <option value="4"> opcja 4.</option>
        </select>
        <br />
        {"Twoja wklejka - Tutaj dodaj swoją wklejkę"}
        <br />
        <textarea
          placeholder="The default text that goes there"
          style={{ width: "95%" }}
          rows={10}
          cols={10}
          value={textarea}
          onChange={textHandler}
        />
        <br />
        <input type="submit" />
      </form>
    </FormWrapper>
  );
};
