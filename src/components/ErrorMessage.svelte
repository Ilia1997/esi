<script>
    import {fade} from 'svelte/transition'
    export let errorMessage;
</script>
<div class="error__message" in:fade={{ duration: 300 }} out:fade={{ duration: 150 }}>{errorMessage}</div>

<style>
.error__message {
    position: absolute;
    right: 200px;
    bottom: 20px;
    color: red;
  }
  @media only screen and (max-width: 768px) {
    .error__message {
    position: static;
    width: 100%;
    text-align: center;
    padding: 10px 0;
  }
    
  }
</style>