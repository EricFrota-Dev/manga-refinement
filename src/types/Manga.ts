export type Block = {
  text: string;
  positionX: number;
  positionY: number;
  width: number;
  height: number;
  isElipse: boolean;
  backgroun_color: string;
  border_color: string;
  text_color: string | null;
  text_size: number;
  extra_styles: string | null;
};
export type Page = {
  page_number: number;
  img_url: string;
  page_height: number;
  page_width: number;
  blocks: Block[];
};

export type Manga = {
  id: number;
  title: string;
  pages_length: number;
  artists: string[];
  tags: string[];
  parodies: string[];
  isRevised: boolean;
};
