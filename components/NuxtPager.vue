<template>
  <div class="pager" v-if="totalPage > 0">
    <div class="pager-box">
      <!-- Back button -->
      <template v-if="ssr && !useALink">
        <nuxt-link
          :to="`${link}${linkPath}${nowPage - 1}`"
          :class="['btn btn-prev', {'disabled': nowPage === 1}]"
          v-if="currentPage > 1 || nowPage > 1"
        >{{prevPageText}}</nuxt-link>
        <button
          type="button"
          :class="['btn btn-prev', {'disabled': nowPage === 1}]"
          @click="prevPage"
          v-else-if="currentPage === 1 || nowPage === 1"
        >{{prevPageText}}</button>
      </template>
      <template v-else-if="ssr && useALink">
        <a
          :href="(nowPage - 1) === 1 ? (firstLink ? firstLink : `${link}${linkPath}1`) : `${link}${linkPath}${nowPage - 1}`"
          :class="['btn btn-prev', {'disabled': nowPage === 1}]"
          v-if="currentPage > 1 || nowPage > 1"
        >{{prevPageText}}</a>
        <button
          type="button"
          :class="['btn btn-prev', {'disabled': nowPage === 1}]"
          @click="prevPage"
          v-else-if="currentPage === 1 || nowPage === 1"
        >{{prevPageText}}</button>
      </template>
      <template v-else-if="!ssr">
        <button
          type="button"
          :class="['btn btn-prev', {'disabled': nowPage === 1}]"
          @click="prevPage"
        >{{prevPageText}}</button>
      </template>


      <!-- Page list -->
      <div class="pager-ul">
        <!-- The first page -->
        <template v-if="ssr && !useALink">
          <nuxt-link
            :to="firstLink ? firstLink : `${link}${linkPath}1`"
            :class="['number', {'active': nowPage === 1}]"
            :key="1"
          >1</nuxt-link>
        </template>
        <template v-else-if="ssr && useALink">
          <a
            :href="nowPage === 1 ? 'javascript:void(0)' : (firstLink ? firstLink : `${link}${linkPath}1`)"
            :class="['number', {'active': nowPage === 1}]"
          >1</a>
        </template>
        <template v-else-if="!ssr">
          <span
            :class="['number', {'active': nowPage === 1}]"
            @click="changePage(1)"
          >1</span>
        </template>

        <!-- Omit page number symbols -->
        <!-- <span
          class="number point point-prev"          
          v-if="totalPage > pagerCount && nowPage >= jumpNum"
        > -->
        <a
          :href="`${link}${linkPath}${nowPage - jumpNum}`"
          :class="['btn btn-prev', {'disabled': nowPage === 1}]"
          v-if="totalPage > pagerCount && nowPage > jumpNum + 1"
        >...</a>
        
        <!-- </span> -->

        <!-- The second page -->
        <template v-if="ssr && !useALink">
          <nuxt-link
            :to="`${link}${linkPath}2`"
            :class="['number', {'active': nowPage === 2}]"
            :key="2"
            v-if="(totalPage <= pagerCount || nowPage < jumpNum) && totalPage > 2"
          >2</nuxt-link>
        </template>
        <template v-else-if="ssr && useALink">
          <a
            :href="nowPage === 2 ? 'javascript:void(0);' : `${link}${linkPath}2`"
            :class="['number', {'active': nowPage === 2}]"
            v-if="(totalPage <= pagerCount || nowPage < jumpNum) && totalPage > 2"
          >2</a>
        </template>
        <template v-else-if="!ssr">
          <span
            :class="['number', {'active': nowPage === 2}]"
            @click="changePage(2)"
            v-if="(totalPage <= pagerCount || nowPage < jumpNum) && totalPage > 2"
          >2</span>
        </template>

        <!-- Middle page -->
        <template v-if="ssr && !useALink">
          <nuxt-link
            :class="['number', {'active': nowPage === i}]"
            :to="`${link}${linkPath}${i}`"
            v-for="i in pageList"
            :key="i"
          >{{i}}</nuxt-link>
        </template>
        <template v-else-if="ssr && useALink">
          <a
            :class="['number', {'active': nowPage === i}]"
            :href="nowPage === i ? 'javascript:void(0);' : `${link}${linkPath}${i}`"
            v-for="i in pageList"
            :key="i"
          >{{i}}</a>
        </template>
        <template v-else-if="!ssr">
          <span
            :class="['number', {'active': nowPage === i}]"
            v-for="i in pageList"
            :key="i"
            @click="changePage(i)"
          >{{i}}</span>
        </template>

        
        <template v-if="ssr && !useALink">
          <nuxt-link
            :to="`${link}${linkPath}${totalPage - 1}`"
            :class="['number', {'active': nowPage === (totalPage - 1)}]"
            v-if="(totalPage <= pagerCount || nowPage >= (totalPage - addNum - 1)) && totalPage > 3"
          >{{totalPage - 1}}</nuxt-link>
        </template>
        <template v-else-if="ssr && useALink">
          <a
            :href="nowPage === (totalPage - 1) ? 'javascript:void(0);' : `${link}${linkPath}${totalPage - 1}`"
            :class="['number', {'active': nowPage === (totalPage - 1)}]"
            v-if="(totalPage <= pagerCount || nowPage >= (totalPage - addNum - 1)) && totalPage > 3"
          >{{totalPage - 1}}</a>
        </template>
        <template v-else-if="!ssr">
          <span
            :class="['number', {'active': nowPage === (totalPage - 1)}]"
            @click="changePage(totalPage - 1)"
            v-if="(totalPage <= pagerCount || nowPage >= (totalPage - addNum - 1)) && totalPage > 3"
          >{{totalPage - 1}}</span>
        </template>

        <!-- Omit the page number symbol at the end -->
        <!-- <span
          class="number point point-next"
          @click="jumpFivePage('next')"
          v-if="totalPage > pagerCount && nowPage < (totalPage - addNum - 1)"
        >...</span> -->
        <a
          :href="`${link}${linkPath}${nowPage + jumpNum}`"
          class="btn point point-next"
          v-if="totalPage > pagerCount && nowPage < (totalPage - addNum - 1)"
        >...</a>

        <!-- Last page -->
        <template v-if="ssr && !useALink">
          <nuxt-link
            :to="`${link}${linkPath}${totalPage}`"
            :class="['number', {'active': nowPage === totalPage}]"
            v-if="totalPage > 1"
          >{{totalPage}}</nuxt-link>
        </template>
        <template v-else-if="ssr && useALink">
          <a
            :href="nowPage === totalPage ? 'javascript:void(0);' : `${link}${linkPath}${totalPage}`"
            :class="['number', {'active': nowPage === totalPage}]"
            v-if="totalPage > 1"
          >{{totalPage}}</a>
        </template>
        <template v-else-if="!ssr">
          <span
            :class="['number', {'active': nowPage === totalPage}]"
            @click="changePage(totalPage)"
            v-if="totalPage > 1"
          >{{totalPage}}</span>
        </template>
      </div>

      <!-- Next button -->
      <template v-if="ssr && !useALink">
        <nuxt-link
          :to="`${link}${linkPath}${nowPage + 1}`"
          :class="['btn btn-next', {'disabled': nowPage === totalPage}]"
          v-if="nowPage < totalPage"
        >{{nextPageText}}</nuxt-link>
        <button
          type="button"
          :class="['btn btn-next', {'disabled': nowPage === totalPage}]"
          @click="nextPage"
          v-else-if="nowPage >= totalPage"
        >{{nextPageText}}</button>
      </template>
      <template v-else-if="ssr && useALink">
        <a
          :href="`${link}${linkPath}${nowPage + 1}`"
          :class="['btn btn-next', {'disabled': nowPage === totalPage}]"
          v-if="nowPage < totalPage"
        >{{nextPageText}}</a>
        <button
          type="button"
          :class="['btn btn-next', {'disabled': nowPage === totalPage}]"
          @click="nextPage"
          v-else-if="nowPage >= totalPage"
        >{{nextPageText}}</button>
      </template>
      <template v-else-if="!ssr">
        <button
          type="button"
          :class="['btn btn-next', {'disabled': nowPage === totalPage}]"
          @click="nextPage"
        >{{nextPageText}}</button>
      </template>

      <!-- <div class="pager-jump">
        Đi đến
        <input
          class="jump-input"
          type="number"
          min="1"
          :max="totalPage"
          v-model="redirectNum"
          @change="jumpPage"
          @blur="!confirmBtn && jumpPage"
        >
        trang
      </div>
      <button type="button" class="btn btn-jump" v-if="confirmBtn">mục đích</button> -->
    </div>
  </div>
