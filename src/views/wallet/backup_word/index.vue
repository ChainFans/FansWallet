<template>
    <div class="backup-word">
        <div class="header-img">
            <img src="@/assets/images/wallet/1569727543(1).jpg" alt="">
        </div>
        <div class="backuo-tips">
            <p class="title"><b>备份提示</b></p>
            <p>获得助记词等于拥有钱包资产所有权</p>
            <div class="division"></div>
            <p>• 助记词由英文单词组成，请抄写并妥善保管。</p>
            <p>• 助记词丢失，无法找回，请务必备份助记词</p>
        </div>
        <div class="footer">
            <van-button type="info" class="backup-btn" @click="$router.push('copy_word')">立即备份</van-button>
            <van-button type="default" class="backup-btn" @click="$router.push('wallet')">稍后备份</van-button>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{

        }
    }
}
</script>

<style lang="scss" scoped>
.backup-word{
    padding: 0 15px;
    position: relative;
    height: 100vh;
    .header-img{
        height: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
        img{
            width: 100px;
            height: 100px;

        }
    }
    .backuo-tips{
        p{
            line-height: 30px;
            color: #666;
        }
        .title{
            font-size: 16px;
            color: #222;
        }
        .division{
            height: 1px;
            width: 100%;
            background:#eee;
            margin: 10px 0;
        }
    }
    .footer{
        position: absolute;
        bottom: 0px;
        left: 0;
        right: 0;
        padding: 0 15px;
        .backup-btn{
            width: 100%;
            border-radius: 5px;
            margin-bottom: 10px;
        }
    }

}
</style>