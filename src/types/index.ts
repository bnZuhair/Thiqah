export interface NavItem {
  title: string;
  href: string;
  disabled?: boolean;
}

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  navItems?: NavItem[];
}