</template>
<script>
export default {
  name: 'NuxtPager',
  props: {
    total: { // Total number
      type: Number,
      default: 0
    },
    pageSize: { // Number per page
      type: Number,
      default: 10
    },
    pagerCount: { // The number of page number buttons, the default is 7, only the odd number from 5 to 21 is taken, if an even number is passed in, it will be automatically reduced by 1
      type: Number,
      default: (val) => {
        if (!val || isNaN(val) || val < 5 || val > 21) return 7
        let num = 7
        for (let i = 5; i <= 21; i++) {
          if (i % 2 !== 0) {
            if (val >= i && val < i + 2) {
              num = i
            }
          }
        }
        return num
      }
    },
    currentPage: { // Current page number
      type: Number,
      default: 1
    },
    pageCount: { // total pages
      type: Number,
      default: 0
    },
    firstLink: { // Link to the first page
      type: String,
      default: ''
    },
    link: { // Links to other pages
      type: String,
      default: ''
    },
    linkPath: { // The path before the page number, can be empty, eg: the part before 1 in p1/p-1/page1/page-1, the default is /page
      type: String,
      default: '/page'
    },
    useALink: { // Obviously whether the server needs to change to use a tag to jump, the default use nuxt-link single page jump
      type: Boolean,
      default: false
    },
    ssr: { // The default is to use nuxt-link for server-side rendering, and use span to pass it through events when it is false
      type: Boolean,
      default: true
    },
    confirmBtn: { // Whether to display the confirmation button, not displayed by default
      type: Boolean,
      default: false
    },
    prevPageText:
    {
      type:String,
      default:'Prev'
    },
    nextPageText:
    {
      type:String,
      default:'Next'
    }
  },
  data() {
    return {
      nowPage: 1, // Current page number
      redirectNum: 1 // Go to page number
    }
  },
  watch: {
    currentPage(newval) {
      this.nowPage = newval
      this.redirectNum = newval
    }
  },
  computed: {
    totalPage() { // Calculate the total page number
      return this.pageCount > 0 ? this.pageCount : Math.ceil(this.total / this.pageSize) -1
    },
    jumpNum() {
      // jumpNum is the number of pages folded with ellipsis according to the calculation of pagerCount
      return (this.pagerCount + 5) / 2
    },
    addNum() {
      // addNum Indicates that when a folded ellipsis appears, half of the amount that should be added in the middle
      return (this.pagerCount - 3) / 2
    },
    pageList() { // Calculate the page number generated by the middle page
      let arr = []
      if (this.totalPage <= 4) { // The first two pages and the last two pages are fixed, and there is no need to generate intermediate pages
        return []
      } else if (this.totalPage > 4 && this.totalPage <= this.pagerCount + 1) {
        arr = Array.from(new Array(this.totalPage - 1).keys()).slice(3)
      } else if (this.totalPage > this.pagerCount + 1) {
        if (this.nowPage < this.jumpNum) {
          arr = Array.from(new Array(this.pagerCount).keys()).slice(3)
        } else if (this.nowPage >= this.jumpNum && this.nowPage < this.totalPage - this.addNum - 1) {
          const maxNum = this.nowPage + this.addNum
          arr = Array.from(new Array(maxNum + 1).keys()).slice(this.nowPage - this.addNum)
        } else if (this.nowPage >= this.totalPage - this.addNum - 1) { // Finally, according to the value of addNum, the ellipsis is no longer displayed and the number of page numbers is fixed
          const maxNum = this.totalPage
          const reduceNum = this.addNum * 2 + 1
          arr = Array.from(new Array(maxNum - 1).keys()).slice(this.totalPage - reduceNum)
        }
      }
      return arr
    }
  },
  methods: {
    prevPage() {
      if (this.nowPage <= 1) return false
      this.nowPage -= 1
      this.redirectNum = this.nowPage
      this.$emit('changePager', this.nowPage)
    },
    changePage(page) {
      if (page > 0) {
        this.nowPage = page
        this.redirectNum = page
        this.$emit('changePager', this.nowPage)
      }
    },
    jumpPage(page) {
      let str = String(page.target.value)
      if (str.charAt(0) >= 1) {
        const val = parseInt(str)
        if (val <= this.totalPage) {
          this.redirectNum = val
        } else {
          this.redirectNum = this.totalPage
        }
      } else {
        this.redirectNum = 1
      }
      this.nowPage = Number(this.redirectNum)
      this.$emit('changePager', this.nowPage)
    },
    nextPage() {
      if (this.nowPage >= this.totalPage) return false
      this.nowPage += 1
      this.redirectNum = this.nowPage
      this.$emit('changePager', this.nowPage)
    },
    jumpFivePage(type) {
      if (type === 'prev') {
        this.nowPage -= (this.pagerCount - 2)
        if (this.nowPage <= 1) this.nowPage = 1
      } else {
        this.nowPage += (this.pagerCount - 2)
        if (this.nowPage >= this.totalPage) this.nowPage = this.totalPage
      }
      this.redirectNum = this.nowPage
      this.$emit('changePager', this.nowPage)
    }
  },
  created() {
    this.nowPage = this.currentPage
    this.redirectNum = this.nowPage
  }
}
</script>
<style scoped>
.pager {
	 padding: 40px 0;
	 text-align: center;
	 moz-user-select: none;
	 -webkit-user-select: none;
	 -ms-user-select: none;
	 -khtml-user-select: none;
	 user-select: none;
	 font-size: 14px;
	 color: #606266;
}
 .pager .pager-box {
	 display: inline-block;
}
 .pager .pager-box .btn {
	 display: inline-block;
	 border: none;
	 background-color: #f4f4f5;
	 height: 28px;
	 line-height: 28px;
	 border-radius: 2px;
	 cursor: pointer;
	 padding: 0 10px;
	 color: #606266;
}
 .pager .pager-box .btn:hover {
	 color: #ff6900;
}
 .pager .pager-box .btn.disabled {
	 cursor: not-allowed;
	 color: #C0C4CC;
}
 .pager .pager-box .btn.disabled:hover {
	 color: #C0C4CC;
}
 .pager .pager-box .pager-ul {
	 display: inline-block;
	 margin: 0 4px;
	 vertical-align: top;
}
 .pager .pager-box .pager-ul .number {
	 display: inline-block;
	 vertical-align: top;
	 height: 28px;
	 min-width: 30px;
	 line-height: 28px;
	 margin: 0 5px;
	 box-sizing: border-box;
	 text-align: center;
	 background-color: #f4f4f5;
	 color: #606266;
	 border-radius: 2px;
	 padding: 0 4px 0 4px;
	 cursor: pointer;
}
 .pager .pager-box .pager-ul .number.point {
	 line-height: 20px;
	 position: relative;
}
 .pager .pager-box .pager-ul .number.point:hover {
	 color: #ff6900;
}
 .pager .pager-box .pager-ul .number.point:hover:before {
	 content: '<<';
	 position: absolute;
	 min-width: 30px;
	 height: 100%;
	 left: 0;
	 line-height: 28px;
	 background-color: #f4f4f5;
}
 .pager .pager-box .pager-ul .number.point:hover.point-next:before {
	 content: '>>';
}
 .pager .pager-box .pager-ul .number.active {
	 background-color: #ff6900;
	 color: #fff;
}
 .pager .pager-box .pager-ul .number.active:hover {
	 color: #fff;
	 cursor: text;
}
 .pager .pager-box .pager-ul .number:hover {
	 color: #ff6900;
}
 .pager .pager-box .pager-jump {
	 display: inline-block;
	 margin: 0 10px 0 30px;
}
 .pager .pager-box .pager-jump .jump-input {
	 width: 50px;
	 -webkit-appearance: none;
	 -moz-appearance: textfield;
	 background-color: #fff;
	 background-image: none;
	 border-radius: 4px;
	 border: 1px solid #dcdfe6;
	 box-sizing: border-box;
	 color: #606266;
	 text-align: center;
	 display: inline-block;
	 font-size: inherit;
	 height: 28px;
	 padding: 0 3px;
	 line-height: 28px;
	 outline: 0;
	 transition: border-color .2s cubic-bezier(.645,.045,.355,1);
}
 .pager input::-webkit-outer-spin-button, .pager input::-webkit-inner-spin-button {
	 -webkit-appearance: none;
}
 .pager input[type="number"] {
	 -moz-appearance: textfield;
}
 .pager button {
	 outline: none;
}
 .pager a {
	 text-decoration: none;
} 
</style>
