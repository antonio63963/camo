type User = {
  id: string;
  name: string;
  email: string;
  picture?: string;
  avatar?: string;
};

type Comment = {
  message: string;
  user: User;
};

type PinProps = {
  user: User;
};

type PinDetailsProps = {
  id: string;
  image: string;
  category: string;
  title: string;
  about: string;
  postedBy: User;
  comments?: Comment[];
};

export type { Comment, PinProps, PinDetailsProps };
