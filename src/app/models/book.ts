export interface Book extends AdditionalCriteria {
  id: string;
  name: string;
  description: string;
  genres: string[];
  poster: string;
  releaseDate: Date;
  price: string;
  quantity: number;
}

interface AdditionalCriteria {
  isChecked: boolean;
}
