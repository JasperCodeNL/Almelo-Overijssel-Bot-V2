module.exports.run = async(bot, message, args) => {

    const categoryID = "855749102171193345";

    if(message.channel.parentID == categoryID){
        message.channel.delete();
    }

}

module.exports.help = {
    name: "close"
}