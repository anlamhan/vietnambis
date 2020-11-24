<template>
    <div class="container">
      <div class="breadcrumbs"><span><a href="https://vietnambis.com/vn">Trang chủ</a></span>  » <span>Liên hệ</span> </div>
    <div class="section">
        <div class="row">
          <div class="title"><h1>Liên hệ</h1></div>
        </div>
        <form>
          <div class="row">
            <div class="six columns">
              <label for="exampleEmailInput">Email của bạn</label>
              <input class="u-full-width" type="email" placeholder="your@mail.com" id="txtEmailInput">
            </div>
            <div class="six columns">
              <label for="exampleRecipientInput">Lý do liên hệ</label>
              <select class="u-full-width" id="exampleRecipientInput">
                <option value="Option 1">Câu hỏi</option>
                <option value="Option 2">Admiration</option>
                <option value="Option 3">Tôi có thể lấy số của bạn được không?</option>
              </select>
            </div>
          </div>
          <label for="exampleMessage">Nội dung tin nhắn</label>
          <textarea class="u-full-width" placeholder="Xin chào Vietnam Bis" id="exampleMessage"></textarea>
          <label class="example-send-yourself-copy">
            <input type="checkbox">
            <span class="label-body">Gửi kèm cho tôi một bản</span>
          </label>
          <input class="button-primary" type="submit" value="Gửi liên hệ">
        </form>
    </div>
    </div>
</template>
<script>
// let marked = require('marked');

// marked.setOptions({
//   renderer: new marked.Renderer(),
//   gfm: true,
//   tables: true,
//   breaks: false,
//   pedantic: false,
//   sanitize: false,
//   smartLists: true,
//   smartypants: false,
//   highlight: function (code) {
//     return hljs.highlightAuto(code).value;
//   }
// });
 export default {
   layout: 'vn',
     head() {
     return {
       title: 'Liên hệ',
       meta: [
         { hid: 'description', name: 'description', content: 'Nếu bạn có những vấn đề thắc mắc về Vietnam Bis, hãy gửi thư cho chúng tôi bằng cách điền nội dung dưới đây' },
         { name: 'keywords', content: this.keywords.join(',') }
       ]
     }
   },
   computed: {
     keywords() {
       let keywords = [];
       // this.post.tags.forEach(function (element) {
       //   keywords.push(element.name)
       // });
       return keywords
     }
   }
 }
</script>