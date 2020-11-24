<template>
    <div class="container">
      <div class="breadcrumbs"><span><a href="https://vietnambis.com">Home</a></span>  » <span>Contact</span> </div>
    <div class="section">
        <div class="row">
          <div class="title"><h1>Contact Us</h1></div>
        </div>
        <form>
          <div class="row">
            <div class="six columns">
              <label for="exampleEmailInput">Your email</label>
              <input class="u-full-width" type="email" placeholder="your@mail.com" id="txtEmailInput">
            </div>
            <div class="six columns">
              <label for="exampleRecipientInput">Reason for contacting</label>
              <select class="u-full-width" id="exampleRecipientInput">
                <option value="Option 1">Questions</option>
                <option value="Option 2">Admiration</option>
                <option value="Option 3">Can I get your number?</option>
              </select>
            </div>
          </div>
          <label for="exampleMessage">Message</label>
          <textarea class="u-full-width" placeholder="Hi Dave &hellip;" id="exampleMessage"></textarea>
          <label class="example-send-yourself-copy">
            <input type="checkbox">
            <span class="label-body">Send a copy to yourself</span>
          </label>
          <input class="button-primary" type="submit" value="Submit">
        </form>
    </div>
    </div>
</template>
<script>

 export default {
     head() {
     return {
       title: 'Contact Us',
       meta: [
         { hid: 'description', name: 'description', content: 'If you have questions about VietnamBis.com, please send us a message by filling out the form below' }         
       ]
     }
   }
 }
</script>