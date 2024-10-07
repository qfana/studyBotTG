
module.exports = class User {

  constructor(id, name, group) {
    this.id = id;
    this.name = name;
    this.group = group;
    this.notify = false;
    this.cabinet = false;
    this.timeInSchidule = false;
  }

};