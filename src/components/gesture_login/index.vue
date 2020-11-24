<template>
  <div>
    <div class="header" v-if="optionType!=0">
      <van-icon name="arrow-left" class="back" @click="$router.back()" />
      <span>{{title}}</span>
    </div>
    <p v-else class="nickname"> {{nickname}} </p>
    <p class="tips">{{titleTips}}</p>
    <div class="gesture_unlock">
      <canvas id="gesture" ref="canvas" :style="style" />
    </div>

  </div>
</template>

<script>
import Pageheader from "@/components/pageheader";
export default {
  components: {
    Pageheader
  },
  name: "GestureLock",
  props: {
    chooseType: {
      type: Number,
      default: 3 // 3: 3*3, 4: 4*4, 5: 5*5
    }
  },
  data() {
    return {
      title: "",
      titleTips: "请绘制图案解锁",
      touchedFlag: false, // 是否正在绘制
      canvas: null,
      ctx: null,
      radius: 0, // 计算后的半径大小
      style: {
        width: 300,
        height: 300
      },
      devicePixelRatio: 1,
      circleArr: [],
      lastPoint: [],
      restPoint: [],
      checkPassword: "",
      optionType: 0, //  0手势登录 1开启手势登录  2关门手势登录  3修改手势
      toPath: "",
      oldGesture: true,
      nickname:''
    };
  },
  created() {
    this.optionType = this.$route.query.optionType; //是否设置手势
    this.toPath = this.$route.query.toPath;
    this.titleTips = "请绘制图案";
    if(window.plus){
      this.nickname = JSON.parse(plus.storage.getItem('userData')).nickname
    }else{
      this.nickname = JSON.parse(localStorage.getItem('userData')).nickname
    }

    switch (Number(this.optionType)) {
      case 0:
        this.title = "手势解锁";
        break;
      case 1:
        this.title = "开启手势密码";
        break;
      case 2:
        this.title = "关闭手势密码";
        break;
      case 3:
        this.title = "修改手势密码";
        this.titleTips = "请绘制原图案";
        break;
    }
  },
  mounted() {
    this.canvas = this.$refs.canvas;
    this.ctx = this.canvas.getContext("2d");

    this.canvas.width = this.style.width * this.devicePixelRatio;
    this.canvas.height = this.style.height * this.devicePixelRatio;

    this.createCircle();
    this.bindEvent();
  },
  beforeDestroy() {
    this.canvas.removeEventListener("touchstart", this.onStartHandler);
    this.canvas.removeEventListener("touchmove", this.onMoveHandler);
    this.canvas.removeEventListener("touchend", this.onEndHandler);
  },
  methods: {
    testPassword(arr) {
      switch (Number(this.optionType)) {
        case 0:
         
          if (window.plus) {
            let userPassword = plus.storage.getItem("gesture_pwd");
            if (arr.join("") === userPassword) {
              this.$router.push({ path: this.toPath });
            } else {
              this.onReset();
              this.titleTips = "手势错误";
            }
          } else {
            
            let userPassword = localStorage.getItem("gesture_pwd");
            if (arr.join("") === userPassword) {
              this.$router.push({ path: this.toPath });
            } else {
              this.onReset();
              this.titleTips = "手势错误";
            }
          }
          break;
        case 1: //开启
          if (this.checkPassword) {
            if (arr.join("") === this.checkPassword.join("")) {
              if (window.plus) {
                plus.storage.setItem("gesture", JSON.stringify(1));
                plus.storage.setItem("gesture_pwd",arr.join(""));
              } else {
                localStorage.setItem("gesture", 1);
                localStorage.setItem("gesture_pwd", arr.join(""));
              }
              this.$toast.success("设置成功");
              this.$router.back();
            } else {
              this.titleTips = "两次绘制图案不一致,请重新绘制图案";
              this.checkPassword = null;
              this.onReset();
            }
          } else {
            if (arr.length < 5) {
              this.titleTips = "绘制图案连点必须大于4个";
            } else {
              this.titleTips = "请再次绘制图案";
              this.checkPassword = arr;
            }
            this.onReset();
          }
          break;
        case 2: //关闭
          if (window.plus) {
            let userPassword = plus.storage.getItem("gesture_pwd");
            if (arr.join("") === userPassword) {
              this.$toast.success("设置成功");
              plus.storage.setItem("gesture", JSON.stringify(0));
              plus.storage.setItem("gesture_pwd", arr.join(""));

              this.$router.back();
            } else {
              this.onReset();
              this.titleTips = "手势错误";
            }
          } else {
            let userPassword = localStorage.getItem("gesture_pwd");
            if (arr.join("") === userPassword) {
              this.$toast.success("设置成功");
              localStorage.setItem("gesture", 0);
              localStorage.setItem("gesture_pwd", arr.join(""));

              this.$router.back();
            } else {
              this.onReset();
              this.titleTips = "手势错误";
            }
          }

          break;
        case 3:
          if (window.plus) {
            let userPassword = plus.storage.getItem("gesture_pwd");
            if (this.oldGesture) {
              if (arr.join("") === userPassword) {
                this.titleTips = "请绘制要修改的图案";
                this.checkPassword = "";
                this.oldGesture = false;
              } else {
                this.titleTips = "手势错误";
              }
              this.onReset();
            } else {
              if (this.checkPassword) {
                if (arr.join("") === this.checkPassword.join("")) {
                  this.$toast.success("修改成功");
                  this.$router.back();
                  plus.storage.setItem("gesture", JSON.stringify(1));
                  plus.storage.setItem(
                    "gesture_pwd",
                    arr.join("")
                  );
                } else {
                  this.titleTips = "两次绘制图案不一致,请重新绘制图案";
                  this.checkPassword = null;
                  this.onReset();
                }
              } else {
                if (arr.length < 5) {
                  this.titleTips = "绘制图案连点必须大于4个";
                } else {
                  this.titleTips = "请再次绘制图案";
                  this.checkPassword = arr;
                }
                this.onReset();
              }
            }
          } else {
            let userPassword = localStorage.getItem("gesture_pwd");
            if (this.oldGesture) {
              if (arr.join("") === userPassword) {
                this.titleTips = "请绘制要修改的图案";
                this.checkPassword = "";
                this.oldGesture = false;
              } else {
                this.titleTips = "手势错误";
              }
              this.onReset();
            } else {
              if (this.checkPassword) {
                if (arr.join("") === this.checkPassword.join("")) {
                  this.$toast.success("修改成功");
                  this.$router.back();
                  localStorage.setItem("gesture", 1);
                  localStorage.setItem("gesture_pwd", arr.join(""));
                } else {
                  this.titleTips = "两次绘制图案不一致,请重新绘制图案";
                  this.checkPassword = null;
                  this.onReset();
                }
              } else {
                if (arr.length < 5) {
                  this.titleTips = "绘制图案连点必须大于4个";
                } else {
                  this.titleTips = "请再次绘制图案";
                  this.checkPassword = arr;
                }
                this.onReset();
              }
            }
          }

          break;
      }
    },
    drawPoint(style) {
      // 初始化圆心
      for (var i = 0; i < this.lastPoint.length; i++) {
        this.ctx.fillStyle = style;
        this.ctx.beginPath();
        this.ctx.arc(
          this.lastPoint[i].x,
          this.lastPoint[i].y,
          this.radius / 2.5,
          0,
          Math.PI * 2,
          true
        );
        this.ctx.closePath();
        this.ctx.fill();
      }
    },
    drawStatusPoint(type) {
      // 初始化状态线条
      for (var i = 0; i < this.lastPoint.length; i++) {
        this.ctx.strokeStyle = type;
        this.ctx.beginPath();
        this.ctx.arc(
          this.lastPoint[i].x,
          this.lastPoint[i].y,
          this.radius,
          0,
          Math.PI * 2,
          true
        );
        this.ctx.closePath();
        this.ctx.stroke();
      }
    },
    drawCircle(x, y) {
      // 初始化解锁密码面板 小圆圈
      this.ctx.strokeStyle = "#648F83"; // 密码的点点默认的颜色
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      this.ctx.arc(x, y, this.radius, 0, Math.PI * 2, true); // 画圆
      this.ctx.closePath();
      this.ctx.stroke();
    },
    drawLine(style, position) {
      // style:颜色 解锁轨迹
      this.ctx.beginPath();
      this.ctx.strokeStyle = style;
      this.ctx.lineWidth = 3;
      this.ctx.moveTo(this.lastPoint[0].x, this.lastPoint[0].y);

      for (var i = 1; i < this.lastPoint.length; i++) {
        this.ctx.lineTo(this.lastPoint[i].x, this.lastPoint[i].y);
      }
      this.ctx.lineTo(position.x, position.y);
      this.ctx.stroke();
      this.ctx.closePath();
    },
    createCircle() {
      var n = this.chooseType;
      var count = 0;
      this.radius = this.ctx.canvas.width / (1 + 4 * n); // 公式计算
      this.lastPoint = [];
      this.circleArr = [];
      this.restPoint = [];
      var r = this.radius;

      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          count++;
          let point = {
            x: j * 4 * r + 3 * r,
            y: i * 4 * r + 3 * r,
            index: count
          };
          this.circleArr.push(point);
          this.restPoint.push(point);
        }
      }

      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

      // 画9个圆
      for (let i = 0; i < this.circleArr.length; i++) {
        this.drawCircle(this.circleArr[i].x, this.circleArr[i].y);
      }
    },
    onStartHandler(e) {
      e.preventDefault(); // 某些android 的 touchmove不宜触发 所以增加此行代码

      // 重置图案
      this.onReset();
      var position = this.getPosition(e);

      for (var i = 0; i < this.circleArr.length; i++) {
        if (
          Math.abs(position.x - this.circleArr[i].x) < this.radius &&
          Math.abs(position.y - this.circleArr[i].y) < this.radius
        ) {
          this.touchedFlag = true;
          this.drawPoint(this.circleArr[i].x, this.circleArr[i].y);
          this.lastPoint.push(this.circleArr[i]);
          this.restPoint.splice(i, 1);
          break;
        }
      }
    },
    onMoveHandler(e) {
      if (this.touchedFlag) {
        this.onUpdateHandler(this.getPosition(e));
      }
    },
    onEndHandler(e) {
      //绘制完
      if (this.touchedFlag) {
        this.touchedFlag = false;
        let arr = this.lastPoint.map(point => {
          return point.index;
        });

        this.testPassword(arr);
        // 重绘最后所有点
        this.onUpdateHandler(this.lastPoint[this.lastPoint.length - 1]);
      }
      //   this.onReset()
    },

    onUpdateHandler(position) {
      // 核心变换方法在touchmove时候调用
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

      for (let i = 0; i < this.circleArr.length; i++) {
        // 每帧先把面板画出来
        this.drawCircle(this.circleArr[i].x, this.circleArr[i].y);
      }

      this.drawPoint("#648F83"); // 每帧花轨迹
      this.drawStatusPoint("#648F83"); // 每帧花轨迹

      this.drawLine("#648F83", position, this.lastPoint); // 每帧画圆心

      for (let i = 0; i < this.restPoint.length; i++) {
        if (
          Math.abs(position.x - this.restPoint[i].x) < this.radius &&
          Math.abs(position.y - this.restPoint[i].y) < this.radius
        ) {
          this.drawPoint(this.restPoint[i].x, this.restPoint[i].y);
          this.lastPoint.push(this.restPoint[i]);
          this.restPoint.splice(i, 1);

          break;
        }
      }
    },
    onReset() {
      this.createCircle();
    },
    bindEvent() {
      // 网页
      this.canvas.addEventListener("mousedown", this.onStartHandler);
      this.canvas.addEventListener("mousemove", this.onMoveHandler);
      this.canvas.addEventListener("mouseup", this.onEndHandler);
      // 移动端
      this.canvas.addEventListener("touchstart", this.onStartHandler);
      this.canvas.addEventListener("touchmove", this.onMoveHandler);
      this.canvas.addEventListener("touchend", this.onEndHandler);
    },
    getPosition(e) {
      // 获取touch点相对于canvas的坐标
      var rect = e.currentTarget.getBoundingClientRect();
      var position = e.touches
        ? {
            x: (e.touches[0].clientX - rect.left) * this.devicePixelRatio,
            y: (e.touches[0].clientY - rect.top) * this.devicePixelRatio
          }
        : {
            x: (e.clientX - rect.left) * this.devicePixelRatio,
            y: (e.clientY - rect.top) * this.devicePixelRatio
          };
      return position;
    }
  }
};
</script>
<style scoped lang="scss">
.header {
  height: 50px;
  border-bottom: 1px #eee solid;
  background: #fff;
  display: flex;
  align-items: center;
  .back {
    width: 50px;
    font-size: 22px;
    margin-left: 15px;
  }
  span {
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    font-size: 18px;
  }
}
.cancel{
  position: absolute;
  bottom: 30px;
  right: 50px;
  font-size: 16px;
}
.nickname{
  position: absolute;
  top: 120px;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 26px;
  font-weight: 600;
}
.tips {
  position: absolute;
  bottom: 350px;
  font-size: 20px;
  text-align: center;
  width: 100%;
}
.gesture_unlock {
  position: absolute;
  left: 50%;
  bottom: 60px;
  transform: translate(-50%);
  margin-left: -12px;
}
</style>