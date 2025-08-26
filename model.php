<?php 
//报单
// 调用  Dome::function 

namespace app\common;
use think\facade\Db;
class Dome
{
    /*
        `money` decimal(11,2) DEFAULT '0.00' COMMENT '现金币',
        `regmoney` decimal(11,2) DEFAULT '0.00',
        `shopmoney` decimal(11,2) DEFAULT '0.00' COMMENT '购物币',
        `balance` decimal(11,2) DEFAULT '0.00' COMMENT '兑换币',
        `yejigu` int(11) DEFAULT '0' COMMENT '业绩股',
        `futoumoney` decimal(11,2) DEFAULT '0.00' COMMENT '复投币',
        `opentime` int(11) DEFAULT '0' COMMENT '开通时间',
        `regtime` int(11) DEFAULT NULL COMMENT '免费注册时间',
        `lasttime` int(11) DEFAULT NULL COMMENT '登录时间',
        `lastip` varchar(20) DEFAULT '' COMMENT '登陆IP',
        `left` int(11) DEFAULT '0' COMMENT '左边会员数',
        `right` int(11) DEFAULT '0' COMMENT '右边会员数',
        `center` int(11) DEFAULT '0' COMMENT '中间会员数',
        `_left` varchar(50) DEFAULT '' COMMENT '左边安置会员名',
        `_right` varchar(50) DEFAULT '' COMMENT '右边安置会员名',
        `_center` varchar(50) DEFAULT '' COMMENT '中奖安置会员名',
        `referee` varchar(50) DEFAULT '' COMMENT '直接上线',
        `__right` mediumtext COMMENT '右边上线集合',
        `__sleft` mediumtext COMMENT '系统左边上线集合',
        `_referee` varchar(50) DEFAULT '' COMMENT '安排会员上线',
        `__referee` mediumtext COMMENT '安排上线集合',
        `position` varchar(10) DEFAULT '' COMMENT '所在位置',
        `canlogin` int(1) DEFAULT '1' COMMENT '可否登陆',
        `sleft` int(11) DEFAULT '0' COMMENT '系统左边会员数',
        `sright` int(11) DEFAULT '0' COMMENT '系统右边会员数',
        `scenter` int(11) DEFAULT '0' COMMENT '系统中间会员数',
        `_sleft` varchar(50) DEFAULT '' COMMENT '左边系统会员名',
        `_sright` varchar(50) DEFAULT '' COMMENT '右边系统会员名',
        `_scenter` varchar(50) DEFAULT '' COMMENT '中间系统会员名',
        `_sreferee` varchar(50) DEFAULT '' COMMENT '系统会员上线',
        `__sright` mediumtext COMMENT '系统右边上线集合',
        `__sreferee` mediumtext COMMENT '系统上线集合',
        `__scenter` mediumtext COMMENT '系统中间上线合集',
        `sposition` varchar(10) DEFAULT '' COMMENT '系统所在位置',
        `_maxmoney` decimal(11,2) DEFAULT '0.00' COMMENT '已获见点奖',
        `__left` mediumtext COMMENT '左边上线集合',
        `__center` mediumint(9) DEFAULT NULL COMMENT '中间上线集合',
        `leftmoney` decimal(11,2) DEFAULT '0.00' COMMENT '左区剩余业绩',
        `rightmoney` decimal(11,2) DEFAULT '0.00' COMMENT '右区剩余业绩',
        `centermoney` decimal(11,2) DEFAULT '0.00' COMMENT '中区剩余业绩',
        `maxmoney` decimal(11,2) DEFAULT '0.00' COMMENT '已获静态奖',
        `moneytime` int(11) DEFAULT '0' COMMENT '最后获取静态奖时间',
        `service` int(1) DEFAULT '0',
        `reguser` int(11) DEFAULT '0',
        `_leftmoney` decimal(11,2) DEFAULT '0.00' COMMENT '左区总业绩',
        `_rightmoney` decimal(11,2) DEFAULT '0.00' COMMENT '右区总业绩',
        `_centermoney` decimal(11,2) DEFAULT '0.00' COMMENT '中区总业绩',
        `locktime` varchar(20) DEFAULT '',
        `newphone` varchar(11) DEFAULT '',
        `newmsalt` int(11) DEFAULT NULL,
        `po` int(11) DEFAULT '0',
        `maxfloor` int(11) DEFAULT '0',
        `special` int(1) DEFAULT NULL,
        */


