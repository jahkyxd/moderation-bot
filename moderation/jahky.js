const { Client, MessageEmbed, Collection } = require("discord.js");
const Discord = require("discord.js");
const client = new Client()
const { readdirSync } = require("fs");
const config = require("./config.json");
const db = require("quick.db");
const moment = require('moment');
const ms = require("ms")
const commands = client.commands = new Collection();
const aliases = client.aliases = new Collection();

client.on("ready", () => {
    client.user.setPresence({ activity: { name: "Jahky. ❤️ " }, status: "dnd" })
    client.channels.cache.get(config.channels.voicechannel).join()
}) 

readdirSync('./commands/Global', { encoding: 'utf8' }).filter(file => file.endsWith(".js")).forEach((files) => {
    let command = require(`./commands/Global/${files}`);
    commands.set(command.name, command);
    if (!command.aliases || command.aliases.length < 1) return
    command.aliases.forEach((otherUses) => { aliases.set(otherUses, command.name); })
})

readdirSync('./commands/Register', { encoding: 'utf8' }).filter(file => file.endsWith(".js")).forEach((files) => {
    let command = require(`./commands/Register/${files}`);
    commands.set(command.name, command);
    if (!command.aliases || command.aliases.length < 1) return
    command.aliases.forEach((otherUses) => { aliases.set(otherUses, command.name); })
})

readdirSync('./commands/Owner', { encoding: 'utf8' }).filter(file => file.endsWith(".js")).forEach((files) => {
    let command = require(`./commands/Owner/${files}`);
    commands.set(command.name, command);
    if (!command.aliases || command.aliases.length < 1) return
    command.aliases.forEach((otherUses) => { aliases.set(otherUses, command.name); })
})

readdirSync('./commands/Penal', { encoding: 'utf8' }).filter(file => file.endsWith(".js")).forEach((files) => {
    let command = require(`./commands/Penal/${files}`);
    commands.set(command.name, command);
    if (!command.aliases || command.aliases.length < 1) return
    command.aliases.forEach((otherUses) => { aliases.set(otherUses, command.name); })
})

readdirSync('./commands/Talent', { encoding: 'utf8' }).filter(file => file.endsWith(".js")).forEach((files) => {
    let command = require(`./commands/Talent/${files}`);
    commands.set(command.name, command);
    if (!command.aliases || command.aliases.length < 1) return
    command.aliases.forEach((otherUses) => { aliases.set(otherUses, command.name); })
})

readdirSync('./commands/Advanced', { encoding: 'utf8' }).filter(file => file.endsWith(".js")).forEach((files) => {
    let command = require(`./commands/Advanced/${files}`);
    commands.set(command.name, command);
    if (!command.aliases || command.aliases.length < 1) return
    command.aliases.forEach((otherUses) => { aliases.set(otherUses, command.name); })
})

readdirSync('./commands/Talent', { encoding: 'utf8' }).filter(file => file.endsWith(".js")).forEach((files) => {
    let command = require(`./commands/Talent/${files}`);
    commands.set(command.name, command);
    if (!command.aliases || command.aliases.length < 1) return
    command.aliases.forEach((otherUses) => { aliases.set(otherUses, command.name); })
})

client.on('message', message => {
    if (!message.guild || message.author.bot || !message.content.startsWith(config.bot.prefix)) return;
    const args = message.content.slice(1).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
    const owner = client.users.cache.get("618444525727383592");
    const embed = new MessageEmbed()
        .setColor(message.member.displayHexColor)
        .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true, size: 2048 }))
        .setFooter("Developed by Jahky", owner.avatarURL({ dynamic: true }))
    if (!cmd) return;
    cmd.run(client, message, args, embed);
})

client.on("guildBanRemove", function (guild, user) {
    if (db.get(`ban.${user.id}`) === true) guild.members.ban(user.id, { reason: "Açılmaz banke." })
});

