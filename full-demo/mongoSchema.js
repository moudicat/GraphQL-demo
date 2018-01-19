const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  age: Number
})

const User = mongoose.model('User', UserSchema);

const mockDatas = [{
  name: 'test1',
  age: 22
}, {
  name: 'test2',
  age: 43
}];

mockDatas.forEach(data => {
  let mockUsers = new User(data);
  mockUsers.save();
});

module.exports = User;
