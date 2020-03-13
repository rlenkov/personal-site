import React from 'react'
import GoogleMapReact from 'google-map-react'

import mapStyles from './maps.module.scss'

const SimpleMap = props => {
    const defaultProps = {
        center: {
            lat: props.lat,
            lng: props.lng,
        },
        zoom: 13,
    }

    return (
        <div
            style={{
                height: '100%',
                width: '100%',
            }}
        >
            <GoogleMapReact
                bootstrapURLKeys={{ key: `${props.apiKey}` }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
                options={{
                    panControl: false,
                    draggable: false,
                    draggableCursor: 'default',
                    mapTypeControl: false,
                    scrollwheel: false,
                    scaleControl: false,
                    fullscreenControl: false,
                    zoomControl: false,
                    styles: [
                        // {
                        //     stylers: [
                        //         { saturation: 0 },
                        //         // { gamma: 3 },
                        //         { lightness: 5 },
                        //         { visibility: 'on' },
                        //     ],
                        // },
                        {
                            featureType: 'road',
                            elementType: 'labels',
                            stylers: [{ visibility: 'off' }],
                        },
                        {
                            featureType: 'transit',
                            elementType: 'labels',
                            stylers: [{ visibility: 'off' }],
                        },
                        {
                            featureType: 'transit',
                            elementType: 'geometry',
                            stylers: [{ visibility: 'off' }],
                        },
                        {
                            featureType: 'poi',
                            elementType: 'labels',
                            stylers: [{ visibility: 'off' }],
                        },
                        {
                            featureType: 'poi',
                            elementType: 'geometry',
                            stylers: [{ visibility: 'off' }],
                        },
                        {
                            featureType: 'road.highway',
                            elementType: 'geometry',
                            stylers: [{ visibility: 'off' }],
                        },
                        {
                            elementType: 'geometry',
                            stylers: [{ color: '#131318' }],
                        },
                        {
                            elementType: 'labels.text.stroke',
                            stylers: [{ color: '#131318' }],
                        },
                        {
                            elementType: 'labels.text.fill',
                            stylers: [{ color: '#5F9EA0' }],
                        },
                        {
                            featureType: 'administrative.locality',
                            elementType: 'labels.text.fill',
                            stylers: [{ color: '#5F9EA0' }],
                        },
                        {
                            featureType: 'poi',
                            elementType: 'labels.text.fill',
                            stylers: [{ color: '#5F9EA0' }],
                        },
                        {
                            featureType: 'poi.park',
                            elementType: 'geometry',
                            stylers: [{ color: '#263c3f' }],
                        },
                        {
                            featureType: 'poi.park',
                            elementType: 'labels.text.fill',
                            stylers: [{ color: '#6b9a76' }],
                        },
                        {
                            featureType: 'road',
                            elementType: 'geometry',
                            stylers: [{ color: '#38414e' }],
                        },
                        {
                            featureType: 'road',
                            elementType: 'geometry.stroke',
                            stylers: [{ color: '#212a37' }],
                        },
                        {
                            featureType: 'road',
                            elementType: 'labels.text.fill',
                            stylers: [{ color: '#9ca5b3' }],
                        },
                        {
                            featureType: 'water',
                            elementType: 'geometry',
                            stylers: [{ color: '#48D1CC' }],
                        },
                        {
                            featureType: 'water',
                            elementType: 'labels.text.fill',
                            stylers: [{ color: '#515c6d' }],
                        },
                        {
                            featureType: 'water',
                            elementType: 'labels.text.stroke',
                            stylers: [{ color: '#131318' }],
                        },
                    ],
                }}
            >
                <div
                    className={mapStyles.marker}
                    lat={defaultProps.center.lat}
                    lng={defaultProps.center.lng}
                />
            </GoogleMapReact>
        </div>
    )
}

SimpleMap.defaultProps = {
    lat: 1,
    lng: 1,
}

export default SimpleMap
