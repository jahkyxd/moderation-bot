const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: 'kke',
    aliases: ["kayıt-yetkilisi"],
    run: async (client, message, args) => {
        const embed = new Discord.MessageEmbed().setFooter("Developed By Jahky").setAuthor(message.author.username, message.author.avatarURL()).setTimestamp().setColor("00f1ff");
        var member = message.mentions.users.first() || message.guild.members.cache.get(args[0])
        if (!member) return message.channel.send(embed.setDescription("Lütfen bir kullanıcıyı etiketle."))
        let kke = db.get(`kke_${member.id}`);
        if (!kke) return message.channel.send(embed.setDescription("Bu kullanıcının kayıt olmamış"))
        message.channel.send(embed.setTitle("Kullanıcı kayıt görevlisi").setDescription(`${kke.join("\n")}`))
    }
}