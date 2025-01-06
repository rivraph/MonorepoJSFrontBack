import { useNavigate } from "react-router-dom";
import CategoryForm from "./CategoryForm";

const category = { id: 1, name: "Comédie musicale" };

type categoryType = {
  id: number;
  name: string;
};

function CategoryEdit() {
  const navigate = useNavigate();

  const handleSubmit = (categoryData: categoryType) => {
    fetch(`${import.meta.env.VITE_API_URL}/api/categories/${category.id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoryData),
    }).then((response) => {
      if (response.status === 204) {
        navigate(`/categories/${category.id}`);
      }
    });
  };
  return (
    category && (
      <div>
        <CategoryForm defaultValue={category} onSubmit={handleSubmit}>
          Modifier
        </CategoryForm>
      </div>
    )
  );
}

export default CategoryEdit;
