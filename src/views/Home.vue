<template>
  <div class="container">
    <div class="proposals-list">
      <section>
        <search-box />
      </section>
      <div class="proposals-list">
        <proposal-preview
          :proposal="proposal"
          :key="proposal.id"
          :goals-by-id="goalsById"
          :challenges="challengesById"
          v-for="proposal in filteredProposals"
          />
        <div class="no-results box has-text-centered" v-if="filteredProposals.length === 0">
          <h4 class="subtitle">No proposals match the search criteria</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

import ProposalPreview from '@/components/ProposalPreview';
import SearchBox from '@/components/SearchBox';
import goals from "@/assets/data/goals.json";
import challenges from "@/assets/data/categories.json";

export default {
  name: 'Home',
  data() {
    return {
      goals,
      challenges
    }
  },
  components: {
    ProposalPreview,
    SearchBox
  },
  computed: {
    ...mapState({
      activeFilters: (state) => state.filters.proposals
    }),
    ...mapGetters("filters", ["filteredProposals"]),
    goalsById() {
      let goals = {}
      this.goals.forEach((el) => {
        goals[el.id] = el
      })
      return goals
    },
    challengesById() {
      let challenges = {}
      this.challenges.forEach((el) => {
        challenges[el.id] = el
      })
      return challenges
    }
  },
  mounted() {
    this.$store.commit('filters/checkVersion')
  }
}
</script>
