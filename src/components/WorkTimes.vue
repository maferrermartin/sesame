<template>
  <v-container grid-list-md text-center>
    <v-card dark color="primary">
      <v-layout row wrap align-center>
        <v-flex xs4>
          <WorkTimer :date="workDate"></WorkTimer>
        </v-flex>

        <v-flex xs4>
          <v-layout row wrap>
            <v-flex v-if="!workDate">
              <v-btn color="success" class="rounded-pill" @click="startTime()">
                Entrar
              </v-btn>
            </v-flex>

            <v-flex v-if="workDate">
              <v-btn color="warning" class="rounded-pill" @click="pauseTime()">
                Pausar
              </v-btn>
            </v-flex>

            <v-flex v-if="workDate">
              <v-btn color="error" class="rounded-pill" @click="stopTime()">
                Salir
              </v-btn>
            </v-flex>
          </v-layout>
        </v-flex>

        <v-flex xs4>
          <UserMenu :status="userStatus"></UserMenu>
        </v-flex>
      </v-layout>
    </v-card>
  </v-container>
</template>

<script>
import UserMenu from './UserMenu'
import WorkTimer from './WorkTimer'

export default {
  name: 'WorkTimes',

  data: function () {
    return {
      interval: null,
      workTimes: [],
      workTime: {},
      userStatus: null,
      workDate: null,
      user: {
        id: "b99a6cd9-3a3d-4635-9eea-e089c90ac45a",
        name: 'Kelly Pierce'
      }
    }
  },

  components: {
    UserMenu,
    WorkTimer
  },

  created: async function () {
    this.workTimes = await this.getLastTimeRegister()
  },

  methods: {
    getLastTimeRegister() {
      return new Promise((resolve, reject) => {
        try {
          this.$axios.get('schedule/v1/work-entries')
          .then((response) => {
            if (response.status === 200) {
              console.info(response.data)
              resolve(response.data)
            } else {
              console.error(response)
              reject([])
            }
          }).catch((error) => {
            console.error(error)
            reject([])
          });
        } catch (error) {
          console.error(error)
          reject([])
        }
      })
    },
    
    startTime() {
      try {
        this.$axios.post('schedule/v1/work-entries/clock-in', {
          employeeId: this.user.id,
          workEntryIn: {
            coordinates: {
              latitude: null,
              longitude: null
            }
          }
        }).then((response) => {
          if (response.status === 200) {
            this.workTime = response.data.data
            this.workDate = new Date(this.workTime.workEntryIn.date)
            this.userStatus = 'error'
          } else {
            console.error(response)
          }
        }).catch((error) => {
          console.error(error)
        });
      } catch (error) {
        console.error(error)
      }
    },

    pauseTime() {
      // TODO
    },

    stopTime() {
      try {
        this.$axios.post('schedule/v1/work-entries/clock-out', {
          employeeId: this.user.id,
          workEntryOut: {
            coordinates: {
              latitude: null,
              longitude: null,
            }
          }
        }).then((response) => {
          if (response.status === 200) {
            this.workTime = response.data.data
            this.workDate = null
            this.userStatus = 'success'
          } else {
            console.error(response)
          }
        }).catch((error) => {
          console.error(error)
        });
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>
