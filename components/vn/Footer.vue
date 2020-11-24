<template>
  <footer>
    <div class="container">
    <div>
      <p>Liên kết：</p>
      <div class="links">
        <a href="#" class="fa-facebook">Facebook</a>
        <a href="https://twitter.com/vietnambis" class="fa-twitter">Twitter</a>
        <a href="https://www.pinterest.com/vnbis/" class="fa fa-pinterest">Pinterest</a>
        <a href="#" class="fa fa-linkedin"></a>
      </div>
    </div>
    <div>
      <p>Truy cập nhanh：</p>
      <div class="links">
        <a href="https://vietnambis.com/vn/lien-he">Liên hệ</a>
        <a href="https://vietnambis.com/vn/gioi-thieu">Về chúng tôi</a>
      </div>
    </div>
    </div>
  </footer>
</template>

<style scoped>
footer {
  background: rgb(38, 50, 56);
  padding: 50px 100px;
  color: #fff;  
}

div {
  padding-bottom: 20px;
}

footer div:last-child {
  padding-bottom: 0;
}

p {
  font-size: 16px;
  padding-bottom: 10px;
}

a {
  margin-right: 20px;
}
@media screen and (max-width: 960px) {
  footer{
    padding: 20px 10px;
  }
}
</style>
