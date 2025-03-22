import { Bot } from "grammy";
import 'dotenv/config'
import axios from "axios"

async function checkStreamStatus():Promise<boolean>{
    return  await axios.get('http://5kradiostream.ddns.net/').then(
        // we got a response so the stream is likely live
        res => {
            return true
        }
    ).catch(()=> {
        // fetch failed so the website is not up
        return false
    })
}

const apiToken = process.env.TELEGRAM_BOT || ""

//Create a new bot
const bot = new Bot(apiToken);

bot.command("live",async ctx => {
   const isStreamLive = await checkStreamStatus()
   if (isStreamLive){
    ctx.reply("On est en directe sur http://5kradiostream.ddns.net/")
    return
   }
   ctx.reply("On est pas en directe")
})

async function startBot(){
//Start the Bot
bot.start();
//bot.api.sendMessage("@live5kradio", "On est live sur: 5kradio.ddns.net")
}

startBot()

