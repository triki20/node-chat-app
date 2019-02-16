const expect = require('expect');

const {Users} = require('./users');

describe('Users' , () => {
    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'yahalom',
            room: 'off'
        },
        {
            id: '2',
            name: 'dod',
            room: 'on'
        },
        {
            id: '3',
            name: 'adi',
            room: 'off'
        }];
    });

    it('should add new user', () => {
        var users = new Users();
        var user = {
            id: '123',
            name: 'yahalom',
            room: 'the office'
        };
        var resUser = users.addUser(user.id,user.name,user.room);

        expect(users.users).toEqual([user]);
    });

    it('should remove a user', () => {
       var userId = '1';
       var user = users.removeUser(userId);
       
       expect(user.id).toBe(userId);
       expect(users.users.length).toBe(2);
    });

    it('should not remove user', () => {
       var userId = '99';
       var user = users.removeUser(userId);
       
       expect(user).toBeFalsy();
       expect(users.users.length).toBe(3);
    });

    it('should find user', () => {
       var userId = '2';
       var user = users.getUser(userId);
       
       expect(user.id).toBe(userId);
    });

    it('should not find user', () => {
        var userId = '99';
        var user = users.getUser(userId);

        expect(user).toBeFalsy();
    });

    it('should return name for off room', () => {
        var userList = users.getUserList('off');

        expect(userList).toEqual(['yahalom', 'adi']);
    });
    it('should return name for on room', () => {
        var userList = users.getUserList('on');

        expect(userList).toEqual(['dod']);
    });
});