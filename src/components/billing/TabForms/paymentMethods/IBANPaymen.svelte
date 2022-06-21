<script>
  import { fade } from "svelte/transition";
</script>

<div class="iban_wrapper" in:fade>
  <label for="iban">IBAN</label>
  <div class="input__card">
    <input
      type="text"
      id="iban"
      class="input-sv"
      placeholder="BA1234 1234 1234 1234"
      autocomplete
    />
  </div>
  <button class="btn-sv add__payment">ADD</button>
</div>

<style>
  .add__payment {
    width: 100%;
    justify-content: center;
    margin: 10px 0;
    background: rgba(0, 110, 255, 0.1);
    border: 1px solid #006eff;
    color: #0085ff;
  }
  .btn-sv:hover {
    background: #006eff;
    color: #fff;
  }
</style>
