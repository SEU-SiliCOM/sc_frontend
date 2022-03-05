<template>


  <div id="pe-nav-bar">
    <var-app-bar
      title="用户信息"
      title-position="center"
      color="linear-gradient(to top, rgba(150,150,150,0),#2b2b2b"
      :elevation="false"
    >
      <template #left>
        <var-button
          round
          text
          color="transparent"
          text-color="#ffffff"
          @click="this.$router.return('/home')"
        >
          <var-icon name="chevron-left" :size="24"/>
        </var-button>
      </template>


      <template #right>
        <var-menu :offset-y="36" offset-x="-100" v-model:show="show">
          <var-button
            round
            text
            color="transparent"
            text-color="#ffffff"
            @click="show = true"
          >
            <var-icon name="menu" :size="24"/>
          </var-button>

          <template #menu>
            <div id="menu" class="var-elevation--5">
              <var-cell class="menu-cell" v-ripple>
                <div @click="this.$router.push('/user/change-password')">
                  <var-icon size="20" name="cog-outline"/>
                  修改密码
                </div>
              </var-cell>
              <var-cell class="menu-cell" v-ripple>
                <div @click="logout">
                  <var-icon size="20" name="alert-circle-outline"/>
                  退出登陆
                </div>
              </var-cell>
            </div>
          </template>
        </var-menu>
      </template>
    </var-app-bar>
  </div>

  <div id="up-wrap" v-if="this.$store.state.is_init">
    <var-card class="card">
      <template #extra>
        <div id="info-wrap" class="clear-fix">
          <div id="avatar">
            <var-image
              width="100"
              height="100"
              fit="cover"
              radius="50%"
              :src="this.$settings.cos_url + (this.$store.state.user.icon || 'icon/login.jpg')"
            />
          </div>
          <div id="info">
            <div id="username">
              {{user.username}}
            </div>
            <div>
              {{user}}
            </div>
          </div>
        </div>
      </template>

    </var-card>
  </div>

  <div id="left-wrap">
    <var-card id="left-card" class="card">
      <template #extra>
        <div id="head">
          <div id="left-title">个人中心</div>
          <var-divider margin="0"/>
        </div>
        <div class="option">
          <var-icon class="left-icon" size="20" name="account-circle-outline"/>
          123
        </div>
        <div class="option">
          <var-icon class="left-icon" size="20" name="file-document-outline"/>
          456
        </div>

        <div class="option">
          <var-icon class="left-icon" size="20" name="message-text-outline"/>
          789
        </div>
        <var-divider margin="0"/>
        <div class="option" @click="this.$router.push('/user/change-password')">
          <var-icon class="left-icon" size="20" name="cog-outline"/>
          修改密码
        </div>
        <div class="option" @click="logout">
          <var-icon class="left-icon" size="20" name="alert-circle-outline"/>
          退出登录
        </div>
      </template>
    </var-card>
  </div>

  <div id="right-wrap">
    <var-card id="right-card" class="card">
      <template #extra></template>
    </var-card>
  </div>
</template>

<script>
  export default {
    name: "UserInfo",
    data() {
      return {
        show: false
      }
    },
    computed: {
      user() {
        return this.$store.state.user
      }
    },
    methods: {
      logout() {
        this.$dialog({
          message: "确认退出登陆？",
        }).then(res => {
          if (res === "confirm") {
            this.$cookies.remove("token")
            this.$store.commit("logout")
            this.$router.replace("/home")
          }
        })
      },
    }
  }
</script>

<style scoped>
  @media screen and (min-width: 840px) {
    #pe-nav-bar {
      display: none;
    }

    #up-wrap {
      padding-top: 40px;
    }

    #info-wrap {
      padding: 20px;
    }

    #avatar {
      float: left;
      border: 1px solid #ccc;
      border-radius: 50%;
      margin: 0 20px;
    }

    #username {
      font-size: 20px;
      line-height: 24px;
      font-weight: 600;
    }

    #left-wrap {
      width: 30%;
      float: left;
    }

    #left-card {
      margin: 20px 10px 0 0;
    }

    #left-title {
      line-height: 50px;
      text-indent: 5%;
      font-weight: bold;
    }

    .option {
      line-height: 50px;
      font-size: 16px;
      text-indent: 10%;
      cursor: pointer;
    }

    .left-icon {
      margin: 15px 0;
    }

    .option:hover {
      background-color: #eee;
    }

    #right-wrap {
      width: 70%;
      float: left;
    }


    #right-card {
      margin: 20px 0 0 10px;
      height: 50vh;
    }
  }

  @media screen and (max-width: 840px) {
    #left-wrap {
      display: none;
    }

    #pe-nav-bar {
      position: fixed;
      left: 0;
      top: 0;
      width: 100vw;
      z-index: 1000;
    }

    #menu {
      width: 135px;
      background-color: white;
    }

    #head {
      display: none;
    }

    #up-wrap {
      margin: 10px;
    }

    #avatar {
      float: left;
      border: 1px solid #ccc;
      border-radius: 50%;
      margin: 10px;
    }

    #username {
      font-size: 20px;
      line-height: 24px;
      font-weight: 600;
    }

  }
</style>