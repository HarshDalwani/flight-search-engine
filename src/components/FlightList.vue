<template>
  <div class="container-fluid mt-4">
    <div class="row justify-content-center align-items-center">
      <div class="col-12 ">
        <p
          class="fs-4 text-white text-center bg-secondary text-uppercase fw-bold "
        >
          {{ showFlightCities }}
        </p>
        <div class="my-2">
          <strong>Departure Date: </strong>
          <span>{{ flights[0].deptDate }}</span>
          <div class="mt-1" v-if="isReturnFlight">
            <strong>Return Date: </strong>
            <span>{{ flights[0].returnDate }}</span>
          </div>
        </div>
      </div>
      <div class="col-12 mt-5">
        <label for="customRange2" class="fw-bold form-label"
          >Refine Flight Search</label
        >
        <input
          type="range"
          class="form-range"
          :min="getFlightFares[0]"
          :max="getFlightFares[getFlightFares.length - 1]"
          id="customRange2"
          v-model="price"
          step="200"
        />
        <p>{{ price }}</p>
        <button class="btn btn-dark btn-sm  float-end" @click="price = 0">
          Clear Filter
        </button>
      </div>
      <div class="col-12 m-2" v-for="(item, i) in filterByPrice" :key="i">
        <div class="card shadow">
          <div class="card-body">
            <div class="card-title fs-4">
              RS.{{ item.fare }}/-
              <img
                class="img-fluid float-end"
                width="60px"
                src="../assets/plane.svg"
                alt=""
              />
            </div>
            <hr />
            <div class="card-body">
              <div class="row">
                <div :class="[!isReturnFlight ? 'offset-md-5 col-7' : 'col-6']">
                  <span class="fs-3 mx-md-2">{{ item.from.code }} ></span>
                  <span class="fs-3 ">{{ item.to.code }}</span>
                  <br />
                  <strong>Depart: </strong>
                  <span>{{ item.departureTime }} AM</span>
                  <br />
                  <strong>Arrival: </strong>
                  <span>{{ item.arrivalTime }} PM</span>
                </div>
                <div v-if="isReturnFlight" class="col-6">
                  <span class="fs-3">{{ item.to.code }} ></span>
                  <span class="fs-3 mx-md-2">{{ item.from.code }}</span>

                  <br />
                  <div>
                    <strong>Depart: </strong>
                    <span>{{ item.returnFlight.departureTime }} AM</span>
                    <br />
                    <strong>Arrival: </strong>
                    <span>{{ item.returnFlight.arrivalTime }} PM</span>
                  </div>
                </div>
              </div>
              <button
                @click="bookTicket"
                class="mt-3 float-end btn btn-primary"
              >
                Book Ticket
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      price: 0,
    };
  },

  props: {
    flights: {
      type: Array,
      required: true,
    },
  },

  methods: {
    bookTicket() {
      alert("Your Flight Was Booked!");
      window.location.reload();
    },
  },

  computed: {
    isReturnFlight() {
      return this.flights[0].flightType == "return";
    },
    showFlightCities() {
      const flight = this.flights[0];
      console.log(flight);
      return `${flight.from.city} > ${flight.to.city} ${
        this.isReturnFlight ? "> " + flight.from.city : ""
      }`;
    },
    getFlightFares() {
      const fares = [];
      this.flights.forEach((el) => {
        fares.push(el.fare);
      });
      return fares.sort((a, b) => a - b);
    },
    filterByPrice() {
      if (this.price != 0) {
        return this.flights.filter((el) => {
          if (el.fare <= this.price) return el;
        });
      } else {
        return this.flights;
      }
    },
  },
};
</script>

<style scoped>
.navbar {
  position: relative;
}
.brand {
  position: absolute;
  left: 40%;
  margin-left: -50px !important;
  display: block;
}
</style>
