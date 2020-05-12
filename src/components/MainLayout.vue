<template>

  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-row>
          <v-col cols="4" class="d-flex flex-column">
            <v-hover
              v-slot:default="{ hover }"
            >
              <v-card
                :elevation="hover ? 4 : 0"
                class="flex-grow-1 flex-shrink-0 pa-4 ma-4"
                outlined
              >
                <SplitsPanel/>
              </v-card>
            </v-hover>
          </v-col>

          <v-col cols="8" class="d-flex flex-column">
            <v-row>
              <v-hover
                v-slot:default="{ hover }"
              >
                <v-card
                  :elevation="hover ? 4 : 0"
                  class="flex-grow-1 flex-shrink-0 pa-4 ma-4"
                  outlined
                >
                  <NetcodePanel/>

                </v-card>
              </v-hover>
            </v-row>
            <v-row >
              <v-hover
                v-slot:default="{ hover }"
              >
                <v-card
                  :elevation="hover ? 4 : 0"
                  class="flex-grow-1 flex-shrink-0 pa-4 ma-4"
                  outlined
                >
                  <SettingsPanel/>
                </v-card>
              </v-hover>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
      
    </v-row>
  </v-container>
</template>

<script>
import SplitsPanel from './SplitsPanel';
import NetcodePanel from "./NetcodePanel";
import SettingsPanel from "./SettingsPanel";

export default {

  name: 'MainLayout',

  components:{
    SplitsPanel,
    NetcodePanel,
    SettingsPanel
  },

  data: () => {
    //
  },
}
</script>