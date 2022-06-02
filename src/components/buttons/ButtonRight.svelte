<script>
  export let buttonState = true;
</script>

<button class="btn" on:click disabled={!buttonState}>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
  >
    <path
      d="M4.63119 1.43197C4.46715 1.59606 4.375 1.81858 4.375 2.05059C4.375 2.28261 4.46715 2.50513 4.63119 2.66922L8.96244 7.00047L4.63119 11.3317C4.4718 11.4967 4.3836 11.7178 4.3856 11.9472C4.38759 12.1766 4.47961 12.3961 4.64185 12.5583C4.80408 12.7205 5.02354 12.8126 5.25296 12.8146C5.48238 12.8166 5.70341 12.7284 5.86844 12.569L10.8183 7.61909C10.9823 7.45501 11.0745 7.23249 11.0745 7.00047C11.0745 6.76845 10.9823 6.54593 10.8183 6.38184L5.86844 1.43197C5.70435 1.26793 5.48183 1.17578 5.24981 1.17578C5.01779 1.17578 4.79527 1.26793 4.63119 1.43197Z"
      fill="#0084FF"
    />
  </svg>
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
  .btn svg {
  }
  .btn:hover {
    background: #006eff;
    color: #fff;
  }
  .btn:hover svg path {
    fill: #fff;
  }
  .btn:active {
    background: rgba(0, 110, 255, 0.2);
  }
</style>
