 <template>
    <div class="container-noticeDetai">
        <pageheader></pageheader>
        <div>
            <p class="title"><b>{{noticeData.title}}</b></p>
            <p class="information">{{noticeData.publishEmployeeName}}&emsp;{{noticeData.displayTime}}</p>
            <p class="content">{{noticeData.content}}</p>
        </div>
    </div>
</template>
<script>
import pageheader from '@/components/pageheader'
export default {
    components:{pageheader},
    data() {
        return {
            noticeData:{},
        }
    },
    created(){
        console.log(this.$route.params.data)
        this.noticeData = this.$route.params.data
    },
    methods:{

    }
}
</script>
<style scoped lang="scss">
.container-noticeDetai{
    padding: 10px;
    font-size: 16px;
    .title{
        font-size: 18px;
        text-align: center;
    }
    .information{
        font-size: 12px;
        color: rgb(105, 102, 102);
        margin: 0 0 10px;
        text-align: right;
    }
    .content{
        color: rgb(68, 63, 63);
        text-indent:2em;
    }
}
</style>