<template>
    <l-map id="mapa" ref="map">
        <l-tile-layer :url="url" :attribution="attribution"/>
        <l-marker 
            v-for="(rede, index) in redesCredenciadas" 
            :key="'marker' + index"
            ref="markers"
            :lat-lng="$leaflet.latLng(rede.latitude, rede.longitude)"
        >
            <l-popup ref="popup">
                <div v-html="$utils.getInformacoesFormatadas(rede)"></div>
            </l-popup>
        </l-marker>
    </l-map>
</template>

<script>
import {LMap, LTileLayer, LMarker, LPopup } from 'vue2-leaflet';

export default {
    name: 'mapa',

    components: {
        LMap, LTileLayer, LMarker, LPopup
    },

    data() {
        return {
            url:'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
            attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            mapObject: {}
        }
    },

    props: {
        redesCredenciadas: Array
    },

    watch: {
        redesCredenciadas(newVal) {
            this.mapObject.closePopup();
            if(newVal.length) 
                this.mapObject.fitBounds(newVal.map(rede => this.$leaflet.latLng(rede.latitude, rede.longitude)));
        }
    },

    methods: {
        focarRede(rede) {
            this.mapObject.setView(this.$leaflet.latLng(rede.latitude, rede.longitude), 20)
            this.$nextTick(() => this.$refs.markers[this.redesCredenciadas.indexOf(rede)].mapObject.openPopup())
        }
    },

    mounted() {
        this.$nextTick(() => this.mapObject = this.$refs.map.mapObject);
    }
}
</script>

<style>
#mapa {
    height: 100%;
    border: solid 1px;
    border-color: #dee2e6 #dee2e6 #fff;
}

.leaflet-popup-content {
    width: auto !important;
}

.leaflet-popup-content > div {
    width: auto !important;
    white-space: nowrap !important;
}
</style>