<template>
  <div class="container">
    <div>
        <h1>회원 탈퇴 page</h1>
        
    

    <b-form-group label="회원 탈퇴 사유를 알려주세요" v-slot="{ ariaDescribedby }">
      <b-form-radio-group
        v-model="selected"
        :options="options"
        :aria-describedby="ariaDescribedby"
        name="radios-stacked"
        stacked
      >
      
      </b-form-radio-group>
<b-container fluid>
  <b-row>
    <b-col sm="2">
      <label for="textarea-auto-height">기타:</label>
    </b-col>
    <b-col sm="10">
      <b-form-textarea
        id="textarea-auto-height"
        placeholder="Auto height textarea"
        rows="3"
        max-rows="8"
      ></b-form-textarea>
    </b-col>
  </b-row>
  </b-container>


    </b-form-group>

    <div class="button">
          <b-button squared variant="info" a href="/">홈으로</b-button>
         <b-button variant="outline-secondary" type="submit">탈퇴하기</b-button>
    </div>
</div>

    <div class="mt-3">Selected: <strong>{{ selected }}</strong></div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        selected: 'first',
        options: [
          { text: 'First 사유', value: 'first' },
          { text: 'Second 사유', value: 'second' },
          { text: 'Third 사유', value: 'third' },
          { text: 'fourth사유', value: 'fourth' },
          { text: 'fifth 사유', value: 'fifth' },
          { text: '기타', value: 'etc' },
        ]
      }
    }
  }
</script>