import React from "react";

type CategoryFormProps = {
  defaultValue: {
    id: number;
    name: string;
  };
  onSubmit: (categoryData: { id: number; name: string }) => void;
  children?: React.ReactNode; // <== Ajout de `children`
};

function CategoryForm({ defaultValue, onSubmit, children }: CategoryFormProps) {
  const [formData, setFormData] = React.useState(defaultValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nom de la catégorie :
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </label>
      <button type="submit">{children}</button>
    </form>
  );
}

export default CategoryForm;
