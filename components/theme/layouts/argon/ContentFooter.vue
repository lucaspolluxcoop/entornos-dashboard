<template>
  <footer class="footer px-4 mx-2">
    <div class="row align-items-center justify-content-lg-between">
      <div class="col-lg-6">
        <ul class="nav nav-footer">
          <li class="nav-item">
            <a
              href="https://polluxcoop.com/contact-us/"
              class="nav-link"
              target="_blank"
              rel="noopener"
              >SOLICITAR ASISTENCIA</a
            >
          </li>
        </ul>
      </div>

      <div class="col-lg-6">
        <div class="copyright text-center text-lg-right text-muted">
          © {{ year }}, Sitio desarrollado por
          <a
            href="#"
            class="font-weight-bold ml-1"
            target="_blank"
            rel="noopener"
            >Ambrosino, Arregui, Biondi, Kratochvil</a
          >
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      year: new Date().getFullYear(),
    }
  },
}
</script>
