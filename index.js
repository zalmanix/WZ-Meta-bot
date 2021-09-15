const express = require("express")
const app = express()
const { MessageEmbed } = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch
(...args));

app.get("/", (req, res) => {
  res.send("Hello Hell!")
})

app.listen(3000, () => {
  console.log("the project is ready")
})

let Discord = require("discord.js")
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })

client.on("message", async message =>{
  let done = 0
  let temp
  const body = {a: 1};
  const response = await fetch('https://www.wzranked.com/assets/data/loadouts/primary/index.json');
  const data = await response.json()
  const weapons = data["data"]["weapons"]["edges"]

  weapons.forEach(w => {
    if (w["node"]["weapontitle"] === message.content){
      temp = w["node"]["path"]

      done = 1
      return;
    }
  })
      
  message.channel.send({embeds: [await printWeapon(temp)]});
  




})  
client.login(process.env.token)

async function printWeapon(path){
  const body = {a: 1};
  const response = await fetch('https://www.wzranked.com/assets/data' + path + 'index.json');
  const data = await response.json()
  let weapons = data["data"]["attachments"]["edges"][0]["node"]

    const embed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle(String(weapons["weapontitle"]))
    .addFields(
      { name: 'First attachment', value: String(weapons["attachment1"]), inline: true },
      { name: 'Second attachment', value: String(weapons["attachment2"]), inline: true },
      { name: 'Third attachment', value: String(weapons["attachment3"]), inline: true },
      { name: 'Fourth attachment', value: String(weapons["attachment4"]), inline: true },
      { name: 'Fifth attachment', value: String(weapons["attachment5"]), inline: true },
    )
    .setFooter('Made by zalmanix');

  return(embed)
}
