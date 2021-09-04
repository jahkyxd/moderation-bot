
const config = require("../../config.json");
const db = require("quick.db");
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "isim",
    aliases: ["i", "nickname"],
    run: async (client, message, args) => {
        const embed = new MessageEmbed().setFooter("Developed By Jahky").setAuthor(message.author.username, message.author.avatarURL()).setTimestamp().setColor("00f1ff");
        var member = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
        var name = args[1]
        var age = args[2]
        if (message.member.roles.cache.get(config.registration.staff) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(embed.setDescription("Ne yazık ki komutu kullanan kişide yetki yok"));
        if (!member) return message.channel.send(embed.setDescription("Lütfen bir kullanıcıyı etiketle."));
        if (!name) return message.channel.send(embed.setDescription("Lütfen kullanıcı için bir isim belirt."));
        if (!age) return message.channel.send(embed.setDescription("Lütfen kullanıcı için bir yaş belirt."));

        db.push(`isimler_${member.id}`, ` \`${name} ' ${age}\` (İsim Değiştirme)`);
        message.guild.members.cache.get(member.id).setNickname(`${config.registration.GuilDTag} ${name} | ${age}`);
        message.channel.send(embed.setDescription(`${member} Adlı kullanıcının ismi \`${name} | ${age}\` olarak değiştirildi`));
    }
}