export type CategoryId =
  | "fsd"
  | "hardware"
  | "robotaxi"
  | "robotics"
  | "energy"
  | "inventions";

export type Motif =
  | "radar"
  | "chip"
  | "cab"
  | "robot"
  | "cell"
  | "truck"
  | "wing"
  | "camera"
  | "grid"
  | "fleet"
  | "steer"
  | "bolt";

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readMinutes: number;
  category: CategoryId;
  hardware: string;
  version?: string;
  featured?: boolean;
  motif: Motif;
  author: string;
  location: string;
  body: string[];
};
