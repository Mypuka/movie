var logTest={
    tname:false,
    tpwd:false,
    trpwd:false,
    test:function (){
        var me=this;
        $("#uname").blur(function (){
            var bool=/^([a-zA-Z0-9\u4900-\u9fa5]{2,9})$/.test(this.value);
            var me2=this;
            if (!bool){
                $(this).parent().next().children().text('请输入2-9位的中文，英文或数字');
                $(this).parent().parent().removeClass('has-success');
                $(this).parent().parent().addClass('has-error');
                me.tname=false;
                $(this).removeClass('ok');
            }else{
                $.post("../data/checkuname.php",{user_name:this.value},function (txt){
                    if (txt!=='-1'){
                        $(me2).parent().next().children().text('用户名可用');
                        $(me2).parent().parent().removeClass('has-error');
                        $(me2).parent().parent().addClass('has-success');
                        me.tname=true;
                        $(me2).addClass('ok');
                    }else{
                        $(me2).parent().next().children().text('此用户名已被占用');
                        $(me2).parent().parent().removeClass('has-success');
                        $(me2).parent().parent().addClass('has-error');
                        me.tname=false;
                        $(me2).removeClass('ok');
                    }
                })
            }
        })
        $('#upwd').blur(function (){
            var bool=/^(\w{6,12})$/.test(this.value);
            var bool2=$('#rpwd')[0].value===$('#upwd')[0].value?true:false;
            if (!bool){
                $(this).parent().next().children().text('6-12位数字、字母、下划线的组合');
                $(this).parent().parent().removeClass('has-success');
                $(this).parent().parent().addClass('has-error');
                me.tpwd=false;
                $(this).removeClass('ok');
            }else{
                $(this).parent().next().children().text('密码可用');
                $(this).parent().parent().removeClass('has-error');
                $(this).parent().parent().addClass('has-success');
                me.tpwd=true;
                $(this).addClass('ok');
            }
            if (bool2==false){
                $('#rpwd').parent().next().children().text('两次密码不一致');
                $('#rpwd').parent().parent().removeClass('has-success');
                $('#rpwd').parent().parent().addClass('has-error');
                me.trpwd=false;
                $('#rpwd').removeClass('ok');
            }else{
                $('#rpwd').parent().next().children().text('两次密码一致');
                $('#rpwd').parent().parent().removeClass('has-error');
                $('#rpwd').parent().parent().addClass('has-success');
                me.trpwd=true;
                $('#rpwd').addClass('ok');
            }
        })
        $('#rpwd').blur(function (){
            var bool=this.value===$('#upwd')[0].value?true:false;
            if (this.value!==''){
                if (bool==false){
                    $(this).parent().next().children().text('两次密码不一致');
                    $(this).parent().parent().removeClass('has-success');
                    $(this).parent().parent().addClass('has-error');
                    me.trpwd=false;
                    $(this).removeClass('ok');
                }else{
                    $(this).parent().next().children().text('两次密码一致');
                    $(this).parent().parent().removeClass('has-error');
                    $(this).parent().parent().addClass('has-success');
                    me.trpwd=true;
                    $(this).addClass('ok');
                }
            }else{
                $(this).parent().next().children().text('确认密码不能为空');
                $(this).parent().parent().removeClass('has-success');
                $(this).parent().parent().addClass('has-error');
                me.trpwd=false;
                $(this).removeClass('ok');
            }
        })
        $('#login-btn').click(function (){
            if (me.tname&&me.tpwd&&me.trpwd){
                $.post("../data/data.php",$('#from-login').serialize(),function (txt){
                    if (txt=='ok'){
                        $('#login div.modal-header span').removeClass();
                        $('#login div.modal-header span').addClass('bg-success');
                        $('#login div.modal-header span').text('注册成功');
                    }else{
                        $('#login div.modal-header span').removeClass();
                        $('#login div.modal-header span').addClass('bg-danger');
                        $('#login div.modal-header span').text('注册失败');
                    }
                })
            }else{
                $('#login input:not(.ok)').focus();
            }
        })
    }
};
//登录验证
var registerTest={
    mun:null,
    test:function (){
        var me=this;
        $('#register-btn').click(function (){
            $.post("../data/register.php",$('#from-register').serialize(),function (txt){
                if (txt!='-1'){
                    $('div.navbar-collapse ul:nth-child(2) li:first-child').html('<a href="#">欢迎回来'+$('#username').val()+'</a>')
                    me.mun=parseInt(txt);
                    $('#register').modal('hide');
                    $('#music-user').html($('#username').val());
                    sessionStorage["uname"]=$('#username').val();
                    sessionStorage["upwd"]=$('#userpwd').val();
                }else{
                    $('#register div.modal-header span').removeClass();
                    $('#register div.modal-header span').addClass('bg-danger');
                    $('#register div.modal-header span').text('用户名或者密码不正确');
                }
            })
        })
    }
};
//运行注册、验证
$(function (){
    if (sessionStorage["uname"]!=null){
        $('div.navbar-collapse ul:nth-child(2) li:first-child').html('<a href="#">欢迎回来'+sessionStorage["uname"]+'</a>');
        $('#music-user').html(sessionStorage["uname"]);
    }
    logTest.test();
    registerTest.test();
})
angular.module('show',['ng']).controller('show_vip',function($scope,$http){
    $scope.isHasMore = true;
    //页面加载时，显示第一页数据
    $http.get('../data/show_vip.php').success(function(data){
        $scope.show = data;
        if(data.length <4)
            $scope.isHasMore = false;
    });

    //点击“加载更多”按钮，加载下一页的数据，追加到原数组：判断是否为最后一页
    $scope.loadMore = function(){
        var count = $scope.show.length;
        $http.get('../data/show_vip.php?start='+count).success(function(data){
            $scope.show = $scope.show.concat(data);
            if(data.length <4){
                $scope.isHasMore = false;
            }
        });
    };
}).controller('show_cha',function($scope,$http){
    $scope.isHasMore = true;
    //页面加载时，显示第一页数据
    $http.get('../data/show_cha.php').success(function(data){
        $scope.show = data;
        if(data.length <4)
            $scope.isHasMore = false;
    });

    //点击“加载更多”按钮，加载下一页的数据，追加到原数组：判断是否为最后一页
    $scope.loadMore = function(){
        var count = $scope.show.length;
        $http.get('../data/show_cha.php?start='+count).success(function(data){
            $scope.show = $scope.show.concat(data);
            if(data.length <4){
                $scope.isHasMore = false;
            }
        });
    };
}).controller('show_yz',function($scope,$http){
    $scope.isHasMore = true;
    //页面加载时，显示第一页数据
    $http.get('../data/show_yz.php').success(function(data){
        $scope.show = data;
        if(data.length <4)
            $scope.isHasMore = false;
    });

    //点击“加载更多”按钮，加载下一页的数据，追加到原数组：判断是否为最后一页
    $scope.loadMore = function(){
        var count = $scope.show.length;
        $http.get('../data/show_yz.php?start='+count).success(function(data){
            $scope.show = $scope.show.concat(data);
            if(data.length <4){
                $scope.isHasMore = false;
            }
        });
    };
}).controller('show_hld',function($scope,$http){
    $scope.isHasMore = true;
    //页面加载时，显示第一页数据
    $http.get('../data/show_hld.php').success(function(data){
        $scope.show = data;
        if(data.length <4)
            $scope.isHasMore = false;
    });

    //点击“加载更多”按钮，加载下一页的数据，追加到原数组：判断是否为最后一页
    $scope.loadMore = function(){
        var count = $scope.show.length;
        $http.get('../data/show_hld.php?start='+count).success(function(data){
            $scope.show = $scope.show.concat(data);
            if(data.length <4){
                $scope.isHasMore = false;
            }
        });
    };
})



