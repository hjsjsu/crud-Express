//引包
var express = require('express');

//挂载Express的路由router
var router = express.Router();

//加载模块
const Student = require('./student')
    // Student.updateById({
    //     id: 1,
    //     name: '张小三'
    // }, function(err) {
    //     if (err) {
    //         return console.log('修改失败');
    //     }
    //     return console.log('修改成功');
    // })

//查看用户列表
router.get('/students', function(req, res) {
    Student.findAllUser(function(err, data) {
        if (err) {
            return res.status(500).send('Server Error')
        }
        res.render('index.html', {
            students: data
        });
    });
});

//添加用户界面
router.get('/students/new', function(req, res) {
    res.render('new.html')

});

//添加用户操作
router.post('/students/new', function(req, res) {

    let str = req.body;
    console.log(str);
    Student.save(str, function(err) {
        if (err) {
            return res.status(500).send('Server Error')
        }
        res.redirect('/students');
    })
})

//更新编辑页面
router.get('/students/edit', function(req, res) {

    var id = req.query.id;
    //注：需要注意id需要转换为数字型，字符型会报错
    Student.findUserById(parseInt(id), function(error, data) {
        if (error) {
            return res.status(500).send('Server Error!!');
        } else {
            res.render('edit.html', { edit: data });
        }
    });
})

router.post('/students/edit', function(req, res) {
    // console.log(req.body);
    Student.updateById(req.body, function(err) {
        if (err) {
            return res.status(500).send('Server Error')
        }
        res.redirect('/students')
    })
})

router.get('/students/delete', function(req, res) {
    var id = req.query.id
    Student.deleteById(id, function(err) {
        if (err) {
            return res.status(500).send('Server Error')
        }
        res.redirect('/students')
    })
})
module.exports = router;