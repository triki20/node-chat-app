class Users {
    constructor(){
        this.users = [];
    }
    addUser (id, name, room){
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }
    removeUser(id){
        var user = this.getUser(id);

        if(user){
            this.users = this.users.filter((user) => user.id !== id);
        }
        return user;
    };

    getUser(id){
        return this.users.filter((user) => user.id === id)[0];
    };

    getUserList(room){
        var users = this.users.filter((user) => user.room === room);
        var nameArray = users.map((user) => user.name);
        return nameArray;
    };

    getRoomList(){
       var roomArray = this.users.map((user) => user.room);
       var roomList = roomArray.filter((v,i) => roomArray.indexOf(v) === i);
        return roomList;
    };
};

module.exports = {Users};


/*class Person {
    constructor(name, age){
        this.name = name;
        this.age = age;
    }
    getUserDescription(){
        console.log(`${this.name} is ${this.age} year(S) old.`);
    }
}

var me = new Person('Yahalom', 25)
console.log(me.age)*/