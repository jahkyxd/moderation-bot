const { MessageEmbed } = require("discord.js");
const config = require("../../config.json")
module.exports = {
    name: 'say',
    aliases: ["count", "sayı"],
    run: async (client, message, args) => {
        var TotalMember = message.guild.memberCount
        var Online = message.guild.members.cache.filter(off => off.presence.status !== 'offline').size;
        var Taglı = message.guild.members.cache.filter(u => u.user.username.includes(config.registration.GuilDTag)).size;
        var Voice = message.guild.members.cache.filter(s => s.voice.channel).size;
        var Boost = message.guild.premiumSubscriptionCount;

        message.channel.send(new MessageEmbed().setDescription(`
    \`❯\` Sunucumuzda toplam **${TotalMember}** kullanıcı bulunmaktadır.
    \`❯\` Sunucumuzda toplam **${Online}** aktif kullanıcı bulunmaktadır.
    \`❯\` Toplam **${Taglı}** \`${config.registration.GuilDTag}\` kişi tagımızda bulunuyor.
    \`❯\` Seste **${Voice}** kullanıcı bulunmaktadır.
    \`❯\` Sunucuya toplam **${Boost}** takviye yapılmıştır. 
    `))
    }
}