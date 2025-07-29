export interface BlogPost {
  id?: { $t: string } | string;
  title?: { $t: string } | string;
  content?: { $t: string } | string;
  description?: { $t: string } | string;
  published?: { $t: string } | string;
  images?: string[];
  image?: string;
  author?: Array<{
    name?: { $t: string };
    email?: { $t: string };
    'gd$image'?: { src: string; height: string; width: string };
  }>;
}
