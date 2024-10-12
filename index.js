const { Api, Bot, Keyboard, InlineKeyboard } = require("grammy");
require('dotenv').config();
const schedule = require("./schedule.json");
const chlog = require("./changelog.json");
const User = require("./User");
const fs = require("fs");
const data = fs.readFileSync("./users.json");
const jsonData = JSON.parse(data);

const bot = new Bot(process.env.TOKEN);

function parse(arg) {
  if (arg) { return "Включено"; } else { return "Выключено"; }
}

const messageQueue = [];
let isProcessing = false;

function processQueue() {
  if (isProcessing || messageQueue.length === 0) {
    return;
  }

  isProcessing = true;
  const { chatId, message, options } = messageQueue.shift();

  // Отправляем сообщение с указанными опциями
  bot.api.sendMessage(chatId, message, options)
    .then(() => {
      // Продолжаем обработку очереди с задержкой в 1 секунду
      setTimeout(() => {
        isProcessing = false;
        processQueue();
      }, 1000);
    })
    .catch((err) => {
      console.error('Ошибка при отправке сообщения:', err);
      isProcessing = false;
      setTimeout(processQueue, 1000); // Пробуем снова через 1 секунду
    });
}

// Добавляем сообщение в очередь с параметрами parse_mode и reply_markup
function addMessageToQueue(chatId, message, options = {}) {
  messageQueue.push({ chatId, message, options });
  processQueue();
}

// Оповещения о звонках, если не трогать то будет работать (мб ток конфиги менять)
setInterval(() => {
  let date = new Date();
  let time = date.getHours() + ":" + date.getMinutes();

  const today = `${date.getDate()}.${date.getMonth() + 1}`;

  if (chlog[today] && time == "6:0") {
    jsonData.users.forEach((element) => {
      addMessageToQueue(element.id, chlog[today], { parse_mode: "Markdown" });
    });
  }

  const usersList = [];
  jsonData.users.forEach((element) => {
    if (element.notify) {
      usersList.push({ id: element.id, group: element.group });
    }
  });

  usersList.forEach((element) => {
    const group = schedule.groups[element.group];
    if (group) {
      const schedules = group.week;
      const checkDate = schedules.find(obj => obj.day == today);

      const textNotify = "Звонок через 5 минут";

      if (checkDate) {
        if (checkDate.plan[0] && time == "8:55") {
          addMessageToQueue(element.id, textNotify);
        }
        if (checkDate.plan[1] && time == "10:35") {
          addMessageToQueue(element.id, textNotify);

        }
        if (checkDate.plan[2] && time == "12:35") {
          addMessageToQueue(element.id, textNotify);

        }
        if (checkDate.plan[3] && time == "14:25") {
          addMessageToQueue(element.id, textNotify);

        }
        if (checkDate.plan[4] && time == "16:5") {
          addMessageToQueue(element.id, textNotify);

        }
        if (checkDate.plan[5] && time == "17:45") {
          addMessageToQueue(element.id, textNotify);

        }
        if (checkDate.plan[6] && time == "19:25") {
          addMessageToQueue(element.id, textNotify);

        }
      }
    }
  });

}, 60000);

const keyboardDefault = new Keyboard()
  .text("Расписание на сегодня")
  .text("Расписание на неделю").row()
  .text("Настройки").resized();

const keyboardInBlock = new Keyboard()
  .text("Назад").resized();

const inLineSetting = new InlineKeyboard()
  .text("Изменить группу", "change_group")
  .text("Оповещение о звонках", "change_notify").row()
  .text("Отображение кабинета", "change_cabinet")
  .text("Отображение времени", "change_time");

const inLineSettingGroups = new InlineKeyboard()
  .text("ТДд", "groups_TDd").text("ЭБд", "groups_EBd").text("ПДд", "groups_PDd").text("НБд", "groups_NBd").text("ЮРд", "groups_URd").row()
  .text("PRd", "groups_PRd").text("МЕд", "groups_MEd").text("ЮРо", "groups_URo").text("ИПо", "groups_IPo").text("ПСо", "groups_PSo");

