const categories = [
  {
    id: 1,
    name: "Comédie",
  },
  {
    id: 2,
    name: "Science-Fiction",
  },
];

// Declare the actions
const browse = (res: { json: (arg0: string[]) => void }) => {
  const array = [];
  for (let i = 0; i < categories.length; i++) {
    array.push(categories[i].name);
  }
  res.json(array);
};

const read = (
  req: { params: { id: number } },
  res: { sendStatus: (arg0: number) => void; json: (arg0: string) => void },
) => {
  const itemId = Number(req.params.id);
  const id = itemId - 1;
  console.info(id);

  if (id == null || id > categories.length) {
    res.sendStatus(404);
  } else {
    res.json(categories[id].name);
  }
};
export default { browse, read };
