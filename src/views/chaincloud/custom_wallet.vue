<template>
    <div class="container-quotation">
      <div class="header">
          <van-icon name="arrow-left" class="back" @click="$router.back()" />
          <div class="switch_token" @click="Popupbox=true">
              <div class="token_logo">
                  <img src="@/assets/images/token_logo/ETH.png" alt="">
              </div>  
              <span>ETH</span>
              <van-icon name="exchange" class="icon" />
          </div>
          <!-- <van-icon name="weapp-nav" class="back" @click="more_show=true" /> -->
          <span @click="more_show=true">更多功能</span>
            
      </div>
    <!-- 更多功能 -->
    <van-popup
        v-model="more_show"
        position="right"
        class="more_content"
    >
        <!-- 自定义引导图 -->
        <div class="guide-show" v-if="$store.state.isGuide==1">
            <div class="guide-img" @click="guideOpen(0)">
                <img src="@/assets/images/other/guide.png" alt="">
            </div>
            <div class="guide-cancel" @click="guide_cancel()">
                <van-icon name="close" />
            </div>
        </div>

        <div class="more-header">
            <van-icon name="arrow-left" size='20px' @click="onConfirm()" />&emsp;
            <span>自定义</span>
        </div>
        <div class="container-box">      
            <div class="nav-title">
                <b>热门</b>
            </div>
            <div class="content">
                <div class="module" v-for="(item,index) in func_data.filter(n => n.funcHot==1)" :key="index"  @click="seeHelp(item,index,'hot')">
                    <div class="quotation"  :class="{'border':item.isSelect,'background':item.funcStatus==0}">
                        <!-- <van-icon name="passed" class="isOpen" v-show="item.isSelect" /> -->
                        <div class="isOpen" v-show="item.isSelect">
                            <img src="@/assets/images/other/select_token.png" alt="">
                        </div>
                        <div class="title">
                            <p>{{item.funcName}}</p>
                            <van-icon name="passed" v-if="item.state" size="16" class="select" />
                        </div> 
                        <p class="price"><b>{{item.funcPrice}}ETH</b></p>
                        
                    </div> 
                </div>
            </div>
            <div class="nav-title">
                <b>功能</b>
            </div>
            <div class="content">
                <div class="module" v-for="(item,index) in func_data.slice(1)" :key="index"  @click="seeHelp(item,index)">
                    <div class="quotation" :class="{'border':item.isSelect,'background':item.funcStatus==0}" >
                        <!-- <van-icon name="passed" class="isOpen" v-show="item.isSelect" /> -->
                        <div class="isOpen" v-show="item.isSelect">
                            <img src="@/assets/images/other/select_token.png" alt="">
                        </div>
                        <div class="title">
                            <p>{{item.funcName}}</p>
                            <van-icon name="passed" v-if="item.state" size="16" class="select" />
                        </div> 
                        <p class="price"><b>{{item.funcPrice}}ETH</b></p>
                        
                    </div> 
                </div>
            </div>
        </div>

        <div class="help-box">
            <div v-show="helpActive==item.funcId" v-for="item in func_data" :key="item.funcId">           
                <!-- <p><span>{{item.isSelect?'已开启':'未开启'}}</span>&nbsp; <van-switch v-model="item.isSelect" size="20px" :disabled="item.funcStatus==0?true:false" /></p> -->
                {{ item.funcCaption }}
            </div>
        </div>
            

        <van-button size="large" color="#2364bc" class="content_btn" @click="onConfirm()">确定</van-button>
    </van-popup>




    <!-- 主模块 -->
      <div>  
        <van-tree-select
            height="100%"
            :items="func_show"
            :main-active-index.sync="activeIndex"
            >
            <template slot="content">

                
                <div  v-if="activeIndex === 0" class="content-quotation">
                    
                   
                        <van-field
                            v-model="fromData.tokenFullName"
                            :error="check?(!fromData.tokenFullName):false"
                            clearable
                            label="Token全称"
                            placeholder="1~50位字符"
                            right-icon="question-o"
                            @click-right-icon="$toast('例如：Ethereum是以太坊的全称')"
                            oninput = "value=value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5\@\.\_]/g,'')"
                            maxlength="50" />
                        <van-field
                            v-model="fromData.tokenName"
                            :error="check?(!fromData.tokenName):false"
                            clearable
                            label="Token简称"
                            placeholder="1~16位字符"
                            oninput = "value=value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5\@\.\_]/g,'')"
                            right-icon="question-o"
                            @click-right-icon="$toast('例如：ETH是以太坊的简称')"
                            maxlength="16" />
                        <van-field
                            v-model="fromData.issueCount"
                            label="发行总量"
                            placeholder="0~999999999999"
                            :error="check?(!fromData.issueCount):false"
                            oninput = "value=value.replace(/[^\d]/g,'')"
                            right-icon="question-o"
                            @click-right-icon="$toast('Token初始发行的总量')"
                            maxlength="12" />
                        <van-field
                            v-model="fromData.decimal"
                            label="小数位数"
                            placeholder="最大20位"
                            :error="check?(!fromData.decimal):false"
                            oninput = "value=value.replace(/[^\d]/g,'')"
                            right-icon="question-o"
                            @click-right-icon="$toast('Token最大支持的小数位数')"
                            maxlength="2" />
                        <!-- <van-field
                            v-model="fromData.address_book"
                            type="textarea"
                            rows="1"
                            autosize
                            clearable 
                            disabled                        
                            right-icon="column"
                            placeholder="管理员钱包地址(不填为默认地址)"
                            /> -->
                            <!-- @click-right-icon="address_book_show=true"/> -->




                     <div class="price"><b>{{func_show[activeIndex].funcPrice}} ETH</b></div>
                </div>
                <div  v-if="func_show[activeIndex].funcId === 2" class="content-quotation">
                    <p> {{func_show[activeIndex].funcCaption}} </p>
                    <div class="price"><b>{{func_show[activeIndex].funcPrice}} ETH</b></div>
                </div>
                <div  v-if="func_show[activeIndex].funcId === 5" class="content-quotation">
                    <p>{{func_show[activeIndex].funcCaption}}</p>
                    <div class="price"><b>{{func_show[activeIndex].funcPrice}} ETH</b></div>
                </div>
                <div  v-if="func_show[activeIndex].funcId === 6" class="content-quotation">
                    <p>{{func_show[activeIndex].funcCaption}}</p>
                    <div class="price"><b>{{func_show[activeIndex].funcPrice}} ETH</b></div>
                </div>
                <div  v-if="func_show[activeIndex].funcId === 9" class="content-quotation">
                    <p>{{func_show[activeIndex].funcCaption}}</p>
                    <div class="price"><b>{{func_show[activeIndex].funcPrice}} ETH</b></div>
                </div>
                <div  v-if="func_show[activeIndex].funcId === 4" class="content-quotation">
                    <p>{{func_show[activeIndex].funcCaption}}</p>
                    <div class="price"><b>{{func_show[activeIndex].funcPrice}} ETH</b></div>
                </div>
                <div  v-if="func_show[activeIndex].funcId === 3" class="content-quotation">
                    <p>{{func_show[activeIndex].funcCaption}}</p>
                    <!-- <van-cell-group>
                        <van-field v-model="fromData.increaseStartTime" placeholder="请填写时间" label="开始时间" readonly @click="increaseStartTime_show=true;timeActive=1" />
                        <van-field v-model="fromData.issuanceQuota" placeholder="不填写为不限制" label="增发限额" oninput = "value=value.replace(/[^\d]/g,'')" />
                        <van-field v-model="fromData.limitedIssuance" placeholder="不填写为不限制" label="每天限定增发" oninput = "value=value.replace(/[^\d]/g,'')" />
                    </van-cell-group> -->
                    <div class="price"><b>{{func_show[activeIndex].funcPrice}} ETH</b></div>
                </div>
                <div  v-if="func_show[activeIndex].funcId === 8" class="content-quotation">
                    <p>{{func_show[activeIndex].funcCaption}}</p>
                    <van-field v-model="fromData.airdropStartTime" placeholder="请填写时间" label="开始时间" readonly @click="increaseStartTime_show=true;timeActive=2" />
                    <van-field v-model="fromData.airdropEndTime" placeholder="请填写时间" label="结束时间" readonly @click="increaseStartTime_show=true;timeActive=3" />
                    <van-field v-model="fromData.airdrop_limit" placeholder="不填写为不限制" label="空投限额" oninput = "value=value.replace(/[^\d]/g,'')" />
                    <van-field v-model="fromData.airdrop_num" placeholder="不填写为不限制" label="每次空投数量" oninput = "value=value.replace(/[^\d]/g,'')" />
                    <van-field v-model="fromData.airdropAddressCount" placeholder="不填写为不限制" label-width="132" label="限制同地址参与次数" oninput = "value=value.replace(/[^\d]/g,'')" />
                    <div class="price"><b>{{func_show[activeIndex].funcPrice}} ETH</b></div>
                </div>
                <div  v-if="func_show[activeIndex].funcId === 7" class="content-quotation">
                    <p>{{func_show[activeIndex].funcCaption}}</p>
                    <van-field v-model="fromData.directThrowTimeStart" placeholder="请填写时间" label="开始时间" readonly @click="increaseStartTime_show=true;timeActive=4" />
                    <van-field v-model="fromData.directThrowTimeEnd" placeholder="请填写时间" label="结束时间" readonly @click="increaseStartTime_show=true;timeActive=5" />
                    <van-field v-model="fromData.directThrow_limit" placeholder="不填写为不限制" label="直投限额" oninput = "value=value.replace(/[^\d]/g,'')" />
                    <van-field v-model="fromData.directThrow_Proportion" placeholder="不填写为不限制" label-width="120" label="兑换比例 1ETH=" oninput = "value=value.replace(/[^\d]/g,'')" />
                    <van-field v-model="fromData.directThrow_min" placeholder="不填写为不限制" label="最小参与限制" oninput = "value=value.replace(/[^\d]/g,'')" />
                    <!-- <van-field v-model="fromData.directThrow_address" placeholder="不填写为不限制" label="直投提现地址" /> -->
                    <div class="price"><b>{{func_show[activeIndex].funcPrice}} ETH</b></div>
                </div>
            </template>
        </van-tree-select>
      </div> 

    <!-- 设置功能引导图 -->
    <div class="guide-show" v-if="$store.state.isGuide==1">
        <div class="guide-img" @click="guideOpen(4)">
            <img src="@/assets/images/other/guide.png" alt="">
        </div>
        <div class="guide-cancel" @click="guide_cancel()">
            <van-icon name="close" />
        </div>
    </div>
    <!-- 引导流程 -->
    <!-- <div class="guide-course" v-show="isGuide_setFunc">
        <div class="course-img">
            <img :src="require('@/assets/images/token_guide/step'+more_stepId+'.png')" alt="">
        </div>
        <div class="next" @click="more_stepId==7?isGuide_setFunc=false:more_stepId+=1"></div>
    </div> -->


    <div class="footer-box">
        <span>总价 <b>{{ public_js.totalPrice(total_price) }}ETH</b> </span>&nbsp;
        <van-button type="danger" class="sure_btn" @click="sureOrder">提交订单</van-button>
    </div>


        <!-- 复用时间选择 -->
        <van-popup v-model="increaseStartTime_show" position="bottom" @click="increaseStartTime_show=false">
            <van-datetime-picker
                v-model="currentDate"
                type="date"
                :formatter="formatter"
                @confirm="increaseStart"
            />
        </van-popup>

        <!-- 选择Token -->
        <van-popup v-model="Popupbox" closeable class="add_wallet">
        <div class="add_title">
            <font size="4">选择公链</font>
        </div>
        <div class="add_module" :class="{'disabled':item.disabled}" v-for="(item,index) in wallet_nav" :key="index" @click="select_token(item)">
            <div class="module_type">
                <div class="token-img">
                    <img :src="item.imgUrl">
                </div>
            
            <span>{{item.title}}</span>
            </div>
            <p v-if="item.disabled">开发中</p>
        </div>
        </van-popup>  

        <!-- 地址薄选择 -->
        <van-popup
            v-model="address_book_show"
            position="right"
            class="address_book">


            <div class="address-header">
                <van-icon name="arrow-left" @click="address_book_show=false" />&emsp;
                <span>地址薄</span>
            </div>
            <van-tabs>
                <van-tab title="钱包地址">
                    <div class="wallet_address" v-for="item in addressWallet_list" :key="item.walletId" @click="select_address(item)">
                        <div class="module">
                            <span> <b>{{ item.walletType }}</b> </span>
                            <span> {{ item.walletName }} </span>
                            <p> {{item.address}} </p>
                        </div>
                    </div>

                </van-tab>
                <van-tab title="地址薄">
                    <div class="wallet_address" v-for="item in addressBook_list" :key="item.walletId" @click="select_address(item)">
                        <div class="module">
                            <span> <b>{{ item.walletType }}</b> </span>
                            <span> {{ item.walletName }} </span>
                            <p> {{item.walletAddress}} </p>
                        </div>
                    </div>
                </van-tab>
            </van-tabs>

        </van-popup>


        <!-- 信息确认 -->
        <van-popup
            v-model="sureOrder_show"
            position="right"
            class="orderInfo-box">
        
            <div class="info-header">
                <van-icon name="arrow-left" @click="sureOrder_back()" />&emsp;
                <span>信息确认</span>
            </div>
            <!-- 引导图 -->
            <div class="guide-show" v-if="$store.state.isGuide==1">
                <div class="guide-img" @click="guideOpen(10)">
                    <img src="@/assets/images/other/guide.png" alt="">
                </div>
                <div class="guide-cancel" @click="guide_cancel()">
                    <van-icon name="close" />
                </div>
            </div>
            <div class="basic-info">
                <div class="single-module">
                    <P>Token全称</P>
                    <P>{{fromData.tokenFullName}}</P>
                </div>
                <div class="single-module">
                    <P>Token简称</P>
                    <P>{{fromData.tokenName}}</P>
                </div>
                <div class="single-module">
                    <P>发行总量</P>
                    <P>{{fromData.issueCount}}</P>
                </div>
                <div class="single-module">
                    <P>小数位数</P>
                    <P>{{fromData.decimal}}</P>
                </div>           
            </div>
            <div class="module">
                <span> 基本功能 </span>
                <span>
                <span style="color:#f54242"> {{func_data[0].funcPrice}}ETH</span>
                <van-switch v-model="basic" size="24px" disabled />
                </span>               
            </div>
            <div class="module" v-for="(item,index) in func_data.slice(1)" :key="index">
                <span> {{item.funcName}} </span>
                <span>
                <span style="color:#f54242"> {{item.funcPrice}}ETH</span>
                <van-switch v-model="item.isSelect" size="24px" @change="changeFunction(item)"  :disabled="item.funcStatus==0?true:false" />
                </span>               
            </div>

                

            <div class="settlement"> 
           
                <p style="color:#1989fa" @click="discountCode_show=true">优惠码</p>
                <p style="font-size:16px">总价 <span style="color:#f54242"><b>{{public_js.totalPrice(total_price)}}ETH</b></span></p> 
            </div>
            <van-button v-if="showBtn" type="danger" size="large" class="info-btn" @click="confirm_order">确认支付</van-button>
        </van-popup>  
        <!-- 优惠码弹框 -->
        <van-dialog
        v-model="discountCode_show"
        title="优惠码"
        show-cancel-button
        @confirm="$toast('优惠码无效')"
        >
            <van-field v-model="fromData.discount_code" placeholder="请输入优惠码" label="" label-width="10" maxlength="20" /> 
        </van-dialog>


        <!-- 支付密码 -->
        <van-dialog
        v-model="showKeyboard"
        confirmButtonText="确认支付"
        show-cancel-button
        @confirm="confirm_pay"
        @cancel="cancel_pay"
        >
        <password-box :totalPrice="total_price" @payPassword="payPassword"></password-box>
        </van-dialog>

        <!-- 设置支付密码 -->
        <van-popup
            v-model="setpaypassword_show"
            position="right"
            style="width:100%;height:100%">
            <setpaypassword @setPassword="setPassword"></setpaypassword>
        </van-popup>

        <!-- 引导流程 -->
        <div class="guide-course" v-if="isGuide_addFunc">
            <div class="skip" style="z-index: 99999" @click="isGuide_addFunc=false"></div>
            <div class="course-img" style="z-index: 9999">
                <img :src="require('@/assets/images/token_guide/step'+more_stepId+'.png')" alt="">
            </div>
            <div class="next" style="z-index: 99999" @click="next_guide()"></div>
        </div>



    </div>
