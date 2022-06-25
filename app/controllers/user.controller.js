const Events = require('../models/Events');
const User = require('../models/Events');


function postList(df) {
    Events.find().lean().exec(function (err, events) {

        if (err) {
            df(err)
        } else {
            df(null, events)
        }
    })
};

function userAdd(data, cb) {
    
    let newUser = new User(data);
    newUser.save(function (err, event) {
        if (err) {
            cb(err)
        } else {
            cb(null, event)
        }

    })
};
function postDelete(id, cb) {
    Post.deleteOne({_id: id},function (err, event) {
        if (err) {
            cb(err);
        } else {
            cb(null, event);
        }
    });
}


module.exports = {
    list: postList,
    add: userAdd,
    delete: postDelete
}