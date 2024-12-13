const bot = require(__dirname + '/lib/amd');
const { VERSION, LIKE_EMOJI } = require(__dirname + '/config');

const start = async () => {
    Debug.info(`Starting Kerm ${VERSION}`);
    try {
        await bot.init();
        //bot.logger.info('⏳ Database syncing!');
        await bot.DATABASE.sync();
        await bot.connect();

        // Liker automatiquement les statuts WhatsApp
        bot.on('message', async (message) => {
            if (message.status && message.type === 'status') {
                try {
                    // Utilise l'emoji défini dans le fichier config.js pour liker le statut
                    await message.react(LIKE_EMOJI);
                    Debug.info(`Reacted to status with emoji: ${LIKE_EMOJI}`);
                } catch (error) {
                    Debug.error('Error while reacting to status:', error);
                }
            }
        });

    } catch (error) {
        Debug.error(error);
        start();
    }
};

start();