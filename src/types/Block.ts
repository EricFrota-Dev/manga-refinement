export type Block = {
  text: string;
  positionX: number;
  positionY: number;
  width: number;
  height: number;
};
export type Page = {
  image_info: img_info;
  blocks: Block[];
  page_number: number;
};

export type img_info = {
  url: string;
  width: number;
  height: number;
};

export type Manga = {
  title: string;
  pages_length: number;
  artists: string[];
  tags: string[];
  parodies: string[];
  imgs_info: img_info[];
  pages: Page[];
};
