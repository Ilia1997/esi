<script>
  import DropdownIco from "../../../../public/images/Dropdown_ico.svelte";
  import { clickOutside } from "../../../functions/clickOutside";
  import {onMount} from 'svelte'
  import {
    calcInputPhonePadding,
    
    selectedCountry,
  } from "../../../stores/infoStore";
  import {getCountriesFromDB} from '../../billing/getListCountries'

  let active = false;
  let countryDropdownWidth;
  let countries = [];
  $: {
    countryDropdownWidth;
    $calcInputPhonePadding = countryDropdownWidth + 15;
  }

  function setActiveCounty(ind) {
    $selectedCountry = countries[ind];
    console.log($selectedCountry);
  }
  // click outside dropdown
  function handleClickOutside(item) {
    if (item === "active") {
      active = false;
    }
  }
  

onMount(async () => {
  let allData = await getCountriesFromDB();
  
  let parsedData = JSON.parse(allData)
  console.log(parsedData)
  parsedData.data.forEach((item) => {
    countries = [...countries, item];
  });
  $selectedCountry = countries[0];
  console.log( $selectedCountry)
});
</script>

<div class="tels--dropdown__wrapper">
  <div
    class="country__tels--dropdown"
    class:active
    on:click={() => (active = !active)}
    use:clickOutside
    on:click_outside={() => handleClickOutside("active")}
    bind:clientWidth={countryDropdownWidth}
  >
  {#if $selectedCountry}
  <div class="current__val">
    <img
      src='data:{$selectedCountry.icon.image.mime || undefined};base64,{$selectedCountry.icon.image.data}'
      alt={$selectedCountry.countryName}
      class="flag"
    />
    <div class="counry__code">{$selectedCountry.phoneCode}</div>
    <DropdownIco class="country {active ? 'active' : ''}" />
  </div>
  {/if}
    <div class="dropdown__list">
      {#each countries as county, index}
        <div
          class="dropdown__list--item"
          on:click={() => {
            setActiveCounty(index);
          }}
        >
          <img src='data:{county.icon.image.mime};base64,{county.icon.image.data}' alt={county.countryName} class="flag" />
          <div class="country__name">{county.countryName}</div>
          <div class="country__code">{county.phoneCode}</div>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .tels--dropdown__wrapper {
    position: absolute;
    left: 15px;
    top: 0;
    display: flex;
    align-items: center;
    height: 100%;
  }
  .country__tels--dropdown {
    position: relative;
    width: auto;
    height: 50px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 15px;
    padding-right: 30px;
    cursor: pointer;
  }
  .country__tels--dropdown.active .dropdown__list {
    display: block;
  }
  .current__val {
    display: flex;
    align-items: center;
  }

  .flag {
    width: 20px;
    height: 10px;
    margin: 0 10px 0 0;
  }

  .dropdown__list {
    position: absolute;
    top: 55px;
    left: 0;
    width: 250px;
    height: auto;
    background-color: white;
    z-index: 2;
    border: 1px solid var(--border-color);
    border-radius: 10px;
    display: none;
  }
  .dropdown__list--item {
    display: flex;
    align-items: center;
    padding: 10px 20px;
    transition: all ease 0.3s;
    cursor: pointer;
  }
  .dropdown__list--item:hover {
    background-color: rgb(224, 224, 222);
  }
  .country__name {
    margin: 0 15px 0 0;
  }
  @media only screen and (max-width: 480px) {
    .counry__code {
      font-size: var(--text-size-smaller);
      line-height: var(--small-text-line-height);
    }
    .country__tels--dropdown {
      padding-left: 0;
    }
  }
</style>
