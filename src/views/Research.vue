<template>
  <div class="columns">
    <div class="box is-10 column is-offset-1">
      <div class="content">
      <h1 class="title">Project Catalyst Fund 6 and 7, SDG Search Tool</h1>
      <p>The Sustainable Development Goals (SDGs) search tool is made to help users search which fund 6 projects (as of now) are related to UN SDG and which SDGs they are trying to tackle.</p>
      <p>In fund 6 27.5% of the 172 funded proposals (21 were proposals for challenges without direct funding) were directly connected to SDGs and in addition, 68.5% were indirectly connected to SDGs.</p>
      <p>In fund 7 70.3% of the 290 funded proposals (24 were proposals for challenges without direct funding) were directly connected to SDGs and in addition, 21.4% indirectly connected to SDGs.</p>
      <p>For more info about the SDGs: <a href="https://sdgs.un.org/goals" target="_blank">https://sdgs.un.org/goals</a></p>
      <p>For more information about Catalyst and SDG please visit: <a href="https://docs.google.com/presentation/d/1MjmGE75oPMcejK3MWcP11fPaQXfJGkhf/edit#slide=id.p6" target="_blank">https://docs.google.com/presentation/d/1MjmGE75oPMcejK3MWcP11fPaQXfJGkhf/edit#slide=id.p6</a></p>
      <p>To learn more about how Cardano is focused on social, economic and environmental issues please visit: <a href="https://www.Cardano4Climate.com" target="_blank">www.Cardano4Climate.com</a> and <a href="https://www.sustainableada.com" target="_blank">www.sustainableada.com</a>.</p>
      <div class="buttons is-centered">
        <b-button
          class="mb-6 mt-4"
          type="is-primary is-large"
          tag="router-link"
          :to="{ name: 'Home' }"
        >
          Explore proposals</b-button>
      </div>
    </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Research',
  data() {
    return {
    }
  },
  components: {
  },
  computed: {
  }
}
</script>
