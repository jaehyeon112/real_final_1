import main from "@/views/MainHome.vue";
import menu from "@/views/MenuPage.vue";
import realmain from "@/views/realMainhome.vue";

import join from "../views/Join.vue";
import login from "../views/LoginForm.vue";
import finding from "../views/Finding.vue";
import withdrawal from "../views/Withdrawal.vue";
import emailnum from "../views/PutEmailNum.vue";
import putpass from "../views/PutPassword.vue";
import test from "../views/test.vue";

export default {
  path: "/",
  name: "main",
  component: main,

  children: [
    {
      path: "main",
      name: "realmain",
      component: realmain,
    },
    {
      path: "menu",
      name: "menu",
      component: menu,
    },

    //박현아
    {
      path: "login",
      name: "login",
      component: login,
    },
  
    {
      path: "join",
      name: "join",
      component: join
    },
  
    {
      path: "finding",
      name: "finding",
      component: finding
    },
  
    {
      path: "withdrawal",
      name: "withdrawal",
      component: withdrawal
    },
  
    {
      path: "emailnum",
      name: "emailnum",
      component: emailnum
    },
  
    {
      path: "putpass",
      name: "putpass",
      component: putpass
    },
  
    {
      path: "test",
      name: "test",
      component: test
    }
  ],
};
