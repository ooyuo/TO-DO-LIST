import { get } from "http";
import {atom, selector} from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
    key: "recoil-persis",
    storage: localStorage,
})

export enum Categories {
    "TO_DO" = "TO_DO",
    "DOING" = "DOING",
    "DONE" = "DONE",
}

export interface ICategories {
    category: string;
}

export interface IToDo {
    text: string;
    id: number;
    category: Categories;
}

export const wannaCreateCategory  = atom({
    key: "wannaCreateCategory",
    default: false,
});

export const categoryState = atom<Categories>({
    key: "category",
    default: Categories.TO_DO,
});

export const newCategoryState = atom<ICategories[]>({
    key: "newCategory",
    default: [],
    effects_UNSTABLE: [persistAtom],
});

export const toDoState = atom<IToDo[]>({
    key: "toDo",
    default: [],
    effects_UNSTABLE: [persistAtom],
});

export const toDoSelector = selector({
    key: "toDoSelector",
    get: ({get}) => {
        const toDos = get(toDoState);
        const category = get(categoryState);
        const newCategory = get(newCategoryState);
        return toDos.filter((toDo) => toDo.category === category && newCategory.map(item => (
            toDo.category === item.category
        )));
    },
});

export const categorySelector = selector({
    key: "categorySelector",
    get: ({get}) => {
        const newCategory = get(newCategoryState);
        return [newCategory.map(item => item.category)].flat();
    },
});