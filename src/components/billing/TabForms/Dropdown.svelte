<script>
  import { clickOutside } from "../../../functions/clickOutside";
  import Dropdown_ico from "../../../../public/images/Dropdown_ico.svelte";
  let active = false;
  export let errorMessageState = false;
  export let disabled = false;
  export let itemsData = [];
  export let activeItem = itemsData[0];
  export let handleClickByItem = () => {};
  $: activeItem;

  // click outside dropdown
  function handleClickOutside() {
    active = false;
  }
  function setActiveItem(item) {
    activeItem = item;
    active = false;
    handleClickByItem();
  }
</script>

<div class="dropdown__wrapper" class:disabled on:click>
  <div
    class="dropdown "
    class:active={active ? active : ""}
    use:clickOutside
    class:error={errorMessageState}
    on:click_outside={handleClickOutside}
  >
    <Dropdown_ico
      on:click={() => {
        active = !active;
      }}
      class="gender {active ? 'active' : ''}"
    />
    <div
      class="dropdown__item--current"
      on:click={() => {
        active = !active;
      }}
    >
      {activeItem || "Gender*"}
    </div>
    <div class="dropdown__items">
      {#each itemsData as item}
        <div style="position:relative">
          <div
            class="dropdown__item"
            on:click={function () {
              setActiveItem(item);
            }}
          >
            {item}
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .dropdown__wrapper {
    position: relative;
    width: 100%;
    min-height: 65px;
  }
  .dropdown__wrapper.disabled,
  .dropdown__wrapper.disabled * {
    background: var(--grey-color);
    border-radius: 10px;
    user-select: none;
    pointer-events: none;
  }
  .dropdown {
    position: absolute;
    width: 100%;
    min-height: 65px;
    cursor: pointer;
    background-color: var(--white-color);
    border: 1px solid var(--border-color);
    border-radius: 10px;
    overflow: hidden;
  }
  .dropdown.error {
    border-color: var(--error-color);
  }
  .dropdown.error .dropdown__item--current {
    color: var(--error-color);
  }
  .dropdown__items {
    display: none;
    position: relative;
    z-index: 10;
    background: white;
  }
  .dropdown__item {
    position: relative;
    padding: 12px 30px;
    transition: all ease-in 0.3s;
    text-align: left;
  }
  .dropdown__item--current {
    padding: 18px 30px;
    text-align: left;
    background: var(--white-color);
    color: var(--black);
    position: relative;
    z-index: 1;
  }
  /* .dropdown__item.disabled {
  
    opacity: 0.5;
  } */
  .dropdown__item:hover {
    background-color: var(--grey-color-lightest);
  }
  .dropdown.active {
    background-color: var(--white-color);
    padding: 11px 0;
  }
  .dropdown.active .dropdown__item--current {
    display: none;
  }
  .dropdown.active .dropdown__items {
    display: block;
  }
  @media only screen and (max-width: 480px) {
    .dropdown__item,
    .dropdown__item--current {
      padding: 1rem;
      font-size: var(--text-size-smaller);
      line-height: var(--small-text-line-height);
    }
    .dropdown__item--current {
      height: 48px;
    }
    .dropdown__wrapper,
    .dropdown {
      min-height: 50px;
    }
  }
</style>
