<script>
  export let buttonState = true;
  import Button_right_ico from "../../../public/images/Button_right_ico.svelte";
</script>

<button class="btn" on:click disabled={!buttonState}>
  <Button_right_ico />
</button>

<style>
  button:disabled {
    background: rgba(182, 182, 182, 0.2);
    border: 1px solid #6a6a6a;
    pointer-events: none;
  }
  button:disabled svg path {
    fill: #6a6a6a;
  }
  .btn {
    width: 142px;
    height: 66px;
    display: flex;
    justify-content: center;
    background: rgba(0, 110, 255, 0.1);
    border: 1px solid #006eff;
    color: #0085ff;
  }
  .btn:hover {
    background: #006eff;
    color: #fff;
  }
  .btn:active {
    background: rgba(0, 110, 255, 0.2);
  }
</style>
