const fs = require('fs')
var dbPath = './db.json'

//查找所有用户
exports.findAllUser = function(callback) {

    fs.readFile(dbPath, 'utf-8', function(err, data) {
        if (err) {
            return callback(err)
        }
        callback(null, JSON.parse(data).students)
            // console.log(data);
    })
}

//根据id查找用户
exports.findUserById = function(id, callback) {
    fs.readFile(dbPath, 'utf-8', function(err, data) {
        if (err) {
            callback(err, null)
        }
        var users = JSON.parse(data).students;
        var findUser = users.find(function(item) {
            return item.id === parseInt(id)
        })
        callback(null, findUser)
    })
}


exports.save = function(student, callback) {
    fs.readFile(dbPath, 'utf-8', function(err, data) {
        if (err) {
            callback(err)
        }
        var students = JSON.parse(data).students;
        student.id = students[students.length - 1].id + 1
        students.push(student)

        var fileData = JSON.stringify({
            students: students
        })
        fs.writeFile(dbPath, fileData, function(err) {
            if (err) {
                callback(err)
            }
            callback(null)
        })
    })
}

//更新学生
exports.updateById = function(student, callback) {
    fs.readFile(dbPath, 'utf-8', function(err, data) {
        if (err) {
            return callback(err)
        }

        //查找指定id的user
        var students = JSON.parse(data).students
        student.id = parseInt(student.id)


        var stu = students.find(function(item) {
            return item.id === parseInt(student.id)
        })

        //修改
        for (var key in stu) {
            stu[key] = student[key]
        }

        var editData = JSON.stringify({
            students: students
        })

        //写入数据
        fs.writeFile(dbPath, editData, function(err) {
            if (err) {
                callback(err)
            }
            callback(null)
        })
    })
}

//删除学生
exports.deleteById = function(id, callback) {
    fs.readFile(dbPath, 'utf-8', function(err, data) {
        if (err) {
            callback(err)
        }
        var students = JSON.parse(data).students;
        var deleteId = students.findIndex(function(item) {
                return item.id === parseInt(id)
            })
            //根据下标从数组中删除对应的学生对象
        students.splice(deleteId, 1)

        var fileData = JSON.stringify({
            students: students
        })
        fs.writeFile(dbPath, fileData, function(err) {
            if (err) {
                callback(err)
            }
            callback(null)
        })
    })
}