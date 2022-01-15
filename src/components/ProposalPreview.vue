<template>
  <div class="card mb-4"  :key="proposal.id">
    <router-link :to="{ name: 'proposal', params: {
        id: proposal.id
      }}">
    <div class="card-content">
      <div class="content">
        <p class="subtitle is-6 mb-1" v-if="challenge">
          {{ challenge.title }}
        </p>
        <p class="subtitle is-4 mb-1">
          {{ proposal.title }}
        </p>
        <p class="subtitle is-6 mb-4" v-if="proposal.author">
          {{ proposal.author }}
        </p>
        <p>{{ proposal.description }}</p>
        <p><b>Funds requested:</b> {{ proposal.requested_funds | currency}}</p>
        <div class="goals mb-4" v-if="proposal.goals.length > 0">
          <div class="heading">SDGs</div>
          <div class="goals-list columns is-multiline">
            <div class="single-goal column is-1" v-for="goal, index in proposal.goals" :key="`goal-${goal}-${proposal.id}-${index}`">
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
    </router-link>
    <funded-widget :proposal="proposal" />
  </div>
</template>

<script>

import FundedWidget from '@/components/FundedWidget';

export default {
  data() {
    return {}
  },
  props: ['proposal', 'goalsById', 'challenges'],
  components: {
    FundedWidget
  },
  computed: {
    funded() {
      return (this.proposal.status) ? 'YES' : 'NO'
    },
    challenge() {
      return this.challenges[this.proposal.category]
    }
  }
}

</script>
