
# Razor Discord Bot Website 🤖

A modern, responsive website for the Razor Discord Bot built with React, TypeScript, and Tailwind CSS.

![Razor Bot](https://cdn.discordapp.com/attachments/1353227558459801710/1402862019404890183/image.png?ex=68957491&is=68942311&hm=69821be25976deca12e378068ef16c750e6014ba24dab5e28b5d5713f359e875&)
![Premium Section](https://i.imgur.com/KfpXBqb.png)
![Dashboard Section](https://media.discordapp.net/attachments/1353227558459801710/1402498274262388776/image.png?ex=689421cd&is=6892d04d&hm=c3443b99dfaece5d69b76825a5c32865c4732fb04ebe4b81cc48d77e53f1c8f3&=&format=webp&quality=lossless&width=1515&height=825)

## Features ✨

- **Modern Design**: Beautiful, responsive UI with smooth animations
- **Command Browser**: Searchable command list with categories
- **Real-time Stats**: Live bot statistics display
- **Premium Features**: Showcase of premium bot capabilities
- **Documentation**: Comprehensive command documentation
- **Mobile Responsive**: Fully responsive design for all devices

## Customizing Your Website 🚀

You can easily personalize every aspect of the site using the configuration files and React components. Here's how:

### 1. Links and URLs
- **Discord Invite**: Edit the Discord link in `src/config/site.config.ts` under `socialLinks` (platform: "Discord").
- **GitHub Link**: Edit in `src/config/site.config.ts` under `socialLinks` (platform: "GitHub").
- **Twitter Link**: Edit in `src/config/site.config.ts` under `socialLinks` (platform: "Twitter").
- **Footer Links**: All footer links are configurable in the `footerLinks` section of the same file.

### 2. Bot Info & Branding
- **Bot Name**: Change the `botName` property in `src/config/site.config.ts`.
- **Bot Description**: Change the `botDescription` property in `src/config/site.config.ts`.
- **Bot Version**: Change the `botVersion` property in `src/config/site.config.ts`.
- **Server Count**: Change the `totalServers` property in `src/config/site.config.ts`.
- **Bot Avatar**: Set the `botAvatarUrl` property in `src/config/site.config.ts` to your bot's profile image URL. If left empty, a default icon will be shown.

```ts
botAvatarUrl: "https://cdn.discordapp.com/avatars/ID/AVATAR_HASH.png?size=512",
```

### 3. Hero Section (Homepage)
- The Hero section is fully centered and displays: bot name, description, avatar, online status, action buttons, and stats.
- You can control all content via `siteConfig` without editing the component code.
- The "Add to Discord" and "View Commands" buttons are only shown if enabled in the `features` section of the config.

### 4. Other Content
- **Features**: Edit the main features in `src/components/home/Features.tsx`.
- **Commands**: Edit or add commands in `src/data/commands/`.
- **Premium Section**: Edit in `src/pages/Premium.tsx`.
- **Privacy & Terms**: Edit in `src/pages/PrivacyPolicy.tsx` and `src/pages/TermsOfService.tsx`.

### 5. Colors & Styling
- **Theme Colors**: Customize in `src/index.css`.
- **Background**: Edit the `.bg-mesh` class in `src/index.css`.
- **Button Styles**: Edit `.btn-primary` and `.btn-secondary` in `src/index.css`.

---

## 🔐 Discord OAuth Setup

To enable Discord login functionality, make the following changes:

### 1. Set OAuth Credentials

Open `src/config/site.config.ts` and **edit lines 100–103** (especially lines 101 and 102):

- **Line 101**: Set your **Discord Client ID**
- **Line 102**: Set your **OAuth Redirect URI**
- **Line 103**: Other related settings if needed

Example snippet:

```ts
clientId: "YOUR_DISCORD_CLIENT_ID",  // line 101
redirectUri: "https://yourdomain.com/dashboard/login", // line 102
// other config lines here on 103
```

Make sure these match your settings in the [Discord Developer Portal](https://discord.com/developers/applications).

### 2. Add Client Secret

Open `src/services/discordService.ts` and on **line 27**, add your **Discord client secret**:

```ts
const clientSecret = "YOUR_DISCORD_CLIENT_SECRET";
```

> ⚠️ **Important:** Never commit your real client secret to public repositories. Use environment variables or other secure methods in production.

---

### 🧪 Login Behavior Note

The current login system is a **simple OAuth redirect** back to `/dashboard/login`.  
It **does NOT yet fully authenticate or sign users in**—this functionality is planned for a future update.

---

## Tech Stack 🛠️

- React 18
- TypeScript
- Tailwind CSS
- Vite
- Lucide Icons
- React Router

## Getting Started 🚀

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Casper104s/Bot-WebSite.git
cd Casper104s/Bot-WebSite
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The site will be available at `http://localhost:5173`

### Building for Production

To create a production build:

```bash
npm run build
```

The built files will be output to the `dist` directory.

---

## Project Structure 📁

```
src/
├── components/         # React components
│   ├── home/           # Home page components
│   ├── layout/         # Layout components
│   └── stats/          # Statistics components
├── data/               # Static data and configurations
│   └── commands/       # Command categories and definitions
├── pages/              # Page components
├── services/           # API services
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

---

### 📄 API Code Integration

Copy and paste the following code into your bot's main file at line 279 (`index.js`):

> After implementing the API, go to the bot directory, open a CMD terminal, and run:
>
> ```bash
> npm install cors
> ```

```js
const cors = require('cors');
const express = require('express');
const app2 = express();
const port2 = 4104;

app2.use(cors());

client.once('ready', () => {
    app2.get('/bot-info', (req, res) => {
        const totalUsers = client.users.cache.size;
        const totalServers = client.guilds.cache.size;
        const ping = client.ws.ping;
        const command = client.commands.size;
        const channels = client.channels.cache.size;
        const versnode = process.version;
        const uptime = client.uptime;

        const formatUptime = (ms) => {
            const seconds = Math.floor((ms / 1000) % 60);
            const minutes = Math.floor((ms / (1000 * 60)) % 60);
            const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
            return `${hours}h ${minutes}m ${seconds}s`;
        };

        res.json({
            totalUsers,
            totalServers,
            ping,
            command,
            channels,
            versnode,
            uptime: formatUptime(uptime),
        });
    });

    app2.listen(port2, () => {
        console.log(
            `${chalk.white.bold(dayjs().format('DD/MM/YYYY HH:mm:ss'))} - ${chalk.blue.bold('API')} available at: http://localhost:${port2}`
        );
    }).on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.error(`Port ${port2} is already in use. Please use a different port.`);
            process.exit(1);
        } else {
            console.error(`Unexpected error: ${err.message}`);
        }
    });
});
```

---

## Features in Detail 🔍

### Command System
- Searchable command interface
- Category-based organization
- Detailed command documentation
- Permission level indicators

### Premium Features
- Enhanced music capabilities
- Advanced security features
- Custom AI responses
- Premium image generation
- Economy boosts
- Priority support

### Real-time Statistics
- Server count
- User count
- Command usage
- Uptime tracking
- Response time monitoring

---

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project  
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)  
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)  
4. Push to the branch (`git push origin feature/AmazingFeature`)  
5. Open a Pull Request

---

## License 📝

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Contact 📧

- Discord Server: [Join Here](https://discord.gg/22R64TAtvE)  
- Website: [casper.104shop.xyz](https://casper.104shop.xyz)  
- GitHub: [@Casper104s](https://github.com/Casper104s)

---

## Acknowledgments 🙏

- Icons by [Lucide](https://lucide.dev)  
- Built with [React](https://reactjs.org)  
- Styled with [Tailwind CSS](https://tailwindcss.com)
