const Discord = require("discord.js");
const config = require("../../config.json");
module.exports = {
    name: "sesli",
    aliases: ["seslisay"],
    run: async (client, message, args) => {
        let pub = message.guild.channels.cache.filter(x => x.parentID === config.parents.publicparents && x.type == "voice").map(u => u.members.size).reduce((a, b) => a + b)
        let ses = message.guild.members.cache.filter(x => x.voice.channel).size
        let tagges = message.guild.members.cache.filter(x => {
            return x.user.username.includes(config.registration.GuildTag) && x.voice.channel 
        }).size
        let notag = message.guild.members.cache.filter(x => {
            return !x.user.username.includes(config.registration.GuildTag) && x.voice.channel
        }).size
        let yetkili = message.guild.members.cache.filter(x => {
            return x.user.username.includes(config.registration.GuildTag) && x.voice.channel && x.roles.cache.has(config.meeting.yetkili)
        }).size
        const embed = new Discord.MessageEmbed()
            .setDescription(`Sesli kanallarda toplam **${ses}** kullanıcı bulunmaktadır!
───────────────
\`❯\` Public odalarda **${pub}** kullanıcı bulunmaktadır!
\`❯\` Ses kanallarında **${notag}** normal kullanıcı bulunmaktadır!
\`❯\` Ses kanallarında **${tagges}** taglı kullanıcı bulunmaktadır!
\`❯\` Ses kanallarında toplam **${yetkili}** yetkili bulunmaktadır!
───────────────`)
        return message.channel.send(embed)
    }
}