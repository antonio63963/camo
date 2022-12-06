type InputProps = {
  imageAsset: File | null;
  setImageAsset: (file: File | null) => void;
  imageLink: string;
  setImageLink: (data: string) => void;
};

export type {
  InputProps,
}