
const cors = require('cors');



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
