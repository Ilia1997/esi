<script>
  export let buttonState = true;
  import Button_right_ico from "../../../public/images/Button_right_ico.svelte";
</script>

<button class="btn-sv" on:click disabled={!buttonState}>
  <Button_right_ico className={!buttonState? 'disabled': ''}/>
</button>

<style>
  :global(button:disabled),
  :global(.btn-sv:disabled) {
    background: rgba(182, 182, 182, 0.2) !important;
    border: 1px solid #6a6a6a !important;
    pointer-events: none !important;
    opacity: 0.25;
  }

  .btn-sv {
    width: 142px;
    height: 66px;
    display: flex;
    justify-content: center;
    background: rgba(0, 110, 255, 0.1);
    border: 1px solid var(--btn-color);
    color: var(--btn-color);
  }
  .btn-sv:hover {
    background: var(--btn-color-hover);
    color: var(--white-color);
  }
  .btn-sv:active {
    background: rgba(0, 110, 255, 0.2);
  }

  @media only screen and (max-width: 767px) {
    .btn-sv {
        width: auto;
    }
  }
</style>
