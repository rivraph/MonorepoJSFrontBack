import { useNavigate } from "react-router-dom";
import CategoryForm from "./CategoryForm";

type CategoryData = {
  name: string;
};
function CategoryNew() {
  const navigate = useNavigate();

  const newCategory = {
    id: 0,
    name: "",
  };

  return (
    <CategoryForm
      defaultValue={newCategory}
      onSubmit={(categoryData: CategoryData) => {
        fetch(`${import.meta.env.VITE_API_URL}/api/categories`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(categoryData),
        })
          .then((response) => response.json())
          .then((data) => {
            navigate(`/categories/${data.insertId}`);
          });
      }}
    >
      Ajouter
    </CategoryForm>
  );
}

export default CategoryNew;