client.on('voiceStateUpdate', async (oldState, newState) => {
    if (!oldState.channelID && newState.channelID) return newState.guild.channels.cache.get(config.logs.voicelog).send(`${newState.guild.members.cache.get(newState.id).displayName} üyesi \`${newState.guild.channels.cache.get(newState.channelID).name}\` adlı sesli kanala girdi!`);
    if (oldState.channelID && !newState.channelID) return newState.guild.channels.cache.get(config.logs.voicelog).send(`${newState.guild.members.cache.get(newState.id).displayName} üyesi \`${newState.guild.channels.cache.get(oldState.channelID).name}\` adlı sesli kanaldan ayrıldı!`);
    if (oldState.channelID && newState.channelID && oldState.channelID != newState.channelID) return newState.guild.channels.cache.get(config.logs.voicelog).send(`${newState.guild.members.cache.get(newState.id).displayName} üyesi ses kanalını değiştirdi! (\`${newState.guild.channels.cache.get(oldState.channelID).name}\` - \`${newState.guild.channels.cache.get(newState.channelID).name}\`)`);
    if (oldState.channelID && oldState.selfMute && !newState.selfMute) return newState.guild.channels.cache.get(config.logs.voicelog).send(`${newState.guild.members.cache.get(newState.id).displayName} üyesi \`${newState.guild.channels.cache.get(newState.channelID).name}\` adlı sesli kanalda kendi susturmasını kaldırdı!`);
    if (oldState.channelID && !oldState.selfMute && newState.selfMute) return newState.guild.channels.cache.get(config.logs.voicelog).send(`${newState.guild.members.cache.get(newState.id).displayName} üyesi \`${newState.guild.channels.cache.get(newState.channelID).name}\` adlı sesli kanalda kendini susturdu!`);
    if (oldState.channelID && oldState.selfDeaf && !newState.selfDeaf) return newState.guild.channels.cache.get(config.logs.voicelog).send(`${newState.guild.members.cache.get(newState.id).displayName} üyesi \`${newState.guild.channels.cache.get(newState.channelID).name}\` adlı sesli kanalda kendi sağırlaştırmasını kaldırdı!`);
    if (oldState.channelID && !oldState.selfDeaf && newState.selfDeaf) return newState.guild.channels.cache.get(config.logs.voicelog).send(`${newState.guild.members.cache.get(newState.id).displayName} üyesi \`${newState.guild.channels.cache.get(newState.channelID).name}\` adlı sesli kanalda kendini sağırlaştırdı!`);
});

