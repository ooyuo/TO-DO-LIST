import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, Categories, toDoState, newCategoryState, wannaCreateCategory } from "../atoms";

interface ICategory {
    category: string;
}

function CreateCategory() {
    const cate = useRecoilValue(newCategoryState);
    const setCategories = useSetRecoilState(newCategoryState);
    const {register, handleSubmit, setValue} = useForm<ICategory>();
    const handleValid = ({category}: ICategory) => {
        setCategories((oldCategory) => [
            {category},
            ...oldCategory,
        ]);
        setValue("category", "");
    };
 console.log(cate);
    return (
        <form onSubmit={handleSubmit(handleValid)}>
            <input 
                {...register("category")}
                placeholder="Write a category"
            />
            <button>Add</button>
        </form>
    )
}

export default CreateCategory;