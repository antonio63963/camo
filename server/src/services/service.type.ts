type ListType = {
  id?: string;
  title: string;
  isPublic?: boolean;
  materials: number;
};

type Material = {
  listId: string;
  title: string;
  url: string;
  _id?: string;
  id?: string;
};

type User = {
  email: string;
  password: string;
}

export type {
  ListType,
  Material,
  User,
};
