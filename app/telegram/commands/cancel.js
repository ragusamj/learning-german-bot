'use strict';

const MessageTypes = require('telegram/types/message');
const Promise = require('bluebird');
const _ = require('lodash');

class Cancel {
    constructor(server) {
        this.server = server;
    }

    process(query, message) {
        return Promise.coroutine(function *() {
            let Chats = this.server.getModel('Chats');
            let chat = yield Chats.findOne({ chatId: message.chat.id });
            chat.state = Chats.STATES.IDLE;
            yield chat.save();

            let Trainings = this.server.getModel('Trainings');
            yield Trainings.update({ chatId: message.chat.id, status: Trainings.STATUSES.IN_PROGRESS }, {
                status: Trainings.STATUSES.CLOSED,
                finishedAt: new Date()
            });

            let text = 'Сделано! Теперь с чистого листа.';
            let options = {
                parse_mode: 'HTML',
                reply_markup: {
                    hide_keyboard: true
                }
            };

            return [{ type: MessageTypes.MESSAGE, text: text, options: options }];
        }).bind(this)();
    }
}

module.exports = function(server, bot) {
    return new Cancel(server, bot);
}
