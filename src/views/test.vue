<template>
  <template>
    <div>
      <v-row
          justify="center"
      >
        <v-btn
            color="primary"
            class="ma-2"
            @click="dialog = true"
        >
          Open Dialog 1
        </v-btn>
        <v-dialog
            v-model="dialog"
            width="auto"
        >
          <v-card>
            <v-card-title>
              Dialog 1
            </v-card-title>
            <v-card-text>
              <v-btn
                  color="primary"
                  class="ma-2"
                  @click="dialog2 = true"
              >
                Open Dialog 2
              </v-btn>
            </v-card-text>
            <v-card-actions>
              <v-btn
                  color="primary"
                  variant="text"
                  @click="dialog = false"
              >
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog
            v-model="dialog2"
            width="auto"
        >
          <v-card>
            <v-card-title>
              Dialog 2
            </v-card-title>
            <v-card-text>
              <v-btn
                  color="primary"
                  @click="dialog3 = !dialog3"
              >
                Open Dialog 3
              </v-btn>
            </v-card-text>
            <v-card-actions>
              <v-btn
                  color="primary"
                  variant="text"
                  @click="dialog2 = false"
              >
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog
            v-model="dialog3"
            width="auto"
        >
          <v-card>
            <v-card-title>
              <span>Dialog 3</span>
            </v-card-title>
            <v-card-actions>
              <v-btn
                  color="primary"
                  variant="text"
                  @click="dialog3 = false"
              >
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </div>
  </template>
</template>

<script>
export default {
  data() {
    return {
      drawer: false, // Initialize drawer as closed
    };
  },
  methods: {
    closeDrawer() {
      this.drawer = false;
    },
  },
};
</script>