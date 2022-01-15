<template>
  <div class="card mb-4"  :key="proposal.id">
    <div class="card-content">
      <div class="content">
        <p class="subtitle is-6 mb-1" v-if="challenge">
          {{ challenge.title }}
        </p>
        <p class="title is-3 mt-0 mb-1">
          {{ proposal.title }}
        </p>
        <p class="subtitle is-6 mb-4" v-if="proposal.author">
          {{ proposal.author }}
        </p>
        <div class="columns">
          <div class="column">
            <p class="mb-2" v-if="proposal.description">
              <b>Problem statement</b><br />
              {{ proposal.description }}
            </p>
            <p class="mb-2" v-if="proposal.importance">
              <b>Challenge question</b><br />
              {{ proposal.importance }}
            </p>
            <p class="mb-4" v-if="proposal.problem_solution">
              <b>Problem solution</b><br />
              {{ proposal.problem_solution }}
            </p>
            <p class="mb-4" v-if="proposal.importance">
              <b>Why is it important?</b><br />
              {{ proposal.importance }}
            </p>
            <p class="mb-4" v-if="proposal.relevant_experience">
              <b>Relevant experience</b><br />
              {{ proposal.relevant_experience }}
            </p>
            <p class="mb-4" v-if="proposal.success">
              <b>How does success look like?</b><br />
              {{ proposal.success }}
            </p>
            <p class="mb-3"><b>Funds requested</b> {{ proposal.requested_funds | currency }}</p>
          </div>
        </div>
        <div class="buttons">
          <b-button
            tag="a"
            :href="proposal.url"
            icon-left="eye"
            type="is-primary"
            target="blank">
            View Full Proposal
          </b-button>
        </div>
        <div class="goals mb-4" v-if="proposal.goals.length > 0">
          <div class="heading">SDGs</div>
          <div class="goals-list columns is-multiline">
            <div class="single-goal column is-2" v-for="goal, index in proposal.goals" :key="`goal-${goal}-${index}`">
              <div class="">
                <img :src="`assets/sdgs/${goalsById[goal].image}`">
              </div>
            </div>
          </div>
        </div>
        <div>
          <b>Proposal funded: {{funded}}</b><br />
          <b>Proposal SDG related: {{proposal.sdg_related}}</b>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters } from "vuex";
import challenges from "@/assets/data/categories.json";
import goals from "@/assets/data/goals.json";

export default {
  data() {
    return {
      challenges,
      goals
    }
  },
  components: {},
  computed: {
    ...mapGetters("filters", ["getById"]),
    proposal() {
      return this.getById(this.$route.params.id)
    },
    funded() {
      return (this.proposal.status) ? 'YES' : 'NO'
    },
    challenge() {
      return this.challenges.find((el) => this.proposal.category == el.id)
    },
    goalsById() {
      let goals = {}
      this.goals.forEach((el) => {
        goals[el.id] = el
      })
      return goals
    }
  }
}

</script>
