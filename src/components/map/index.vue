<template>
  <div class="d-flex">
    <div ref="mapContainer" class="map-container rounded-2xl" />
    <div>
      <ul class="steps">
        <li
            class="step step-primary cursor"
            data-content="★"
            @click="flyMap([115.83655454867608, 35.72657636908178], 0)"
        >
          老家
        </li>
        <li
            class="step step-primary cursor"
            data-content="★"
            @click="flyMap([117.92252863384363, 36.82759967024367], 1)"
        >
          大学
        </li>
        <li
            class="step step-primary cursor"
            data-content="★"
            @click="flyMap([116.20282036695573, 39.91163217131498], 2)"
        >
          游乐园
        </li>
        <li
            class="step step-primary cursor"
            data-content="★"
            @click="flyMap([116.868961, 40.339367], 3)"
        >
          滑雪
        </li>
        <li
            class="step step-primary cursor"
            data-content="★"
            @click="flyMap([112.968743, 28.192929], 4)"
        >
          长沙
        </li>
        <li
            class="step step-primary cursor"
            data-content="★"
            @click="flyMap([116.35271857480234, 39.9104424479344], 5)"
        >
          公司
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import mapboxgl, { Map, Marker } from "mapbox-gl";
import { ReactiveEffect, Ref } from "vue";
import isShow from "../../utils/judgeTheClient";

const props = defineProps({
  dWidth: {
    type: String,
    default: "80%"
  },
  dHeight: {
    type: String,
    default: "100vh"
  }
});

let map: Ref<Map> = ref({}) as Ref<Map>;
let marker: Ref<Marker> = ref({}) as Ref<Marker>;
const mapContainer: Ref<HTMLElement | string> = ref("");

mapboxgl.accessToken =
    "pk.eyJ1IjoienhsYmVuIiwiYSI6ImNsNWh2ZnBrYTAwbmEzZmttc3VrcjFxdmwifQ.ow_IFMv7HHXeLSSNv9YNjw";

onMounted(() => {
  //初始化地图
  map.value = new mapboxgl.Map({
    container: mapContainer.value, //地图容器
    style: "mapbox://styles/zxlben/clcoihjv8002v14nygkw348tk",
    // style: "mapbox://styles/mapbox/light-v10",
    center: [116.14926769724161, 39.926016544696296],
    zoom: 12,
    pitch: 45,
    bearing: -20,
    antialias: true
  });
  //必须在这里在执行监听事件，不然生命周期执行，下面代码先执行,会找不到map对象
  loadEvent(map);
  addMaker(map);
  latitudeAndLongitude(map);
  // addMakerImage(map)
  increase(map);
  fullScreen(map);
  scale(map);
});

//所有数据
const data = {
  id: "places",
  type: "symbol",
  source: {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {
            description:
                " <div> <img src=\"src/assets/img/map/jia.jpg\" style=\"width: 200px;height: 200px\" alt=\"\"> <h3>我的老家风景</h3> </div>",
            icon: "attraction"
          },
          geometry: {
            type: "Point",
            coordinates: [115.83655454867608, 35.72657636908178]
          }
        },
        {
          type: "Feature",
          properties: {
            description:
                " <div> <img src=\"src/assets/img/map/xue.jpg\" style=\"width: 200px;height: 200px\" alt=\"\"> <h3>大学快乐时光</h3> </div>",
            icon: "attraction"
          },
          geometry: {
            type: "Point",
            coordinates: [117.92252863384363, 36.82759967024367]
          }
        },
        {
          type: "Feature",
          properties: {
            description:
                " <div> <img src=\"src/assets/img/map/you.jpg\" style=\"width: 200px;height: 200px\" alt=\"\"> <h3>万圣节之夜</h3> </div>",
            icon: "attraction"
          },
          geometry: {
            type: "Point",
            coordinates: [116.20282036695573, 39.91163217131498]
          }
        },
        {
          type: "Feature",
          properties: {
            description:
                " <div> <img src=\"src/assets/img/map/hua.jpg\" style=\"width: 200px;height: 200px\" alt=\"\"> <h3>第一次尝试滑雪的我</h3> </div>",
            icon: "attraction"
          },
          geometry: {
            type: "Point",
            coordinates: [116.868961, 40.339367]
          }
        },
        {
          type: "Feature",
          properties: {
            description:
                " <div> <img src=\"src/assets/img/map/chang.jpg\" style=\"width: 200px;height: 200px\" alt=\"\"> <h3>毛爷爷容貌</h3> </div>",
            icon: "attraction"
          },
          geometry: {
            type: "Point",
            coordinates: [112.968743, 28.192929]
          }
        },
        {
          type: "Feature",
          properties: {
            description:
                " <div> <img src=\"src/assets/img/map/gong.jpg\" style=\"width: 200px;height: 200px\" alt=\"\"> <h3>工作的地方</h3> </div>",
            icon: "attraction"
          },
          geometry: {
            type: "Point",
            coordinates: [116.35271857480234, 39.9104424479344]
          }
        }
      ]
    }
  },
  layout: {
    // "icon-image": "{icon}-15",
    "icon-image": "{icon}",
    "icon-allow-overlap": true,
    "icon-size": 1.5
  }
};

