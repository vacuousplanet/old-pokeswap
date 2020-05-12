<template>
    <v-tabs>
        <v-tab key="host" href="#host-0">Host</v-tab>
        <v-tab key="connect" href="#connect-0">Connect</v-tab>
        <v-tab key="local" href="#local-0">Local</v-tab>
        
        <v-tab-item key="host" value="host-0" class="pa-4">
            
            <!-- Host/Chat component -->
            <HostChat/>

        </v-tab-item>

        <v-tab-item key="connect" value="connect-0" class="pa-4">

            <!-- Connect component + Chat component -->
            <ConnectChat/>

        </v-tab-item>

        <v-tab-item key="local" value="local-0" class="pa-4">

            <!-- Local options -->
            <LocalOptions/>

        </v-tab-item>

    </v-tabs>
</template>

<script>
import HostChat from "./NetcodeParts/HostChat";
import ConnectChat from "./NetcodeParts/ConnectChat";
import LocalOptions from "./NetcodeParts/LocalOptions";

export default {
    name : "NetcodePanel",

    components : {
        HostChat,
        ConnectChat,
        LocalOptions
    },

    data : () => {
        //
    }
}
</script>