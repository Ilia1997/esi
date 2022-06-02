<script>
  import "intl-tel-input/build/css/intlTelInput.css";


  import intlTelInput from 'intl-tel-input';
import { afterUpdate } from "svelte";

let input ;
let iti ;
let value;
afterUpdate(()=>{
  if(input){
  iti = intlTelInput(input, {
    separateDialCode:true,
    utilsScript:'https://intl-tel-input.com/node_modules/intl-tel-input/build/js/utils.js',
    autoPlaceholder: ''
});
}
})
function getIti(){
  var number = iti.getNumber();
  console.log(number)
}

</script>

<div class="tab__wrapper">
  <div class="tab__head">Contact</div>
  <div class="tab__subhead">Please put your legal Phone and Email</div>
  <div class="tab__form__fields">
    <input type="tel" class="input" bind:this={input} autocomplete />
    <input type="email" class="input" placeholder="Email" autocomplete/>
  </div>
</div>

<style>

</style>