const _TDd = new InlineKeyboard()
  .text("1410", "setGroup_TDd1410").text("1310", "setGroup_TDd1310").text("1210", "setGroup_TDd1210").text("1110", "setGroup_TDd1110").text("1010", "setGroup_TDd1010");

const _EBd = new InlineKeyboard()
  .text("1410", "setGroup_EBd1410").text("1310", "setGroup_EBd1310").text("1210", "setGroup_EBd1210").text("1110", "setGroup_EBd1110").text("1010", "setGroup_EBd1010");

const _PDd = new InlineKeyboard()
  .text("1410", "setGroup_PDd1410").text("1310", "setGroup_PDd1310").text("1210", "setGroup_PDd1210").text("1110", "setGroup_PDd1110").text("1010", "setGroup_PDd1010");

const _NBd = new InlineKeyboard()
  .text("1410", "setGroup_NBd1410").text("1310", "setGroup_NBd1310").text("2310", "setGroup_NBd2310").text("1210", "setGroup_NBd1210").row()
  .text("2210", "setGroup_NBd2210").text("1110", "setGroup_NBd1110").text("1010", "setGroup_NBd1010");

const _URd = new InlineKeyboard()
  .text("4410", "setGroup_URd4410").text("4310", "setGroup_URd4310").text("4210", "setGroup_URd4210").text("4110", "setGroup_URd4110");

const _PRd = new InlineKeyboard()
  .text("4410", "setGroup_PRd4410").text("4310", "setGroup_PRd4310").text("4210", "setGroup_PRd4210");

const _MEd = new InlineKeyboard()
  .text("4410", "setGroup_MEd4410");

const _URo = new InlineKeyboard()
  .text("9481", "setGroup_URo9481").text("8481", "setGroup_URo8481");

const _IPo = new InlineKeyboard()
  .text("9481", "setGroup_IPo9481").text("8481", "setGroup_IPo8481").text("8381", "setGroup_IPo8381");

const _PSo = new InlineKeyboard()
  .text("9381", "setGroup_PSo9381").text("8381", "setGroup_PSo8381").text("8281", "setGroup_PSo8281");

const dayWeek = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница"];
const timeZ = ["9:00 - 10:30", "10:40 - 12:10", "12:40 - 14:10", "14:30 - 16:00", "16:10 - 17:40", "17:50 - 19:20", "19:30 - 21:00"];

async function settings(uid, user) {
  const checkNotify = parse(user.notify);
  const checkTime = parse(user.timeInSchidule);
  const checkCabinet = parse(user.cabinet);
  const checkGroup = user.group ? user.group : "Не выбрана";

  return addMessageToQueue(uid, `*__Настройки бота МФЮА ЯО__*

Группа: *${checkGroup}*
Уведомления о звонках: *${checkNotify}*
Отображение номера аудиотории: *${checkCabinet}*
Время в расписание: *${checkTime}*`,
    { parse_mode: "MarkdownV2", reply_markup: inLineSetting });
}

bot.command("start", async (ctx) => {
  const username = ctx.msg.chat.first_name;
  const uid = ctx.msg.from.id;

  const text = `Привет ${username}, данный бот сделан для МФЮА ЯО. Здесь можно отслеживать расписание своей группы на неделю. Что-бы бот корректно работал, тебе стоит выбрать свою группу в настройках.`;

  const checkDb = await jsonData.users.find(users => users.id == uid);


  addMessageToQueue(uid, text, { reply_markup: keyboardDefault });

  if (!checkDb) {

    const user = new User(uid, username, null);

    await jsonData.users.push(user);
    const jsonString = JSON.stringify(jsonData, null, 4);

    await fs.writeFileSync("./users.json", jsonString, "utf-8");
    settings(uid, user);
  }

});

