module.exports.run = async(bot, message, args) => {

    const categoryID = "873968786968035329";

    if(message.channel.parentID == categoryID){
        message.channel.delete();
    }

}

module.exports.help = {
    name: "close"
}