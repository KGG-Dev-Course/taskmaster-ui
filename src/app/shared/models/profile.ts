export interface Profile {
  id: number;
  firstName: string;
  lastName: string;
  aboutMe: string;
  phoneNumber: string;
  birthday: string;
  gender: string;
  photo: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProfileUploadResult {
  success: boolean;
  filePath: string;
  fileName: string;
}