bot.on("message", async (ctx) => {
  const username = ctx.msg.chat.first_name;

  const message = ctx.msg.text;
  const uid = ctx.msg.from.id;

  const date = new Date();

  const user = jsonData.users.find(obj => obj.id == uid);

  if (!user) {
    return addMessageToQueue(uid, `Вас нет в базе данных. Используйте /start что-бы начать пользоваться ботом.`);
  }

  const userGroup = user.group;

  if (userGroup == null) {
    addMessageToQueue(uid, `У вас не выбрана группа, сделайте это в настройках.`, { reply_markup: keyboardDefault });
    return settings(uid, user);
  }

  const today = `${date.getDate()}.${date.getMonth() + 1}`;
  const group = schedule.groups[userGroup];

  const schedules = group.week;
  const checkDate = schedules.find(obj => obj.day == today);

  if (checkDate) {
    const todaySchedule = group.week.find(days => days.day == today);

    const parseToday = todaySchedule.plan.map((objPlan, i) => {
      if (objPlan) {
        let text = `${i + 1})`;

        if (user.timeInSchidule) {
          text = text.concat(` ${timeZ[i]} -`);
        }

        text = text.concat(` *${objPlan.name}*`);
        if (user.cabinet) {

          text = text.concat(` - ${objPlan.cabinet}`);
        }

        return text;
      }

      return;
    }).filter(Boolean);


    if (message == "Расписание на сегодня") {

      return addMessageToQueue(uid, `*Расписание на ${today}*:

${parseToday.join('\n')}`,
        { parse_mode: "Markdown", reply_markup: keyboardInBlock });

    }
  }

  if (message == "Расписание на сегодня") {
    return addMessageToQueue(uid, `Сегодня нет пар.`);
  }


  const parseWeek = schedules.map((objDay) => {

    return objDay.plan.map((objPlan, i) => {

      if (objPlan.name) {
        let text = `${i + 1})`;

        if (user.timeInSchidule) {
          text = text.concat(` ${timeZ[i]} -`);
        }

        text = text.concat(` *${objPlan.name}*`);
        if (user.cabinet) {

          text = text.concat(` - ${objPlan.cabinet}`);
        }
        return text;
      }
      return;
    }).filter(Boolean);
  });

  const parsePlanWeek = schedules.map((obj, i) => {

    return `*${dayWeek[i]}* (${obj.day}):

${parseWeek[i].join("\n")}\n\n`;
  });

  if (message == "Настройки") {
    return settings(uid, user);
  }

  if (message == "Расписание на неделю") {

    return addMessageToQueue(uid, `*Расписание на неделю, группа: ${userGroup}*

${parsePlanWeek.join("\n")}`,
      { parse_mode: "Markdown", reply_markup: keyboardInBlock });
  }

  addMessageToQueue(uid, `Выберите категорию.`, { reply_markup: keyboardDefault });

});

bot.on("callback_query", async (ctx) => {
  const message = ctx.update.callback_query.data;
  const username = ctx.msg.chat.first_name;
  const uid = ctx.msg.chat.id;

  await ctx.answerCallbackQuery();

  const user = jsonData.users.find(obj => obj.id == uid);

  if (!user) {
    return addMessageToQueue(uid, `Вас нет в базе данных. Используйте /start что-бы начать пользоваться ботом.`);
  }

  if (message == 'change_group') {
    return addMessageToQueue(uid, "Выберите факультет группы:", { reply_markup: inLineSettingGroups });
  }

  if (message == 'change_notify') {
    user.notify = !user.notify;
    addMessageToQueue(uid, "Успешно применено");
  }
  if (message == 'change_cabinet') {
    user.cabinet = !user.cabinet;
    addMessageToQueue(uid, "Успешно применено");

  }
  if (message == 'change_time') {
    user.timeInSchidule = !user.timeInSchidule;
    addMessageToQueue(uid, "Успешно применено");
  }

  if (message.substring(0, 7) == "groups_") {
    const arrA = ["_TDd", "_EBd", "_PDd", "_NBd", "_URd", "_PRd", "_MEd", "_URo", "_IPo", "_PSo"];
    const findarrs = arrA.indexOf(message.substring(6, 10));
    const arrB = [_TDd, _EBd, _PDd, _NBd, _URd, _PRd, _MEd, _URo, _IPo, _PSo];

    addMessageToQueue(uid, "Выберите группу:", { reply_markup: arrB[findarrs] });
  }

  if (message.substring(0, 9) == 'setGroup_') {
    user.group = message.substring(9, 16);
    addMessageToQueue(uid, "Успешно применено");
  }

  return fs.writeFileSync("./users.json", JSON.stringify(jsonData, null, 4), "utf-8");
});


bot.start();