export interface Book extends AdditionalCriteria {
  id: string;
  name: string;
  description: string;
  genres: string[];
  poster: string;
  releaseDate: Date;
}

interface AdditionalCriteria {
  isChecked: boolean;
}
