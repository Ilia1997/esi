<script>
  import Info_ico from "../../../public/images/Info_ico.svelte";
  export let content;
  export let className;
</script>

<div class="wrapper">
  <button class={className} on:click>
    {content}
    <Info_ico />
  </button>
</div>

<style>
  .wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 22px 0 29px 0;
  }
  button, .btn-sv {
    position: relative;
    padding: 12px 24px;
    border: 1px solid var(--white-color);
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    color: var(--white-color);
    cursor: pointer;
    transition: all ease-in .15s;
  }
  button.blue, .btn-sv.blue {
    background:#8dc5f6;
  }
  button.green, .btn-sv.green {
    background: #91C65D;
  }
  button.violet, .btn-sv.violet{
    background: #C198E3;
  }
  button.blue:hover, .btn-sv.blue:hover {
    background: var(--btn-color-hover);
  }
  button.blue:active, .btn-sv.blue:active {
    background:var(--btn-color-active);
  }
  button.green:hover, .btn-sv.green:hover {
    background: #0FAA3A;
  }
  button.green:active, .btn-sv.green:active{
    background:#2cbc55;
  }
  button.violet:hover, .btn-sv.violet:hover {
    background: var(--btn-color-prev-hover);
  }
  button.violet:active, .btn-sv.violet:active {
    background:var(--btn-color-prev-active);
  }
  @media only screen and (max-width: 991px) {
  .wrapper {
      display: none;
    }
  }
</style>
