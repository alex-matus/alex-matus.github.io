<script type='text/javascript'>//<![CDATA[ 
$(function(){
var fixed = false;

$(document).scroll(function() {
    if( $(this).scrollTop() >= 330 ) {
        if( !fixed ) {
            fixed = true;
            $('#myDiv').css({position:'fixed',top:15});
        }
    } else {
        if( fixed ) {
            fixed = false;
            $('#myDiv').css({position:'static'});
        }
    }
});
});//]]>  

</script>

<script type="text/javascript">
function swap(targetId){
  if (document.getElementById){
        target = document.getElementById(targetId);
            if (target.style.display == "none"){
                target.style.display = "";
            } else{
                target.style.display = "none";
            }
                
  }
}
</script>