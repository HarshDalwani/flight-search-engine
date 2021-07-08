<template>
  <div>
    <div v-if="!isFlightsEmpty" class="bg-image"></div>
    <div class="container " v-if="!isFlightsEmpty">
      <p class="text-center fw-bolder fs-2 h3 py-4 text-white">
        Flight Search Engine
      </p>
      <div class="card align-items-center">
        <div class="card-body">
          <form @submit.prevent="onFormSubmit">
            <div class="row">
              <div
                class="col-md-4 offset-1  offset-md-2 col-5 mb-4"
                v-for="(item, i) in radios"
                :key="i"
              >
                <input
                  class="form-check-input"
                  required
                  v-model="selectedType"
                  type="radio"
                  name="flight-type"
                  :value="item.val"
                  :id="item.val"
                  checked
                  @click="flightType = item.val"
                />
                <label class="form-check-label" for="return">{{
                  item.text
                }}</label>
              </div>
              <hr />
              <div class="mb-4 col-md-6 col-12">
                <DropDown
                  @on-item-reset="from = {}"
                  @on-item-selected="from = $event"
                  :placeHolder="'FROM (ORIGIN)'"
                />
              </div>

              <div class="mb-4 col-md-6 col-12">
                <DropDown
                  @on-item-reset="to = {}"
                  @on-item-selected="to = $event"
                  :placeHolder="'TO (DESTINATION)'"
                />
              </div>
              <div
                :class="[
                  flightType == 'return' ? 'col-md-6' : 'col-md-12',
                  'col-12',
                  'mb-4',
                ]"
              >
                <label class="form-label">DEPARTURE DATE</label>
                <input
                  :class="[
                    'form-control',
                    checkIfPreviousDate ? 'is-invalid' : '',
                  ]"
                  required
                  v-model="deptDate"
                  type="date"
                />
                <p class="my-1 invalid-feedback" v-if="checkIfPreviousDate">
                  Select valid date!
                </p>
              </div>
              <div v-if="flightType == 'return'" class="mb-4 col-md-6 col-12">
                <label class="form-label">RETURN DATE</label>
                <input
                  :class="['form-control', areDatesSame ? 'is-invalid' : '']"
                  required
                  v-model="returnDate"
                  type="date"
                  id="return-date"
                />
                <p class="my-1 invalid-feedback" v-if="areDatesSame">
                  Return Date and Departure Date are same or you have entered
                  previuos date!
                </p>
              </div>
              <div class="mb-4 col-12">
                <label for="adults">Passengers</label>
                <input
                  class="form-control"
                  required
                  v-model="passengers"
                  type="number"
                  min="0"
                />
              </div>
              <button
                type="submit"
                class="btn btn-outline-info btn-lg btn-block submit-button"
              >
                Search Flights
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <flight-list v-else :flights="flights" />
  </div>
</template>

<script>
import DropDown from "../components/DropDown.vue";
import FlightList from "../components/FlightList.vue";
import { createFlights } from "../helpers/flight_finder";

export default {
  data() {
    return {
      flights: [],
      from: null,
      to: null,
      deptDate: null,
      returnDate: null,
      passengers: null,
      radios: [
        { val: "return", text: "Return" },
        { val: "oneway", text: "OneWay" },
      ],
      selectedType: "",
      flightType: "",
    };
  },
  methods: {
    onFormSubmit() {
      const { to, from, returnDate, flightType, deptDate, passengers } = this;
      const flightObj = {
        to,
        from,
        returnDate,
        flightType,
        deptDate,
        passengers,
      };

      const res = createFlights(flightObj);
      if (
        !this.isFlightsEmpty &&
        !this.areDatesSame &&
        !this.checkIfPreviousDate
      )
        this.flights = res;
    },
  },
  computed: {
    isFlightsEmpty() {
      return this.flights.length >= 1;
    },
    areDatesSame() {
      const { deptDate, returnDate } = this;

      return deptDate != null && returnDate != null && deptDate >= returnDate;
    },
    checkIfPreviousDate() {
      const ifPreviuos = new Date(this.deptDate).getDate();
      const date = new Date().getDate();
      if (this.deptDate != null && ifPreviuos < date) return true;
      else return false;
    },
  },
  components: {
    DropDown,
    FlightList,
  },
};
</script>

<style scoped>
.bg-image {
  min-height: 100vh;
  background: url("../assets/voo-qqq-RSYBi_1fhfM-unsplash.jpg") no-repeat center
    center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  filter: blur(3px);
  -webkit-filter: blur(3px);
}

.container {
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
}
</style>