//3d效果
const loadEvent = (map: Ref<Map>) => {
  map.value.on("load", () => {
    // Insert the layer beneath any symbol layer.
    const { layers } = map.value.getStyle();
    const labelLayerId = layers.find(
        (layer) => layer.type === "symbol" && layer.layout["text-field"]
    )?.id;

    // The 'building' layer in the Mapbox Streets
    // vector tileset contains building height data
    // from OpenStreetMap.
    map.value.addLayer(
        {
          id: "add-3d-buildings",
          source: "composite",
          "source-layer": "building",
          filter: ["==", "extrude", "true"],
          type: "fill-extrusion",
          minzoom: 15,
          paint: {
            "fill-extrusion-color": "#aaa",

            // Use an 'interpolate' expression to
            // add a smooth transition effect to
            // the buildings as the user zooms in.
            "fill-extrusion-height": [
              "interpolate",
              ["linear"],
              ["zoom"],
              15,
              0,
              15.05,
              ["get", "height"]
            ],
            "fill-extrusion-base": [
              "interpolate",
              ["linear"],
              ["zoom"],
              15,
              0,
              15.05,
              ["get", "min_height"]
            ],
            "fill-extrusion-opacity": 0.6
          }
        },
        labelLayerId
    );
  });
};
//添加maker点(当前单个点，需要修改为多个点)
const addMaker = (map: Ref<Map>) => {
  // 这里就是图层部分，可以在官网找到自己希望图层样式
  const popup = new mapboxgl.Popup({ closeButton: false, offset: 25 }).setText("目前居住地");

  marker.value = new mapboxgl.Marker()
      .setLngLat([116.14926769724161, 39.926016544696296])
      .setPopup(popup)
      .addTo(map.value);
};
//在maker点设置图片
const addMakerImage = (map: Ref<Map>) => {
  const geojson: any = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {
          message: "Foo",
          iconSize: [30, 30]
        },
        geometry: {
          type: "Point",
          coordinates: [116.15349655730205, 39.92595867015115]
        }
      },
      {
        type: "Feature",
        properties: {
          message: "Baz",
          iconSize: [30, 30]
        },
        geometry: {
          type: "Point",
          coordinates: [116.3529465007403, 39.9104894247962]
        }
      }
    ]
  };

  for (const markeri of geojson.features) {
    // Create a DOM element for each marker.
    const el = document.createElement("div");
    const width = markeri.properties.iconSize[0];
    const height = markeri.properties.iconSize[1];

    el.className = "markeri";
    el.style.backgroundImage = "url(\"src/assets/img/map/bg.jpg\")";
    el.style.width = `${width}px`;
    el.style.height = `${height}px`;
    el.style.backgroundSize = "100%";

    const popup = new mapboxgl.Popup({ closeButton: false, offset: 25 }).setHTML(
        "<div> <img src=\"src/assets/img/map/bg.jpg\" style=\"width: 200px;height: 200px\" alt=\"\"> <h3>我是描述</h3> </div>"
    );
    // Add markers to the map.

    new mapboxgl.Marker(el).setLngLat(markeri.geometry.coordinates).setPopup(popup).addTo(map.value);
  }
};
//添加图片
const increase = (map: Ref<Map>) => {
  map.value.on("load", () => {
    map.value.addLayer(data as any);
    map.value.on("click", "places", (e: any) => {
      console.log(e, 111);
      var coordinates = e.features[0].geometry.coordinates.slice();
      var { description } = e.features[0].properties;

      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }
      new mapboxgl.Popup({ closeButton: false })
          .setLngLat(coordinates)
          .setHTML(description)
          .addTo(map.value);
    });
  });
};
//获取经纬度
const latitudeAndLongitude = (map: Ref<Map>) => {
  map.value.on("click", (e) => {
    const { lng, lat } = e.lngLat;

    console.log(lng, lat);
  });
};
//缓慢的飞
const flyMap = (val: Array<number>, i: number) => {
  //清空上一个图层
  var popUps = document.getElementsByClassName("mapboxgl-popup");

  if (popUps[0]) {
    popUps[0].remove();
  } //关闭弹框
  //飞
  map.value.flyTo({
    center: val as any
  });
  //打开当前点击坐标的弹窗
  new mapboxgl.Popup({ closeButton: false })
      .setHTML(data.source.data.features[i].properties.description as any)
      .setLngLat(data.source.data.features[i].geometry.coordinates as any)
      .addTo(map.value);
};
//全屏
const fullScreen = (map: Ref<Map>) => {
  map.value.addControl(new mapboxgl.FullscreenControl());
};
//比例尺
const scale = (map: Ref<Map>) => {
  const scale = new mapboxgl.ScaleControl({
    maxWidth: 100,
    unit: "metric"
  });

  map.value.addControl(scale, "bottom-left"); // 比例尺
  scale.setUnit("metric");
};
</script>

<style lang="scss">
@import url('https://api.mapbox.com/mapbox-gl-js/v2.8.1/mapbox-gl.css');

.map-container {
  width: v-bind('props.dWidth');
  height: v-bind('props.dHeight');
}

//隐藏logo
.mapboxgl-ctrl-logo {
  display: none !important;
}
</style>
