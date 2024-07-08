export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
    github: string;
  };
};

interface Project {
  id: number;
  name: string;
  description?: string | null;
  due: Date;
  client: string;
}
