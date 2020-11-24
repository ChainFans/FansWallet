<template>
    <div class="container-information">
        <van-nav-bar
        left-arrow
        @click-left="$router.back()"
        style="color:#000;"
        />
        <div class="title">
            启动2小时卖出8个比特币 Bakkt的牛市神话破灭了吗？
        </div>
        <div class="content">
            <img src="@/assets/images/info1.png" class="frist-img">
            <p>即使首日表现不佳，但目前来看，作为链接加密货币行业与传统金融行业的最佳枢纽，Bakkt 未来仍然可期。</p>
            <p>Odaily星球日报（ID：o-daily）</p>
            <p>9 月 23 日美国东部时间晚 8 点，隶属于美国洲际交易所（ICE）旗下的加密货币交易平台 Bakkt 终于缓缓启动了，第一笔比特币期货合约以 10115 美元的价格成交。</p>
            <p>这标志着这第一个符合美国监管的以实物交割的比特币期货产品上线。</p>
            <p>这笔交易对于 Bakkt 来说来得「太晚了」，去年 8 月，ICE 洲际交易所宣布计划成立子公司 Bakkt，曾高调打响了华尔街觊觎加密货币市场的一枪。诞生之初，Bakkt 就获得了来自李嘉诚旗下维港投资、腾讯背后第一大股东 Naspers、微软风投 M12、币圈高盛 Galaxy Digital 等 12 家顶级机构的 1.83 亿美元融资，估值突破了 7.4 亿美元 。</p>
            <p>在 ICE 的野心中，Bakkt 将是为金融机构、大宗商品交易者和消费者提供数字资产交易、存储和支付服务的全新平台。彼时，Bakkt 也就有了“加密货币纽交所”的光环。</p>
            <p>但由于 Bakkt 的第一份期货产品由于需要集齐包括交易（DCM）、清算（DCO）以及托管在内的三份牌照，所以自宣布至今，其推出就遭遇了三次推迟。</p>
            <p>今年 8 月， Bakkt 在官方博客宣布获得纽约州金融服务厅（NYDFS）的批准，以及纽约州信托许可监管批准，正式攻下最后一块托管牌照，也终于结束了一年的跳票生涯。</p>
            <p>经历万难且在万众瞩目中启动的 Bakkt，第一天的表现未有爆发式增长。这引来了一些失望，但还有不少人仍然看好它</p>
            <p>华尔街动力不足？Bakkt首日表现不佳</p>
            <p>Bakkt 成绩如何？</p>
            <p>Bakkt 的比特币（USD）期货产品分为每日合约和月度合约两种。当 Bakkt 启动 2 个半小时之后，Bakkt 显示已经完成 8 笔交易，成交 8 个比特币，目前仍在继续增长中，截至下午 5 点，已成交 28 个比特币。</p>

 
 
 
        </div>

    </div>
</template>
<script>

export default {
    data(){
        return{
            
        }
    },
    methods:{
 
    }
}
</script>
<style scoped lang="scss">
/deep/.van-icon-arrow-left:before{
    color: #000;
}
.container-information{
    background: #fff;
    font-size: 14px;
   
    .title{
        font-size: 18px;
        line-height: 22px;
        font-weight: 600;
        padding: 0 20px;
    }
    .content{
        margin-top: 20px;
        color: #333;
         padding: 0 10px;
        p{
            line-height: 22px;
            text-indent:2em;
        }
        .frist-img{
            width: 100%;
            height: 200px;
        }
    }
}
</style>