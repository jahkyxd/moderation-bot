const Discord = require('discord.js');
const db = require('quick.db');
const config = require("../../config.json");
const limit = new Map();
const moment = require("moment");
moment.locale("tr");
const ms = require("ms")

module.exports = {
  name: "mute",
  aliases: ["mute"],
  run: async (client, message, args) => {
    if (!message.member.roles.cache.has(config.penals.mute.staff) && !message.member.hasPermission("ADMİNİSTRATOR")) {
      return message.channel.send("Bu komutu kullanabilmek için öncelikle gerekli yetkin olmalı!");
    }
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    let user = message.guild.member(member)
    let reason = args.splice(2).join(" ") || "Sebep belirtilmedi."
    let sure = args[1]
    if (!user) return message.channel.send(embed.setDescription(`${message.author} Lütfen bir kullanıcı belirtiniz`));
    if (!sure) return message.channel.send(embed.setDescription(`${message.author} Lütfen bir süre belirtiniz`));
    sure
      .replace("s", " Saniye")
      .replace("m", " Dakika")
      .replace("h", " Saat")
      .replace("d", " Gün")
    if (config.penals.mute.limit > 0 && limit.has(message.author.id) && limit.get(message.author.id) == config.penals.mute.limit) return message.channel.send("Saatlik mute sınırına ulaştın!");
    if (!message.member.hasPermission(8) && member && member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send("Kendinle aynı yetkide ya da daha yetkili olan birini muteleyemezsin!");

    message.channel.send(`**${member}** kullanıcısı ${message.author} tarafından başarıyla susturuldu!`)
    member.roles.add(config.penals.mute.roles)

    const embed = new Discord.MessageEmbed()
      .setColor("0x00AE86")
      .setTimestamp()
      .addField('Mutelenen:', `${member.tag} (${member} - ${member.id})`)
      .addField('Muteleyen:', `${message.author.username}#${message.author.discriminator} (${message.author} - ${message.author.id})`)
      .addField('Mute sebebi', reason)
      .addField("Mute Tarihi", `${moment(Date.now()).format("LLL")}`)
    message.guild.channels.cache.get(config.penals.mute.log).send(embed);
    db.push(`sicil_${member.id}`, `${message.author} tarafından ${moment(Date.now()).format("LLL")} tarihinde ${reason} sebebiyle **[ MUTE ]** cezası almış.`)
    db.add(`points_${member}`, config.penals.points.mutepoints);
    if (config.penals.mute.limit > 0) {
      if (!limit.has(message.author.id)) limit.set(message.author.id, 1);
      else limit.set(message.author.id, limit.get(message.author.id) + 1);
      setTimeout(() => {
        if (limit.has(message.author.id)) limit.delete(message.author.id);
      }, 1000 * 60 * 60)

      setTimeout(async () => {
        member.roles.remove(config.penals.mute.roles)
        message.guild.channels.cache.get(config.penals.mute.log).send(`${member} kullanıcısının mute süresi bittiği için mutesi açıldı!`)
      }, ms(args[1]));
    }
  }
}