<template>
  <section class="filter pt-4 pb-4">
    <div class="filter-list box columns is-multiline m-0 mb-4">
      <div
        class="single-filter is-6 column"
        v-for="(v, i) in availableFilters"
        :key="`filter-${v.key}-${i}`"
      >

        <b-field expanded :label="v.label" v-if="v.type === 'select'">
          <b-select
            expanded
            :placeholder="v.label"
            :value="v.value"
            @input="updateFilter(v, $event)"
          >
            <option v-for="(vv, kk) in v.values" :value="vv" :key="vv">
              {{ kk }}
            </option>
          </b-select>
        </b-field>
        <b-field expanded :label="v.label" v-if="v.type === 'autocomplete'">
          <b-autocomplete
              v-model="search[v.key]"
              :data="filteredDataArray(v.values, v.key)"
              :placeholder="`Search ${v.label}`"
              icon="magnify"
              :open-on-focus="true"
              :clear-on-select="true"
              clearable
              @select="option => updateAutocomplete(option, v)">
              <template #empty>No results found</template>
          </b-autocomplete>
        </b-field>
      </div>
      <div class="single-filter is-3 column">
        <b-field label="Proposal SDG related?">
          <b-checkbox v-model="related"
            size="is-large">
          </b-checkbox>
        </b-field>
      </div>
      <div class="single-filter is-3 column">
        <b-field label="Proposal funded?">
          <b-checkbox v-model="funded"
            size="is-large">
          </b-checkbox>
        </b-field>
      </div>
    </div>
    <div class="active-filters box"
      v-if="activeFilters.challenge.length || activeFilters.proposal_id.length || activeFilters.sdgs.length">
      <div class="tags">
        <div v-for="fk, idx in availableFiltersKeys" :key="`fk-${idx}`" class="filter-section is-12 column">
          <div class="heading">{{ fk.label }}</div>
          <div
            class="tag is-primary is-light"
            v-for="f in activeFilters[fk.key]"
            :key="`active-proposal-${f.value}`"
          >
            <span class="has-ellipsis">{{ f.label }}</span>
            <button class="delete" @click="removeFilter(f)"></button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

import { mapState } from "vuex";
import proposals from "@/assets/data/proposals.json";
import categories from "@/assets/data/categories.json";
import goals from "@/assets/data/goals.json";

export default {
  name: "SearchBox",
  data() {
    return {
      proposals,
      categories,
      goals,
      search: {
        proposal_id: '',
        challenge: '',
        sdgs: '',
      }
    }
  },
  computed: {
    ...mapState({
      activeFilters: (state) => state.filters.activeFilters,
    }),
    availableFilters() {
      return {
        proposal_id: {
          key: "proposal_id",
          label: "Proposal",
          comparison: 'sameInt',
          type: 'autocomplete',
          value: false,
          values: this.proposalsById,
        },
        challenge: {
          key: "challenge",
          label: "Challenge",
          comparison: 'same',
          type: 'autocomplete',
          value: false,
          values: this.categoriesByTitle,
        },
        sdgs: {
          key: "sdgs",
          label: "SDG Goal",
          comparison: 'same',
          type: 'autocomplete',
          value: false,
          values: this.goalsByTitle,
        },
      }
    },
    availableFiltersKeys() {
      return Object.keys(this.availableFilters)
      .filter((el) => this.activeFilters[el].length)
      .map(
        (el) => this.availableFilters[el]
      )
    },
    proposalsById() {
      return this.proposals.reduce(
        (obj, item) => Object.assign(obj, { [item.title]: item.id }),
        {}
      );
    },
    categoriesByTitle() {
      return this.categories.reduce(
        (obj, item) => Object.assign(obj, { [item.title]: item.id }),
        {}
      );
    },
    goalsByTitle() {
      return this.goals.reduce(
        (obj, item) => Object.assign(obj, { [item.altTitle]: item.id }),
        {}
      );
    },
    related: {
      get() {
        return this.activeFilters.related
      },
      set(val) {
        this.$store.commit('filters/addFilter', {
          prop: 'related',
          value: val,
          label: 'SDG Related?'
        });
      }
    },
    funded: {
      get() {
        return this.activeFilters.funded
      },
      set(val) {
        this.$store.commit('filters/addFilter', {
          prop: 'funded',
          value: val,
          label: 'Funded?'
        });
      }
    }
  },
  methods: {
    updateFilter(prop, value, label) {
      this.$store.commit('filters/addFilter', {
        prop,
        value,
        label
      })
    },
    removeFilter(f) {
      this.$store.commit('filters/removeFilter', f)
    },
    getLabelValue(f) {
      return Object.keys(f.values)
        .find((key) => f.values[key] === f.value)
    },
    filteredDataArray(values, key) {
      return Object.keys(values).filter((option) => {
        return option
            .toString()
            .toLowerCase()
            .indexOf(this.search[key].toLowerCase()) >= 0
      })
    },
    updateAutocomplete(option, v) {
      if (option) {
        this.updateFilter(v, v.values[option], option)
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.tag .has-ellipsis {
  max-width: calc(100vw - 110px);
}
</style>
