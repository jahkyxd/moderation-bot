const Discord = require("discord.js");
const db = require("quick.db");
const config = require("../../config.json");
const moment = require("moment");
moment.locale("tr");

module.exports = {
    name: "erkek",
    aliases: ["e", "boy", "man"],
    run: async (client, message, args) => {
        const embed = new Discord.MessageEmbed().setFooter("Developed By Jahky").setAuthor(message.author.username, message.author.avatarURL()).setTimestamp().setColor("00f1ff");
        var member = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
        var name = args[1]
        var age = args[2]
        if (!message.member.roles.cache.has(config.registration.staff) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(embed.setDescription("Ne yazık ki komutu kullanan kişide yetki yok"));
        if (!member) return message.channel.send(embed.setDescription("Lütfen bir kullanıcıyı etiketle."));
        if (!name) return message.channel.send(embed.setDescription("Lütfen kullanıcı için bir isim belirt."));
        if (!age) return message.channel.send(embed.setDescription("Lütfen kullanıcı için bir yaş belirt."));
        message.guild.members.cache.get(member.id).setNickname(`${config.registration.GuilDTag} ${name} ${config.registration.symbol} ${age}`);
        db.push(`isimler_${member.id}`, ` \`${name} ${config.registration.symbol} ${age}\` (<@&${config.registration.oneman}>)`);
        db.add(`erkek_${message.author.id}`, 1)
        db.add(`toplam_${message.author.id}`, 1)
        db.push(`kke_${member.id}`, `${message.author} \`${moment(Date.now()).format("LLL")}\` (<@&${config.registration.oneman}>)`)
        await message.guild.members.cache.get(member.id).roles.add(config.registration.man);
        await message.guild.members.cache.get(member.id).roles.remove(config.registration.unregistered)
        message.channel.send(embed.setDescription(`${member} Adlı kullanıcı \`${name} ' ${age}\` olarak kayıt edildi`));
        client.channels.cache.get(config.channels.chat).send(`${member} Aramıza katıldı, ona **merhaba** diyelim`);
    }
}
