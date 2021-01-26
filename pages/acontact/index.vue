<template>
    <div class="container">
      <div class="breadcrumbs"><span><a href="https://vietnambis.com">Home</a></span>  » <span>Contact</span> </div>
    <div class="section">
        <div class="row">
          <div class="title"><h1>Contact Us (vietnambis1@gmail.com)</h1></div>
        </div>
        <form @submit.prevent="sendEmail">
          <label>Name</label>
          <input class="u-full-width"
            type="text" 
            v-model="name"
            name="name"
            placeholder="Your Name"
          >
          <label>Email</label>
          <input class="u-full-width"
            type="email" 
            v-model="email"
            name="email"
            placeholder="Your Email"
            >
          <label>Message</label>
          <textarea class="u-full-width"
            name="message"
            v-model="message"
            cols="30" rows="5"
            placeholder="Message">
          </textarea>
           <input type="submit" value="Send">
  </form>
    </div>
    </div>
</template>
<style scoped>
* {box-sizing: border-box;}

/* .container {
  display: block;
  margin:40px auto;
  text-align: center;
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
  width: 100%;
} */

label {
  float: left;
}

input[type=text], [type=email], textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 16px;
  resize: vertical;
}

input[type=submit] {
  background-color: #4CAF50;
  color: white;  
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type=submit]:hover {
  background-color: #45a049;
}
</style>
<script>
import emailjs from 'emailjs-com';
export default {
  
  data() {
    return {
      name: '',
      email: '',
      message: ''
    }
  },
  methods: {
    sendEmail(e) {
      try {
        emailjs.sendForm('service_vietnambis1', 'template_8gqyw7e', e.target,
        'user_5OW9TF31FOI2b3TTFzMzY', {
          name: this.name,
          email: this.email,
          message: this.message
        }).then((result) => {
            console.log('SUCCESS!', result.status, result.text);
            alert("Thank you!");
        }, (error) => {
            console.log('FAILED...', error);
        });
      } catch(error) {
          console.log({error})
      }
      // Reset form field
      this.name = ''
      this.email = ''
      this.message = ''
    },
  }
}
</script>