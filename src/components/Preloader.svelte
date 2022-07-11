<div class="loader__wrapper">
    <div class="loader"></div>
</div>


<style>
.loader__wrapper{
  height: 100%;
  display: grid;
  place-items: center;
  background-color: aliceblue;
}
.loader {
  height: 9rem;
  width: 9rem;
  border-radius: 50%;
  border: 10px solid var(--plan-safe-bg);
  border-top-color: var(--custor-scroll-tumb);
  box-sizing: border-box;
  background: transparent;
  animation: loading 1s linear infinite;
}

@keyframes loading {
  0% {
    transform: rotate(0deg);
  }
  0% {
    transform: rotate(360deg);
  }
}
</style>