export type LinkCategory = 'all' | 'direct' | 'creative' | 'career';

export interface LinkItem {
  id: string;
  category: 'direct' | 'creative' | 'career';
  categoryLabel: string;
  title: string;
  subtitle: string;
  targetName: string;
  url: string;
  actionLabel: string;
  copyValue: string;
  copyLabel: string;
  iconType: 'linkedin' | 'instagram' | 'facebook' | 'tiktok' | 'whatsapp' | 'phone' | 'document';
  featured?: boolean;
  isExternalLink: boolean;
  highlightNote?: string;
}