    //公共函数看你自己做，就是一些固定比例设置固定后台参数，这部分也可以写代码里，也可以用数据库存调用
    //这个可用可不用，在下面中调整也可以直接用sql 查询全局设置
    public function $config(){
        return array('completed'=>3,// 这里设置内倍或者固定
        'one'=>10,//第一层比例
        'twos'=>50,//每二层以下
        'minyeijie'=>array(1=>'880',2=>'8800',3=>'18800',4=>'29900');
    );
    }

	//投资封顶 
    /*参考数据  后期数据库根据自己情况设计  后期我只提供数据字段。
    CREATE TABLE `sinbegin_completed` (
        `id` int(11) NOT NULL AUTO_INCREMENT,
        `money` decimal(11,2) DEFAULT '0.00',
        `addtime` varchar(10) DEFAULT NULL,
        `uid` int(11) DEFAULT '0',
        PRIMARY KEY (`id`)
      ) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;*/;  

	function completed($uid,$money,$completed){
        // 全局这里可以 设置为SQL语句查询调用$sql=select * from db_config where aid=1
        // 也可有 $completed 读取数值 根据自己情况来，这里读取三组数据
        // 会员ID $uid 当次收益金额 $money 倍数 $completed
        // 投资记录表，例如他会员中心里面有一个：maxmoney 作为累计收益值  paymoney 投资值
        // 例如他会员中心里面有一个：maxmoney 作为收益值
        $config =$this->config();
        // $comleted = $config['completed'];
	    $user =  sql("select * from db_user where uid='{$uid}'");            
	    $completed= sql("select sum(money) from db_completed where uid='{$uid}'");  // 获取之前收益总和
        $multiple = $config['completed'];// 读取公共倍数 也可能从前面传值，看你自己规划
        $maxmoney= $user['paymoney']*$multiple;   // 这里看明白可以简化，把上面的直接移下来
        
        //$条件不成立跳过        
		if($completed['money']+$money>=$maxmoney){
            sql("update db_user",array(['maxmoney']=>),"id='{$completed['id']}'");  //这里是更新会员表
          
            $data['money'] = $money;
            $data['uid'] = $uid;
            sql(" insert db_completed set ",$data); //这里是插入一条新记录，
        }
        // 然后你考虑一个，所有收益记录是不是搞一个统一表，记录每次这样话，可以做一个通用函数来记录写入，查询。
		return $money;
	}
	
    //奖励值记录  这里你可以参加之前现在的功能添加然后我给你多加一个值，奖励类型 $type    
	function up_money($uid,$money,$action,$message,$parentid=0,$addtime="",$type){
        //奖励余额，佣金，积分 用英文自己代替 根据传过来 $type 
        // update insert 根据自己情况添加，这里只给你模拟 会员收益函数
        if($type == '佣金'){
            $user = $this->user->sql($uid);
            $money = formatnum($money);
            if(is_array($user)&&$money>0){
                $arr['money'] = $action=='+' ? $user['money']+$money : $user['money']-$money;
                update("{$this->pre}user",$arr,"uid='{$user[uid]}'");

                $log['uid'] = $user['uid'];
                $log['typeid'] = 1;
                $log['parentid'] = $parentid;
                $log['addtime'] = $addtime ? $addtime : time();
                $log['content'] = $message;
                $log['lognum'] = $action.$money;
                $log['balance'] = $arr['money'];
                $id = insert("{$this->pre}log",$log);
            }
            return $id;
        }
        if($type == 'jifen'){
            // 改成自己对应表，对就内容，
        }
     }	
    
    //首层奖励  这里就直接用了的，也可以 参考下面的，
    //直接用他现成的
    function referee(){  
        if(is_array($_referee = $this->user->sql($user['_referee'],'username'))){  //返回数组  安排会员上线
           if($_referee['_left'] && $_referee['_right']){ //接点人的左右都有人  排线是左边先排
               $leftuser = $this->user->sql($_referee['_left'],'username');
               $rightuser = $this->user->sql($_referee['_right'],'username');
               if($leftuser['referee'] == $_referee['username'] && $rightuser['referee'] == $_referee['username']){ //左右两人得推荐都是他
                      $refereemoney = $_referee['usergroup']['_money'] ;//这里做一个奖励多少判断，
                      if($refereemoney>0){
                        //写奖励计算模式
                      }
               }
            }
        }
    }  
     
