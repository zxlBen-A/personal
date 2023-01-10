import {computed} from 'vue'

/**
 * @Description: 计算模块距离顶部吸顶的距离
 * @param length 模块中内容的数量
 * @param height 单个内容的高度
 * @param altitude 自身的高度
 * @author zxl
 * @date 2023/1/10
 */
export function useCalculatedAltitude(length, height, altitude) {
    let useCalculatedAltitude = computed({
        get: () => {
            let adsorptionDistance = document.documentElement.clientHeight - (length * height + altitude);
            if (adsorptionDistance < 0) {
                return `${adsorptionDistance}px`;
            } else {
                return "84px";
            }
        },
        set: (val) => {
            useCalculatedAltitude.value = val;
        }
    });
    return useCalculatedAltitude.value
}
