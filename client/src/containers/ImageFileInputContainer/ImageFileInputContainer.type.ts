type InputProps = {
  imageAsset: File | null;
  setImageAsset: (file: File | null) => void;
  imageLink: string;
  setImageLink: (data: string) => void;
  errorMessage: string;
};

export type {
  InputProps,
}