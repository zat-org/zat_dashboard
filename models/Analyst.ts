export interface createAnalyst {
  fullName: string;
  Image: File|string;
}
export interface analystI {
  id: string;
  fullName: string;
  imageUrl: string;
  studios: any;
}
export interface updateAnalyst {
  fullName?: string;
  Image?: File|string;
}