<script>
  export let buttonState = true;
  import Button_right_ico from "../../../public/images/Button_right_ico.svelte";
</script>

<button class="btn-sv" on:click disabled={!buttonState}>
  <Button_right_ico className={!buttonState? 'disabled': ''}/>
</button>

<style>
  :global(button:disabled) {
    background: rgba(182, 182, 182, 0.2);
    border: 1px solid #6a6a6a;
    pointer-events: none;
  }

  .btn-sv {
    width: 142px;
    height: 66px;
    display: flex;
    justify-content: center;
    background: rgba(0, 110, 255, 0.1);
    border: 1px solid #006eff;
    color: #0085ff;
  }
  .btn-sv:hover {
    background: #006eff;
    color: #fff;
  }
  .btn-sv:active {
    background: rgba(0, 110, 255, 0.2);
  }
</style>
