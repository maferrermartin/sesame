<template>
    <div>
        <span>{{ currentTimer }}</span>
        <span v-if="lastTimer"> / {{ lastTimer }}</span>
    </div>
</template>

<script>
export default {
    name: 'WorkTimer',

    data: function () {
        return {
            interval: null,
            lastTimer: null,
            currentTimer: '00:00:00',
        }
    },

    destroyed() {
        clearInterval(this.interval)
    },

    watch: {
        date() {
            this.activateTimer()
        }
    },

    props: {
        date: {
            type: Date,
            required: false,
        },
    },

    methods: {
        activateTimer() {
            if (!this.date) {
                this.lastTimer = this.currentTimer
                this.currentTimer = '00:00:00'
                clearInterval(this.interval)
            } else {
                this.interval = setInterval(() => {
                    this.currentTimer = this.timer()
                }, 1000)
            }
        },

        timer() {
            var d = this.getSecondsDiff(this.date, new Date())
            var r = {}
            var s = { hour: 3600, minute: 60, second: 1}

            Object.keys(s).forEach(function(key){
                r[key] = Math.floor(d / s[key])
                d -= r[key] * s[key]
            })

            let hours = r.hour > 9 ? r.hour : '0' + r.hour
            let minutes = r.minute > 9 ? r.minute : '0' + r.minute
            let seconds = r.second > 9 ? r.second : '0' + r.second

            return hours + ':' + minutes + ':' + seconds
        },

        getSecondsDiff(startDate, endDate) {
            return Math.round(Math.abs(endDate - startDate) / 1000)
        }
    }
}
</script>