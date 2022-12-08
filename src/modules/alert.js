const Eris = require("eris");
const threadUtils = require("../utils/threadUtils");
const utils = require("../utils/utils");

/**
 * @param {Eris.CommandClient} bot
 */
module.exports = bot => {
  threadUtils.addInboxServerCommand(bot, "alert", async (msg, args, thread) => {
    if (! thread) return;

    const status = thread.alert_users && thread.alert_users.includes(msg.member.id);

    await thread.alertStatus(msg.member.id, ! status);

    if (! status) {
      utils.postSuccess(thread, `I'll mention you whenever **${thread.user_name}** sends a new message.`, null, msg);
    } else {
      utils.postSuccess(thread, "I won't give you new message alerts for this thread anymore.", null, msg);
    }
  });
};
