module.exports = {
    name: "kilit",
    aliases: [],
    run: async (client, message, args) => {
        if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send(`Bu komutu kullanabilmek için öncelikle gerekli yetkin olmalı.`);
        const content = args[0];

        if (content === "aç") {
            let every = message.guild.roles.cache.find(r => r.name === '@everyone')
            message.channel.createOverwrite(every, {
                'SEND_MESSAGES': null,

            })


            message.channel.send('Kanal kilidi açıldı!');
        }

        if (content === "kapat") {
            let every = message.guild.roles.cache.find(r => r.name === "@everyone");
            message.channel.createOverwrite(every, {
                SEND_MESSAGES: false
            });

            message.channel.send("Kanal kilitlendi!");
        }
    }

}
