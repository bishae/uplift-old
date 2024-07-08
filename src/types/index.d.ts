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
  name: string;
  description?: string | null;
  due: Date;
  client: string;
}
