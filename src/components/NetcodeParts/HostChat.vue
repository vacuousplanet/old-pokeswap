<template>
    <div class="d-flex flex-column">
        <v-card elevation="0" outlined>
            <v-container>
                <v-row justify="start" align="center">
                    <v-col cols="2">
                        <div class="ma-4">
                            Host IP-Address:
                        </div>
                    </v-col>
                    <v-col cols="2">
                        <div class="text-center ma-4">
                            <v-progress-circular
                                indeterminate
                                size="36"
                                width="3"
                                color="primary"
                                v-if="ip_address.length === 0"
                            >
                            </v-progress-circular>
                            <b v-else>{{ip_address}}</b>
                        </div>
                    </v-col>
                    <v-col cols="1">
                        <div class="ma-4">
                            Port :
                        </div>
                    </v-col>
                    <v-col cols="1">
                        <div>
                            <v-text-field
                                outlined
                                solo
                                flat
                                hide-details
                                single-line
                                :disabled="start_disable"
                                value="3434"
                            >
                            </v-text-field>
                        </div>
                    </v-col>
                </v-row>
                <v-row justify="start" align="center">
                    <v-col cols="2">
                        <div class="ma-4">
                            Passcode: 
                        </div>
                    </v-col>
                    <v-col cols="2">
                        <div class="text-center ma-4">
                            <b v-if="passcode.length === 0">******</b>
                            <b v-else>{{ passcode }}</b>
                        </div>
                    </v-col>
                </v-row>
                <v-row justify="end" align="end">
                    <div class="mr-8 ml-4 my-4">
                        <v-btn
                            outlined 
                            color="success"
                            :disabled="start_disable && ip_address.length > 0"
                            v-on:click="start_session()"
                        >
                            Host
                        </v-btn> 
                    </div>
                    <div class="mr-8 ml-4 my-4">
                        <v-btn 
                            outlined
                            color="error"
                            :disabled="stop_disable"
                            v-on:click="stop_session()"
                        >Stop</v-btn>
                    </div>
                </v-row>
            </v-container>
        </v-card>

        <!-- This section could be replaced with a separate chat component, since this isn't unique to just the host mode -->
        <v-container style="padding: 0px">
            <v-row no-gutters>
                <v-col cols="2">
                    <v-card elevation="0" outlined tile class="pa-4">
                        Connections...
                    </v-card>
                </v-col>
                <v-col cols="10">
                    <v-card elevation="0" outlined tile class="pa-4">
                        [Messages]
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
var publicIp = require('public-ip')

export default {

    created (){
        this.load_ip()
    },

    data () {
        return {
            start_disable : false,
            stop_disable : true,
            passcode : "",
            ip_address : "",
        }
    },
    methods : {
        start_session : function () {
            this.passcode = Math.floor(0xffffff*Math.random()).toString(16)
            this.start_disable = true
            this.stop_disable = false
        },
        stop_session : function () {
            this.passcode = ""
            this.start_disable = false
            this.stop_disable = true
        },
        load_ip : async function () {
            while(this.ip_address.length === 0){
                this.ip_address = await publicIp.v4()
            }
        }
    },
    
}
</script>