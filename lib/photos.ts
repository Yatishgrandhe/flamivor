export const photos = {
  collaboration: {
    src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    alt: "Three people smiling and collaborating around a table with laptops and notebooks",
    photographer: "Brooke Cagle",
    source: "https://unsplash.com/photos/three-people-sitting-in-front-of-table-laughing-together-g1Kr4Ozfoac",
  },
  study: {
    src: "https://images.unsplash.com/photo-1762512346988-045f4d5ad2b3",
    alt: "Overhead view of students studying together at a long library table",
    photographer: "Jaykumar Bherwani",
    source: "https://unsplash.com/photos/students-studying-together-at-a-long-table-Dg8WzlOE1as",
  },
  classroom: {
    src: "https://images.unsplash.com/photo-1758270703813-2ecf235a6462",
    alt: "Students taking notes and listening together in a sunlit classroom",
    photographer: "Vitaly Gariev",
    source: "https://unsplash.com/photos/students-listen-to-a-lecture-in-a-classroom-8c0ndhIXDzQ",
  },
} as const;

export type ChapterPhoto = (typeof photos)[keyof typeof photos];
