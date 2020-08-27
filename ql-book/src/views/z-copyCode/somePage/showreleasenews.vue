<template>
    <div class="container-wrap">

    </div>
</template>

<script>
  export default {
    name:'showReleaseNews',
    data() {
      return {
        
      }
    },
    methods: {
      
    },
    activated: function() {
        var url = this.$route.params.url
        console.log(url,'传入url')
		    if(url.startsWith("http://")){
          url = url.replace(/http/,'https')
        }else{
          url = "https://" + url;
        }
        window.open(url)
    },
  }
</script>

<style scoped lang="scss">
.container-wrap{
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    overflow-y: auto;
}
</style>
