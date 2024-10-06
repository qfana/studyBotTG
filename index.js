const { Api, Bot, Keyboard, InlineKeyboard } = require("grammy");
require('dotenv').config();
const schedule = require("./test.json");
const User = require("./User");
const fs = require("fs");
const data = fs.readFileSync("./users.json");
const jsonData = JSON.parse(data);

const bot = new Bot(process.env.TOKEN);
let date = new Date();

function parse(arg) {
  if (arg) { return "Включено"; } else { return "Выключено"; }
}

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

const inLineSettingGroup = new InlineKeyboard()
  .text("ПРд4410", "change_group_PRd4410");

const dayWeek = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница"];
const timeZ = ["9:00 - 10:30", "10:40 - 12:10", "12:40 - 14:10", "14:30 - 16:00", "16:10 - 17:40"];

async function settings(user, ctx) {
  const checkNotify = parse(user.notify);
  const checkTime = parse(user.timeInSchidule);
  const checkCabinet = parse(user.cabinet);

  await ctx.reply(`*__Настройки бота МФЮА ЯО__*`, { parse_mode: "MarkdownV2", reply_markup: keyboardInBlock });
  return await ctx.reply(`Группа: *${user.group}*
Уведомления о звонках: *${checkNotify}*
Отображение номера аудиотории: *${checkCabinet}*
Время в расписание: *${checkTime}*`,
    { parse_mode: "MarkdownV2", reply_markup: inLineSetting });
}

bot.command("start", async (ctx) => {
  const username = ctx.msg.chat.first_name;
  const text = `Привет ${username}, данный бот сделан для МФЮА ЯО. Здесь можно отслеживать расписание своей группы на неделю. Что-бы бот корректно работал, тебе стоит выбрать свою группу в настройках.`;

  const checkDb = await jsonData.users.find(users => users.name == username);

  await ctx.reply(text, {
    reply_markup: keyboardDefault,
  });

  if (!checkDb) {

    const user = new User(username, null);

    await jsonData.users.push(user);
    const jsonString = JSON.stringify(jsonData, null, 4);

    await fs.writeFileSync("./users.json", jsonString, "utf-8");

  }
});

bot.on("message", async (ctx) => {

  const username = ctx.msg.chat.first_name; 1;
  const message = ctx.msg.text;

  const user = jsonData.users.find(obj => obj.name == username);
  const userGroup = user.group;

  if (userGroup == null) {
    await ctx.reply(`У вас не выбрана группа, сделайте это в настройках.`, { reply_markup: keyboardDefault });
    return settings(user, ctx);
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

      return await ctx.reply(`*Расписание на ${today}*:

${parseToday.join('\n')}`,
        { parse_mode: "Markdown", reply_markup: keyboardInBlock });

    }
  }

  if (message == "Расписание на сегодня") {
    return await ctx.reply(`Сегодня нет пар.`);
  }



  const parseWeek = schedules.map((objDay) => {

    return objDay.plan.map((objPlan, i) => {
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
  });

  const parsePlanWeek = schedules.map((obj, i) => {

    return `*${dayWeek[i]}* (${obj.day}):

${parseWeek[i].join("\n")}\n\n`;
  });

  if (message == "Настройки") {

    return settings(user, ctx);

  }

  if (message == "Расписание на неделю") {

    return await ctx.reply(`*Расписание на неделю, группа: ${userGroup}*

${parsePlanWeek.join("\n")}`,
      { parse_mode: "Markdown", reply_markup: keyboardInBlock });
  }


  await ctx.reply(`Выберите категорию.`, { reply_markup: keyboardDefault });

});

bot.on("callback_query", async (ctx) => {
  const message = ctx.update.callback_query.data;
  const username = ctx.msg.chat.first_name;
  await ctx.answerCallbackQuery();

  const user = jsonData.users.find(obj => obj.name == username);

  if (message == 'change_group') {
    return await ctx.reply("Выберите группу (В данный момент доступна лишь одна)", { reply_markup: inLineSettingGroup });
  }

  if (message == 'change_notify') {
    user.notify = !user.notify;
    ctx.reply("Успешно применено");

  }
  if (message == 'change_cabinet') {
    user.cabinet = !user.cabinet;
    ctx.reply("Успешно применено");

  }
  if (message == 'change_time') {
    user.timeInSchidule = !user.timeInSchidule;
    ctx.reply("Успешно применено");

  }
  if (message == 'change_group_PRd4410') {
    user.group = "PRd4410";
    ctx.reply("Успешно применено");
  }

  return await fs.writeFileSync("./users.json", JSON.stringify(jsonData, null, 4), "utf-8");
});

bot.start();