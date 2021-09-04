const { MessageEmbed } = require("discord.js")
const db = require("quick.db");
module.exports = {
    name: "kayıtsayı",
    aliases: ["teyitler", "kayıtsayım"],
    run: async (client, message, args) => {
        const embed = new MessageEmbed().setFooter("Developed By Jahky").setAuthor(message.author.username, message.author.avatarURL()).setTimestamp().setColor("00f1ff");
        var member = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author;
        let erkek = db.get(`erkek_${member.id}`) || 0;
        let kadın = db.get(`kadın_${member.id}`) || 0;
        let toplam = db.get(`toplam_${member.id}`) || 0;
        message.channel.send(embed.setDescription(`${member} kullanıcısının toplam: **${toplam}**, toplam erkek: **${erkek}**, toplam kadın: **${kadın}** kaydı bulunmakta`));
    }
}