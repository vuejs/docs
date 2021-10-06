function stringToDate(str) {
  const [y, m, d] = str.split('-')
  return new Date(+y, +m, +d)
}

function dateToString(date) {
  return (
    date.getFullYear() +
    '-' +
    pad(date.getMonth() + 1) +
    '-' +
    pad(date.getDate())
  )
}

function pad(n, s = String(n)) {
  return s.length < 2 ? `0${s}` : s
}

export default {
  data() {
    return {
      flightType: 'one-way flight',
      departureDate: dateToString(new Date()),
      returnDate: dateToString(new Date())
    }
  },
  computed: {
    isReturn() {
      return this.flightType === 'return flight'
    },
    canBook() {
      return (
        this.isReturn ||
        stringToDate(this.returnDate) > stringToDate(this.departureDate)
      )
    }
  },
  methods: {
    book() {
      alert(
        `You have booked a ${this.flightType} leaving on ${this.departureDate}${
          this.isReturn ? ` and returning on ${this.returnDate}` : ``
        }`
      )
    }
  }
}
