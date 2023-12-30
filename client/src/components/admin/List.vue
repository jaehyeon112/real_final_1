<template>
    <div class="container-fluid" style:width="50px">
    <div class="row">
        <side/>
    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <div class="container-fluid px-4">
            <div class="card mb-4">
                    <div class="card-header">
                        <svg class="svg-inline--fa fa-table me-1" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="table" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M64 256V160H224v96H64zm0 64H224v96H64V320zm224 96V320H448v96H288zM448 256H288V160H448v96zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64z"></path></svg><!-- <i class="fas fa-table me-1"></i> Font Awesome fontawesome.com -->
                        목록
                        <label style="float: right;">
                            <select class="dropdown" v-model="changeemit">
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                            </select> 
                                entries per page
                        </label>
                    </div>
                    <div class="card-body">
                    <div class="datatable-top">
                        <div class="card-body">
                            <slot name="filterSearch"></slot>
                        </div>
                        <template>
                        <div class="d-flex justify-space-around">
                            <v-icon icon="fa:fas fa-search"></v-icon>
                        </div>
                    </template>
                    <input class="datatable-input" v-model="word" @change="searchData" style="border-bottom: 1px black solid;float: right;">
                    </div>
                <div class="card-body">                 
                <table id="datatablesSimple" class="table">
                    <slot name="dataList"></slot>
                </table>
                </div>
            </div>
        </div>
        </div>
      </div>
    </main>
  </div>
</div>    
</template>

<script>
import side from '../admin/SideBar.vue';
export default {
    data(){
        return {
            changeemit : 10,
            word : '',
        }
    },
    components : {
        side
    },
    created(){
        this.changePagePer();
    },
    methods : {
        searchData(){
            console.log('전달');
            this.$emit('search',this.word);
        },
        changePagePer(){
            console.log('전달');
            this.$emit('changeemit', this.changeemit);
        }
    },
    watch : {
        changeemit(){
            this.changePagePer();
        },
        word(){
            this.searchData();
        }
    }
}
</script>
<style scoped>
    .dropdown{
        border: 1px solid;
        border-radius: 10px;
        padding: 5px;
        width: 100px;
        text-align: center;
    }

</style>
