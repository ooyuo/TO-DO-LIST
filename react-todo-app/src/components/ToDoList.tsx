import React, { useState } from "react";
import {useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Categories, categorySelector, categoryState, newCategoryState, toDoSelector, toDoState, wannaCreateCategory } from "../atoms";
import CreateCategory from "./CreateCategory";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    float: right;
  }
`;

interface IForm {
    toDo: string;
}

function ToDoList() {
    const isCreateC = useRecoilValue(wannaCreateCategory);
    const wannaCreateCt = useSetRecoilState(wannaCreateCategory);
    const toDos = useRecoilValue(toDoSelector);
    const cate = useRecoilState(newCategoryState);
    const [category, setCategory] = useRecoilState(categoryState);
    const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
        setCategory(event.currentTarget.value as any);
    };
    const categories = useRecoilValue(categorySelector);
    const toggleCrtC = () => wannaCreateCt(prev => !prev);
    console.log(toggleCrtC)
    
    return ( 
        <div>
            <Container>
                <Header><h1>To Dos</h1></Header>
            
            <hr />  
            <select value={category} onInput={onInput}>
                <option value={Categories.TO_DO}>To Do</option>
                <option value={Categories.DOING}>Doing</option>
                <option value={Categories.DONE}>Done</option>
                {categories.map(item => (
                    <option value={item}>{item}</option>
                ))}
            </select>
            <button onClick={toggleCrtC}>Create Category</button>
            
            {isCreateC ? (
            <>
            <CreateCategory />
            <CreateToDo />
            </>) : (
            <CreateToDo /> 
            ) }
              
            
            {toDos?.map((toDo) => (
                <ToDo key={toDo.id} {...toDo}/>
            ))}
            </Container>
        </div>
    );
}

export default ToDoList;