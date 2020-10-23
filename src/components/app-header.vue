<template>
  <div class="app-header-box">
    <div class="float-left">
      <ul class="app-header-tool">
        <li><router-link to="/admin" class="m-link-effect"><i class="fa fa-home"></i>&nbsp;面板首页</router-link></li>
        <!-- <li><a href="http://lanyueos.com" target="_blank" class="m-link-effect">Website&nbsp;<i class="fa fa-external-link"></i></a></li> -->
      </ul> 
    </div>
    <div class="float-right">
      <ul class="app-header-tool">
        <li><input class="tool-search-input" placeholder="Search..."/></li>
        <li>
          <m-dropdown align="right" :panel-style="{'min-width': '150px'}">
            <button class="tool-btn">
              <img :src="userImg" class="user-avatar"/>&nbsp;
              <span>Administrator</span>&nbsp;
              <i class="fa fa-caret-down"></i>
            </button>
            <m-menu :menus="userMenus" theme="light" slot="panel"/>
          </m-dropdown>
        </li>
        <li @click="handleFullScreen">
          <button class="tool-btn" v-if="fullScreen"><i class="fa fa-compress"></i></button>
          <button class="tool-btn" v-else><i class="fa fa-expand"></i></button>
        </li>
        <!-- <li><button class="tool-btn"><i class="fa fa-wrench"></i></button></li> -->
      </ul>
    </div>
  </div>
</template>

<script>
import MMenu from './menu'
import MDropdown from './dropdown'
import { requestFullScreen, exitFullscreen } from '../utils'
import userImg from '../assets/user.jpg'

export default {
  components: {
    MMenu,
    MDropdown
  },
  data () {
    return {
      userImg,
      fullScreen: false,
      menus: [
        { label: 'Dashboard', icon: 'fa fa-dashboard', path: '/admin' },
        { label: 'Introduce1', icon: 'fa fa-dot-circle-o', path: '/page1' },
        {
          label: 'GROUP 1',
          type: 'group',
          items: [
            { label: 'User Manger', icon: 'fa fa-user-md', path: '/page1' },
            { label: 'Permission Manger', icon: 'fa fa-tasks', path: '/page2' },
            { label: 'Group Manger', icon: 'fa fa-group', path: '/page3' }
          ]
        },
        {
          label: 'GROUP 2',
          type: 'group',
          items: [
            { label: 'Content Manger', icon: 'fa fa-circle', path: '/test' },
            { label: 'Content Manger', icon: 'fa fa-bomb', path: '/test' },
            { type: 'line' },
            { label: 'Content Manger', icon: 'fa fa-circle-o', path: '/test' }
          ]
        }
      ],
      userMenus: [
        { label: 'Your profile', icon: 'fa fa-address-card', path: '/' },
        { label: 'Logout', icon: 'fa fa-arrow-circle-left', path: '/logout' }
      ]
    }
  },
  methods: {
    handleFullScreen () {
      if (this.fullScreen) {
        exitFullscreen()
        this.fullScreen = false
      } else {
        requestFullScreen()
        this.fullScreen = true
      }
    }
  }
}
</script>