</template>
<script>
import passwordBox from '@/components/passwordBox'
import {get_address_wallet, get_address_book} from '@/api/chaincloud/address_book'
import {create_order, order_pay} from '@/api/chaincloud/coin_making'
import CryptoJS from 'crypto-js'
import setpaypassword from '../mycenter/setperson/setaccount/setpaypassword'
export default {
    components:{
        passwordBox,
        setpaypassword
    },
    data(){
        return{
            clientHeight:document.documentElement.clientHeight,
　　　　　　 showBtn: true,  // 控制按钮显示隐藏
            func_data:[            
                {id:1,text:"销毁",state:false,price:1,category:1,see:true},
                {id:2,text:"合并",state:false,price:1.5,category:1,see:false},
                {id:3,text:"锁定",state:false,price:1,category:0,see:false},
                {id:4,text:"锁仓",state:false,price:2,category:0,see:false},
                {id:5,text:"增发",state:false,price:1.5,category:0,see:false},
                {id:6,text:"空投",state:false,price:1,category:1,see:false},
                {id:7,text:"直投",state:false,price:1,category:0,see:false} 
            ],
            wallet_nav: [
                { title:'ETH',disabled:false,imgUrl:require('@/assets/images/token_logo/ETH.png')},
                { title:'EOS',disabled:true,imgUrl:require('@/assets/images/token_logo/EOS.png')},
                { title:'TRX',disabled:true,imgUrl:require('@/assets/images/token_logo/TRX.png')},
                { title:'NAS',disabled:true,imgUrl:require('@/assets/images/token_logo/NAS.png')}
            ],
            basic:true,
            more_show:true,
            Popupbox:false,
            activeIndex: 0,
            func_show: [{id:0,text:"基本功能",state:true,oldPrice:1,price:1}],

            discountCode_show:false,
            airdropStartTime_show:false,
            currentDate: new Date(),
            helpActive:0,
            moreActive:-1,
            hotActive:-1,
            increaseStartTime_show:false,
            timeActive:'',
            fromData:{
                //基本
                tokenFullName:'',
                tokenName:'',
                issueCount:'',
                decimal:18,
                address_book:'',
                discount_code:'',  //会员码
                // 增发
                increaseStartTime: '',
                issuanceQuota:'',
                limitedIssuance:'',
                // 空投
                airdropStartTime:'',
                airdropEndTime:'',
                airdrop_limit:'',
                airdrop_num:'',
                airdropAddressCount:'1',
                // 直投
                directThrowTimeStart:'',
                directThrowTimeEnd:'',
                directThrow_limit:'',
                directThrow_Proportion:'',
                directThrow_min:'',
                directThrow_address:''

            },
            //验证表单
            check:false,
            //地址薄
            address_book_show:false,
            addressWallet_list:[],
            addressBook_list:[],
            //确认订单
            sureOrder_show:false,
            check_password: '',
            showKeyboard: false,
            password_err:'',
            orderId:'',
            setpaypassword_show:false,
            //更多功能步骤
            more_stepId:0,
            isGuide_addFunc:false,
            isGuide_setFunc:false,
        }
    },
    created(){
        this.address_list()
        this.getFuncData()
    },
    mounted(){
        this.fromData.increaseStartTime = this.newDate(new Date())
        this.fromData.airdropStartTime = this.newDate(new Date())
        this.fromData.airdropEndTime = this.newDate(new Date())
        this.fromData.directThrowTimeStart = this.newDate(new Date())
        this.fromData.directThrowTimeEnd = this.newDate(new Date())
        window.onresize= ()=>{
            if(this.clientHeight>document.documentElement.clientHeight) {
               this.showBtn =false
            }else{
                this.showBtn = true
            }
        }
    },
    computed:{
        total_price(){
            let price = 0;
            this.func_data.forEach(n => {
                if(n.isSelect){
                    price += n.funcPrice
                }
            })
            return price
        }
    },
    watch:{
        sureOrder_show(val){
            if(!val){
                // this.func_show = this.func_data.filter(n => n.state)
                // this.func_show.unshift({id:0,text:"基本功能",state:true,oldPrice:1,price:1})
            }
        },
        showKeyboard(val){  //清除密码
            if(!val){
                this.password_err='',
                this.check_password=''
            }
        },
        discountCode_show(val){
            if(!val){
                this.fromData.discount_code=''
            }
        }
    },
    methods:{
        //引导开启
        guideOpen(stepId){
            this.more_stepId = stepId
            this.isGuide_addFunc = true;
            this.more_stepId ++
        },
        //引导下一步
        next_guide(){    
            let id = this.more_stepId;
            switch (true) {
                case id < 5:
                    this.more_stepId==4?this.isGuide_addFunc=false:this.more_stepId++
                    break;
                case id < 9:
                    this.more_stepId==8?this.isGuide_addFunc=false:this.more_stepId++
                    break;
                case id < 12:
                    this.more_stepId==11?this.isGuide_addFunc=false:this.more_stepId++
                    break;
            
                default:
                    break;
            }
        },
        //关闭引导
        guide_cancel(){  
            this.$dialog.confirm({
            title: '提示',
            message: '确认是否关闭引导？\n如果关闭，可以在我的设置中开启'
            }).then(() => {
                this.$store.state.isGuide=0;
                if(window.plus){
                    plus.storage.setItem("isGuide",'0');
                }else{
                    localStorage.setItem("isGuide",'0');
                } 
            }).catch(() => {
            // on cancel
            });

        },
        getFuncData(){
            if(window.plus){
                var funcList = JSON.parse(plus.storage.getItem('funcList'))
            }else{
                var funcList = JSON.parse(localStorage.getItem('funcList'))
            }
                this.func_data=funcList
                this.func_show[0].text = funcList[0].funcName
                this.func_data[0].isSelect = true;
                console.log(this.func_data) 
        },
        setPassword(val){
            this.setpaypassword_show = false
        },
        confirm_order(){   //生成订单
            // let isSetPayPassword;
            // if(window.plus){
            //     isSetPayPassword = JSON.parse(plus.storage.getItem("userData")).isSetPayPassword;
            // }else{
            //     isSetPayPassword = JSON.parse(localStorage.getItem('userData')).isSetPayPassword;
            // }

            // if(isSetPayPassword == 0){
            //     this.$dialog.confirm({
            //         title: '提示',
            //         message: '您未设置支付密码，是否去设置？'
            //     }).then(() => {
            //         // this.$router.push({name:'setpaypassword'})
            //         this.setpaypassword_show = true
            //     }).catch(() => {
                    
            //     });
            //     return
            // }

            this.showKeyboard=true;

            let FuncIdList = [];
            this.func_data.forEach(n => {
                if(n.isSelect){
                    FuncIdList.push(n.funcId)
                }
            })

            let params = {
                TokenName:this.fromData.tokenFullName,
                TokenSymbol:this.fromData.tokenName,
                TokenDecimals:this.fromData.decimal,
                TokenTotalSupply:this.fromData.issueCount,
                TokenOwnerAddress:this.fromData.address_book,
                Remark:'',
                DiscountCode:'',
                TotalAmount:this.public_js.totalPrice(this.total_price),  //总价
                DiscountAmount:0,  //优惠
                ActualAmount:this.public_js.totalPrice(this.total_price),   //实收
                TokenType:"ETH",
	            Protocol:"ERC20",
                FuncIdList:FuncIdList

            }

            create_order(params).then(res => {
                if(res.code === 0){
                    this.orderId = res.data.orderId
                    // this.$toast('订单支付成功，等待区块确认') 
                }else{
                    this.$toast(res.messages)
                }
            }).catch(err => {
                this.$toast('网络异常')
            })
        },
        payPassword(val){
            this.check_password = val
        },
        cancel_pay(){   //取消支付
            let options = [];
            this.func_data.forEach(item => {
                if(item.state){
                    options.push({
                        name:item.funcName,
                        price:item.funcPrice
                    })
                }
            })

            let orderInfo = {
                tokenName: this.fromData.tokenName,
                issueCount: this.fromData.issueCount,
                orderId: this.orderId,
                options: options
            }

            this.$router.push({name:'cancelPay',params:{cancelOrder:orderInfo}})
        },
        confirm_pay(){   //确定支付
            if(!this.check_password){
                return
            }
            let params = {
                orderId: this.orderId,
                payPassword:this.check_password
            }
            this.$toast.loading({
                duration: 0,       // 持续展示 toast
                forbidClick: true, // 禁用背景点击
                loadingType: 'spinner',
                message: '订单支付中'
            });
            order_pay(params).then(r => {
                this.$toast.clear();
                if(r.data.code === 0){
                    // this.$toast.success('订单支付成功')
                let options = [];
                this.func_data.forEach(item => {
                    if(item.state){
                        options.push(item.funcName)
                    }
                })
                console.log(options)
                
                    this.$router.push({name:'successPay',params:{options:options}})

                }else{
                    this.$toast(r.data.messages)
                }
            }).catch(err => {
                this.$toast('网络异常')
            })



        },

        sureOrder(){  //提交订单    
            if(!this.fromData.tokenFullName || !this.fromData.tokenName || !this.fromData.issueCount || !this.fromData.decimal){
                this.check = true
                this.activeIndex = 0
                this.$toast('信息请填写完整')
                return
            } 
            if(this.fromData.decimal > 20){
                this.$toast('小数位数最大20')
                return
            }                 
            this.sureOrder_show=true
        },
        seeHelp(item,index,type){
            this.helpActive=item.funcId;
            if(item.funcStatus==0){
                this.$toast('功能维护中')
                return
            }
            item.isSelect = !item.isSelect
            if(type){
                this.hotActive=index;
                this.moreActive=-1;
            }else{
                this.moreActive=index;
                this.hotActive=-1;
            }
            
            

            this.func_data.forEach(n => {
                n.see = false
            })
            item.see = true
         

        },
        sureOrder_back(){
            this.sureOrder_show=false;
            this.func_show = this.func_data.filter(n => n.isSelect)
            this.func_show.forEach(n => {
                n.text = n.funcName
            })
        },
        changeFunction(item){
               console.log(this.func_data )


            
            if(item.state && item.id == 5){
               this.sureOrder_show = false;
               let index = this.func_data.filter(n => n.state).findIndex(i => i.id == 5)
               this.activeIndex = index+1
            }else if(item.state && item.id == 6){
               this.sureOrder_show = false;
               let index = this.func_data.filter(n => n.state).findIndex(i => i.id == 6)
               this.activeIndex = index+1
            }else if(item.state && item.id == 7){
               this.sureOrder_show = false;
               let index = this.func_data.filter(n => n.state).findIndex(i => i.id == 7)
               this.activeIndex = index+1
            }
        },
        onConfirm() {
            
            this.func_show = this.func_data.filter(n => n.isSelect)
            this.func_show.forEach(n => {
                n.text = n.funcName
            })


            this.activeIndex = 0;
            this.more_show=false;
        },
        formatter(type, value) {
            if (type === 'year') {
                return `${value}年`;
            } else if (type === 'month') {
                return `${value}月`
            } else if (type === 'day') {
                return `${value}日`
            }
            return value;
        },
        increaseStart(val) {   //选择各类型时间
            switch (this.timeActive) {
                case 1:
                    this.fromData.increaseStartTime = this.newDate(val)
                    break;
                case 2:
                    this.fromData.airdropStartTime = this.newDate(val)
                    break;
                case 3:
                    this.fromData.airdropEndTime = this.newDate(val)
                    break;
                case 4:
                    this.fromData.directThrowTimeStart = this.newDate(val)
                    break;
                case 5:
                    this.fromData.directThrowTimeEnd = this.newDate(val)
                    break;        
                default:
                    break;
            }
     
        },

        newDate(val) {  
            var time = val;
            var year = time.getFullYear();
            var month =
                time.getMonth() + 1 < 10
                ? "0" + (time.getMonth() + 1)
                : time.getMonth() + 1;
            var date = time.getDate() < 10 ? "0" + time.getDate() : time.getDate();
            var hour =
                time.getHours() < 10 ? "0" + time.getHours() : time.getHours();
            var minutes =
                time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
            return year +"-" +month +"-" +date 
        },
        address_list(){
            get_address_wallet().then(res => {
                if(res.code === 0){  
                    //  alert(res.data)
                    this.addressWallet_list = res.data
                }else{
                    this.$toast(res.messages);
                }
            }).catch(err => {
                this.$toast('网络异常');
            })

            get_address_book().then(res => {
                if(res.code === 0){
                    this.addressBook_list = res.data
                }else{
                    this.$toast(res.messages);
                }
            }).catch(err => {
                this.$toast('网络异常');
            })
        },
        select_address(item){   //选择地址
        if(item.walletAddress){
            this.fromData.address_book = item.walletAddress
        }else{
            this.fromData.address_book = item.address
        }
        this.address_book_show=false    
            
        },
        select_token(item){    //选择Token
            if(!item.disabled){
                this.Popupbox=false;
                this.tokenType=item.title
            }
        }
    }
}
</script>
<style scoped lang="scss">
/deep/.van-tree-select__content{
    flex: 3.5;
}
/deep/.van-tree-select__nav-item {
    padding: 12px 5px 12px 7px;
}
/deep/.van-cell{
    padding: 10px;
}
/deep/.van-sidebar-item--select{
    border-color:#2364bc;
}
/deep/.van-cell{
    line-height: 26px;    
}
/deep/ .van-field__control{
    line-height: 26px;   
}
.border{
    border: 1px solid #2364bc !important;
}
.guide-show{   //引导图
    position: absolute; 
    right: 5px;
    bottom: 60px;
    z-index: 99999;
    .guide-img{
        width: 40px;
        height: 50px;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .guide-cancel{
        text-align: center;
    }

}
.guide-course{
    .skip{
        position: absolute;
        width: 50%;
        height: 100px;
        top: 0; 
        right: 0;
    }
    .course-img{
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        
        >img{
            width: 100%;
            height: 100%;
        }
    }
    .next{
        position: absolute;
        width: 100%;
        height: 300px;
        bottom: 0;       
    }
}
.container-quotation{
    font-size: 14px;
    background: #eee;
 
    .orderInfo-box{
        height: 100%;
        width:100%;
        .info-header{
            height: 50px;
            display: flex;
            align-items: center;
            border-bottom: 1px solid #eee;
            font-size: 20px;
            padding: 0 15px;
            span{
                font-size: 16px;
            }
        }
        .basic-info{
            height: 60px;
            border-bottom: 1px solid #eee;
            display: flex;
            .single-module{
                flex: 1;
                height: 100%;         
                text-align: center;
                padding: 10px 0;
                box-sizing: border-box;
                p:nth-child(2){
                    color: #666;
                    margin-top: 5px;
                }
            }
        }
        .module{
            height: 40px;
            border-bottom: 1px solid #eee;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 10px;
            
            span{
                display: flex;
                align-items: center;
                margin: 0 10px;
                .oldPrice{
                    font-size: 12px;
                    color: #666;
                }
            }
        }
        .info-btn{
            position: absolute;
            bottom: 0;
            background: #2364bc;
            border: 0;
        }
        .settlement{
           text-align:right;font-size:16px;margin-right:20px;margin-top: 5px;
           p{
               margin-top: 3px;
           }
        }

    }
   
    .footer-box{
        width: 100%;
        height: 50px;
        background: #fff;
        border-top: #eee 1px solid;
        position: absolute;
        bottom: 0;
        text-align: right;
        span{
            font-size: 16px;
            b{
                color: #ff3b30;
            }
        }
        .sure_btn{
            height: 50px;
            width: 120px;
            font-size: 16px;
            text-align: center;
            background: #2364bc;
            border: 1px solid #2364bc;
        }
        
    }
    .content-quotation{
        .price{
            line-height: 30px;
            text-align: right;
            margin-right: 20px;
            color: rgb(114, 112, 112);
        }
        p{
            padding: 10px;
            color: #333;
            text-indent:2em
        }
    }
    .header{
        height: 50px;
        border-bottom: 1px #eee solid;  
        background: #fff;  
        display: flex;
        justify-content: space-between;
        padding: 0 15px;
        .switch_token{
            display: flex;
            align-items: center;           
            .token_logo{
                width: 25px;
                height: 25px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            span{
                color: #000;
                margin: 0  5px;
                font-weight: 600;
            }
            .icon{
                font-size: 18px;
                color: #2364bc;
            }
        }
        .back{
            line-height: 50px;
            font-size: 22px;
           
            width: 50px;
        }
        span{
            line-height: 50px;
            color: #2364bc;
        }

    }
    .more_content{
        width: 100%;
        height: 100%;
        

        .more-header{
            height: 50px;
            background: #fff;
            font-size: 16px;
            padding: 0 15px;
            display: flex;
            align-items: center;
            border-bottom: 1px solid #eee;
        }
        .container-box{
            height: calc(100vh -300px);
            overflow-y: auto;
        }
        .nav-title{
            line-height: 30px;
            padding: 0 15px;
            background: #f4f4f4;
        }

        .help-box{
            width: 100%;
            min-height: 200px;
            color: #999595;
            background: #f4f4f4;
            position: absolute;
            bottom: 50px;
            padding: 10px;
            box-sizing: border-box;
            text-indent:2em;
            border-top: 1px solid rgb(250, 249, 249);
            p{
                margin-bottom: 5px;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                span{
                    color: #666;
                }
            }
        }
        .content{
            padding: 5px;
            display: flex;
            flex-wrap: wrap;

            .module{
                width: 91.2px;
                height: 91.2px;
                padding: 5px;
                box-sizing: border-box;  
                     
                .quotation{
                    width: 100%;
                    height: 100%;
                    border: 1px solid #eee;
                    text-align: center;
                    border-radius: 5px;
                    position: relative; 
                    overflow: hidden;           
                    .title{                      
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin-top:15px;
                        font-size: 15px;
                        .select{
                            color: red;
                            position: absolute;
                            top: 0;
                            right: 0;
                        }
                    }
                    .isOpen{
                        position: absolute;
                        bottom: 0;
                        right: 0;
                        width: 25px;
                        height: 25px;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .price{
                        margin-top:10px;
                        color: red;
                        font-size: 13px;
                    }

                }
                .background{
                    background: #b5b5b5;
                    opacity: 0.7;
                }
            }
        }
            .content_btn{
                position: absolute;
                bottom: 0;
            }
    }

    .payInfo-box{
        height: 70px;
        color: #000;
        .box{
            margin-left: 110px;
            margin-top: 20px;
            p{
                margin-top: 5px;
            }
        }
    }
    .remark-info{
        height:50px;font-size:12px;color:#666;text-align: center;margin-top: 5px;
    }
    .password-btn{
        border:1px #2364bc solid;border-radius:8px;margin:0 auto;width:240px;font-size: 16px
    }

    .address_book{
        width: 100%;
        height: 100%;
        .address-header{
            height: 50px;
            display: flex;
            align-items: center;
            border-bottom: 1px solid #eee;
            font-size: 20px;
            padding: 0 15px;
            span{
                font-size: 16px;
            }
        }
        .wallet_address{
            height: 50px;
            border-bottom: 1px solid #eee;
            padding: 5px 20px;
            display: flex;
            align-items: center;
            .module{
                span{
                    margin-right: 20px;
                }
                p{
                    color: #666;
                    font-size: 12px;
                }
            }
        }
    }
    .add_wallet{
        width: 95%;
        height: 60%;
        background: rgb(250, 250, 250);
        border-radius: 7px;
        .add_title{
        line-height: 50px;
        padding:0 20px;
        border-bottom: 1px solid #eee;
        background: #fff;
        }
        .add_module{
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
        border-bottom: 1px solid #eee;
        background: #fff;
        .module_type{
            display: flex;
            align-items: center;
            .token-img{
                width:26px;
                height: 26px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
        }
        span{
            font-size: 16px;
            margin-left: 10px;        
        }
        }
        .disabled{
        opacity: 0.5;
        }
    }

}
</style>