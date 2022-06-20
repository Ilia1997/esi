<script>
  import Button_left_ico from "../../../public/images/Button_left_ico.svelte";
</script>
<button class="btn-sv" on:click>
  <Button_left_ico />
</button>

<style>
  .btn-sv {
    width: 142px;
    height: 66px;
    background: rgba(94, 11, 201, 0.2);
    border: 1px solid #5e0bc9;
    color: #5e0bc9;
    display: flex;
    justify-content: center;
  }
  
  .btn-sv:hover {
    background: #5e0bc9;
    color: #fff;
  }
  
  .btn-sv:active {
    background: #5d0bc987;
  }
</style>
