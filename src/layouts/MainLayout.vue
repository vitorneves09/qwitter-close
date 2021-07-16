<template>
  <q-layout view="lHr lpR fFf">
    <q-header reveal bordered class="bg-white text-black" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />

        <q-toolbar-title class="text-weight-bold">
          <span class="gt-sm">{{ $route.name}}</span>

          <q-icon name="fas fa-dove" size="sm" class="header-icon q-pa-md lt-md" color="primary" />

        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="left" side="left" bordered :width="283">
      <q-icon name="fas fa-dove" size="lg" class="q-pa-md" color="primary" />

      <q-list> 
        <q-item clickable v-ripple to="/" exact>
          <q-item-section avatar>
            <q-icon name="home" color="primary" />
          </q-item-section>

          <q-item-section class="text-h6 text-weight-bold">
            Home
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/abount" exact>
          <q-item-section avatar>
            <q-icon name="help" color="primary" />
          </q-item-section>

          <q-item-section class="text-h6 text-weight-bold">
            abount
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-drawer show-if-above v-model="right" side="right" bordered>
      <q-input
        rounded
        outlined
        dense1
        label="Buscar no Twiiter"
        class="q-pa-md"
      >
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>

      <q-list 
        padding 
        separator
      >
        <q-item class="q-pa-md">
          <q-item-section>
            <q-item-label overline class="text-grey">Education</q-item-label>
            <q-item-label class="text-weight-bold">Something amazing happened!</q-item-label>
            <q-item-label caption
              >Secondary line text. Lorem ipsum dolor sit amet, consectetur
              adipiscit elit.</q-item-label
            >
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>5 min ago</q-item-label>
          </q-item-section>
        </q-item>
        <q-item class="q-pa-md">
          <q-item-section>
            <q-item-label overline class="text-grey">Education</q-item-label>
            <q-item-label class="text-weight-bold">Something amazing happened!</q-item-label>
            <q-item-label caption
              >Secondary line text. Lorem ipsum dolor sit amet, consectetur
              adipiscit elit.</q-item-label
            >
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>5 min ago</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label overline class="text-grey">Education</q-item-label>
            <q-item-label class="text-weight-bold">Something amazing happened!</q-item-label>
            <q-item-label caption
              >Secondary line text. Lorem ipsum dolor sit amet, consectetur
              adipiscit elit.</q-item-label
            >
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>5 min ago</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg" />
          </q-avatar>
          Title
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<style lang="sass">
 .header-icon
  position: absolute
  bottom: 0 
  left: 50%
  transform: translateX(-50)
</style>

<script>
export default {
  data() {
    return {
      left: false,
      right: false
    };
  }
};
</script>