client.on('messageDelete', (message) => {
    if (!message.guild || message.author.bot) return;

    client.channels.cache.get(config.logs.messagelog).send(embed.setAuthor("Mesaj Silindi", message.author.avatarURL({ dynamic: true }))
        .addField("🔹 **Mesaj Sahibi**", `${message.author.tag}`, true)
        .addField("🔹 **Mesaj Kanalı**", `${message.channel}`, true)
        .addField("🔹 **Mesaj Silinme Tarihi**", `**${moment().format('LLL')}**`, true)
        .setDescription(`🔹 **Silinen mesaj:** \`${message.content.replace("`", "")}\``)
        .setTimestamp()
        .setColor("#00a3aa")
        .setFooter("Mesaj silindiği saat:")
        .setThumbnail(message.guild.iconURL({ dynamic: true })))
})

client.on("messageDelete", async (message) => {
    if (message.channel.type === "dm" || !message.guild || message.author.bot) return;
    let snipe = {
        mesaj: message.content,
        mesajyazan: message.author.id,
        ytarihi: message.createdTimestamp,
        starihi: Date.now(),
        kanal: message.channel.id
    }
    await db.set(`snipe.${message.guild.id}`, snipe)
});

client.on("message", message => {
    if (!message.guild) return;
    if (message.content.includes(`afk`)) return;
    let etiket = message.mentions.users.first()
    let uye = db.fetch(`user_${message.author.id}_${message.guild.id}`)
    let nickk = db.fetch(`nick_${message.author.id}_${message.guild.id}`)
    if (etiket) {
        let reason = db.fetch(`sebep_${etiket.id}_${message.guild.id}`)
        let uye2 = db.fetch(`user_${etiket.id}_${message.guild.id}`)
        if (message.content.includes(uye2)) {
            let time = db.fetch(`afktime_${message.guild.id}`);
            let timeObj = ms(Date.now() - time);
            message.channel.send(embed.setDescription(`${etiket} adlı kullanıcı **${reason}** sebebiyle \`${timeObj}\` süresi boyunca afk.`).setColor("#2F3136"))
        }
    }
    if (message.author.id === uye) {
        message.member.setNickname(nickk)
        db.delete(`sebep_${message.author.id}_${message.guild.id}`)
        db.delete(`user_${message.author.id}_${message.guild.id}`)
        db.delete(`nick_${message.author.id}_${message.guild.id}`)
        db.delete(`user_${message.author.id}_${message.guild.id}`);
        db.delete(`afktime_${message.guild.id}`)
        message.reply(`Başarıyla \`AFK\` modundan çıkış yaptın.`)
    }
})

client.on("messageDelete", async message => {
    if (message.channel.type === "dm" || !message.guild || message.author.bot) return;
    await db.set(`snipe.${message.guild.id}.${message.channel.id}`, { yazar: message.author.id, yazilmaTarihi: message.createdTimestamp, silinmeTarihi: Date.now(), dosya: message.attachments.first() ? true : false });
    if (message.content) db.set(`snipe.${message.guild.id}.${message.channel.id}.icerik`, message.content);
});

client.on('guildMemberAdd', (member) => {
    if (member.user.bot) return;
    db.add(`girişçıkış.${member.id}`, 1);
    if (db.get(`girişçıkış.${member.id}`) >= 3) {//3 defa çık gir yaparsa
        member.guild.members.ban(member.id, { reason: `Sunucudan kısa sürede çok fazla gir çık yapmak.` })
        client.channels.cache.get(config.penals.ban.log).send(`${member} adlı kullanıcı sunucuya kısa süre içinde defalarca çık gir yaptığı için sunucudan banlandı!`)
        member.send("Sunucuya kısa süre içinde defalarca çık gir yaptığın için sunucudan banlandın!")
    }
});
setInterval(function() {
    db.all().filter(data => data.ID.endsWith("girişçıkış")).forEach(data => {
        db.delete(data.ID)
    })
}, 60 * 1000 * 5)

const iltifatlar = [
'Gözlerindeki saklı cenneti benden başkası fark etsin istemiyorum.',
  'Mavi gözlerin, gökyüzü oldu dünyamın.',
  'Parlayan gözlerin ile karanlık gecelerime ay gibi doğuyorsun.',
  'Huzur kokuyor geçtiğin her yer.',
  'Öyle bir duru güzelliğin var ki, seni gören şairler bile adına günlerce şiir yazardı.',
  'Gözlerinin hareketi bile yeter  benim aklımı başımdan almaya.',
  'Güller bile kıskanır seni gördükleri zaman kendi güzelliklerini.',
   'Hiç yazılmamış bir şiirsin sen, daha önce eşi benzeri olmayan.',
   'Adım şaire çıktı civarda. Kimse senin şiir olduğunun farkında değil henüz.',
   'Etkili gülüş kavramını ben senden öğrendim.',
   'Seni anlatmaya kelimeler bulamıyorum. Nasıl anlatacağımı bilemediğim için seni kimselere anlatamıyorum.',
   'Gözlerinle baharı getirdin garip gönlüme.',
   'Bir gülüşün ile çiçek açıyor bahçemdeki her bir çiçek.',
   'Yuva kokuyor kucağın. Sarılınca seninle yuva kurası geliyor insanın.',
   'Sen bu  dünyadaki bütün şarkıların tek sahibisin. Sana yazılıyor bütün şarkılar ve şiirler. Adın geçiyor bütün namelerde.',
   'Seni yüreğimde taşıyorum ben, sırtımda taşımak ne kelime. Ömrüm boyunca çekmeye hazırım her anlamda senin yükünü.',
   'Hayatıma gelerek hayatımdaki bütün önemli şeylerin önemsiz olmasını sağladın. Artık sensin tek önem verdiğim şu hayatta.',
   'Sen benim bu hayattaki en büyük duamsın.  Gözlerin adeta bir ay parçası. Işık oluyorsun karanlık gecelerime.',
   'Aynı zaman diliminde yaşamak benim için büyük ödüldür.',
  'Biraz Çevrendeki İnsanları Takarmısın ?',
  'İğrenç İnsansın!',
   'Kalbime giden yolu aydınlatıyor gözlerin.  Sadece sen görebilirsin kalbimi. Ve sadece ben hissedebilirim bana karşı olan hislerini.',
   'Onu Bunu Boşver de bize gel 2 bira içelim.',
    'Taş gibi kızsın ama okey taşı… Elden elde gidiyorsun farkında değilsin.',
    'Jahky seni çok sevdi...',
    'Jahky seni çok sevdi...',
    'Jahky seni çok sevdi...',
    'Jahky seni çok sevdi...',
    'Jahky seni çok sevdi...',
    'Jahky seni çok sevdi...',
    'Jahky seni çok sevdi...',
    'Jahky seni çok sevdi...',
    'Jahky seni çok sevdi...',
    'Jahky seni çok sevdi...',
    'Jahky seni çok sevdi...',
    'Jahky seni çok sevdi...',
    'Mucizelerden bahsediyordum.',
  "Yaşanılacak en güzel mevsim sensin.",
  "Sıradanlaşmış her şeyi, ne çok güzelleştiriyorsun.",
  "Gönlüm bir şehir ise o şehrin tüm sokakları sana çıkar.",
  "Birilerinin benim için ettiğinin en büyük kanıtı seninle karşılaşmam.",
  "Denize kıyısı olan şehrin huzuru birikmiş yüzüne.",
  "Ben çoktan şairdim ama senin gibi şiiri ilk defa dinliyorum.",
  "Gece yatağa yattığımda aklımda kalan tek gerçek şey sen oluyorsun.",
  "Ne tatlısın sen öyle. Akşam gel de iki bira içelim.",
  "Bir gamzen var sanki cennette bir çukur.",
  "Gecemi aydınlatan yıldızımsın.",
  "Ponçik burnundan ısırırım seni",
  "Bu dünyanın 8. harikası olma ihtimalin?",
  "fıstık naber?",
  "Dilek tutman için yıldızların kayması mı gerekiyor illa ki? Gönlüm gönlüne kaydı yetmez mi?",
  "Süt içiyorum yarım yağlı, mutluluğum sana bağlı.",
  "Müsaitsen aklım bu gece sende kalacak.",
  "Gemim olsa ne yazar liman sen olmadıktan sonra...",
  "Gözlerimi senden alamıyorum çünkü benim tüm dünyam sensin.",
  "Sabahları görmek istediğim ilk şey sensin.",
  "Mutluluk ne diye sorsalar- cevabı gülüşünde ve o sıcak bakışında arardım.",
  "Hayatım ne kadar saçma olursa olsun, tüm hayallerimi destekleyecek bir kişi var. O da sensin, mükemmel insan.",
  "Bir adada mahsur kalmak isteyeceğim kişiler listemde en üst sırada sen varsın.",
  "Sesini duymaktan- hikayelerini dinlemekten asla bıkmayacağım. Konuşmaktan en çok zevk aldığım kişi sensin.",
  "Üzerinde pijama olsa bile, nasıl oluyor da her zaman bu kadar güzel görünüyorsun? Merhaba, neden bu kadar güzel olduğunu bilmek istiyorum.",
  "Çok yorulmuş olmalısın. Bütün gün aklımda dolaşıp durdun.",
  "Çocukluk yapsan da gönlüme senin için salıncak mı kursam?",
  "Sen birazcık huzur aradığımda gitmekten en çok hoşlandığım yersin.",
  "Hangi çiçek anlatır güzelliğini? Hangi mevsime sığar senin adın. Hiçbir şey yeterli değil senin güzelliğine erişmeye. Sen eşsizsin...",
  "Rotanızı geçen her geminin ışığıyla değil, yıldızlara göre ayarlayın.",
  "Telaşımı hoş gör, ıslandığım ilk yağmursun.",
  "Gülüşün ne güzel öyle- cumhuriyetin gelişi gibi..."
];
// İLTİFATLARI BU ŞEKİLDE İSTEDİĞİNİZ KADAR ÇOĞALTABİLİRSİNİZ
var iltifatSayi = 0; // Buraya ellemeyin!
client.on("message", async message => {
    if (message.channel.id !== config.channels.chat || message.author.bot) return;
    iltifatSayi++
    if (iltifatSayi >= 50) { // 50 yazan yer, 50 mesajda bir iltifat edeceğini gösterir, değiştirebilirsiniz.
        iltifatSayi = 0;
        const random = Math.floor(Math.random() * ((iltifatlar).length - 1) + 1);
        message.reply(`**${(iltifatlar)[random]}**`);
    };
});

client.on('guildMemberAdd', (member) => {
    if (member.user.bot) return;
    var kurulus = (Date.now() - member.user.createdTimestamp);
    var zaman = moment.duration(kurulus).format("Y [Yıl], M [Ay]");
    var zaman2 = moment.duration(kurulus).format("DD [Gün], HH [saat], mm [dakika], ss [saniye]");
    let date = moment(member.user.createdAt)
    const startedAt = Date.parse(date);
    var msecs = Math.abs(new Date() - startedAt);
    const years = Math.floor(msecs / (1000 * 60 * 60 * 24 * 365));
    msecs -= years * 1000 * 60 * 60 * 24 * 365;
    const months = Math.floor(msecs / (1000 * 60 * 60 * 24 * 30));
    msecs -= months * 1000 * 60 * 60 * 24 * 30;
    const weeks = Math.floor(msecs / (1000 * 60 * 60 * 24 * 7));
    msecs -= weeks * 1000 * 60 * 60 * 24 * 7;
    const days = Math.floor(msecs / (1000 * 60 * 60 * 24));
    msecs -= days * 1000 * 60 * 60 * 24;
    const hours = Math.floor(msecs / (1000 * 60 * 60));
    msecs -= hours * 1000 * 60 * 60;
    const mins = Math.floor((msecs / (1000 * 60)));
    msecs -= mins * 1000 * 60;
    const secs = Math.floor(msecs / 1000);
    msecs -= secs * 1000;
    var string = "";
    if (years > 0) string += `${years} yıl ${months} ay`
    else if (months > 0) string += `${months} ay ${weeks > 0 ? weeks + " hafta" : ""}`
    else if (weeks > 0) string += `${weeks} hafta ${days > 0 ? days + " gün" : ""}`
    else if (days > 0) string += `${days} gün ${hours > 0 ? hours + " saat" : ""}`
    else if (hours > 0) string += `${hours} saat ${mins > 0 ? mins + " dakika" : ""}`
    else if (mins > 0) string += `${mins} dakika ${secs > 0 ? secs + " saniye" : ""}`
    else if (secs > 0) string += `${secs} saniye`
    string = string.trim();
    let endAt = member.user.createdAt
    let gün = moment(new Date(endAt).toISOString()).format('DD')
    let ay = moment(new Date(endAt).toISOString()).format('MM').replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık")
    let yıl = moment(new Date(endAt).toISOString()).format('YYYY')
    let saat = moment(new Date(endAt).toISOString()).format('HH:mm')
    let kuruluş = `${gün} ${ay} ${yıl} ${saat}`;
    if (kurulus > 604800000) {
        member.setNickname(config.registration.autonickname);
        member.roles.add(config.registration.unregistered);
        client.channels.cache.get(config.channels.welcomechannel).send(`**:tada: ${config.Guild.GuilDName}'e** hoş geldin, ${member}!
      
      Hesabın **${kuruluş}** tarihinde **${zaman}** önce  açılmış
  
      Sunucu kurallarımız <#${config.channels.rules}> kanalında belirtilmiştir. Unutma sunucu içerisinde ki **ceza işlemlerin kuralları okuduğunu varsayarak** gerçekleştirilecek.
  
      Seninle beraber **${member.guild.memberCount}** kişi olduk! Sol tarafta bulunan **Confirmation** odalarından birine girerek kayıt işlemini gerçekleştirebilirsin.`);
    } else {
        member.setNickname(config.registration.susoeciosnickname);
        member.roles.add(config.registration.suspecios);
        client.channels.cache.get(config.channels.welcomechannel).send(
            new MessageEmbed()
                .setAuthor(member.user.username, member.user.avatarURL({ dynamic: true }))
                .setColor("RANDOM")
                .setDescription(`${member}, Adlı Kullanıcı Sunucuya Katıldı Hesabı **${zaman2}** Önce Açıldığı İçin Şüpheli!`)
                .setFooter(`Developed By Jahky`)
                .setTimestamp());
    }
});

client.on("message", message => {
    if (message.author.bot) return;
    if (message.content === ("tag")) {
        message.channel.send(`\`${config.registration.GuilDTag}\``);
    }
    else if (message.content === (".tag")) {
        message.channel.send(`\`${config.registration.GuilDTag}\``);
    }
    else if (message.content === ("!tag")) {
        message.channel.send(`\`${config.registration.GuilDTag}\``);
    }
    else if (message.content === ("Tag")) {
        message.channel.send(`\`${config.registration.GuilDTag}\``);
    }
    else if (message.content === ("TAG")) {
        message.channel.send(`\`${config.registration.GuilDTag}\``);
    }
});

client.on("userUpdate", async function (oldUser, newUser) {
    const guild = client.guilds.cache.get(config.Guild.GuildID)
    const role = guild.roles.cache.find(roleInfo => roleInfo.id === config.roles.ekip)
    const member = guild.members.cache.get(newUser.id)
    if (newUser.username !== oldUser.username) {
        if (oldUser.username.includes(config.registration.GuilDTag) && !newUser.username.includes(config.registration.GuilDTag)) {
            member.roles.remove(config.roles.ekip)
            client.channels.cache.get(config.channels.taglog).send(embed.setDescription(` ${newUser} isminden \`${config.registration.GuilDTag}\` çıkartarak ailemizden ayrıldı!`))
        } else if (!oldUser.username.includes(config.registration.GuilDTag) && newUser.username.includes(config.registration.GuilDTag)) {
            member.roles.add(config.roles.ekip)
            client.channels.cache.get(config.channels.chat).send(` Tebrikler, ${newUser} tag alarak ailemize katıldı ona sıcak bir **'Merhaba!'** diyin.`)
            client.channels.cache.get(config.channels.taglog).send(embed.setDescription(` ${newUser} ismine \`${config.registration.GuilDTag}\` alarak ailemize katıldı`))
        }
    }
})

client.on('guildMemberRemove', member => {
    db.set(`roles_${member.id}`, member.roles.cache.map(x => x.id))
    db.set(`isim_${member.id}`, member.displayName)
})

client.on('guildMemberAdd', (member) => {
    const role = db.fetch(`roles_${member.id}`)
    if (!role) return
    member.roles.set(role)
});

client.on('guildMemberAdd', (member) => {
    const name = db.fetch(`isim_${member.id}`)
    if (!name) return
    member.setNickname(name)
});

client.login(config.bot.token).then(x => console.log(`Bot ${client.user.username} Olarak giriş yaptı`)).catch(err => console.log(`Bot Giriş yapamadı sebep: ${err}`))

client.on("disconnect", () => console.log("Bot bağlantısı kesildi"))
client.on("reconnecting", () => console.log("Bot tekrar bağlanıyor..."))
client.on("error", e => console.log(e))
client.on("warn", info => console.log(info));

    //------------------------------------------------------------------------------------------------------------\\