    //首层奖励  这里就直接用了的，也可以 参考下面的，
    //直接用他现成的  按说他的首层奖励10%见点   我用他们会员 wfk
    function referee(){  
        $config = $this-config(); // 自己参考是不是用写代码里面还是用后台设置添加，后期config不再说明调用情况

        if(is_array($_referee = $this->user->sql($user['_referee'],'username'))){  //返回数组  安排会员上线
           if($_referee['_left'] && $_referee['_right']){ //接点人的左右都有人  排线是左边先排
               $leftuser = $this->user->sql($_referee['_left'],'username');
               $rightuser = $this->user->sql($_referee['_right'],'username');
               if($leftuser['referee'] == $_referee['username'] && $referee['referee'] == $_referee['username']){ //左右两人得推荐都是他
                    $minmony = min($leftuser['groupid'],$leftuser['groupid'],);//读取两边最小值,然后在config 设置对应级别订单金额 同样，max 取最大值。
                    $minyeijie = $config['minyeijie'][$minmony] * $config['one']/100 ; // 首层10%结果 
                    $refereemoney = $minyeijie  ;//这里做一个奖励多少判断，
                    if($refereemoney>0){
                        //写奖励计算模式  为0就不写入资金， 有奖励就写对就奖励  这里参考上面我不再写了

                    }
               }
            }
        }
    }  
    // 第二层以下， 50% 
    function referee(){
     //对碰奖
    $floor = 1;  //这里表示 起点
     $query = query("select * from user where uid in(".$user['__referee'].") and leftmoney>0 and rightmoney>0"); //读取安排上线集合查询    uid in(".$user['__referee'].") 他现在数据是1，2，3，  in()查询不知道百度一下
    while($rs=$this->mysql->assoc($query)){
        if($floor>=2){ //大于几层，这里可以自己设置  while 做循环
            $usergroup = $this->mysql->select_one("select * from {$this->pre}usergroup where groupid='{$rs['groupid']}'");
            $cld = $this->mysql->select_one("select * from {$this->pre}completed where uid='{$rs['uid']}' and addtime='".formattime(time(),'Y-m-d')."'");
            $minmoney = min($rs['leftmoney'],$rs['rightmoney']);  // 这里跟上面大小一样，
            $mymoney = 0;
            $mymoney = $minmoney*$usergroup['__money'];//对碰奖金比例
            $mymoney = $this->completed($rs['uid'],$mymoney,$usergroup['__maxmoney']);//对碰封顶
            if($mymoney>0){
                // 就跟上面差不多了这里 改最多就是 几层
            }
            //左右区剩余业绩
            $this->mysql->query("update {$this->pre}user set leftmoney=leftmoney-'{$minmoney}',rightmoney=rightmoney-'{$minmoney}' where uid='{$rs[uid]}'");
            $__money += $mymoney;
            }
        }
        
        
        if($floor>=2 && $floor <=4 ){ // 这里假设主2-4层  可以自己根据情况调整，
            $usergroup = $this->mysql->select_one("select * from {$this->pre}usergroup where groupid='{$rs['groupid']}'");
            $cld = $this->mysql->select_one("select * from {$this->pre}completed where uid='{$rs['uid']}' and addtime='".formattime(time(),'Y-m-d')."'");
            $minmoney = min($rs['leftmoney'],$rs['rightmoney']);  // 这里跟上面大小一样，
            $mymoney = 0;
            $mymoney = $minmoney*$usergroup['__money'];//对碰奖金比例  比例计划是这样， 一般都是 A*B/100  
            $mymoney = $this->completed($rs['uid'],$mymoney,$usergroup['__maxmoney']);//对碰封顶
            if($mymoney>0){
                // 就跟上面差不多了这里 改最多就是 几层
            }
            //左右区剩余业绩
            $this->mysql->query("update {$this->pre}user set leftmoney=leftmoney-'{$minmoney}',rightmoney=rightmoney-'{$minmoney}' where uid='{$rs[uid]}'");
            $__money += $mymoney;
            }
        }
    }
  

               