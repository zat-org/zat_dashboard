// craete
export interface officiantCreate {
  name: string;
  Image: string | File;
  startOfficiantingOn: Date | string;
}

export interface officiantUpdate {
  name?: string;
  Image?: string | File;
  startOfficiantingOn?: Date | string;
}

export interface officiantI {
  id: string;
  name: string;
  imageUrl: string;
  startOfficiantingOn: string;
}
// select All
