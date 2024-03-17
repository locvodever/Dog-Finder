export interface DogBreed {
  id: number;
  name: string;
  bred_for: string;
  breed_group: string;
  reference_image_id: string;
  life_span: string;
  temperament: string;
  height: Unit;
  weight: Unit;
}

export interface Unit {
  imperial:string;
  metric: string;
}