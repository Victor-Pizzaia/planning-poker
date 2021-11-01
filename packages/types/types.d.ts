import { fibonacci } from "../client/src/components/Card/types";

export type Status = "inVoting" | "closed" | "finished";

export type LoginProp = {
  userName: string;
  roomName: string;
  isOwner: boolean;
};

export type User = {
  id: string;
  name: string;
};

export type Answer = {
  user: User;
  vote: fibonacci;
};

export type Voting = {
  id: string;
  status: Status;
  answers?: Answer[];
  average?: number;
};

export type Room = {
  name: string;
  owner: User;
  votings?: Voting[];
  users?: User[];
};
