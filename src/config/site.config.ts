export interface FooterLink {
  label: string;
  url: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon?: string;
}

export interface SiteConfig {
  siteName: string;
  siteDescription: string;
  siteUrl: string;
  
  contactEmail: string;
  supportEmail: string;
  
  socialLinks: SocialLink[];
  
  footerLinks: {
    resources: FooterLink[];
    legal: FooterLink[];
    contact: FooterLink[];
  };
  
  botName: string;
  botDescription: string;
  botVersion: string;
  totalServers: number;
  totalUsers: number;
  botAvatarUrl?: string;
  
  features: {
    enableCommands: boolean;
    enableDashboard: boolean;
  };
  
  discord: {
    clientId: string;
    redirectUri: string;
    scopes: string[];
  };
}

// Default configuration
export const siteConfig: SiteConfig = {
  botName: "Razor Bot", //hero
  botDescription: "A powerful Discord bot that brings advanced features and seamless automation to your server.",
  botVersion: "1.0.4",
  totalServers: 30,
  totalUsers: 11, // 11 = 11k to remove the k, go in components/home/hero.tsx and remove/change the K at line 72
  botAvatarUrl: "https://cdn.discordapp.com/avatars/336603767015211008/65641a04db4750063d62b4b44145efbd.png?size=256?size=512",
  
  contactEmail: "contact@domain.com",
  supportEmail: "support@domain.com",
  
  socialLinks: [
    {
      platform: "Discord", //don't change
      url: "https://discord.gg/104shop",
    },
    {
      platform: "GitHub", //don't change
      url: "https://github.com/casper104s",
    },
    {
      platform: "Twitter", //don't change
      url: "https://twitter.com/",
    }
  ],
  
  footerLinks: {
    contact: [
      { label: "Casper", url: "https://casper.104shop.xyz" }, // u can change this
      { label: "Smiley-devv", url: "https://github.com/Smiley-Devv/Bot-WebSite" } // added my contribution as a contact   you're free to  delete me off this but i'd appreciate it!
    ],
    resources: [
      { label: "Documentation", url: "https://docs.domain.com" },
      { label: "Blog", url: "domain.com" },
      { label: "Support", url: "domain.com" }
    ],
    legal: [
      { label: "Privacy Policy", url: "/privacy" },
      { label: "Terms of Service", url: "/terms" }
    ]
  },
  
  
  siteName: "Razor", //footer
  siteDescription: "A powerful Discord bot that brings advanced features and seamless automation to your server.", //footer
  siteUrl: "https://domain.com",

  features: {
    enableCommands: true,
    enableDashboard: true
  },
  
  // chmqp dashboard enjoy
  discord: {
    clientId: "AddyourclientID", // Replace with your Discord application client ID
    redirectUri: "http://localhost:5173/dashboard/callback", // Update for production
    scopes: ["identify", "guilds"]
  }
};

export const getSiteConfig = (): SiteConfig => {
  return siteConfig;
};

export const updateSiteConfig = (updates: Partial<SiteConfig>): SiteConfig => {
  return {
    ...siteConfig,
    ...updates
  };
}; 
