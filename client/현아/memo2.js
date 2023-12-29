이메일인증

<template>

<div class="contact-form">
            <p class="open-form-btn">문의하기</p>
            <form id="contact-form" class="closed-form">

                <input type="hidden" name="contact_number" v-model="contact_number">
                <input type="text" required placeholder="이름*" name="to_name" class="formReset" v-model="name">
                <input type="text" required placeholder="연락처*" name="contact" class="formReset" v-model="tel">
                <input type="email" required placeholder="이메일*" name="from_name" class="formReset" v-model="email">
                <textarea required placeholder="문의사항*" name="message_html" class="formReset" v-model="require"></textarea>
                <input type="submit" @click="click" value="문의하기">
            </form>
        </div>

</template>

<script>

export default {
  data(){
    return {
      name : "",
      tel : "",
      email : "",
      require : "",
      contact_number : 0
    }
  },

//  {

// window.onload = function() {

//       document.getElementById('contact-form').addEventListener('submit', function(event) {
//          event.preventDefault();
//          // generate the contact number value
//          this.contact_number.value = Math.random() * 100000 | 0;
//          emailjs.sendForm('serviece ID', 'templates ID', this).then(function(response) {
//                console.log('메일 발송 성공', response.status, response.text);         
//             }, function(error) {
//                console.log('메일 발송 실패', error);
//             });
//       });
//    }

//    }

   methods : {
    click(event) {
         event.preventDefault();
         // generate the contact number value
         this.contact_number = Math.random() * 100000 | 0;
         emailjs.sendForm('service ID', 'templates ID', this).then(function(response) {
               console.log('메일 발송 성공', response.status, response.text);         
            }, function(error) {
               console.log('메일 발송 실패', error);
            });
      }
   }


  }

</script>
