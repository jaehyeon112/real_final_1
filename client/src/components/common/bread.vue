<template>
  <div>
    <v-breadcrumbs
      :items="items"
      divider=">"

    >
  </v-breadcrumbs>

   
  </div>
</template>

<script>
  export default {
    data: () => ({
      items: [
      ],
      split : []
    }),
   props: ['breadcrumb'],
   methods:{
    check(){
     let time = (String(this.breadcrumb).split('/'));
     for(let i = 0; i < time.length; i++){
       switch(time[i]){
        case "" :
          this.items.push({title : "홈" , href : "/main"})
          break;
          case "menu" :
          this.items.push({title : "메뉴" , href : "/menu"})
          break;
          case "main" :
          this.items.push({title : "밀키트" , href : "/menu/all"})
          break;
          case "all" :
          this.items.push({title : "전체" , href : "/menu/main/all"})
          break;
          case "e1" :
          this.items.push({title : "한식" , href : "/menu/main/e1"})
          break;
          case "e2" :
          this.items.push({title : "중식" , href : "/menu/maine2"})
          break;
          case "e3" :
          this.items.push({title : "양식" , href : "/menu/maine3"})
          break;
          case "e4" :
          this.items.push({title : "일식" , href : "/menu/main/e4"})
          break;
          case "e5" :
          this.items.push({title : "분식" , href : "/menu/main/e5"})
          break;
          case "e6" :
          this.items.push({title : "동남아" , href : "/menu/main/e6"})
          break;
          case "new" :
          this.items.push({title : "신상품" , href : "/menu/main/e6"})
          break;
          case "best" :
          this.items.push({title : "신상품" , href : "/menu/main/e6"})
          break;
          case "sub" :
            this.items.push({title : "갑자기 땡긴다면"})
            break;
            case "f1":
            this.items.push({title : "바삭한맛" , href : "/menu/main/e6"})
            break;
            case "f2":
            this.items.push({title : "매콤한맛" , href : "/menu/main/e6"})
            break;
            case "f3":
            this.items.push({title : "국물" , href : "/menu/main/e6"})
            break;
            case "f4":
            this.items.push({title : "건강한맛" , href : "/menu/main/e6"})
            break;
            case "frozen":
            this.items.push({title : "냉동전문관" , href : "/menu/main/e6"})
            break;
            case "sale":
            this.items.push({title : "특가" , href : "/menu/main/e6"})
            break;
       }
     }
    }
  }
   ,

   created(){
    this.check();
   }
  }
</script>